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

    // Mock subscription (replace later with real DB query)
    const subscription = {
      plan: 'trial',
      status: 'trial' as const,
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
    };

    return NextResponse.json(subscription);
  } catch (error) {
    console.error('Error fetching user subscription:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user subscription' },
      { status: 500 }
    );
  }
}
