'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import AuthGuard from '@/components/AuthGuard';
import AdvancedNavbar from '@/components/UserNavbar';
import Avatar from '@/components/Avatar';
import { 
  Menu, ChevronDown, Settings, LogOut, Download, Share2, User, Moon, Sun, X, 
  Check, ChevronRight, Palette, Loader, Zap, Eye, Code, Layout, Image as ImageIcon, Save, ExternalLink, Copy 
} from 'lucide-react';

// Sections with descriptions
const sectionsWithDescription = [
  { name: "Header", desc: "Barre du haut avec ton logo et ton menu de navigation.", icon: <Layout size={20} /> },
  { name: "Hero", desc: "Grande section d'accueil avec un titre puissant et une image.", icon: <Zap size={20} /> },
  { name: "Services", desc: "Liste des services ou prestations que tu proposes.", icon: <Menu size={20} /> },
  { name: "Features", desc: "Fonctionnalités principales mises en avant avec icônes.", icon: <Palette size={20} /> },
  { name: "Testimonials", desc: "Avis et témoignages de tes clients pour donner confiance.", icon: <User size={20} /> },
  { name: "FAQ", desc: "Foire aux questions pour anticiper les besoins des visiteurs.", icon: <ChevronDown size={20} /> },
  { name: "Gallery", desc: "Galerie d'images pour présenter tes réalisations ou produits.", icon: <ImageIcon size={20} /> },
  { name: "Pricing", desc: "Tarifs et abonnements de tes services.", icon: <Download size={20} /> },
  { name: "Contact", desc: "Formulaire ou informations pour te contacter.", icon: <Share2 size={20} /> },
  { name: "CTA", desc: "Appel à l'action fort pour convertir les visiteurs.", icon: <ChevronRight size={20} /> },
  { name: "Footer", desc: "Pied de page avec liens, réseaux sociaux, copyright.", icon: <Layout size={20} /> }
];

const templateStyles = [
  { name: "modern", label: "Moderne" },
  { name: "minimal", label: "Minimaliste" },
  { name: "bold", label: "Audacieux" },
  { name: "corporate", label: "Corporatif" },
  { name: "creative", label: "Créatif" },
  { name: "glassmorphic", label: "Glassmorphisme" },
  { name: "retro", label: "Rétro" },
  { name: "futuristic", label: "Futuriste" }
];



export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  // Core state management
  const [step, setStep] = useState(0);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [messages, setMessages] = useState<{ type: 'bot' | 'user', text: string }[]>([]);
  const [currentBotMessage, setCurrentBotMessage] = useState('');
  const [fullBotText, setFullBotText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [creatingFiles, setCreatingFiles] = useState(false);
  const [projectReady, setProjectReady] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  
  // Settings state
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('buildora-darkMode');
      return savedMode !== null ? JSON.parse(savedMode) : true;
    }
    return true;
  });
  
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedColorTheme, setSelectedColorTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('buildora-colorTheme');
      return savedTheme !== null ? JSON.parse(savedTheme) : null;
    }
    return null;
  });
  
  const [previewCode, setPreviewCode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedPreview = localStorage.getItem('buildora-previewCode');
      return savedPreview !== null ? JSON.parse(savedPreview) : false;
    }
    return false;
  });
  
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [templateStyle, setTemplateStyle] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedStyle = localStorage.getItem('buildora-templateStyle');
      return savedStyle !== null ? JSON.parse(savedStyle) : 'modern';
    }
    return 'modern';
  });
  
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [projectsModalOpen, setProjectsModalOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  const userName = session?.user?.name || session?.user?.email || 'User';

  // Load recent projects from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('buildora-recentProjects');
      if (saved) {
        setRecentProjects(JSON.parse(saved));
      }
    }
  }, []);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setTimeout(() => {
        sendBotMessage("Bonjour ! Je suis **Buildora** 🤖, ton assistant IA pour créer rapidement une landing page. Dis-moi **'Salut'** pour commencer !");
      }, 500);
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('buildora-darkMode', JSON.stringify(darkMode));
      localStorage.setItem('buildora-colorTheme', JSON.stringify(selectedColorTheme));
      localStorage.setItem('buildora-previewCode', JSON.stringify(previewCode));
      localStorage.setItem('buildora-templateStyle', JSON.stringify(templateStyle));
    }
  }, [darkMode, selectedColorTheme, previewCode, templateStyle]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentBotMessage]);

  // Handle typing animation
  useEffect(() => {
    if (isTyping && fullBotText) {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= fullBotText.length) {
          setCurrentBotMessage(fullBotText.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          setMessages(prev => [...prev, { type: 'bot', text: fullBotText }]);
          setCurrentBotMessage('');
          setFullBotText('');
        }
      }, 30); // Adjust speed here

      return () => clearInterval(interval);
    }
  }, [isTyping, fullBotText]);

  const saveToRecentProjects = (project: any) => {
    const updated = [project, ...recentProjects.filter(p => p.name !== project.name)].slice(0, 10);
    setRecentProjects(updated);
    localStorage.setItem('buildora-recentProjects', JSON.stringify(updated));
  };

  const sendBotMessage = (text: string) => {
    setIsTyping(true);
    setFullBotText(text);
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    console.log(`${type.toUpperCase()}: ${message}`);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userInput = input.trim();
    setInput('');
    setMessages(prev => [...prev, { type: 'user', text: userInput }]);

    await processInput(userInput);
  };

  const processInput = async (userInput: string) => {
    if (step === 0) {
      // Welcome step - user responds, then ask for project name
      sendBotMessage("Super ! Tout d'abord, quel est le **nom de ton projet** ? (un mot sans espace qui servira d'identifiant)");
      setStep(1);
    } else if (step === 1) {
      // Project name step
      if (userInput.includes(' ')) {
        sendBotMessage("⚠️ Merci d'utiliser un mot sans espace pour le nom du projet !");
      } else {
        setProjectName(userInput);
        
        // Check if user has design preferences from design studio
        const designDescription = localStorage.getItem('buildora-design-description');
        if (designDescription) {
          sendBotMessage(`Parfait ! J'ai détecté tes préférences de design : ${designDescription} Maintenant, peux-tu décrire **ton projet en quelques phrases** ? Plus ta description sera précise, meilleur sera le résultat !`);
        } else {
          sendBotMessage("Parfait ! Maintenant, peux-tu décrire **ton projet en quelques phrases** ? Plus ta description sera précise, meilleur sera le résultat !");
        }
        setStep(2);
      }
    } else if (step === 2) {
      // Project description step
      let finalDescription = userInput;
      
      // Add design preferences to the description if they exist
      const designDescription = localStorage.getItem('buildora-design-description');
      if (designDescription) {
        finalDescription = `${userInput} ${designDescription}`;
        // Clear the design description after using it
        localStorage.removeItem('buildora-design-description');
      }
      
      setProjectDescription(finalDescription);
      sendBotMessage("🎨 Parfait ! Maintenant j'ai besoin de ton logo. Clique sur le bouton pour uploader ton image.");
      setStep(3); // Logo upload step
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      setMessages(prev => [...prev, { type: 'user', text: `Logo uploadé : ${file.name}` }]);
      
      // Delay slightly for better UX
      setTimeout(() => {
        sendBotMessage("✅ Super ! Ton logo est prêt. Veux-tu continuer avec ce logo ou le changer ?");
        setStep(4); // Logo confirmation step
      }, 500);
    }
  };

  const explainSections = async () => {
    sendBotMessage("✅ Parfait ! Maintenant choisis les sections que tu veux dans ta landing page :");
    setStep(5); // Section selection step
  };

  const toggleSection = (section: string) => {
    setSelectedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  function LoadingDots() {
    return (
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    );
  }

  const saveProject = async () => {
    if (selectedSections.length === 0) {
      showNotification('Sélectionne au moins une section', 'error');
      return;
    }

    setCreatingFiles(true);
    setStep(6); // Generation step
    
    try {
      // Upload logo if exists
      if (logo) {
        const logoFormData = new FormData();
        logoFormData.append('logo', logo);
        logoFormData.append('projectName', projectName);
        
        const logoResponse = await fetch('/api/upload-logo', {
          method: 'POST',
          body: logoFormData
        });
        
        if (!logoResponse.ok) {
          console.warn('Logo upload failed, continuing without logo');
        }
      }

      // Create project folder and structure
      const formData = new FormData();
      formData.append('projectName', projectName);
      formData.append('sections', JSON.stringify(selectedSections));
      formData.append('projectDescription', projectDescription);

      const createResponse = await fetch('/api/create-project', {
        method: 'POST',
        body: formData
      });

      if (!createResponse.ok) {
        throw new Error('Failed to create project structure');
      }

      // Generate AI content for each section
      let completedSections = 0;
      let failedSections = 0;
      
      sendBotMessage("🚀 Début de la génération de ta landing page...");
      
      for (const section of selectedSections) {
        try {
          sendBotMessage(`⚙️ Génération de la section **${section}**...`);
          
          // Generate AI content for the section
          const aiResponse = await fetch('/api/ai-generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sectionName: section,
              projectDescription: projectDescription,
              theme: selectedColorTheme
            })
          });

          if (!aiResponse.ok) {
            throw new Error(`Failed to generate AI content for ${section}`);
          }

          const aiData = await aiResponse.json();
          
          if (!aiData.success) {
            throw new Error(`AI generation failed for ${section}`);
          }

          // Save the generated code
          const saveResponse = await fetch('/api/save-file', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              projectName: projectName,
              sectionName: section.toLowerCase(),
              code: aiData.code
            })
          });

          if (!saveResponse.ok) {
            throw new Error(`Failed to save ${section}`);
          }

          // Update progress
          completedSections++;
          const progress = (completedSections / selectedSections.length) * 100;
          setProgressPercentage(progress);
          
          // Add progress message
          sendBotMessage(`✅ Section **${section}** générée et sauvegardée !`);

        } catch (error) {
          console.error(`Error processing section ${section}:`, error);
          failedSections++;
          sendBotMessage(`⚠️ Erreur lors de la génération de la section **${section}**`);
          // Continue with other sections even if one fails
        }
      }

      // Final status message
      if (completedSections > 0) {
        sendBotMessage(`🎉 Génération terminée ! ${completedSections} sections créées${failedSections > 0 ? `, ${failedSections} échecs` : ''}`);
      } else {
        sendBotMessage("❌ Aucune section n'a pu être générée. Réessaie !");
      }

      // Ensure we complete the generation even if some sections failed
      if (completedSections > 0) {
        // Save project to database
        const project = {
          name: projectName,
          description: projectDescription,
          sections: selectedSections,
          logo: logoPreview,
          style: templateStyle,
          theme: selectedColorTheme,
          createdAt: new Date().toISOString()
        };

        saveToRecentProjects(project);

        // Create project in database
        try {
          const dbResponse = await fetch(`/api/users/${session?.user?.email}/projects`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: `${projectName}-${Date.now()}`,
              description: projectDescription,
              sections: selectedSections,
              status: 'published'
            })
          });
        } catch (error) {
          console.error('Error saving to database:', error);
        }

        setProjectReady(true);
        setCreatingFiles(false);
        setProgressPercentage(100);
        sendBotMessage("🎉 Ta landing page est prête ! Tu peux la prévisualiser et la télécharger.");
      } else {
        throw new Error('No sections were generated successfully');
      }

    } catch (error) {
      console.error('Error creating project:', error);
      setCreatingFiles(false);
      setProgressPercentage(0);
      sendBotMessage("❌ Erreur lors de la création du projet. Réessaie !");
      showNotification('Erreur lors de la création du projet', 'error');
    }
  };

  const downloadProject = async () => {
    try {
      showNotification('Préparation du téléchargement...', 'info');
      
      // Create a zip file of the project
      const response = await fetch('/api/download-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectName: projectName
        })
      });

      if (!response.ok) {
        throw new Error('Failed to prepare download');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${projectName}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      showNotification('Téléchargement terminé !', 'success');
    } catch (error) {
      console.error('Download error:', error);
      showNotification('Erreur lors du téléchargement', 'error');
    }
  };

  const resetProject = () => {
    setStep(0);
    setProjectName('');
    setProjectDescription('');
    setMessages([]);
    setCurrentBotMessage('');
    setFullBotText('');
    setLogo(null);
    setLogoPreview(null);
    setSelectedSections([]);
    setProjectReady(false);
    setCreatingFiles(false);
    setProgressPercentage(0);
    setFullscreen(false);
    setInput('');
    
    // Start fresh conversation
    setTimeout(() => {
      sendBotMessage("👋 Salut ! Je suis ton assistant IA pour créer des landing pages. Prêt à commencer ?");
    }, 100);
  };

  const loadProject = (project: any) => {
    setProjectName(project.name);
    setProjectDescription(project.description);
    setSelectedSections(project.sections);
    setLogoPreview(project.logo);
    setTemplateStyle(project.style);
    setSelectedColorTheme(project.theme);
    setProjectReady(true);
    setProgressPercentage(100);
    setProjectsModalOpen(false);
    sendBotMessage(`Projet "${project.name}" chargé avec succès !`);
  };

  const viewCode = () => {
    if (projectReady) {
      window.open(`/api/projects/${projectName}/code`, '_blank');
    } else {
      showNotification('Le projet n\'est pas encore prêt pour le code.', 'info');
    }
  };

  const deployProject = () => {
    if (projectReady) {
      window.open(`/api/projects/${projectName}/deploy`, '_blank');
    } else {
      showNotification('Le projet n\'est pas encore prêt pour le déploiement.', 'info');
    }
  };

  const copyHTML = async () => {
    if (projectReady) {
      try {
        const response = await fetch(`/api/projects/${projectName}/html`);
        if (!response.ok) {
          throw new Error('Failed to get HTML');
        }
        const html = await response.text();
        await navigator.clipboard.writeText(html);
        showNotification('HTML copié dans le presse-papiers !', 'success');
      } catch (error) {
        console.error('Copy HTML error:', error);
        showNotification('Erreur lors de la copie du HTML', 'error');
      }
    } else {
      showNotification('Le projet n\'est pas encore prêt pour la copie du HTML.', 'info');
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col w-screen h-screen overflow-hidden text-white">
        {/* Animated background blobs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div 
            className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ left: '20%', top: '10%' }}
          />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-bounce" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
        </div>
        
        {/* Advanced Navbar */}
        <AdvancedNavbar />
        
        {/* Main Content with top padding for fixed navbar */}
        <main className="flex-1 flex flex-col min-h-0 w-full h-full pt-16 relative z-10">
          <div className="flex-1 min-h-0 w-full h-full flex">
            {/* Left Sidebar - Chat Interface */}
            <div className="w-1/3 bg-white/10 backdrop-blur-2xl border-r border-white/10 flex flex-col h-full min-h-0 overflow-hidden">
              {/* Chat Area */}
              <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6 space-y-4">


                {/* Chat Messages */}
                {messages.map((msg, idx) => (
                  <div key={idx} className={`${msg.type === 'user' ? 'text-right' : 'text-left'} animate-in slide-in-from-bottom-2 duration-500`}>
                    <div 
                      className={`inline-block p-3 rounded-lg max-w-[85%] transition-all duration-300 hover:scale-105 ${
                        msg.type === 'user' 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                          : 'bg-gray-200/20 text-white shadow-md'
                      }`}
                    >
                      <div 
                        className="text-sm"
                        dangerouslySetInnerHTML={{ 
                          __html: msg.text
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\n/g, '<br />') 
                        }}
                      />
                    </div>
                  </div>
                ))}
                
                {currentBotMessage && (
                  <div className="text-left animate-in slide-in-from-bottom-2 duration-500">
                    <div className="inline-block p-3 rounded-lg max-w-[100%] bg-gray-200/20 text-white shadow-md">
                      <div 
                        className="text-sm"
                        dangerouslySetInnerHTML={{ 
                          __html: currentBotMessage
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\n/g, '<br />') 
                        }}
                      />
                      <div className="mt-1">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                      </div>
                    </div>
                  </div>
                )}


                
                <div ref={chatEndRef} />
              </div>
              
              {/* Input Section */}
              <div className="p-6 border-t border-white/10 bg-white/5">
                {step === 3 ? (
                  <div className="flex flex-col">
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer p-6 border-2 border-dashed rounded-lg flex flex-col items-center justify-center border-white/20 hover:border-white/30 bg-white/5 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      {logoPreview ? (
                        <div className="flex flex-col items-center">
                          <img src={logoPreview} alt="Logo Preview" className="h-16 object-contain mb-2" />
                          <p className="text-sm text-center">
                            {logo?.name}
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setLogo(null);
                                setLogoPreview(null);
                              }}
                              className="ml-2 text-red-400 hover:text-red-300"
                            >
                              <X size={16} />
                            </button>
                          </p>
                        </div>
                      ) : (
                        <>
                          <ImageIcon size={32} className="text-gray-400 mb-2" />
                          <p className="text-sm font-medium">Cliquez pour uploader votre logo</p>
                          <p className="text-xs mt-1 text-center">
                            Format recommandé : PNG ou SVG<br />avec fond transparent
                          </p>
                        </>
                      )}
                    </div>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    
                    <button
                      onClick={() => {
                        if (logo) {
                          explainSections();
                        } else {
                          fileInputRef.current?.click();
                        }
                      }}
                      className="mt-3 w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium text-sm transition-colors"
                    >
                      {logo ? 'Continuer' : 'Sélectionner un fichier'}
                    </button>
                  </div>
                ) : step === 4 ? (
                  <div className="flex flex-col gap-4">
                    <div className="text-center">
                      <h3 className="font-medium mb-4">Confirmer le logo</h3>
                      <div className="bg-white/10 rounded-lg p-4 mb-4">
                        <img src={logoPreview || ''} alt="Logo Preview" className="h-20 object-contain mx-auto mb-2" />
                        <p className="text-sm text-gray-300">{logo?.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                      >
                        Changer le logo
                      </button>
                      <button
                        onClick={() => explainSections()}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all"
                      >
                        Continuer avec ce logo
                      </button>
                    </div>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </div>
                ) : step === 5 ? (
                  <div className="flex flex-col gap-4">
                    <h3 className="font-medium">Sélectionne les sections pour ta landing page :</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {sectionsWithDescription.map((section, index) => (
                        <button
                          key={section.name}
                          onClick={() => toggleSection(section.name)}
                          className={`p-3 rounded-lg text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 ${
                            selectedSections.includes(section.name)
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:shadow-md'
                          }`}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <span className="transition-transform duration-200">{section.icon}</span>
                          <span>{section.name}</span>
                          {selectedSections.includes(section.name) && (
                            <Check size={16} className="ml-1 animate-in zoom-in duration-200" />
                          )}
                        </button>
                      ))}
                    </div>
                    
                    <div className="flex flex-col mt-2">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Sections sélectionnées: {selectedSections.length}</span>
                        <span className={selectedSections.length < 3 ? 'text-orange-500' : 'text-green-500'}>
                          {selectedSections.length < 3 ? 'Minimum recommandé: 3' : 'Sélection suffisante ✓'}
                        </span>
                      </div>
                      
                      <button
                        onClick={saveProject}
                        disabled={creatingFiles || selectedSections.length === 0}
                        className={`py-3 mt-2 rounded-lg text-white font-medium text-sm flex items-center justify-center gap-2
                          ${creatingFiles 
                            ? 'bg-gray-500 cursor-not-allowed' 
                            : selectedSections.length === 0
                              ? 'bg-gray-500 cursor-not-allowed'
                              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                          }`}
                      >
                        {creatingFiles ? (
                          <>
                            <Loader size={18} className="animate-spin" />
                            Génération en cours...
                          </>
                        ) : (
                          <>
                            <Zap size={18} />
                            Générer ma Landing Page
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : step === 6 ? (
                  <div className="flex flex-col items-center justify-center p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <h3 className="font-medium mb-2">Génération en cours...</h3>
                      <p className="text-sm text-gray-400">Création de ta landing page</p>
                    </div>
                  </div>
                ) : projectReady ? (
                  <div className="flex flex-col items-center justify-center p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <h3 className="font-medium mb-2 text-green-400">Projet terminé !</h3>
                      <p className="text-sm text-gray-400 mb-6">Ta landing page est prête</p>
                      
                      <div className="flex flex-col gap-3">
                        <button
                          onClick={resetProject}
                          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all hover:scale-105"
                        >
                          Créer un nouveau projet
                        </button>
                        
                        <button
                          onClick={downloadProject}
                          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all"
                        >
                          Télécharger le projet
                        </button>
                </div>
              </div>
                  </div>
                ) : (
                  <form onSubmit={handleSend} className="flex items-center gap-2">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      type="text"
                      placeholder={step === 0 ? "Commencez..." : step === 1 ? "Nom du projet..." : "Décris ton projet..."}
                      className="flex-1 px-4 py-3 rounded-full border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/10 text-white placeholder-gray-400 transition-all duration-300 hover:bg-white/20 focus:bg-white/20" 
                    />
                    <button
                      type="submit"
                      className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 ${
                        input.trim() 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 cursor-pointer hover:scale-110 shadow-lg' 
                          : 'bg-gray-700 cursor-not-allowed'
                      }`}
                      disabled={!input.trim()}
                    >
                      <svg className="w-5 h-5 text-white transform rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right: Main Content Area */}
            <div className="flex-1 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
              {projectReady ? (
                <div className="w-full h-full relative animate-in zoom-in duration-500">
                  <div className="w-full h-full bg-white rounded-lg shadow-2xl overflow-hidden">
                    <div className="bg-gray-100 p-4 border-b flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800">Aperçu - {projectName}</h3>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setFullscreen(true)} 
                          className="bg-blue-600 hover:bg-blue-500 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                          title="Aperçu plein écran"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => window.open(`/api/projects/${projectName}`, '_blank')}
                          className="bg-purple-600 hover:bg-purple-500 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                          title="Ouvrir dans un nouvel onglet"
                        >
                          <ExternalLink size={16} />
                        </button>
                        <button 
                          onClick={viewCode}
                          className="bg-gray-600 hover:bg-gray-500 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                          title="Voir le code"
                        >
                          <Code size={16} />
                        </button>
                        <button 
                          onClick={downloadProject}
                          className="bg-green-600 hover:bg-green-500 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                          title="Télécharger le projet"
                        >
                          <Download size={16} />
                        </button>
                        <button 
                          onClick={deployProject}
                          className="bg-orange-600 hover:bg-orange-500 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                          title="Déployer le projet"
                        >
                          <Zap size={16} />
                        </button>
                        <button 
                          onClick={copyHTML}
                          className="bg-indigo-600 hover:bg-indigo-500 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                          title="Copier le HTML"
                        >
                          <Copy size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Real AI-Generated Landing Page Preview */}
                    <div className="w-full h-full relative">
                      <iframe
                        src={`/api/projects/${projectName}`}
                        className="w-full h-full border-0"
                        title={`${projectName} Preview`}
                        onLoad={() => console.log('Project loaded successfully')}
                        onError={() => {
                          // Fallback if iframe fails
                          console.log('Iframe failed, showing fallback');
                        }}
                      />
                      
                      {/* Fallback if iframe doesn't load */}
                      <div className="absolute inset-0 bg-white flex items-center justify-center" style={{ display: 'none' }}>
                        <div className="text-center p-8">
                          <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-6xl shadow-2xl shadow-purple-500/25 mx-auto mb-6">
                            B
                          </div>
                          <h1 className="text-4xl font-bold text-gray-800 mb-4">{projectName}</h1>
                          <p className="text-lg text-gray-600 max-w-md mx-auto mb-6">{projectDescription}</p>
                          <div className="flex flex-wrap justify-center gap-2">
                            {selectedSections.map((section, index) => (
                              <span 
                                key={section} 
                                className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                              >
                                {section}
                              </span>
                            ))}
                          </div>
                          <div className="mt-6">
                            <button 
                              onClick={downloadProject}
                              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
                            >
                              Télécharger le projet
                    </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  {/* Large Buildora Icon */}
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-6xl shadow-2xl shadow-purple-500/25 mx-auto">
                    B
                  </div>
                  
                  {/* Buildora Text */}
                  <h1 className="text-4xl font-bold text-white">Buildora</h1>
                  
                  {/* Description */}
                  <p className="text-lg text-gray-300 max-w-md mx-auto">
                    Votre assistant IA pour créer rapidement et facilement des landing pages professionnelles.
                  </p>

                  {/* Progress Bar */}
                  {step > 0 && (
                    <div className="flex flex-col items-center w-full max-w-md mx-auto px-6 animate-in slide-in-from-bottom-4 duration-700">
                      <div className="w-full bg-gray-700 h-2 rounded-full shadow-inner">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-700 ease-out shadow-lg" 
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between w-full mt-3 text-xs text-gray-400">
                        <span className="font-medium">Projet : {projectName || "Non défini"}</span>
                        <span className="font-bold">{progressPercentage}% complété</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Fullscreen Preview Modal */}
        {fullscreen && (
          <div className="fixed inset-0 bg-black z-50 flex flex-col">
            <div className="flex justify-between items-center p-4 bg-gray-900">
              <div className="flex items-center gap-2">
                <Zap className="text-blue-500" size={20} />
                <span className="font-bold">Buildora - {projectName}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={downloadProject}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm flex items-center gap-1"
                >
                  <Download size={16} />
                  Télécharger
                </button>
                <button
                  onClick={() => setFullscreen(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm"
                >
                  Quitter
                </button>
              </div>
            </div>
            <div className="w-full h-full bg-white">
              <div className="p-8 text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-6xl shadow-2xl shadow-purple-500/25 mx-auto mb-6">
                  B
    </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{projectName}</h1>
                <p className="text-lg text-gray-600 max-w-md mx-auto mb-6">{projectDescription}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {selectedSections.map((section) => (
                    <span key={section} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {section}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}