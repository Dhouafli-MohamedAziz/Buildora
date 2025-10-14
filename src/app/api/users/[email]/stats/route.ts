import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, pool } from '@/lib/db/route';

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

    // Count projects created by this user
    const [projectsResult] = await pool.execute(
      'SELECT COUNT(*) as count FROM projects WHERE user_id = ?',
      [user.id]
    );

    const projectsCount = (projectsResult as any)[0]?.count || 0;

    const stats = {
      projects_created: projectsCount,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user stats' },
      { status: 500 }
    );
  }
}
