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

    // Create deployment instructions page
    const deployHTML = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Déployer - ${decodedProjectName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-white">
    <div class="min-h-screen p-8">
        <div class="max-w-4xl mx-auto">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold mb-4">🚀 Déployer votre landing page</h1>
                <p class="text-gray-400">Choisissez votre méthode de déploiement préférée</p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6">
                <!-- Vercel -->
                <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4">
                            <span class="text-white font-bold">V</span>
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold">Vercel</h3>
                            <p class="text-gray-400 text-sm">Déploiement instantané</p>
                        </div>
                    </div>
                    <p class="text-gray-300 mb-4">Déployez votre landing page en quelques clics avec Vercel.</p>
                    <button onclick="deployToVercel()" class="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg transition-colors">
                        Déployer sur Vercel
                    </button>
                </div>
                
                <!-- Netlify -->
                <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                            <span class="text-white font-bold">N</span>
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold">Netlify</h3>
                            <p class="text-gray-400 text-sm">Hébergement gratuit</p>
                        </div>
                    </div>
                    <p class="text-gray-300 mb-4">Hébergez votre site gratuitement avec Netlify.</p>
                    <button onclick="deployToNetlify()" class="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
                        Déployer sur Netlify
                    </button>
                </div>
                
                <!-- GitHub Pages -->
                <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mr-4">
                            <span class="text-white font-bold">G</span>
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold">GitHub Pages</h3>
                            <p class="text-gray-400 text-sm">Hébergement gratuit</p>
                        </div>
                    </div>
                    <p class="text-gray-300 mb-4">Utilisez GitHub Pages pour héberger votre site.</p>
                    <button onclick="deployToGitHub()" class="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors">
                        Déployer sur GitHub
                    </button>
                </div>
                
                <!-- Manual -->
                <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                            <span class="text-white font-bold">📁</span>
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold">Manuel</h3>
                            <p class="text-gray-400 text-sm">Téléchargement direct</p>
                        </div>
                    </div>
                    <p class="text-gray-300 mb-4">Téléchargez les fichiers et hébergez-les vous-même.</p>
                    <button onclick="downloadFiles()" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                        Télécharger les fichiers
                    </button>
                </div>
            </div>
            
            <div class="mt-8 bg-gray-800 rounded-lg p-6">
                <h3 class="text-xl font-semibold mb-4">📋 Instructions de déploiement</h3>
                <div class="space-y-4 text-gray-300">
                    <div>
                        <h4 class="font-semibold text-white">Vercel (Recommandé)</h4>
                        <ol class="list-decimal list-inside ml-4 space-y-1">
                            <li>Créez un compte sur <a href="https://vercel.com" class="text-blue-400 hover:underline">vercel.com</a></li>
                            <li>Cliquez sur "New Project"</li>
                            <li>Uploadez le dossier de votre projet</li>
                            <li>Votre site sera en ligne en quelques secondes !</li>
                        </ol>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white">Netlify</h4>
                        <ol class="list-decimal list-inside ml-4 space-y-1">
                            <li>Créez un compte sur <a href="https://netlify.com" class="text-blue-400 hover:underline">netlify.com</a></li>
                            <li>Glissez-déposez le dossier de votre projet</li>
                            <li>Votre site sera automatiquement déployé</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        function deployToVercel() {
            window.open('https://vercel.com/new', '_blank');
        }
        
        function deployToNetlify() {
            window.open('https://app.netlify.com/drop', '_blank');
        }
        
        function deployToGitHub() {
            window.open('https://github.com', '_blank');
        }
        
        function downloadFiles() {
            window.open('/api/download-project', '_blank');
        }
    </script>
</body>
</html>`;
      
      return new NextResponse(deployHTML, {
        headers: {
          'Content-Type': 'text/html',
        },
      });
    
  } 
  catch (error) {
    console.error('Error serving deploy page:', error);
    return NextResponse.json({ error: 'Failed to serve deploy page' }, { status: 500 });
  }
} 