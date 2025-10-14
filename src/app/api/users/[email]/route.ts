import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, updateUser } from '@/lib/db/route';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ email: string }> }
) {
  try {
    const { email } = await context.params;
    const decodedEmail = decodeURIComponent(email);
    const user = await findUserByEmail(decodedEmail);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userData = {
      username: user.username,
      email: user.email,
      is_verified: user.is_verified,
      created_at: user.created_at
    };

    return NextResponse.json(userData);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ email: string }> }
) {
  try {
    const { email } = await context.params;
    const decodedEmail = decodeURIComponent(email);
    const body = await request.json();

    if (!body.username || !body.email) {
      return NextResponse.json(
        { error: 'Username and email are required' },
        { status: 400 }
      );
    }

    const updatedUser = await updateUser(decodedEmail, {
      username: body.username,
      email: body.email
    });

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user data' },
      { status: 500 }
    );
  }
}
