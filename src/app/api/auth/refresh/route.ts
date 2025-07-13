import { NextRequest, NextResponse } from 'next/server';
import { verifyRefreshToken, createAccessToken } from '@/app/lib/jwt';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || undefined,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

export async function POST(request: NextRequest) {
  try {
    // Get the refresh token from cookies
    const refreshToken = request.cookies.get('refresh_token')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'No refresh token found' },
        { status: 401 }
      );
    }

    // Verify the refresh token
    const payload = await verifyRefreshToken(refreshToken);

    // Get user data from database
    const [users] = await pool.execute(
      'SELECT id, email, username, role FROM users WHERE id = ?',
      [payload.sub]
    ) as any;

    if (Array.isArray(users) && users.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const user = users[0];

    // Generate new access token
    const newAccessToken = await createAccessToken(
      user.id.toString(),
      user.email,
      user.role ? user.role.toString() : undefined
    );

    // Create response with new access token
    const response = NextResponse.json({
      message: 'Token refreshed successfully',
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    });

    // Set new access token cookie
    response.cookies.set('access_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 minutes in seconds
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Token refresh failed:', error);
    return NextResponse.json(
      { error: 'Token refresh failed' },
      { status: 401 }
    );
  }
} 