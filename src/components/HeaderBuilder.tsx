 'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, Check, X, Layout, Image as ImageIcon, 
  Menu, Search, User, Palette, ChevronRight, Upload, Trash2,
  Type, Sparkles, Zap, Paintbrush
} from 'lucide-react';

interface HeaderConfig {
  logo: {
    type: 'text' | 'image';
    text: string;
    image: File | null;
    imagePreview: string | null;
  };
  navigation: {
    items: Array<{
      label: string;
      link: string;
      isActive: boolean;
    }>;
  };
  cta: {
    text: string;
    link: string;
    style: 'primary' | 'secondary' | 'outline';
  };
  searchBar: {
    enabled: boolean;
    placeholder: string;
  };
  userAccess: {
    enabled: boolean;
    showLogin: boolean;
    showSignup: boolean;
  };
  styling: {
    position: 'static' | 'sticky' | 'fixed';
    background: 'transparent' | 'solid' | 'glassmorphism';
    colorScheme: 'light' | 'dark' | 'auto';
    theme: 'purple' | 'blue' | 'green' | 'red' | 'orange' | 'pink' | 'indigo' | 'teal';
    customColors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
      logo: string;
      navigation: string;
      cta: string;
    };
    typography: {
      fontFamily: 'sans' | 'serif' | 'mono' | 'display';
      fontSize: 'small' | 'medium' | 'large';
      fontWeight: 'normal' | 'medium' | 'bold';
    };
    spacing: 'compact' | 'comfortable' | 'spacious';
    shadows: 'none' | 'subtle' | 'medium' | 'bold';
    borders: 'none' | 'subtle' | 'rounded' | 'pill';
    animations: 'none' | 'fade' | 'slide' | 'bounce';
  };
}

interface HeaderBuilderProps {
  projectName: string;
  onComplete: (config: HeaderConfig ) => void;
  onBack: () => void;
}

const HeaderBuilder: React.FC<HeaderBuilderProps> = ({ projectName, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<HeaderConfig>({
    logo: {
      type: 'text',
      text: projectName,
      image: null,
      imagePreview: null,
    },
    navigation: {
      items: [
        { label: 'Home', link: '#home', isActive: true },
        { label: 'About', link: '#about', isActive: false },
        { label: 'Services', link: '#services', isActive: false },
        { label: 'Contact', link: '#contact', isActive: false },
      ],
    },
    cta: {
      text: 'Get Started',
      link: '#cta',
      style: 'primary',
    },
    searchBar: {
      enabled: false,
      placeholder: 'Search...',
    },
    userAccess: {
      enabled: false,
      showLogin: true,
      showSignup: true,
    },
    styling: {
      position: 'sticky',
      background: 'glassmorphism',
      colorScheme: 'auto',
      theme: 'purple',
      customColors: {
        primary: '#8b5cf6',
        secondary: '#ec4899',
        accent: '#f59e0b',
        background: '#1e293b',
        text: '#f8fafc',
        logo: '#ffffff',
        navigation: '#e2e8f0',
        cta: '#8b5cf6',
      },
      typography: {
        fontFamily: 'sans',
        fontSize: 'medium',
        fontWeight: 'medium',
      },
      spacing: 'comfortable',
      shadows: 'subtle',
      borders: 'rounded',
      animations: 'fade',
    },
  }
  
);
/*
  // Function to generate a prompt string from the current config
  const generatePromptFromConfig = (config: HeaderConfig): string => {
    let prompt = `Create a website header with the following configuration:\n\n`;

    // Logo
    if (config.logo.type === 'text') {
      prompt += `Logo: Text logo with text "${config.logo.text}".\n`;
    } else if (config.logo.type === 'image') {
      prompt += `Logo: Image logo provided.\n`;
    }

    // Navigation
    prompt += `Navigation menu items:\n`;
    config.navigation.items.forEach((item, index) => {
      prompt += `  ${index + 1}. Label: "${item.label}", Link: "${item.link}", Active: ${item.isActive}\n`;
    });

    // Call to Action
    prompt += `Call to Action button: Text "${config.cta.text}", Link "${config.cta.link}", Style "${config.cta.style}".\n`;

    // Search Bar
    prompt += `Search Bar: ${config.searchBar.enabled ? 'Enabled' : 'Disabled'}`;
    if (config.searchBar.enabled) {
      prompt += ` with placeholder "${config.searchBar.placeholder}".\n`;
    } else {
      prompt += `.\n`;
    }

    // User Access
    prompt += `User Access: ${config.userAccess.enabled ? 'Enabled' : 'Disabled'}`;
    if (config.userAccess.enabled) {
      prompt += `, Show Login: ${config.userAccess.showLogin}, Show Signup: ${config.userAccess.showSignup}.\n`;
    } else {
      prompt += `.\n`;
    }

    // Styling
    prompt += `Styling:\n`;
    prompt += `  Position: ${config.styling.position}\n`;
    prompt += `  Background: ${config.styling.background}\n`;
    prompt += `  Color Scheme: ${config.styling.colorScheme}\n`;
    prompt += `  Theme: ${config.styling.theme}\n`;
    prompt += `  Custom Colors:\n`;
    Object.entries(config.styling.customColors).forEach(([key, value]) => {
      prompt += `    ${key}: ${value}\n`;
    });
    prompt += `  Typography:\n`;
    prompt += `    Font Family: ${config.styling.typography.fontFamily}\n`;
    prompt += `    Font Size: ${config.styling.typography.fontSize}\n`;
    prompt += `    Font Weight: ${config.styling.typography.fontWeight}\n`;
    prompt += `  Spacing: ${config.styling.spacing}\n`;
    prompt += `  Shadows: ${config.styling.shadows}\n`;
    prompt += `  Borders: ${config.styling.borders}\n`;
    prompt += `  Animations: ${config.styling.animations}\n`;
    console.log(prompt);
    return prompt;
  };
*/

  const steps = [
    { id: 1, title: 'Logo & Brand', icon: <Layout size={20} /> },
    { id: 2, title: 'Navigation Menu', icon: <Menu size={20} /> },
    { id: 3, title: 'Call to Action', icon: <ChevronRight size={20} /> },
    { id: 4, title: 'Search Bar', icon: <Search size={20} /> },
    { id: 5, title: 'User Access', icon: <User size={20} /> },
    { id: 6, title: 'Styling & Colors', icon: <Palette size={20} /> },
  ];

  const handleLogoTypeChange = (type: 'text' | 'image') => {
    setConfig(prev => ({
      ...prev,
      logo: { ...prev.logo, type }
    }));
  };

  const handleLogoTextChange = (text: string) => {
    setConfig(prev => ({
      ...prev,
      logo: { ...prev.logo, text }
    }));
  };

  const handleLogoImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setConfig(prev => ({
          ...prev,
          logo: {
            ...prev.logo,
            image: file,
            imagePreview: e.target?.result as string
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addNavigationItem = () => {
    setConfig(prev => ({
      ...prev,
      navigation: {
        ...prev.navigation,
        items: [...prev.navigation.items, { label: 'New Item', link: '#new', isActive: false }]
      }
    }));
  };

  const updateNavigationItem = (index: number, field: 'label' | 'link', value: string) => {
    setConfig(prev => ({
      ...prev,
      navigation: {
        ...prev.navigation,
        items: prev.navigation.items.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const removeNavigationItem = (index: number) => {
    setConfig(prev => ({
      ...prev,
      navigation: {
        ...prev.navigation,
        items: prev.navigation.items.filter((_, i) => i !== index)
      }
    }));
  };

  // Enhanced color palettes with detailed options
  const colorPalettes = {
    purple: {
      name: 'Royal Purple',
      description: 'Elegant and sophisticated',
      colors: ['#8b5cf6', '#ec4899', '#f59e0b', '#1e293b', '#f8fafc'],
      gradient: 'from-purple-500 to-pink-500',
    },
    blue: {
      name: 'Ocean Blue',
      description: 'Professional and trustworthy',
      colors: ['#3b82f6', '#06b6d4', '#10b981', '#0f172a', '#f1f5f9'],
      gradient: 'from-blue-500 to-cyan-500',
    },
    green: {
      name: 'Nature Green',
      description: 'Fresh and eco-friendly',
      colors: ['#10b981', '#059669', '#f59e0b', '#064e3b', '#ecfdf5'],
      gradient: 'from-green-500 to-emerald-500',
    },
    red: {
      name: 'Bold Red',
      description: 'Energetic and passionate',
      colors: ['#ef4444', '#f97316', '#eab308', '#450a0a', '#fef2f2'],
      gradient: 'from-red-500 to-pink-500',
    },
    orange: {
      name: 'Sunset Orange',
      description: 'Warm and inviting',
      colors: ['#f97316', '#ef4444', '#8b5cf6', '#451a03', '#fff7ed'],
      gradient: 'from-orange-500 to-red-500',
    },
    pink: {
      name: 'Rose Pink',
      description: 'Feminine and modern',
      colors: ['#ec4899', '#8b5cf6', '#06b6d4', '#4c0519', '#fdf2f8'],
      gradient: 'from-pink-500 to-rose-500',
    },
    indigo: {
      name: 'Deep Indigo',
      description: 'Creative and innovative',
      colors: ['#6366f1', '#8b5cf6', '#ec4899', '#1e1b4b', '#eef2ff'],
      gradient: 'from-indigo-500 to-purple-500',
    },
    teal: {
      name: 'Ocean Teal',
      description: 'Calm and balanced',
      colors: ['#14b8a6', '#06b6d4', '#8b5cf6', '#042f2e', '#f0fdfa'],
      gradient: 'from-teal-500 to-cyan-500',
    },
    slate: {
      name: 'Modern Slate',
      description: 'Minimal and clean',
      colors: ['#64748b', '#475569', '#f59e0b', '#0f172a', '#f8fafc'],
      gradient: 'from-slate-500 to-gray-500',
    },
    emerald: {
      name: 'Emerald Green',
      description: 'Luxury and growth',
      colors: ['#059669', '#10b981', '#f59e0b', '#064e3b', '#ecfdf5'],
      gradient: 'from-emerald-500 to-green-500',
    },
    amber: {
      name: 'Golden Amber',
      description: 'Premium and warm',
      colors: ['#d97706', '#f59e0b', '#ef4444', '#451a03', '#fffbeb'],
      gradient: 'from-amber-500 to-yellow-500',
    },
    rose: {
      name: 'Rose Gold',
      description: 'Elegant and romantic',
      colors: ['#e11d48', '#f43f5e', '#f59e0b', '#4c0519', '#fff1f2'],
      gradient: 'from-rose-500 to-pink-500',
    },
  };

  const getThemeColors = (theme: string) => {
    const palette = colorPalettes[theme as keyof typeof colorPalettes];
    if (!palette) return { primary: 'from-purple-500 to-pink-500', accent: 'purple', bg: 'bg-purple-500/20', border: 'border-purple-500' };
    
    return {
      primary: palette.gradient,
      accent: theme,
      bg: `bg-${theme}-500/20`,
      border: `border-${theme}-500`,
      palette: palette,
    };
  };

  // Color picker component
  const ColorPicker = ({ 
    label, 
    color, 
    onChange, 
    description 
  }: { 
    label: string; 
    color: string; 
    onChange: (color: string) => void; 
    description?: string;
  }) => {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-300">{label}</label>
            {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-lg border-2 border-gray-600 shadow-sm"
              style={{ backgroundColor: color }}
            />
            <input
              type="color"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border-2 border-gray-600"
            />
          </div>
        </div>
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
          placeholder="#000000"
        />
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Logo & Brand Identity</h3>
              <p className="text-gray-300">Choose how to represent your brand in the header</p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <button
                  onClick={() => handleLogoTypeChange('text')}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    config.logo.type === 'text'
                      ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                      : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <Layout size={24} className="mx-auto mb-2" />
                    <span className="font-medium">Text Logo</span>
                  </div>
                </button>
                <button
                  onClick={() => handleLogoTypeChange('image')}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    config.logo.type === 'image'
                      ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                      : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <ImageIcon size={24} className="mx-auto mb-2" />
                    <span className="font-medium">Image Logo</span>
                  </div>
                </button>
              </div>

              {config.logo.type === 'text' ? (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Logo Text</label>
                  <input
                    type="text"
                    value={config.logo.text}
                    onChange={(e) => handleLogoTextChange(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                    placeholder="Enter your brand name"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center bg-gray-800/30">
                    {config.logo.imagePreview ? (
                      <div className="space-y-2">
                        <img src={config.logo.imagePreview} alt="Logo preview" className="h-16 mx-auto object-contain" />
                        <p className="text-sm text-gray-400">{config.logo.image?.name}</p>
                        <button
                          onClick={() => setConfig(prev => ({ ...prev, logo: { ...prev.logo, image: null, imagePreview: null } }))}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          <Trash2 size={16} className="inline mr-1" />
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload size={32} className="mx-auto mb-2 text-gray-500" />
                        <p className="text-gray-300">Click to upload your logo</p>
                        <p className="text-sm text-gray-500">PNG, JPG, SVG up to 2MB</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoImageUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label htmlFor="logo-upload" className="cursor-pointer">
                      <div className="mt-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors">
                        Choose File
                      </div>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Navigation Menu</h3>
              <p className="text-gray-300">Add the main navigation links for your website</p>
            </div>

            <div className="space-y-4">
              {config.navigation.items.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => updateNavigationItem(index, 'label', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                    placeholder="Menu item label"
                  />
                  <input
                    type="text"
                    value={item.link}
                    onChange={(e) => updateNavigationItem(index, 'link', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                    placeholder="#link"
                  />
                  <button
                    onClick={() => removeNavigationItem(index)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              
              <button
                onClick={addNavigationItem}
                className="w-full py-3 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:border-gray-500 hover:text-gray-300 transition-colors bg-gray-800/30"
              >
                + Add Navigation Item
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Call to Action</h3>
              <p className="text-gray-300">Add a prominent button to drive user engagement</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Button Text</label>
                <input
                  type="text"
                  value={config.cta.text}
                  onChange={(e) => setConfig(prev => ({ ...prev, cta: { ...prev.cta, text: e.target.value } }))}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                  placeholder="Get Started"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Button Link</label>
                <input
                  type="text"
                  value={config.cta.link}
                  onChange={(e) => setConfig(prev => ({ ...prev, cta: { ...prev.cta, link: e.target.value } }))}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                  placeholder="#cta"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Button Style</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['primary', 'secondary', 'outline'] as const).map((style) => (
                    <button
                      key={style}
                      onClick={() => setConfig(prev => ({ ...prev, cta: { ...prev.cta, style } }))}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        config.cta.style === style
                          ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                          : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                      }`}
                    >
                      <span className="capitalize">{style}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Search Bar</h3>
              <p className="text-gray-300">Add a search functionality to help users find content</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <Search size={20} className="text-gray-400" />
                  <span className="font-medium text-white">Enable Search Bar</span>
                </div>
                <button
                  onClick={() => setConfig(prev => ({ 
                    ...prev, 
                    searchBar: { ...prev.searchBar, enabled: !prev.searchBar.enabled } 
                  }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.searchBar.enabled ? 'bg-purple-500' : 'bg-gray-600'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    config.searchBar.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {config.searchBar.enabled && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Search Placeholder</label>
                  <input
                    type="text"
                    value={config.searchBar.placeholder}
                    onChange={(e) => setConfig(prev => ({ 
                      ...prev, 
                      searchBar: { ...prev.searchBar, placeholder: e.target.value } 
                    }))}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                    placeholder="Search..."
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">User Access</h3>
              <p className="text-gray-300">Add login and signup options for user-based features</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <User size={20} className="text-gray-400" />
                  <span className="font-medium text-white">Enable User Access</span>
                </div>
                <button
                  onClick={() => setConfig(prev => ({ 
                    ...prev, 
                    userAccess: { ...prev.userAccess, enabled: !prev.userAccess.enabled } 
                  }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.userAccess.enabled ? 'bg-purple-500' : 'bg-gray-600'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    config.userAccess.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {config.userAccess.enabled && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={config.userAccess.showLogin}
                      onChange={(e) => setConfig(prev => ({ 
                        ...prev, 
                        userAccess: { ...prev.userAccess, showLogin: e.target.checked } 
                      }))}
                      className="rounded border-gray-600 text-purple-500 focus:ring-purple-500 bg-gray-800/50"
                    />
                    <span className="text-white">Show Login Button</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={config.userAccess.showSignup}
                      onChange={(e) => setConfig(prev => ({ 
                        ...prev, 
                        userAccess: { ...prev.userAccess, showSignup: e.target.checked } 
                      }))}
                      className="rounded border-gray-600 text-purple-500 focus:ring-purple-500 bg-gray-800/50"
                    />
                    <span className="text-white">Show Sign Up Button</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 6:
        const themeColors = getThemeColors(config.styling.theme);
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Styling & Visual Design</h3>
              <p className="text-gray-300">Customize every aspect of your header's appearance</p>
            </div>

                         {/* Enhanced Color Theme */}
             <div className="space-y-6">
               <div className="flex items-center gap-2 mb-6">
                 <Paintbrush size={24} className="text-purple-400" />
                 <h4 className="text-xl font-semibold text-white">Custom Color Design</h4>
               </div>
               
               {/* Theme Presets */}
               <div className="mb-8">
                 <label className="block text-sm font-medium text-gray-300 mb-4">Quick Theme Presets</label>
                 <div className="grid grid-cols-4 gap-3">
                   {Object.entries(colorPalettes).map(([key, palette]) => {
                     const colors = getThemeColors(key);
                     return (
                       <button
                         key={key}
                         className={`p-3 rounded-lg border-2 transition-all text-center ${
                           config.styling.theme === key
                             ? `${colors.border} ${colors.bg}`
                             : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                         }`}
                         onClick={() => setConfig(prev => ({ 
                           ...prev, 
                           styling: { ...prev.styling, theme: key as any } 
                         }))}
                       >
                         <div className={`w-full h-12 rounded-lg mb-2 bg-gradient-to-r ${palette.gradient}`} />
                         <span className="text-sm capitalize">{palette.name}</span>
                       </button>
                     );
                   })}
                 </div>
               </div>

               {/* Custom Color Pickers */}
               <div className="space-y-6">
                 <h5 className="text-lg font-medium text-white mb-4">Custom Color Selection</h5>
                 
                 <div className="grid grid-cols-2 gap-6">
                   <ColorPicker
                     label="Primary Color"
                     color={config.styling.customColors.primary}
                     onChange={(color) => setConfig(prev => ({
                       ...prev,
                       styling: {
                         ...prev.styling,
                         customColors: { ...prev.styling.customColors, primary: color }
                       }
                     }))}
                     description="Main brand color for buttons and highlights"
                   />
                   
                   <ColorPicker
                     label="Secondary Color"
                     color={config.styling.customColors.secondary}
                     onChange={(color) => setConfig(prev => ({
                       ...prev,
                       styling: {
                         ...prev.styling,
                         customColors: { ...prev.styling.customColors, secondary: color }
                       }
                     }))}
                     description="Supporting color for accents and hover states"
                   />
                   
                   <ColorPicker
                     label="Accent Color"
                     color={config.styling.customColors.accent}
                     onChange={(color) => setConfig(prev => ({
                       ...prev,
                       styling: {
                         ...prev.styling,
                         customColors: { ...prev.styling.customColors, accent: color }
                       }
                     }))}
                     description="Highlight color for special elements"
                   />
                   
                   <ColorPicker
                     label="Background Color"
                     color={config.styling.customColors.background}
                     onChange={(color) => setConfig(prev => ({
                       ...prev,
                       styling: {
                         ...prev.styling,
                         customColors: { ...prev.styling.customColors, background: color }
                       }
                     }))}
                     description="Main background color of the header"
                   />
                   
                   <ColorPicker
                     label="Text Color"
                     color={config.styling.customColors.text}
                     onChange={(color) => setConfig(prev => ({
                       ...prev,
                       styling: {
                         ...prev.styling,
                         customColors: { ...prev.styling.customColors, text: color }
                       }
                     }))}
                     description="Primary text color for content"
                   />
                   
                   <ColorPicker
                     label="Logo Color"
                     color={config.styling.customColors.logo}
                     onChange={(color) => setConfig(prev => ({
                       ...prev,
                       styling: {
                         ...prev.styling,
                         customColors: { ...prev.styling.customColors, logo: color }
                       }
                     }))}
                     description="Color for the logo/brand text"
                   />
                   
                   <ColorPicker
                     label="Navigation Color"
                     color={config.styling.customColors.navigation}
                     onChange={(color) => setConfig(prev => ({
                       ...prev,
                       styling: {
                         ...prev.styling,
                         customColors: { ...prev.styling.customColors, navigation: color }
                       }
                     }))}
                     description="Color for navigation menu items"
                   />
                   
                   <ColorPicker
                     label="CTA Button Color"
                     color={config.styling.customColors.cta}
                     onChange={(color) => setConfig(prev => ({
                       ...prev,
                       styling: {
                         ...prev.styling,
                         customColors: { ...prev.styling.customColors, cta: color }
                       }
                     }))}
                     description="Color for call-to-action buttons"
                   />
                 </div>
               </div>

               {/* Color Preview */}
               <div className="mt-8 p-4 rounded-lg bg-gray-800/50 border border-gray-600">
                 <h5 className="text-sm font-medium text-gray-300 mb-3">Color Preview</h5>
                 <div className="flex gap-2">
                   <div className="flex-1 h-8 rounded" style={{ backgroundColor: config.styling.customColors.primary }} />
                   <div className="flex-1 h-8 rounded" style={{ backgroundColor: config.styling.customColors.secondary }} />
                   <div className="flex-1 h-8 rounded" style={{ backgroundColor: config.styling.customColors.accent }} />
                   <div className="flex-1 h-8 rounded" style={{ backgroundColor: config.styling.customColors.background }} />
                   <div className="flex-1 h-8 rounded" style={{ backgroundColor: config.styling.customColors.text }} />
                 </div>
               </div>
             </div>

            {/* Layout & Position */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Layout size={20} className="text-purple-400" />
                <h4 className="text-lg font-medium text-white">Layout & Position</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Header Position</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['static', 'sticky', 'fixed'] as const).map((position) => (
                      <button
                        key={position}
                        onClick={() => setConfig(prev => ({ 
                          ...prev, 
                          styling: { ...prev.styling, position } 
                        }))}
                        className={`p-2 rounded-lg border-2 transition-all text-xs ${
                          config.styling.position === position
                            ? `${themeColors.border} ${themeColors.bg} text-${themeColors.accent}-300`
                            : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                        }`}
                      >
                        <span className="capitalize">{position}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Background Style</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['transparent', 'solid', 'glassmorphism'] as const).map((background) => (
                      <button
                        key={background}
                        onClick={() => setConfig(prev => ({ 
                          ...prev, 
                          styling: { ...prev.styling, background } 
                        }))}
                        className={`p-2 rounded-lg border-2 transition-all text-xs ${
                          config.styling.background === background
                            ? `${themeColors.border} ${themeColors.bg} text-${themeColors.accent}-300`
                            : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                        }`}
                      >
                        <span className="capitalize">{background}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

                         {/* Enhanced Typography */}
             <div className="space-y-4">
               <div className="flex items-center gap-2 mb-6">
                 <Type size={24} className="text-purple-400" />
                 <h4 className="text-xl font-semibold text-white">Advanced Typography</h4>
               </div>
               
               {/* Font Family with previews */}
               <div className="mb-6">
                 <label className="block text-sm font-medium text-gray-300 mb-3">Font Family</label>
                 <div className="grid grid-cols-2 gap-3">
                   {([
                     { key: 'sans', name: 'Inter', preview: 'Aa', class: 'font-sans' },
                     { key: 'serif', name: 'Merriweather', preview: 'Aa', class: 'font-serif' },
                     { key: 'mono', name: 'JetBrains Mono', preview: 'Aa', class: 'font-mono' },
                     { key: 'display', name: 'Playfair Display', preview: 'Aa', class: 'font-display' }
                   ] as const).map((font) => (
                     <button
                       key={font.key}
                       onClick={() => setConfig(prev => ({ 
                         ...prev, 
                         styling: { ...prev.styling, typography: { ...prev.styling.typography, fontFamily: font.key } } 
                       }))}
                       className={`p-4 rounded-lg border-2 transition-all text-left ${
                         config.styling.typography.fontFamily === font.key
                           ? `${themeColors.border} ${themeColors.bg} text-${themeColors.accent}-300`
                           : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                       }`}
                     >
                       <div className={`text-2xl mb-2 ${font.class}`}>{font.preview}</div>
                       <div className="font-medium">{font.name}</div>
                       <div className="text-sm opacity-75">Professional {font.key} font</div>
                     </button>
                   ))}
                 </div>
               </div>

               {/* Font Size and Weight */}
               <div className="grid grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-3">Font Size</label>
                   <div className="space-y-2">
                     {([
                       { key: 'small', name: 'Small', preview: 'T', class: 'text-sm' },
                       { key: 'medium', name: 'Medium', preview: 'T', class: 'text-base' },
                       { key: 'large', name: 'Large', preview: 'T', class: 'text-lg' }
                     ] as const).map((size) => (
                       <button
                         key={size.key}
                         onClick={() => setConfig(prev => ({ 
                           ...prev, 
                           styling: { ...prev.styling, typography: { ...prev.styling.typography, fontSize: size.key } } 
                         }))}
                         className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                           config.styling.typography.fontSize === size.key
                             ? `${themeColors.border} ${themeColors.bg} text-${themeColors.accent}-300`
                             : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                         }`}
                       >
                         <div className="flex items-center gap-3">
                           <span className={`${size.class} font-bold`}>{size.preview}</span>
                           <div>
                             <div className="font-medium">{size.name}</div>
                             <div className="text-sm opacity-75">Readable size</div>
                           </div>
                         </div>
                       </button>
                     ))}
                   </div>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-3">Font Weight</label>
                   <div className="space-y-2">
                     {([
                       { key: 'normal', name: 'Normal', preview: 'T', class: 'font-normal' },
                       { key: 'medium', name: 'Medium', preview: 'T', class: 'font-medium' },
                       { key: 'bold', name: 'Bold', preview: 'T', class: 'font-bold' }
                     ] as const).map((weight) => (
                       <button
                         key={weight.key}
                         onClick={() => setConfig(prev => ({ 
                           ...prev, 
                           styling: { ...prev.styling, typography: { ...prev.styling.typography, fontWeight: weight.key } } 
                         }))}
                         className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                           config.styling.typography.fontWeight === weight.key
                             ? `${themeColors.border} ${themeColors.bg} text-${themeColors.accent}-300`
                             : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                         }`}
                       >
                         <div className="flex items-center gap-3">
                           <span className={`text-lg ${weight.class}`}>{weight.preview}</span>
                           <div>
                             <div className="font-medium">{weight.name}</div>
                             <div className="text-sm opacity-75">Text emphasis</div>
                           </div>
                         </div>
                       </button>
                     ))}
                   </div>
                 </div>
               </div>
             </div>

                         {/* Enhanced Spacing & Effects */}
             <div className="space-y-4">
               <div className="flex items-center gap-2 mb-6">
                 <Sparkles size={24} className="text-purple-400" />
                 <h4 className="text-xl font-semibold text-white">Spacing & Visual Effects</h4>
               </div>
               <div className="grid grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-3">Spacing</label>
                   <div className="space-y-3">
                     {([
                       { key: 'compact', name: 'Compact', preview: 'Tight spacing', class: 'p-2' },
                       { key: 'comfortable', name: 'Comfortable', preview: 'Balanced spacing', class: 'p-4' },
                       { key: 'spacious', name: 'Spacious', preview: 'Generous spacing', class: 'p-6' }
                     ] as const).map((spacing) => (
                       <button
                         key={spacing.key}
                         onClick={() => setConfig(prev => ({ 
                           ...prev, 
                           styling: { ...prev.styling, spacing: spacing.key } 
                         }))}
                         className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                           config.styling.spacing === spacing.key
                             ? `${themeColors.border} ${themeColors.bg} text-${themeColors.accent}-300`
                             : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                         }`}
                       >
                         <div className="flex items-center gap-3">
                           <div className={`w-8 h-8 rounded bg-gray-700 ${spacing.class}`}></div>
                           <div>
                             <div className="font-medium">{spacing.name}</div>
                             <div className="text-sm opacity-75">{spacing.preview}</div>
                           </div>
                         </div>
                       </button>
                     ))}
                   </div>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-3">Shadow Effects</label>
                   <div className="space-y-3">
                     {([
                       { key: 'none', name: 'None', preview: 'Flat design', class: 'shadow-none' },
                       { key: 'subtle', name: 'Subtle', preview: 'Light shadow', class: 'shadow-sm' },
                       { key: 'medium', name: 'Medium', preview: 'Standard shadow', class: 'shadow-md' },
                       { key: 'bold', name: 'Bold', preview: 'Strong shadow', class: 'shadow-lg' }
                     ] as const).map((shadow) => (
                       <button
                         key={shadow.key}
                         onClick={() => setConfig(prev => ({ 
                           ...prev, 
                           styling: { ...prev.styling, shadows: shadow.key } 
                         }))}
                         className={`w-full p-3 rounded-lg border-2 transition-all text-left ${shadow.class} ${
                           config.styling.shadows === shadow.key
                             ? `${themeColors.border} ${themeColors.bg} text-${themeColors.accent}-300`
                             : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                         }`}
                       >
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded bg-gray-700"></div>
                           <div>
                             <div className="font-medium">{shadow.name}</div>
                             <div className="text-sm opacity-75">{shadow.preview}</div>
                           </div>
                         </div>
                       </button>
                     ))}
                   </div>
                 </div>
               </div>
             </div>

                         {/* Enhanced Borders & Animations */}
             <div className="space-y-4">
               <div className="flex items-center gap-2 mb-6">
                 <Zap size={24} className="text-purple-400" />
                 <h4 className="text-xl font-semibold text-white">Borders & Animations</h4>
               </div>
               <div className="grid grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-3">Border Radius</label>
                   <div className="space-y-3">
                     {([
                       { key: 'none', name: 'None', preview: 'Sharp corners', class: 'rounded-none' },
                       { key: 'subtle', name: 'Subtle', preview: 'Slight rounding', class: 'rounded-sm' },
                       { key: 'rounded', name: 'Rounded', preview: 'Standard corners', class: 'rounded-md' },
                       { key: 'pill', name: 'Pill', preview: 'Fully rounded', class: 'rounded-full' }
                     ] as const).map((border) => (
                       <button
                         key={border.key}
                         onClick={() => setConfig(prev => ({ 
                           ...prev, 
                           styling: { ...prev.styling, borders: border.key } 
                         }))}
                         className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                           config.styling.borders === border.key
                             ? `${themeColors.border} ${themeColors.bg} text-${themeColors.accent}-300`
                             : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                         }`}
                       >
                         <div className="flex items-center gap-3">
                           <div className={`w-8 h-8 bg-gray-700 ${border.class}`}></div>
                           <div>
                             <div className="font-medium">{border.name}</div>
                             <div className="text-sm opacity-75">{border.preview}</div>
                           </div>
                         </div>
                       </button>
                     ))}
                   </div>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-3">Animation Effects</label>
                   <div className="space-y-3">
                     {([
                       { key: 'none', name: 'None', preview: 'Static design', class: '' },
                       { key: 'fade', name: 'Fade', preview: 'Smooth transitions', class: 'transition-opacity' },
                       { key: 'slide', name: 'Slide', preview: 'Dynamic movement', class: 'transition-transform' },
                       { key: 'bounce', name: 'Bounce', preview: 'Playful effects', class: 'animate-bounce' }
                     ] as const).map((animation) => (
                       <button
                         key={animation.key}
                         onClick={() => setConfig(prev => ({ 
                           ...prev, 
                           styling: { ...prev.styling, animations: animation.key } 
                         }))}
                         className={`w-full p-3 rounded-lg border-2 transition-all text-left ${animation.class} ${
                           config.styling.animations === animation.key
                             ? `${themeColors.border} ${themeColors.bg} text-${themeColors.accent}-300`
                             : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                         }`}
                       >
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded bg-gray-700"></div>
                           <div>
                             <div className="font-medium">{animation.name}</div>
                             <div className="text-sm opacity-75">{animation.preview}</div>
                           </div>
                         </div>
                       </button>
                     ))}
                   </div>
                 </div>
               </div>
             </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        return config.logo.type === 'text' ? config.logo.text.trim() !== '' : config.logo.image !== null;
      case 2:
        return config.navigation.items.length > 0 && config.navigation.items.every(item => item.label.trim() !== '');
      case 3:
        return config.cta.text.trim() !== '';
      default:
        return true;
    }
  };

  const themeColors = getThemeColors(config.styling.theme);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${themeColors.primary} p-6 text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Layout size={24} />
              <div>
                                 <h2 className="text-xl font-bold">Advanced Header Builder</h2>
                 <p className="text-purple-100 text-sm">Step {currentStep} of 6 - Professional Design Tools</p>
              </div>
            </div>
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  currentStep >= step.id
                    ? `bg-${themeColors.accent}-500 border-${themeColors.accent}-500 text-white`
                    : 'border-gray-600 text-gray-400'
                }`}>
                  {currentStep > step.id ? <Check size={16} /> : step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    currentStep > step.id ? `bg-${themeColors.accent}-500` : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 bg-gray-800/30">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentStep === 1
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <ArrowLeft size={16} />
              Previous
            </button>

            <div className="flex gap-3">
              {currentStep === 6 ? (
                <button
                  onClick={() => onComplete(config)}
                  className={`flex items-center gap-2 px-6 py-2 bg-gradient-to-r ${themeColors.primary} text-white rounded-lg hover:opacity-90 transition-all`}
                >
                  <Check size={16} />
                  Complete Header
                </button>
              ) : (
                <button
                  onClick={() => setCurrentStep(prev => Math.min(6, prev + 1))}
                  disabled={!canGoNext()}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                    canGoNext()
                      ? `bg-gradient-to-r ${themeColors.primary} text-white hover:opacity-90`
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Next
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBuilder;
