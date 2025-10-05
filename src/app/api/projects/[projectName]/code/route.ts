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
      
      // Create a code viewer page
      const codeViewerHTML = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code - ${decodedProjectName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
</head>
<body class="bg-gray-900 text-white">
    <div class="min-h-screen">
        <div class="bg-gray-800 p-4 border-b border-gray-700">
            <div class="flex justify-between items-center">
                <h1 class="text-xl font-bold">Code Source - ${decodedProjectName}</h1>
                <button onclick="copyCode()" class="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-sm">
                    Copier le code
                </button>
            </div>
        </div>
        <div class="p-4">
            <pre class="bg-gray-800 rounded-lg p-4 overflow-x-auto"><code class="language-html">${htmlContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        </div>
    </div>
    <script>
        function copyCode() {
            const code = \`${htmlContent}\`;
            navigator.clipboard.writeText(code).then(() => {
                alert('Code copié dans le presse-papiers !');
            });
        }
    </script>
</body>
</html>`;
      
      return new NextResponse(codeViewerHTML, {
        headers: {
          'Content-Type': 'text/html',
        },
      });
    } catch {
      return NextResponse.json({ error: 'Code not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error serving code:', error);
    return NextResponse.json({ error: 'Failed to serve code' }, { status: 500 });
  }
} 