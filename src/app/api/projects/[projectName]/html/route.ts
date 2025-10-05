import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectName: string }> }
) {
  try {
    const { projectName } = await params;
    const decodedProjectName = decodeURIComponent(projectName);
    const projectPath = path.join(process.cwd(), 'projects', decodedProjectName);
    
    // Check if project exists
    try {
      await fs.access(projectPath);
    } catch {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Read the HTML file
    const htmlPath = path.join(projectPath, 'index.html');
    try {
      const htmlContent = await fs.readFile(htmlPath, 'utf-8');
      
      return new NextResponse(htmlContent, {
        headers: {
          'Content-Type': 'text/html',
        },
      });
    } catch {
      return NextResponse.json({ error: 'HTML not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error serving HTML:', error);
    return NextResponse.json({ error: 'Failed to serve HTML' }, { status: 500 });
  }
} 