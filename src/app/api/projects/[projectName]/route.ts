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

    // Try to serve index.html
    const htmlPath = path.join(projectPath, 'index.html');
    try {
      const htmlContent = await fs.readFile(htmlPath, 'utf-8');
      return new NextResponse(htmlContent, {
        headers: {
          'Content-Type': 'text/html',
        },
      });
    } catch {
      // If index.html doesn't exist, create a basic one
      const basicHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white">
    <div class="min-h-screen flex items-center justify-center">
        <div class="text-center">
            <h1 class="text-4xl font-bold text-gray-800 mb-4">${projectName}</h1>
            <p class="text-lg text-gray-600">Projet en cours de génération...</p>
        </div>
    </div>
</body>
</html>`;
      
      return new NextResponse(basicHtml, {
        headers: {
          'Content-Type': 'text/html',
        },
      });
    }
  } catch (error) {
    console.error('Error serving project:', error);
    return NextResponse.json({ error: 'Failed to serve project' }, { status: 500 });
  }
} 