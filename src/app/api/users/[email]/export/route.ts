import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail } from '@/lib/db/route';

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

    const exportData = {
      user: {
        username: user.username,
        email: user.email,
        is_verified: user.is_verified,
        created_at: user.created_at,
        updated_at: user.updated_at
      },
      export_date: new Date().toISOString(),
      export_version: '1.0'
    };

    const jsonData = JSON.stringify(exportData, null, 2);
    
    return new NextResponse(jsonData, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="buildora-data-${new Date()
          .toISOString()
          .split('T')[0]}.json"`
      }
    });
  } catch (error) {
    console.error('Error exporting user data:', error);
    return NextResponse.json(
      { error: 'Failed to export user data' },
      { status: 500 }
    );
  }
}


