'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, Check, X, Layout, Image as ImageIcon, 
  Menu, Search, User, Home, Info, Phone, Settings, Palette,
  ChevronDown, ChevronRight, Upload, Trash2, Eye, EyeOff,
  Type, Droplets, Sparkles, Zap, Paintbrush, Layers, Monitor, Smartphone
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
    background: 'transparent' | 'solid' | 'glassmorphism' | 'gradient';
    colorScheme: 'light' | 'dark' | 'auto';
    theme: 'purple' | 'blue' | 'green' | 'red' | 'orange' | 'pink' | 'indigo' | 'teal' | 'slate' | 'emerald' | 'amber' | 'rose';
    colorPalette: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
    typography: {
      fontFamily: 'sans' | 'serif' | 'mono' | 'display' | 'handwriting' | 'modern';
      fontSize: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
      fontWeight: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
      letterSpacing: 'tight' | 'normal' | 'wide';
    };
    spacing: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    shadows: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner';
    borders: 'none' | 'thin' | 'normal' | 'thick';
    borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
    animations: 'none' | 'fade' | 'slide' | 'bounce' | 'pulse' | 'scale';
    hoverEffects: 'none' | 'lift' | 'glow' | 'scale' | 'color';
    mobileMenu: 'hamburger' | 'slide' | 'overlay' | 'accordion';
  };
}

interface HeaderBuilderProps {
  projectName: string;
  onComplete: (config: HeaderConfig) => void;
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
      colorPalette: {
        primary: '#8b5cf6',
        secondary: '#ec4899',
        accent: '#f59e0b',
        background: '#1e293b',
        text: '#f8fafc',
      },
      typography: {
        fontFamily: 'sans',
        fontSize: 'base',
        fontWeight: 'medium',
        letterSpacing: 'normal',
      },
      spacing: 'md',
      shadows: 'md',
      borders: 'normal',
      borderRadius: 'lg',
      animations: 'fade',
      hoverEffects: 'lift',
      mobileMenu: 'hamburger',
    },
  });

  const steps = [
    { id: 1, title: 'Logo & Brand', icon: <Layout size={20} /> },
    { id: 2, title: 'Navigation Menu', icon: <Menu size={20} /> },
    { id: 3, title: 'Call to Action', icon: <ChevronRight size={20} /> },
    { id: 4, title: 'Search Bar', icon: <Search size={20} /> },
    { id: 5, title: 'User Access', icon: <User size={20} /> },
    { id: 6, title: 'Advanced Styling', icon: <Palette size={20} /> },
  ];

  // Enhanced color palettes with detailed options
  const colorPalettes = {
    purple: {
      name: 'Royal Purple',
      description: 'Elegant and sophisticated',
      colors: {
        primary: '#8b5cf6',
        secondary: '#ec4899',
        accent: '#f59e0b',
        background: '#1e293b',
        text: '#f8fafc',
      },
      gradient: 'from-purple-500 via-pink-500 to-orange-500',
    },
    blue: {
      name: 'Ocean Blue',
      description: 'Professional and trustworthy',
      colors: {
        primary: '#3b82f6',
        secondary: '#06b6d4',
        accent: '#10b981',
        background: '#0f172a',
        text: '#f1f5f9',
      },
      gradient: 'from-blue-500 via-cyan-500 to-emerald-500',
    },
    green: {
      name: 'Nature Green',
      description: 'Fresh and eco-friendly',
      colors: {
        primary: '#10b981',
        secondary: '#059669',
        accent: '#f59e0b',
        background: '#064e3b',
        text: '#ecfdf5',
      },
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
    },
    red: {
      name: 'Bold Red',
      description: 'Energetic and passionate',
      colors: {
        primary: '#ef4444',
        secondary: '#f97316',
        accent: '#eab308',
        background: '#450a0a',
        text: '#fef2f2',
      },
      gradient: 'from-red-500 via-orange-500 to-yellow-500',
    },
    orange: {
      name: 'Sunset Orange',
      description: 'Warm and inviting',
      colors: {
        primary: '#f97316',
        secondary: '#ef4444',
        accent: '#8b5cf6',
        background: '#451a03',
        text: '#fff7ed',
      },
      gradient: 'from-orange-500 via-red-500 to-pink-500',
    },
    pink: {
      name: 'Rose Pink',
      description: 'Feminine and modern',
      colors: {
        primary: '#ec4899',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
        background: '#4c0519',
        text: '#fdf2f8',
      },
      gradient: 'from-pink-500 via-purple-500 to-indigo-500',
    },
    indigo: {
      name: 'Deep Indigo',
      description: 'Creative and innovative',
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#ec4899',
        background: '#1e1b4b',
        text: '#eef2ff',
      },
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
    },
    teal: {
      name: 'Ocean Teal',
      description: 'Calm and balanced',
      colors: {
        primary: '#14b8a6',
        secondary: '#06b6d4',
        accent: '#8b5cf6',
        background: '#042f2e',
        text: '#f0fdfa',
      },
      gradient: 'from-teal-500 via-cyan-500 to-blue-500',
    },
    slate: {
      name: 'Modern Slate',
      description: 'Minimal and clean',
      colors: {
        primary: '#64748b',
        secondary: '#475569',
        accent: '#f59e0b',
        background: '#0f172a',
        text: '#f8fafc',
      },
      gradient: 'from-slate-500 via-gray-500 to-zinc-500',
    },
    emerald: {
      name: 'Emerald Green',
      description: 'Luxury and growth',
      colors: {
        primary: '#059669',
        secondary: '#10b981',
        accent: '#f59e0b',
        background: '#064e3b',
        text: '#ecfdf5',
      },
      gradient: 'from-emerald-500 via-green-500 to-lime-500',
    },
    amber: {
      name: 'Golden Amber',
      description: 'Premium and warm',
      colors: {
        primary: '#d97706',
        secondary: '#f59e0b',
        accent: '#ef4444',
        background: '#451a03',
        text: '#fffbeb',
      },
      gradient: 'from-amber-500 via-yellow-500 to-orange-500',
    },
    rose: {
      name: 'Rose Gold',
      description: 'Elegant and romantic',
      colors: {
        primary: '#e11d48',
        secondary: '#f43f5e',
        accent: '#f59e0b',
        background: '#4c0519',
        text: '#fff1f2',
      },
      gradient: 'from-rose-500 via-pink-500 to-red-500',
    },
  };

  const getThemeColors = (theme: string) => {
    const palette = colorPalettes[theme as keyof typeof colorPalettes];
    if (!palette) return colorPalettes.purple;
    
    return {
      primary: palette.gradient,
      accent: theme,
      bg: `bg-${theme}-500/20`,
      border: `border-${theme}-500`,
      colors: palette.colors,
    };
  };

  // Enhanced typography options
  const fontFamilies = {
    sans: { name: 'Inter', class: 'font-sans', preview: 'Aa' },
    serif: { name: 'Merriweather', class: 'font-serif', preview: 'Aa' },
    mono: { name: 'JetBrains Mono', class: 'font-mono', preview: 'Aa' },
    display: { name: 'Playfair Display', class: 'font-display', preview: 'Aa' },
    handwriting: { name: 'Caveat', class: 'font-handwriting', preview: 'Aa' },
    modern: { name: 'Poppins', class: 'font-modern', preview: 'Aa' },
  };

  const fontSizes = {
    xs: { name: 'Extra Small', class: 'text-xs', preview: 'T' },
    sm: { name: 'Small', class: 'text-sm', preview: 'T' },
    base: { name: 'Base', class: 'text-base', preview: 'T' },
    lg: { name: 'Large', class: 'text-lg', preview: 'T' },
    xl: { name: 'Extra Large', class: 'text-xl', preview: 'T' },
    '2xl': { name: '2XL', class: 'text-2xl', preview: 'T' },
  };

  const fontWeights = {
    light: { name: 'Light', class: 'font-light', preview: 'T' },
    normal: { name: 'Normal', class: 'font-normal', preview: 'T' },
    medium: { name: 'Medium', class: 'font-medium', preview: 'T' },
    semibold: { name: 'Semi Bold', class: 'font-semibold', preview: 'T' },
    bold: { name: 'Bold', class: 'font-bold', preview: 'T' },
    extrabold: { name: 'Extra Bold', class: 'font-extrabold', preview: 'T' },
  };

  // Enhanced spacing options
  const spacingOptions = {
    xs: { name: 'Extra Small', class: 'p-2', preview: 'Compact' },
    sm: { name: 'Small', class: 'p-3', preview: 'Tight' },
    md: { name: 'Medium', class: 'p-4', preview: 'Balanced' },
    lg: { name: 'Large', class: 'p-6', preview: 'Comfortable' },
    xl: { name: 'Extra Large', class: 'p-8', preview: 'Spacious' },
    '2xl': { name: '2XL', class: 'p-12', preview: 'Generous' },
  };

  // Enhanced shadow options
  const shadowOptions = {
    none: { name: 'None', class: 'shadow-none', preview: 'Flat' },
    sm: { name: 'Small', class: 'shadow-sm', preview: 'Subtle' },
    md: { name: 'Medium', class: 'shadow-md', preview: 'Standard' },
    lg: { name: 'Large', class: 'shadow-lg', preview: 'Prominent' },
    xl: { name: 'Extra Large', class: 'shadow-xl', preview: 'Bold' },
    '2xl': { name: '2XL', class: 'shadow-2xl', preview: 'Dramatic' },
    inner: { name: 'Inner', class: 'shadow-inner', preview: 'Inset' },
  };

  // Enhanced border options
  const borderOptions = {
    none: { name: 'None', class: 'border-0', preview: 'Clean' },
    thin: { name: 'Thin', class: 'border', preview: 'Minimal' },
    normal: { name: 'Normal', class: 'border-2', preview: 'Standard' },
    thick: { name: 'Thick', class: 'border-4', preview: 'Bold' },
  };

  const borderRadiusOptions = {
    none: { name: 'None', class: 'rounded-none', preview: 'Sharp' },
    sm: { name: 'Small', class: 'rounded-sm', preview: 'Slight' },
    md: { name: 'Medium', class: 'rounded-md', preview: 'Standard' },
    lg: { name: 'Large', class: 'rounded-lg', preview: 'Smooth' },
    xl: { name: 'Extra Large', class: 'rounded-xl', preview: 'Rounded' },
    full: { name: 'Full', class: 'rounded-full', preview: 'Pill' },
  };

  // Enhanced animation options
  const animationOptions = {
    none: { name: 'None', class: '', preview: 'Static' },
    fade: { name: 'Fade', class: 'animate-fade-in', preview: 'Smooth' },
    slide: { name: 'Slide', class: 'animate-slide-in', preview: 'Dynamic' },
    bounce: { name: 'Bounce', class: 'animate-bounce', preview: 'Playful' },
    pulse: { name: 'Pulse', class: 'animate-pulse', preview: 'Breathing' },
    scale: { name: 'Scale', class: 'animate-scale', preview: 'Growing' },
  };

  const hoverEffectOptions = {
    none: { name: 'None', class: '', preview: 'Static' },
    lift: { name: 'Lift', class: 'hover:transform hover:-translate-y-1', preview: 'Elevate' },
    glow: { name: 'Glow', class: 'hover:shadow-lg hover:shadow-purple-500/50', preview: 'Shine' },
    scale: { name: 'Scale', class: 'hover:transform hover:scale-105', preview: 'Grow' },
    color: { name: 'Color', class: 'hover:bg-purple-600', preview: 'Change' },
  };

  const mobileMenuOptions = {
    hamburger: { name: 'Hamburger', icon: <Menu size={16} />, preview: 'Classic dropdown' },
    slide: { name: 'Slide', icon: <ChevronRight size={16} />, preview: 'Side panel' },
    overlay: { name: 'Overlay', icon: <Layers size={16} />, preview: 'Full screen' },
    accordion: { name: 'Accordion', icon: <ChevronDown size={16} />, preview: 'Expandable' },
  };

  // ... rest of the component logic would continue here
  // This is a partial implementation to show the enhanced structure

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
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

        {/* Enhanced Progress Steps */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                  currentStep >= step.id
                    ? 'bg-purple-500 border-purple-500 text-white shadow-lg'
                    : 'border-gray-600 text-gray-400'
                }`}>
                  {currentStep > step.id ? <Check size={18} /> : step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-20 h-1 mx-3 rounded-full transition-all ${
                    currentStep > step.id ? 'bg-purple-500' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Content Area */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Advanced Styling & Design</h3>
            <p className="text-gray-300">Professional-grade customization with detailed color palettes and design options</p>
          </div>

          {/* Enhanced Color Palette Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Paintbrush size={24} className="text-purple-400" />
              <h4 className="text-xl font-semibold text-white">Professional Color Palettes</h4>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {Object.entries(colorPalettes).map(([key, palette]) => (
                <div
                  key={key}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    config.styling.theme === key
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                  }`}
                  onClick={() => setConfig(prev => ({
                    ...prev,
                    styling: { ...prev.styling, theme: key as any }
                  }))}
                >
                  <div className={`w-full h-16 rounded-lg mb-3 bg-gradient-to-r ${palette.gradient}`} />
                  <h5 className="font-semibold text-white mb-1">{palette.name}</h5>
                  <p className="text-sm text-gray-400 mb-3">{palette.description}</p>
                  
                  {/* Color swatches */}
                  <div className="flex gap-2">
                    {Object.entries(palette.colors).map(([colorKey, colorValue]) => (
                      <div
                        key={colorKey}
                        className="w-6 h-6 rounded-full border border-gray-600"
                        style={{ backgroundColor: colorValue }}
                        title={`${colorKey}: ${colorValue}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Typography Section */}
          <div className="space-y-6 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <Type size={24} className="text-purple-400" />
              <h4 className="text-xl font-semibold text-white">Advanced Typography</h4>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Font Family */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Font Family</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(fontFamilies).map(([key, font]) => (
                    <button
                      key={key}
                      onClick={() => setConfig(prev => ({
                        ...prev,
                        styling: {
                          ...prev.styling,
                          typography: { ...prev.styling.typography, fontFamily: key as any }
                        }
                      }))}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        config.styling.typography.fontFamily === key
                          ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                          : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                      }`}
                    >
                      <div className={`text-lg mb-1 ${font.class}`}>{font.preview}</div>
                      <div className="text-sm font-medium">{font.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Font Size</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(fontSizes).map(([key, size]) => (
                    <button
                      key={key}
                      onClick={() => setConfig(prev => ({
                        ...prev,
                        styling: {
                          ...prev.styling,
                          typography: { ...prev.styling.typography, fontSize: key as any }
                        }
                      }))}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        config.styling.typography.fontSize === key
                          ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                          : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                      }`}
                    >
                      <div className={`${size.class} mb-1`}>{size.preview}</div>
                      <div className="text-sm font-medium">{size.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Effects Section */}
          <div className="space-y-6 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles size={24} className="text-purple-400" />
              <h4 className="text-xl font-semibold text-white">Visual Effects & Interactions</h4>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Shadows */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Shadow Effects</label>
                <div className="space-y-2">
                  {Object.entries(shadowOptions).map(([key, shadow]) => (
                    <button
                      key={key}
                      onClick={() => setConfig(prev => ({
                        ...prev,
                        styling: { ...prev.styling, shadows: key as any }
                      }))}
                      className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                        config.styling.shadows === key
                          ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                          : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                      } ${shadow.class}`}
                    >
                      <div className="font-medium">{shadow.name}</div>
                      <div className="text-sm opacity-75">{shadow.preview}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hover Effects */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Hover Effects</label>
                <div className="space-y-2">
                  {Object.entries(hoverEffectOptions).map(([key, effect]) => (
                    <button
                      key={key}
                      onClick={() => setConfig(prev => ({
                        ...prev,
                        styling: { ...prev.styling, hoverEffects: key as any }
                      }))}
                      className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                        config.styling.hoverEffects === key
                          ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                          : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                      } ${effect.class}`}
                    >
                      <div className="font-medium">{effect.name}</div>
                      <div className="text-sm opacity-75">{effect.preview}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Options */}
          <div className="space-y-6 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <Smartphone size={24} className="text-purple-400" />
              <h4 className="text-xl font-semibold text-white">Mobile Menu Style</h4>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(mobileMenuOptions).map(([key, menu]) => (
                <button
                  key={key}
                  onClick={() => setConfig(prev => ({
                    ...prev,
                    styling: { ...prev.styling, mobileMenu: key as any }
                  }))}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    config.styling.mobileMenu === key
                      ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                      : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {menu.icon}
                    <span className="font-medium">{menu.name}</span>
                  </div>
                  <div className="text-sm opacity-75">{menu.preview}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
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
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-semibold"
                >
                  <Check size={18} />
                  Complete Header Design
                </button>
              ) : (
                <button
                  onClick={() => setCurrentStep(prev => Math.min(6, prev + 1))}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
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
