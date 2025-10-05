import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import archiver from 'archiver';

export async function POST(req: Request) {
  try {
    const { projectName } = await req.json();
    const projectPath = path.join(process.cwd(), 'projects', projectName);

    // Check if project exists
    try {
      await fs.access(projectPath);
    } catch {
      return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 });
    }

    // Create a zip file
    const archive = archiver('zip', { zlib: { level: 9 } });
    const chunks: Buffer[] = [];

    archive.on('data', (chunk) => {
      chunks.push(chunk);
    });

    archive.on('end', () => {
      // This will be handled by the response
    });

    // Add all files from the project directory
    archive.directory(projectPath, false);

    // Finalize the archive
    await archive.finalize();

    // Combine all chunks
    const buffer = Buffer.concat(chunks);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${projectName}.zip"`,
      },
    });

  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ success: false, message: 'Download failed' }, { status: 500 });
  }
} 