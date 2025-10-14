import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const projectName = formData.get('projectName') as string;
    const sections = JSON.parse(formData.get('sections') as string) as string[];
    const projectDescription = formData.get('projectDescription') as string || 'Landing page générée par Buildora';

    const basePath = path.join(process.cwd(), 'projects', projectName);

    try {
      await fs.access(basePath);
      return NextResponse.json({ success: false, message: '🚫 Ce projet existe déjà.' });
    } catch {}

    await fs.mkdir(path.join(basePath, 'sections'), { recursive: true });

    // Create sections directory structure
    for (const section of sections) {
      const sectionPath = path.join(basePath, 'sections', section.toLowerCase());
      await fs.mkdir(sectionPath, { recursive: true });
    }

    // Create index.tsx that imports all sections
    const imports = sections.map(s => `import ${s} from './sections/${s.toLowerCase()}/page';`).join('\n');
    const components = sections.map(s => `<${s} />`).join('\n        ');

    const indexContent = `'use client';

import React from 'react';

${imports}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      ${components}
    </div>
  );
}`;

    await fs.writeFile(path.join(basePath, 'index.tsx'), indexContent);

    // Create index.html for iframe preview
    const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: 'Inter', sans-serif; }
        .animate-fade-in { animation: fadeIn 0.5s ease-in; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    </style>
</head>
<body class="bg-white">
    <div id="root" class="animate-fade-in">
        <!-- AI-Generated Content will be here -->
    
    </div>
</body>
</html>`;

    await fs.writeFile(path.join(basePath, 'index.html'), htmlContent);

    // Create package.json for the project
    const packageJson = {
      name: projectName.toLowerCase().replace(/\s+/g, '-'),
      version: '1.0.0',
      private: true,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start'
      },
      dependencies: {
        'next': '^14.0.0',
        'react': '^18.0.0',
        'react-dom': '^18.0.0',
        'tailwindcss': '^3.0.0',
        '@tailwindcss/typography': '^0.5.0'
      },
      devDependencies: {
        '@types/node': '^20.0.0',
        '@types/react': '^18.0.0',
        '@types/react-dom': '^18.0.0',
        'typescript': '^5.0.0'
      }
    };

    await fs.writeFile(
      path.join(basePath, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    // Create README.md
    const readmeContent = `# ${projectName}

This project was generated with Buildora.

## Sections Included:
${sections.map(s => `- ${s}`).join('\n')}

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
${projectName}/
├── sections/
│   ${sections.map(s => `├── ${s.toLowerCase()}/`).join('\n│   ')}
│   ${sections.map(s => `│   └── page.tsx`).join('\n│   ')}
├── index.tsx
├── package.json
└── README.md
\`\`\`
`;

    await fs.writeFile(path.join(basePath, 'README.md'), readmeContent);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Erreur serveur interne.' });
  }
}
