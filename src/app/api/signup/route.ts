import { NextRequest, NextResponse } from 'next/server';
import { createUser, findUserByEmail } from '@/lib/db/route';
import { sendVerificationEmail } from '@/lib/email';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    // Validate required fields
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Username, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user (initially unverified)
    const userData = {
      username,
      email,
      password: hashedPassword,
      role: 'user' as const,
      is_verified: false, // Start as unverified
    };

    const newUser = await createUser(userData) as any;

    if (!newUser) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    // Send verification email
    const emailResult = await sendVerificationEmail(email);

    if (!emailResult.success) {
      console.error('Failed to send verification email:', emailResult.error);
      // Still return success but log the email error
    }

    console.log('Verification URL:', `${process.env.NEXTAUTH_URL}/verify-email?email=${encodeURIComponent(email)}`);

    return NextResponse.json({
      success: true,
      message: 'User created successfully. Please check your email to verify your account.',
      user: {
        id: newUser.insertId,
        username: userData.username,
        email: userData.email,
        is_verified: userData.is_verified,
      },
    });
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: error.sqlMessage || 'Internal server error' },
      { status: 500 }
    );
  }
}