import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, createProject, pool } from '@/lib/db/route';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const { email } = await params;
    const decodedEmail = decodeURIComponent(email);
    const user = await findUserByEmail(decodedEmail);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get user ID first
    const [users] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [decodedEmail]
    ) as any;

    if (!users || users.length === 0) {
      return NextResponse.json([]);
    }

    const userId = users[0].id;

    // Fetch user's projects from database
    const [projects] = await pool.execute(
      'SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    ) as any;

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching user projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user projects' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const { email } = await params;
    const decodedEmail = decodeURIComponent(email);
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.description) {
      return NextResponse.json(
        { error: 'Project name and description are required' },
        { status: 400 }
      );
    }

    // Get user ID first
    const [users] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [decodedEmail]
    ) as any;

    if (!users || users.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userId = users[0].id;

    // Create new project
    const project = await createProject({
      user_id: userId,
      folder_name: `${body.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      title: body.name,
      description: body.description,
      logo: body.logo || ''
    }) as any;

    if (!project) {
      return NextResponse.json(
        { error: 'Failed to create project' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Project created successfully',
      project: {
        id: project.id,
        title: project.title,
        description: project.description,
        status: project.status,
        folder_name: project.folder_name,
        created_at: project.created_at,
        updated_at: project.updated_at
      }
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
} 