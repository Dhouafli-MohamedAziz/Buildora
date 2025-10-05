import { NextRequest, NextResponse } from 'next/server';
import { verifyEmail } from '@/lib/db/route';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    // Verify the email
    await verifyEmail(email);

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully! You can now log in to your account.',
      user: {
        email: email,
      },
    });
  } catch (error: any) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    );
  }
} 