import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, updateUserSettings } from '@/lib/db/route';

export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const email = decodeURIComponent(params.email);
    const user = await findUserByEmail(email);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Return user settings
    const settings = {
      email_notifications: user.email_notifications || true,
      auto_save: user.auto_save || true,
      public_profile: user.public_profile || false,
      data_collection: user.data_collection || true
    };

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching user settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user settings' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const email = decodeURIComponent(params.email);
    const body = await request.json();
    
    // Update user settings
    const updatedUser = await updateUserSettings(email, {
      email_notifications: body.email_notifications,
      auto_save: body.auto_save,
      public_profile: body.public_profile,
      data_collection: body.data_collection
    });

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Settings updated successfully',
      settings: {
        email_notifications: updatedUser.email_notifications,
        auto_save: updatedUser.auto_save,
        public_profile: updatedUser.public_profile,
        data_collection: updatedUser.data_collection
      }
    });
  } catch (error) {
    console.error('Error updating user settings:', error);
    return NextResponse.json(
      { error: 'Failed to update user settings' },
      { status: 500 }
    );
  }
} 