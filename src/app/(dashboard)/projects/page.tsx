'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';
import UserNavbar from '@/components/UserNavbar';
import { Plus, Folder, Calendar, ArrowRight, Eye, ExternalLink, Code, Download, Zap, Copy } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  folder_name?: string;
}

export default function ProjectsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetchProjects();
    }
  }, [session]);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`/api/users/${session?.user?.email}/projects`);
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = () => {
    router.push('/dashboard');
  };

  const viewCode = (projectName: string) => {
    window.open(`/api/projects/${projectName}/code`, '_blank');
  };

  const deployProject = (projectName: string) => {
    window.open(`/api/projects/${projectName}/deploy`, '_blank');
  };

  const copyHTML = async (projectName: string) => {
    try {
      const response = await fetch(`/api/projects/${projectName}/html`);
      if (!response.ok) {
        throw new Error('Failed to get HTML');
      }
      const html = await response.text();
      await navigator.clipboard.writeText(html);
      // You could add a toast notification here
    } catch (error) {
      console.error('Copy HTML error:', error);
    }
  };

  const downloadProject = async (projectName: string) => {
    try {
      const response = await fetch('/api/download-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectName }),
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${projectName}.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  if (isLoading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <UserNavbar />
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <UserNavbar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Mes Projets</h1>
              <p className="text-gray-300 text-lg">Gère et organise tes landing pages</p>
            </div>

            {/* Projects Grid */}
            {projects.length === 0 ? (
              <div className="text-center py-20">
                <div className="bg-white/10 rounded-2xl p-12 max-w-md mx-auto">
                  <Folder size={64} className="text-gray-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-white mb-4">Aucun projet encore</h3>
                  <p className="text-gray-400 mb-8">
                    Commence par créer ta première landing page avec l'IA
                  </p>
                  <button
                    onClick={handleCreateProject}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-medium transition-all hover:scale-105 shadow-lg"
                  >
                    Create Your First Project
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <Folder size={20} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{project.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            project.status === 'published' ? 'bg-green-500/20 text-green-400' :
                            project.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(project.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2 flex-wrap">
                      <button 
                        onClick={() => window.open(`/api/projects/${project.title}`, '_blank')}
                        className="bg-blue-600 hover:bg-blue-500 p-2 rounded-lg shadow-lg transition-all duration-200 hover:scale-110"
                        title="Aperçu plein écran"
                      >
                        <Eye size={16} className="text-white" />
                      </button>
                      <button 
                        onClick={() => window.open(`/api/projects/${project.title}`, '_blank')}
                        className="bg-purple-600 hover:bg-purple-500 p-2 rounded-lg shadow-lg transition-all duration-200 hover:scale-110"
                        title="Ouvrir dans un nouvel onglet"
                      >
                        <ExternalLink size={16} className="text-white" />
                      </button>
                      <button 
                        onClick={() => viewCode(project.title)}
                        className="bg-gray-600 hover:bg-gray-500 p-2 rounded-lg shadow-lg transition-all duration-200 hover:scale-110"
                        title="Voir le code"
                      >
                        <Code size={16} className="text-white" />
                      </button>
                      <button 
                        onClick={() => downloadProject(project.title)}
                        className="bg-green-600 hover:bg-green-500 p-2 rounded-lg shadow-lg transition-all duration-200 hover:scale-110"
                        title="Télécharger le projet"
                      >
                        <Download size={16} className="text-white" />
                      </button>
                      <button 
                        onClick={() => deployProject(project.title)}
                        className="bg-orange-600 hover:bg-orange-500 p-2 rounded-lg shadow-lg transition-all duration-200 hover:scale-110"
                        title="Déployer le projet"
                      >
                        <Zap size={16} className="text-white" />
                      </button>
                      <button 
                        onClick={() => copyHTML(project.title)}
                        className="bg-indigo-600 hover:bg-indigo-500 p-2 rounded-lg shadow-lg transition-all duration-200 hover:scale-110"
                        title="Copier le HTML"
                      >
                        <Copy size={16} className="text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Create New Project Button */}
            {projects.length > 0 && (
              <div className="text-center mt-8">
                <button
                  onClick={handleCreateProject}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-medium transition-all hover:scale-105 shadow-lg flex items-center gap-2 mx-auto"
                >
                  <Plus size={20} />
                  Create New Project
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
} 