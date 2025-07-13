import { SignJWT, jwtVerify } from 'jose';

// ============================================================================
// ACCESS TOKEN IMPLEMENTATION
// ============================================================================

/*
WHAT IS AN ACCESS TOKEN?
An access token is a short-lived JWT that grants access to protected resources.
It should:
- Be short-lived (15-60 minutes)
- Contain minimal data (just user ID and permissions)
- Be used for API authentication
- Be paired with refresh tokens for longer sessions
*/

// ============================================================================
// CONFIGURATION
// ============================================================================

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access-token-secret-key';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh-token-secret-key';
const accessSecret = new TextEncoder().encode(ACCESS_TOKEN_SECRET);
const refreshSecret = new TextEncoder().encode(REFRESH_TOKEN_SECRET);

// ============================================================================
// TOKEN TYPES
// ============================================================================

export interface AccessTokenPayload {
  sub: string;        // Subject (user ID) - REQUIRED
  email: string;      // User email
  role?: string;      // User role/permissions
  type: 'access';     // Token type identifier
}

export interface RefreshTokenPayload {
  sub: string;        // Subject (user ID) - REQUIRED
  type: 'refresh';    // Token type identifier
}

// ============================================================================
// ACCESS TOKEN CREATION
// ============================================================================

/**
 * Creates a short-lived access token
 * 
 * @param userId - The user's unique identifier
 * @param email - The user's email address
 * @param role - Optional user role/permissions
 * @returns A signed access token (15 minutes validity)
 * 
 * ACCESS TOKEN CHARACTERISTICS:
 * - Short expiration (15 minutes)
 * - Minimal payload (just essential data)
 * - Used for API authentication
 * - Should be paired with refresh tokens
 */
export async function createAccessToken(
  userId: string,
  email: string,
  role?: string
): Promise<string> {
  try {
    const payload: AccessTokenPayload = {
      sub: userId,
      email,
      role,
      type: 'access'
    };

    const token = await new SignJWT(payload as any)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('15m')  // Short-lived access token
      .setSubject(userId)
      .setAudience('api')        // This token is for API access
      .setIssuer('auth-service') // Who issued this token
      .sign(accessSecret);
    
    return token;
  } catch (error) {
    throw new Error(`Failed to create access token: ${error}`);
  }
}

// ============================================================================
// REFRESH TOKEN CREATION
// ============================================================================

/**
 * Creates a long-lived refresh token
 * 
 * @param userId - The user's unique identifier
 * @returns A signed refresh token (7 days validity)
 * 
 * REFRESH TOKEN CHARACTERISTICS:
 * - Long expiration (7 days)
 * - Minimal payload (just user ID)
 * - Used only for getting new access tokens
 * - Should be stored securely
 */
export async function createRefreshToken(userId: string): Promise<string> {
  try {
    const payload: RefreshTokenPayload = {
      sub: userId,
      type: 'refresh'
    };

    const token = await new SignJWT(payload as any)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')   // Long-lived refresh token
      .setSubject(userId)
      .setAudience('auth')       // This token is for auth refresh
      .setIssuer('auth-service') // Who issued this token
      .sign(refreshSecret);
    
    return token;
  } catch (error) {
    throw new Error(`Failed to create refresh token: ${error}`);
  }
}

// ============================================================================
// ACCESS TOKEN VERIFICATION
// ============================================================================

/**
 * Verifies an access token and returns the payload
 * 
 * @param token - The access token to verify
 * @returns The decoded access token payload
 * @throws Error if token is invalid, expired, or wrong type
 */
export async function verifyAccessToken(token: string): Promise<AccessTokenPayload> {
  try {
    const { payload } = await jwtVerify(token, accessSecret);
    const decodedPayload = payload as unknown as AccessTokenPayload;
    
    // Verify this is actually an access token
    if (decodedPayload.type !== 'access') {
      throw new Error('Invalid token type - expected access token');
    }
    
    return decodedPayload;
  } catch (error) {
    throw new Error(`Access token verification failed: ${error}`);
  }
}

// ============================================================================
// REFRESH TOKEN VERIFICATION
// ============================================================================

/**
 * Verifies a refresh token and returns the payload
 * 
 * @param token - The refresh token to verify
 * @returns The decoded refresh token payload
 * @throws Error if token is invalid, expired, or wrong type
 */
export async function verifyRefreshToken(token: string): Promise<RefreshTokenPayload> {
  try {
    const { payload } = await jwtVerify(token, refreshSecret);
    const decodedPayload = payload as unknown as RefreshTokenPayload;
    
    // Verify this is actually a refresh token
    if (decodedPayload.type !== 'refresh') {
      throw new Error('Invalid token type - expected refresh token');
    }
    
    return decodedPayload;
  } catch (error) {
    throw new Error(`Refresh token verification failed: ${error}`);
  }
}

// ============================================================================
// TOKEN UTILITIES
// ============================================================================

/**
 * Checks if an access token is expired
 * 
 * @param token - The access token to check
 * @returns true if expired, false if still valid
 */
export async function isAccessTokenExpired(token: string): Promise<boolean> {
  try {
    await verifyAccessToken(token);
    return false;
  } catch (error) {
    return true;
  }
}

/**
 * Extracts user ID from access token without verification
 * Use only for logging/debugging - NOT for authentication!
 * 
 * @param token - The access token
 * @returns The user ID or null if invalid
 */
export function extractUserIdFromAccessToken(token: string): string | null {
  try {
    const base64Payload = token.split('.')[1];
    const payload = JSON.parse(Buffer.from(base64Payload, 'base64').toString());
    return payload.sub || null;
  } catch (error) {
    return null;
  }
}

// ============================================================================
// TOKEN USAGE EXAMPLES
// ============================================================================

/*
// Example 1: Creating access and refresh tokens
const accessToken = await createAccessToken('user123', 'user@example.com', 'admin');
const refreshToken = await createRefreshToken('user123');

// Example 2: Verifying tokens in API middleware
app.use('/api', async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  try {
    const payload = await verifyAccessToken(token);
    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role
    };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid access token' });
  }
});

// Example 3: Using refresh token to get new access token
const refreshToken = req.cookies.refresh_token;
if (refreshToken) {
  try {
    const payload = await verifyRefreshToken(refreshToken);
    const newAccessToken = await createAccessToken(payload.sub, user.email, user.role);
    // Set new access token in response
  } catch (error) {
    // Refresh token expired, user needs to login again
  }
}
*/

// ============================================================================
// TOKEN SECURITY
// ============================================================================

/*
TOKEN SECURITY BEST PRACTICES:

1. SHORT EXPIRATION: 15-60 minutes maximum for access tokens
2. MINIMAL PAYLOAD: Only essential user data
3. HTTPS ONLY: Never send over HTTP
4. SECURE STORAGE: Use httpOnly cookies or secure storage
5. TOKEN ROTATION: Refresh tokens should rotate on use
6. BLACKLISTING: Implement token revocation
7. AUDIT LOGGING: Log token usage for security
8. RATE LIMITING: Prevent token abuse
9. ENVIRONMENT SECRETS: Use strong, unique secrets
10. REGULAR ROTATION: Change secrets periodically
*/
