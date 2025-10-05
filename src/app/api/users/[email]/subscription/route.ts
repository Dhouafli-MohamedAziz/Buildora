import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail } from '@/lib/db/route';

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

    // For now, return a mock subscription (in a real app, this would come from a subscriptions table)
    const subscription = {
      plan: 'trial', // Default to trial for new users
      status: 'trial' as const,
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
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