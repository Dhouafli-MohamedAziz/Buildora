import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const { projectName, sectionName, code } = await req.json();

  try {
    const folderPath = path.join(process.cwd(), 'projects', projectName, 'sections', sectionName);
    const filePath = path.join(folderPath, 'page.tsx');
    const projectPath = path.join(process.cwd(), 'projects', projectName);

    // Ensure project directory exists
    await fs.mkdir(projectPath, { recursive: true });
    await fs.mkdir(folderPath, { recursive: true });
    
    // Create a proper React component
    const componentCode = `'use client';

${code}

export default function ${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Your ${sectionName} content here */}
      </div>
    </section>
  );
}`;

    await fs.writeFile(filePath, componentCode, 'utf-8');

    // Also update the main HTML file with this section's content
    const htmlPath = path.join(projectPath, 'index.html');
    try {
      let htmlContent;
      
      // Check if HTML file exists, if not create a basic one
      try {
        htmlContent = await fs.readFile(htmlPath, 'utf-8');
      } catch (error) {
        // Create a basic HTML file if it doesn't exist
        htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
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
      }
      
      // Replace the placeholder section with real AI-generated content
      const placeholderRegex = new RegExp(`<!-- ${sectionName} section -->[\\s\\S]*?<!-- end ${sectionName} section -->`, 'g');
      
      // Use the HTML content directly (no conversion needed)
      const htmlSection = `
      ${code}`;
      
      if (htmlContent.includes(`<!-- ${sectionName} section -->`)) {
        // Replace existing placeholder
        htmlContent = htmlContent.replace(placeholderRegex, `<!-- ${sectionName} section -->\n${htmlSection}\n<!-- end ${sectionName} section -->`);
      } else {
        // Add new section before closing body tag
        htmlContent = htmlContent.replace('</body>', `${htmlSection}\n</body>`);
      }
      
      await fs.writeFile(htmlPath, htmlContent, 'utf-8');
    } catch (error) {
      console.error('Error updating HTML file:', error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Erreur lors de la sauvegarde du fichier.' });
  }
}
