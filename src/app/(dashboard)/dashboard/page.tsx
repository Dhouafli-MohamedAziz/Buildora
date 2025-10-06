'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import AuthGuard from '@/components/AuthGuard';
import AdvancedNavbar from '@/components/UserNavbar';
import ProgressiveWebsiteBuilder from '@/components/ProgressiveWebsiteBuilder';
import HeaderBuilder from '@/components/HeaderBuilder';
import HeroBuilder from '@/components/HeroBuilder';
import GalleryBuilder from '@/components/GalleryBuilder';
import PricingBuilder from '@/components/PricingBuilder';
import ServicesBuilder from '@/components/ServicesBuilder';
import ContactBuilder from '@/components/ContactBuilder';
import CTABuilder from '@/components/CTABuilder';
import FooterBuilder from '@/components/FooterBuilder';
import { 
  Menu, ChevronDown, Settings, LogOut, Download, Share2, User, Moon, Sun, X, 
  Check, ChevronRight, Palette, Loader, Zap, Eye, Code, Layout, Image as ImageIcon, Save, ExternalLink, Copy, RefreshCw
} from 'lucide-react';

// Sections with descriptions
const sectionsWithDescription = [
  { name: "Header", desc: "Top bar with your logo and navigation menu.", icon: <Layout size={20} /> },
  { name: "Hero", desc: "Large hero section with a powerful headline and an image.", icon: <Zap size={20} /> },
  { name: "Services", desc: "List of services you offer.", icon: <Menu size={20} /> },
  { name: "Features", desc: "Key features highlighted with icons.", icon: <Palette size={20} /> },
  { name: "Testimonials", desc: "Customer reviews and testimonials to build trust.", icon: <User size={20} /> },
  { name: "FAQ", desc: "Frequently Asked Questions (FAQ) to anticipate visitor needs.", icon: <ChevronDown size={20} /> },
  { name: "Gallery", desc: "Image gallery to showcase your projects or products.", icon: <ImageIcon size={20} /> },
  { name: "Pricing", desc: "Pricing and subscription plans for your services.", icon: <Download size={20} /> },
  { name: "Contact", desc: "Contact form or information to get in touch.", icon: <Share2 size={20} /> },
  { name: "CTA", desc: "Strong call-to-action to convert visitors.", icon: <ChevronRight size={20} /> },
  { name: "Footer", desc: "Footer with links, social media, and copyright.", icon: <Layout size={20} /> }
];

export default function Dashboard() {

  ////DEFINING VARIABLES //////
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
      
    // Iterative feedback state
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [sectionCodes, setSectionCodes] = useState<{ [key: string]: string }>({});
    const [sectionFeedback, setSectionFeedback] = useState<{ [key: string]: string[] }>({});
    const [isGeneratingSection, setIsGeneratingSection] = useState(false);
    const [showSectionPreview, setShowSectionPreview] = useState(false);
    const [currentSectionCode, setCurrentSectionCode] = useState('');
    const [completedSections, setCompletedSections] = useState<string[]>([]);
    
    // Generation state
    const [currentGeneratingSection, setCurrentGeneratingSection] = useState<string | null>(null);
    const [sectionApprovalStatus, setSectionApprovalStatus] = useState<Record<string, 'pending' | 'approved' | 'rejected'>>({});
    
    // HeaderBuilder state
    const [showHeaderBuilder, setShowHeaderBuilder] = useState(false);
    const [headerConfig, setHeaderConfig] = useState<any>(null);

    // State for HeroBuilder
    const [showHeroBuilder, setShowHeroBuilder] = useState(false);
    const [heroConfig, setHeroConfig] = useState<any>(null);
  
    // FeaturesBuilder state
    const [showFeaturesBuilder, setShowFeaturesBuilder] = useState(false);
    const [featuresConfig, setFeaturesConfig] = useState<any>(null);

    // PricingBuilder state
    const [showPricingBuilder, setShowPricingBuilder] = useState(false);
    const [pricingConfig, setPricingConfig] = useState<any>(null);
    
    // ServicesBuilder state
    const [showServicesBuilder, setShowServicesBuilder] = useState(false);
    const [servicesConfig, setServicesConfig] = useState<any>(null);
    
    // TestimonialsBuilder state
    const [showTestimonialsBuilder, setShowTestimonialsBuilder] = useState(false);
    const [testimonialsConfig, setTestimonialsConfig] = useState<any>(null);
    
    // FAQBuilder state
    const [showFAQBuilder, setShowFAQBuilder] = useState(false);
    const [faqConfig, setFaqConfig] = useState<any>(null);
    
    // GalleryBuilder state
    const [showGalleryBuilder, setShowGalleryBuilder] = useState(false);
    const [galleryConfig, setGalleryConfig] = useState<any>(null);
    
    // ContactBuilder state
    const [showContactBuilder, setShowContactBuilder] = useState(false);
    const [contactConfig, setContactConfig] = useState<any>(null);
    
    // CTABuilder state
    const [showCTABuilder, setShowCTABuilder] = useState(false);
    const [ctaConfig, setCtaConfig] = useState<any>(null);
    
    // FooterBuilder state
    const [showFooterBuilder, setShowFooterBuilder] = useState(false);
    const [footerConfig, setFooterConfig] = useState<any>(null);
  
    const [progressPercentage, setProgressPercentage] = useState(0);
  
    const [recentProjects, setRecentProjects] = useState<any[]>([]);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);



  // Bot Message 
  const sendBotMessage = (text: string) => {
    setIsTyping(true);
    setFullBotText(text);
  };

  // Initial welcome message
  useEffect(() => {
    setTimeout(() => {
      sendBotMessage("Hello! I’m Buildora 🤖, your AI assistant for quickly creating a landing page. Say “Hi” to get started!");
    }, 500);
  }, []);

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
      }, 20); // Adjust speed here

      return () => clearInterval(interval);
    }
  }, [isTyping, fullBotText]);


  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentBotMessage]);  
  
  // Handle user input
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userInput = input.trim();
    setInput('');
    setMessages(prev => [...prev, { type: 'user', text: userInput }]);
    await processInput(userInput);
  };

  // HeaderBuilder functions
  const handleHeaderBuilderComplete = (config: any) => {
    setHeaderConfig(config);
    setShowHeaderBuilder(false);
  };

  const handleHeaderBuilderBack = () => {
    setShowHeaderBuilder(false);
  };

  // HeroBuilder functions
  const handleHeroBuilderComplete = (config: any) => {
    setHeroConfig(config);
    setShowHeroBuilder(false);
  };

  const handleHeroBuilderBack = () => {
    setShowHeroBuilder(false);
  };

  // PricingBuilder functions
  const handlePricingBuilderComplete = (config: any) => {
    console.log('=== PRICING BUILDER COMPLETE ===');
    console.log('Config received:', config);
    setPricingConfig(config);
    setShowPricingBuilder(false);
  };

  const handlePricingBuilderBack = () => {
    setShowPricingBuilder(false);
  };
  
  // ServicesBuilder functions
  const handleServicesBuilderComplete = (config: any) => {
    setServicesConfig(config);
    setShowServicesBuilder(false);
    console.log('Services config completed:', config);
  };
  
  const handleServicesBuilderBack = () => {
    setShowServicesBuilder(false);
  };
  
  // TestimonialsBuilder functions
  const handleTestimonialsBuilderComplete = (config: any) => {
    setTestimonialsConfig(config);
    setShowTestimonialsBuilder(false);
    console.log('Testimonials config completed:', config);
  };
  
  const handleTestimonialsBuilderBack = () => {
    setShowTestimonialsBuilder(false);
  };
  
  // FAQBuilder functions
  const handleFAQBuilderComplete = (config: any) => {
    setFaqConfig(config);
    setShowFAQBuilder(false);
    console.log('FAQ config completed:', config);
  };
  
  const handleFAQBuilderBack = () => {
    setShowFAQBuilder(false);
  };
  
  // GalleryBuilder functions
  const handleGalleryBuilderComplete = (config: any) => {
    setGalleryConfig(config);
    setShowGalleryBuilder(false);
    console.log('Gallery config completed:', config);
  };
  
  const handleGalleryBuilderBack = () => {
    setShowGalleryBuilder(false);
  };
  
  // ContactBuilder functions
  const handleContactBuilderComplete = (config: any) => {
    setContactConfig(config);
    setShowContactBuilder(false);
    console.log('Contact config completed:', config);
  };
  
  const handleContactBuilderBack = () => {
    setShowContactBuilder(false);
  };
  
  // CTABuilder functions
  const handleCTABuilderComplete = (config: any) => {
    setCtaConfig(config);
    setShowCTABuilder(false);
    console.log('CTA config completed:', config);
  };
  
  const handleCTABuilderBack = () => {
    setShowCTABuilder(false);
  };
  
  // FooterBuilder functions
  const handleFooterBuilderComplete = (config: any) => {
    setFooterConfig(config);
    setShowFooterBuilder(false);
    console.log('Footer config completed:', config);
  };
  
  const handleFooterBuilderBack = () => {
    setShowFooterBuilder(false);
  };

  // Load recent projects from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('buildora-recentProjects');
      if (saved) {
        setRecentProjects(JSON.parse(saved));
      }
    }
  }, []);

  // Auto-generate next section when current one is approved
  useEffect(() => {
    if (creatingFiles && !isGeneratingSection && !showSectionPreview && currentSectionIndex < selectedSections.length) {
      // Small delay to ensure state updates are complete
      const timer = setTimeout(() => {
        generateCurrentSection();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [creatingFiles, isGeneratingSection, showSectionPreview, currentSectionIndex, selectedSections.length]);



  // Handle section generation when index changes
  useEffect(() => {
    console.log('🔄 useEffect triggered:', { 
      creatingFiles, 
      isGeneratingSection, 
      showSectionPreview, 
      currentSectionIndex, 
      selectedSectionsLength: selectedSections.length,
      projectReady
    });
    
    // Don't trigger if project is already ready or if we've completed all sections
    if (projectReady || currentSectionIndex >= selectedSections.length) {
      console.log('🛑 useEffect: Project ready or all sections completed, stopping generation');
      console.log('🔄 Setting creatingFiles to FALSE in useEffect');
      setCreatingFiles(false);
      setIsGeneratingSection(false);
      setCurrentGeneratingSection(null);
      return;
    }
    
    if (creatingFiles && !isGeneratingSection && showSectionPreview === false && currentSectionIndex < selectedSections.length) {
      console.log('🚀 useEffect will trigger generation');
      // Small delay to ensure state is properly updated
      const timer = setTimeout(() => {
        generateCurrentSection();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [currentSectionIndex, creatingFiles, isGeneratingSection, showSectionPreview, projectReady]);



  const saveToRecentProjects = (project: any) => {
    const updated = [project, ...recentProjects.filter(p => p.name !== project.name)].slice(0, 10);
    setRecentProjects(updated);
    localStorage.setItem('buildora-recentProjects', JSON.stringify(updated));
  };

  

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    console.log(`${type.toUpperCase()}: ${message}`);
  };



  const processInput = async (userInput: string) => {
    if (step === 0) {
      // Welcome step - user responds, then ask for project name
      sendBotMessage("First of all, what is the name of your project? (a single word without spaces that will serve as an identifier)");
      setStep(1);
    }
    else if (step === 1) {
      // Project name step
      if (userInput.includes(' ')) {
        sendBotMessage("⚠️ Thank you for using a single word without spaces for the project name!");
      } else {
        setProjectName(userInput);
        sendBotMessage("Perfect! Now, can you describe your project in a few sentences? The more detailed your description is, the better the result will be!");
        setStep(2);
      }
    } 
    else if (step === 2) {
      // Project description step
      let Description = userInput;
      setProjectDescription(Description);
      sendBotMessage("Great! Now, select the sections for your landing page:");
      setStep(3);    }
  };

  const toggleSection = (section: string) => {
    setSelectedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const startIterativeGeneration = async () => {
    if (selectedSections.length === 0) {
      showNotification('Sélectionne au moins une section', 'error');
      return;
    }

    setCreatingFiles(true);
    setStep(4); // Generation step
    
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

      // Initialize generation
      setCurrentSectionIndex(0);
      
      // Initialize section approval status
      const initialStatus: Record<string, 'pending' | 'approved' | 'rejected'> = {};
      selectedSections.forEach(section => {
        initialStatus[section] = 'pending';
      });
      setSectionApprovalStatus(initialStatus);
      
      // Start with first section
      await generateCurrentSection();
      
    } catch (error) {
      console.error('Error creating project:', error);
      setCreatingFiles(false);
      setProgressPercentage(0);
      sendBotMessage("❌ Erreur lors de la création du projet. Réessaie !");
      showNotification('Erreur lors de la création du projet', 'error');
    }
  };

  const generateCurrentSection = async () => {
    console.log('🔍 generateCurrentSection called:', { 
      currentSectionIndex, 
      selectedSectionsLength: selectedSections.length,
      isGeneratingSection,
      showSectionPreview,
      creatingFiles,
      projectReady
    });
    
    if (currentSectionIndex >= selectedSections.length) {
      // All sections completed
      await finalizeProject();
      return;
    }

    // Prevent multiple simultaneous generations
    if (isGeneratingSection || showSectionPreview) {
      console.log('Generation blocked:', { isGeneratingSection, showSectionPreview });
      return;
    }

    const currentSection = selectedSections[currentSectionIndex];
    console.log('Starting generation for section:', currentSection);
    
    // Reset preview state for next generation
    console.log('🔄 Setting generation states to TRUE:', { currentSection });
    setShowSectionPreview(false);
    
    setIsGeneratingSection(true);
    setCurrentGeneratingSection(currentSection);
    
    try {
      sendBotMessage(`🎨 Génération de la section **${currentSection}**...`);
      
      // Generate AI content for the current section
            console.log('=== GENERATING SECTION ===');
      console.log('Section:', currentSection);
      console.log('Is Features?', currentSection === 'Features');
      console.log('Features config:', featuresConfig);
      console.log('Features config type:', typeof featuresConfig);
      if (featuresConfig) {
        console.log('Features config keys:', Object.keys(featuresConfig));
        console.log('Features config design:', featuresConfig.design);
        console.log('Features config features:', featuresConfig.features);
      }
      
              console.log('=== SENDING AI REQUEST ===');
        const requestBody = {
          sectionName: currentSection,
          projectDescription: projectDescription,
          projectName: projectName,
          headerConfig: currentSection === 'Header' ? headerConfig : undefined,
          heroConfig: currentSection === 'Hero' ? heroConfig : undefined,
          featuresConfig: currentSection === 'Features' ? featuresConfig : undefined,
          pricingConfig: currentSection === 'Pricing' ? pricingConfig : undefined,
          galleryConfig: currentSection === 'Gallery' ? galleryConfig : undefined,
          contactConfig: currentSection === 'Contact' ? contactConfig : undefined,
          ctaConfig: currentSection === 'CTA' ? ctaConfig : undefined,
          footerConfig: currentSection === 'Footer' ? footerConfig : undefined
        };
        console.log('Request body:', requestBody);
        
        let aiResponse;
        try {
          console.log('=== SENDING AI REQUEST ===');
          aiResponse = await fetch('/api/ai-generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
          });
          
          console.log('=== AI RESPONSE RECEIVED ===');
          console.log('Response status:', aiResponse.status);
          console.log('Response ok:', aiResponse.ok);
          
          if (!aiResponse.ok) {
            const errorText = await aiResponse.text();
            console.error('AI Response error:', errorText);
            throw new Error(`AI generation failed: ${aiResponse.status} ${errorText}`);
          }
        } catch (error) {
          console.error('=== AI REQUEST ERROR ===');
          console.error('Error:', error);
          throw error;
        }

      const aiData = await aiResponse.json();
      
      if (!aiData.success) {
        throw new Error(`AI generation failed for ${currentSection}`);
      }

      // Store the generated code
      setSectionCodes(prev => ({
        ...prev,
        [currentSection]: aiData.code
      }));
      
      setCurrentSectionCode(aiData.code);
      setShowSectionPreview(true);
      setIsGeneratingSection(false);
      setCurrentGeneratingSection(null);
      

      
      sendBotMessage(`✅ Section **${currentSection}** générée ! Regardez l'aperçu dans la page interactive et approuvez ou rejetez cette section.`);
      
    } catch (error) {
      console.error(`Error generating section ${currentSection}:`, error);
      setIsGeneratingSection(false);
      sendBotMessage(`⚠️ Erreur lors de la génération de la section **${currentSection}**. Passage à la suivante...`);
      // Move to next section
      setCurrentSectionIndex(prev => prev + 1);
      setTimeout(() => generateCurrentSection(), 1000);
    }
  };

  const regenerateCurrentSection = async (feedback: string) => {
    // Prevent multiple regenerations
    if (isGeneratingSection) {
      return;
    }
    
    const currentSection = selectedSections[currentSectionIndex];
    setIsGeneratingSection(true);
    setCurrentGeneratingSection(currentSection);
    
    try {
      // Store feedback
      setSectionFeedback(prev => ({
        ...prev,
        [currentSection]: [...(prev[currentSection] || []), feedback]
      }));
      
      // Update approval status to rejected
      setSectionApprovalStatus(prev => ({
        ...prev,
        [currentSection]: 'rejected'
      }));
      
      sendBotMessage(`🔄 Régénération de la section **${currentSection}** avec votre feedback...`);
      
      // Regenerate with feedback
      const aiResponse = await fetch('/api/ai-regenerate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sectionName: currentSection,
          projectDescription: projectDescription,
          feedback: feedback,
          previousCode: sectionCodes[currentSection]
        })
      });

      if (!aiResponse.ok) {
        throw new Error(`Failed to regenerate AI content for ${currentSection}`);
      }

      const aiData = await aiResponse.json();
      
      if (!aiData.success) {
        throw new Error(`AI regeneration failed for ${currentSection}`);
      }

      // Update the generated code
      setSectionCodes(prev => ({
        ...prev,
        [currentSection]: aiData.code
      }));
      
      setCurrentSectionCode(aiData.code);
      setIsGeneratingSection(false);
      setCurrentGeneratingSection(null);
      
      sendBotMessage(`✅ Section **${currentSection}** régénérée ! Regardez la nouvelle version.`);
      
    } catch (error) {
      console.error(`Error regenerating section ${currentSection}:`, error);
      setIsGeneratingSection(false);
      setCurrentGeneratingSection(null);
      sendBotMessage(`⚠️ Erreur lors de la régénération de la section **${currentSection}**.`);
    }
  };

  const approveCurrentSection = async () => {
    console.log('approveCurrentSection called for index:', currentSectionIndex);
    
    // Prevent multiple approvals
    if (isGeneratingSection) {
      console.log('Approval blocked - currently generating');
      return;
    }
    
    const currentSection = selectedSections[currentSectionIndex];
    console.log('Approving section:', currentSection);
    
    try {
      // Save the approved section
      const saveResponse = await fetch('/api/save-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectName: projectName,
          sectionName: currentSection.toLowerCase(),
          code: sectionCodes[currentSection]
        })
      });

      if (!saveResponse.ok) {
        throw new Error(`Failed to save ${currentSection}`);
      }

      // Update progress - only advance when section is approved
      const newCompletedSections = [...completedSections, currentSection];
      setCompletedSections(newCompletedSections);
      const progress = (newCompletedSections.length / selectedSections.length) * 100;
      setProgressPercentage(progress);
      
      // Update approval status
      setSectionApprovalStatus(prev => ({
        ...prev,
        [currentSection]: 'approved'
      }));
      
      sendBotMessage(`✅ Section **${currentSection}** approuvée et sauvegardée !`);
      
      // Move to next section
      const nextIndex = currentSectionIndex + 1;
      setCurrentSectionIndex(nextIndex);
      setShowSectionPreview(false);
      setIsGeneratingSection(false); // Reset generation state
      setCurrentGeneratingSection(null);
      
      // Let useEffect handle the next section generation
      if (nextIndex >= selectedSections.length) {
        // All sections completed
        await finalizeProject();
      }
      
    } catch (error) {
      console.error(`Error saving section ${currentSection}:`, error);
      sendBotMessage(`⚠️ Erreur lors de la sauvegarde de la section **${currentSection}**.`);
    }
  };

  const rejectCurrentSection = async () => {
    const currentSection = selectedSections[currentSectionIndex];
    
    // Update approval status to rejected
    setSectionApprovalStatus(prev => ({
      ...prev,
      [currentSection]: 'rejected'
    }));
    
    // Clear the current section code and preview
    setCurrentSectionCode('');
    setShowSectionPreview(false);
    

    
    // Regenerate the section
    await generateCurrentSection();
  };

  const finalizeProject = async () => {
    try {
      // Save project to database
      const project = {
        name: projectName,
        description: projectDescription,
        sections: selectedSections,
        logo: logoPreview,
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

      console.log('🎉 FINALIZE PROJECT - Setting all states to completion');
      setProjectReady(true);
      console.log('🔄 Setting creatingFiles to FALSE in finalizeProject');
      setCreatingFiles(false);
      setProgressPercentage(100);
      setIsGeneratingSection(false);
      setCurrentGeneratingSection(null);
      setShowSectionPreview(false);

      sendBotMessage("🎉 Toutes les sections sont terminées ! Ta landing page est prête !");
      
    } catch (error) {
      console.error('Error finalizing project:', error);
      setCreatingFiles(false);
      sendBotMessage("❌ Erreur lors de la finalisation du projet.");
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
    
    // Reset generation state
    setCurrentGeneratingSection(null);
    setSectionApprovalStatus({});
    setSectionCodes({});
    setCurrentSectionCode('');
    setShowSectionPreview(false);
    setIsGeneratingSection(false);
    setCurrentSectionIndex(0);
    setCompletedSections([]);
    
    // Reset iterative feedback state
    setCurrentSectionIndex(0);
    setSectionCodes({});
    setSectionFeedback({});
    setIsGeneratingSection(false);
    setShowSectionPreview(false);
    setCurrentSectionCode('');
    setCompletedSections([]);
    
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
    setProjectReady(true);
    setProgressPercentage(100);
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
            <div className="w-1/3 backdrop-blur-2xl border-r border-white/10 flex flex-col h-full min-h-0 overflow-hidden">
              {/* Chat Area */}
              <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6 space-y-4">


                {/* Chat Messages */}
                {messages.map((msg, idx) => (
                  <div key={idx} className={`${msg.type === 'user' ? 'text-right' : 'text-left'} animate-in slide-in-from-bottom-2 duration-500`}>
                    <div 
                      className={`inline-block p-3 rounded-lg max-w-[85%] transition-all duration-300 hover:scale-105 ${
                        msg.type === 'user' 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                          : 'bg-gray-200/20 text-white'
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
                  <div className="flex flex-col gap-4">
                    <h3 className="font-medium">Select the sections for your landing page:</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {sectionsWithDescription.map((section, index) => (
                        <div key={section.name} className="relative">
                          <button
                            onClick={() => toggleSection(section.name)}
                            className={`p-3 rounded-lg text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 w-full ${
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
                          
                          {/* Special HeaderBuilder button for Header section */}
                          {section.name === "Header" && (
                            <div className="absolute -top-1 -right-1">
                              {selectedSections.includes(section.name) ? (
                                <button
                                  onClick={() => setShowHeaderBuilder(true)}
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:scale-110 shadow-lg ${
                                    headerConfig 
                                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                                  }`}
                                  title={headerConfig ? "Header configuré - Modifier" : "Configurer le header"}
                                >
                                  {headerConfig ? <Check size={12} /> : <Settings size={12} />}
                                </button>
                              ) : (
                                <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-xs text-white">
                                  ?
                                </div>
                              )}
                            </div>
                          )}

                          {/* Special HeroBuilder button for Hero section */}
                          {section.name === "Hero" && (
                            <div className="absolute -top-1 -right-1">
                              {selectedSections.includes(section.name) ? (
                                <button
                                  onClick={() => setShowHeroBuilder(true)}
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:scale-110 shadow-lg ${
                                    heroConfig 
                                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                                  }`}
                                  title={heroConfig ? "Hero configuré - Modifier" : "Configurer le hero"}
                                >
                                  {heroConfig ? <Check size={12} /> : <Settings size={12} />}
                                </button>
                              ) : (
                                <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-xs text-white">
                                  ?
                                </div>
                              )}
                            </div>
                          )}

                                          {/* Special FeaturesBuilder button for Features section */}
                {section.name === "Features" && (
                  <div className="absolute -top-1 -right-1">
                    {selectedSections.includes(section.name) ? (
                      <button
                        onClick={() => {
                          console.log('=== FEATURES BUTTON CLICKED ===');
                          console.log('showFeaturesBuilder will be set to true');
                          setShowFeaturesBuilder(true);
                          console.log('showFeaturesBuilder set to true');
                        }}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:scale-110 shadow-lg ${
                          featuresConfig
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                        title={featuresConfig ? "Features configurées - Modifier" : "Configurer les features"}
                      >
                        {featuresConfig ? <Check size={12} /> : <Settings size={12} />}
                      </button>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-xs text-white">
                        ?
                      </div>
                    )}
                  </div>
                )}

                {/* Special PricingBuilder button for Pricing section */}
                {section.name === "Pricing" && (
                  <div className="absolute -top-1 -right-1">
                    {selectedSections.includes(section.name) ? (
                      <button
                        onClick={() => {
                          console.log('=== PRICING BUTTON CLICKED ===');
                          console.log('showPricingBuilder will be set to true');
                          setShowPricingBuilder(true);
                          console.log('showPricingBuilder set to true');
                        }}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:scale-110 shadow-lg ${
                          pricingConfig
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                        title={pricingConfig ? "Pricing configuré - Modifier" : "Configurer le pricing"}
                      >
                        {pricingConfig ? <Check size={12} /> : <Settings size={12} />}
                      </button>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-xs text-white">
                        ?
                      </div>
                    )}
                  </div>
                )}

                {/* Special ServicesBuilder button for Services section */}
                {section.name === "Services" && (
                  <div className="absolute -top-1 -right-1">
                    {selectedSections.includes(section.name) ? (
                      <button
                        onClick={() => setShowServicesBuilder(true)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:scale-110 shadow-lg ${
                          servicesConfig
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                        title={servicesConfig ? "Services configurés - Modifier" : "Configurer les services"}
                      >
                        {servicesConfig ? <Check size={12} /> : <Settings size={12} />}
                      </button>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-xs text-white">
                        ?
                      </div>
                    )}
                  </div>
                )}

                {/* Special TestimonialsBuilder button for Testimonials section */}
                {section.name === "Testimonials" && (
                  <div className="absolute -top-1 -right-1">
                    {selectedSections.includes(section.name) ? (
                      <button
                        onClick={() => setShowTestimonialsBuilder(true)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:scale-110 shadow-lg ${
                          testimonialsConfig
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                        title={testimonialsConfig ? "Témoignages configurés - Modifier" : "Configurer les témoignages"}
                      >
                        {testimonialsConfig ? <Check size={12} /> : <Settings size={12} />}
                      </button>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-xs text-white">
                        ?
                      </div>
                    )}
                  </div>
                )}

                {/* Special FAQBuilder button for FAQ section */}
                {section.name === "FAQ" && (
                  <div className="absolute -top-1 -right-1">
                    {selectedSections.includes(section.name) ? (
                      <button
                        onClick={() => setShowFAQBuilder(true)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:scale-110 shadow-lg ${
                          faqConfig
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                        title={faqConfig ? "FAQ configurée - Modifier" : "Configurer la FAQ"}
                      >
                        {faqConfig ? <Check size={12} /> : <Settings size={12} />}
                      </button>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-xs text-white">
                        ?
                      </div>
                    )}
                  </div>
                )}

                {/* Special GalleryBuilder button for Gallery section */}
                {section.name === "Gallery" && (
                  <div className="absolute -top-1 -right-1">
                    {selectedSections.includes(section.name) ? (
                      <button
                        onClick={() => setShowGalleryBuilder(true)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:scale-110 shadow-lg ${
                          galleryConfig
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                        title={galleryConfig ? "Galerie configurée - Modifier" : "Configurer la galerie"}
                      >
                        {galleryConfig ? <Check size={12} /> : <Settings size={12} />}
                      </button>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-xs text-white">
                        ?
                      </div>
                    )}
                  </div>
                )}

                {/* Special ContactBuilder button for Contact section */}
                {section.name === "Contact" && (
                  <div className="absolute -top-1 -right-1">
                    {selectedSections.includes(section.name) ? (
                      <button
                        onClick={() => setShowContactBuilder(true)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:scale-110 shadow-lg ${
                          contactConfig
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                        title={contactConfig ? "Contact configuré - Modifier" : "Configurer le contact"}
                      >
                        {contactConfig ? <Check size={12} /> : <Settings size={12} />}
                      </button>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-xs text-white">
                        ?
                      </div>
                    )}
                  </div>
                )}

                {/* Special CTABuilder button for CTA section */}
                {section.name === "CTA" && (
                  <div className="absolute -top-1 -right-1">
                    {selectedSections.includes(section.name) ? (
                      <button
                        onClick={() => setShowCTABuilder(true)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:scale-110 shadow-lg ${
                          ctaConfig
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                        title={ctaConfig ? "CTA configuré - Modifier" : "Configurer le CTA"}
                      >
                        {ctaConfig ? <Check size={12} /> : <Settings size={12} />}
                      </button>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-xs text-white">
                        ?
                      </div>
                    )}
                  </div>
                )}

                {/* Special FooterBuilder button for Footer section */}
                {section.name === "Footer" && (
                  <div className="absolute -top-1 -right-1">
                    {selectedSections.includes(section.name) ? (
                      <button
                        onClick={() => setShowFooterBuilder(true)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:scale-110 shadow-lg ${
                          footerConfig
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                        title={footerConfig ? "Footer configuré - Modifier" : "Configurer le footer"}
                      >
                        {footerConfig ? <Check size={12} /> : <Settings size={12} />}
                      </button>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-xs text-white">
                        ?
                      </div>
                    )}
                  </div>
                )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-col mt-2">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Sections sélectionnées: {selectedSections.length}</span>
                                        <span className={selectedSections.length < 1 ? 'text-orange-500' : 'text-green-500'}>
                  {selectedSections.length < 1 ? 'Minimum recommandé: 1' : 'Sélection suffisante ✓'}
                        </span>
                      </div>
                      
                      <button
                        onClick={startIterativeGeneration}
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
                ) : step === 4 ? (
                  showSectionPreview && selectedSections[currentSectionIndex] && sectionCodes[selectedSections[currentSectionIndex]] ? (
                    <div className="flex flex-col gap-4">
                      <div className="text-center">
                        <h3 className="font-medium mb-2 text-white">Section {selectedSections[currentSectionIndex]}</h3>
                        <p className="text-sm text-gray-400">Approuvez ou modifiez cette section</p>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={approveCurrentSection}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          <Check className="w-4 h-4" />
                          <span>Approuver</span>
                        </button>
                        <button
                          onClick={rejectCurrentSection}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          <X className="w-4 h-4" />
                          <span>Rejeter</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        <textarea
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Décrivez les modifications souhaitées..."
                          className="w-full p-3 border border-white/10 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition-all duration-200 bg-white/10 text-white placeholder-gray-400"
                          rows={3}
                        />
                        <button
                          onClick={() => {
                            if (input.trim()) {
                              regenerateCurrentSection(input);
                              setInput('');
                            }
                          }}
                          disabled={!input.trim()}
                          className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span>Régénérer avec feedback</span>
                        </button>
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
                    <div className="flex flex-col items-center justify-center p-6">
                      <div className="text-center">
                        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <h3 className="font-medium mb-2">Génération en cours...</h3>
                        <p className="text-sm text-gray-400">Création de ta landing page</p>
                      </div>
                    </div>
                  )
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
                      placeholder={
                        step === 0 
                          ? "Commencez..." 
                          : step === 1 
                            ? "Nom du projet..." 
                            : "Décris ton projet..."
                      }
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
              {showSectionPreview ? (
                <div className="w-full h-full overflow-y-auto">
                  <ProgressiveWebsiteBuilder
                    selectedSections={selectedSections}
                    sectionCodes={sectionCodes}
                    currentSectionIndex={currentSectionIndex}
                    isGeneratingSection={isGeneratingSection}
                    currentGeneratingSection={currentGeneratingSection}
                    onApprove={approveCurrentSection}
                    onReject={rejectCurrentSection}
                    onRegenerate={regenerateCurrentSection}
                  />
                </div>
              ) : isGeneratingSection && currentGeneratingSection ? (
                <div className="w-full h-full bg-white overflow-y-auto">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-purple-400 border-t-purple-600 rounded-full animate-spin mx-auto mb-6"></div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Génération en cours...</h3>
                      <p className="text-lg text-gray-600 mb-2">Section {currentGeneratingSection}</p>
                      <p className="text-sm text-gray-500">Veuillez patienter pendant que l'IA génère votre contenu</p>
                    </div>
                  </div>
                </div>
              ) : projectReady ? (
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
              ) : creatingFiles ? (
                <div className="w-full h-full bg-white overflow-y-auto">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-purple-400 border-t-purple-600 rounded-full animate-spin mx-auto mb-6"></div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Préparation...</h3>
                      <p className="text-lg text-gray-600 mb-2">Initialisation de la génération</p>
                      <p className="text-sm text-gray-500">Préparation de votre projet</p>
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

        {/* HeaderBuilder Modal */}
        {showHeaderBuilder && (
          <HeaderBuilder
            projectName={projectName}
            onComplete={handleHeaderBuilderComplete}
            onBack={handleHeaderBuilderBack}
          />
        )}

        {/* HeroBuilder Modal */}
        {showHeroBuilder && (
          <HeroBuilder
            projectName={projectName}
            onComplete={handleHeroBuilderComplete}
            onBack={handleHeroBuilderBack}
          />
        )}

        {/* PricingBuilder Modal */}
        {showPricingBuilder && (
          <PricingBuilder
            projectName={projectName}
            onComplete={handlePricingBuilderComplete}
            onBack={handlePricingBuilderBack}
          />
        )}

        {/* ServicesBuilder Modal */}
        {showServicesBuilder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[90vh]">
              <ServicesBuilder
                projectName={projectName}
                onComplete={handleServicesBuilderComplete}
                onBack={handleServicesBuilderBack}
              />
            </div>
          </div>
        )}

        {/* GalleryBuilder Modal */}
        {showGalleryBuilder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[90vh]">
              <GalleryBuilder
                projectName={projectName}
                onComplete={handleGalleryBuilderComplete}
                onBack={handleGalleryBuilderBack}
              />
            </div>
          </div>
        )}

        {/* ContactBuilder Modal */}
        {showContactBuilder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[90vh]">
              <ContactBuilder
                projectName={projectName}
                onComplete={handleContactBuilderComplete}
                onBack={handleContactBuilderBack}
              />
            </div>
          </div>
        )}

        {/* CTABuilder Modal */}
        {showCTABuilder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[90vh]">
              <CTABuilder
                projectName={projectName}
                onComplete={handleCTABuilderComplete}
                onBack={handleCTABuilderBack}
              />
            </div>
          </div>
        )}

        {/* FooterBuilder Modal */}
        {showFooterBuilder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[90vh]">
              <FooterBuilder
                projectName={projectName}
                onComplete={handleFooterBuilderComplete}
                onBack={handleFooterBuilderBack}
              />
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}