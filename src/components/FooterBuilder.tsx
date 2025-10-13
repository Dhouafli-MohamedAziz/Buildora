'use client';

import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight, Settings, Check, Upload, Layout, Mail, Phone, MapPin, Globe, Heart } from 'lucide-react';

interface FooterConfig {
  companyInfo: {
    enabled: boolean;
    name: string;
    description: string;
    logo: string;
  };
  quickLinks: {
    enabled: boolean;
    title: string;
    links: Array<{
      text: string;
      url: string;
    }>;
  };
  contactInfo: {
    enabled: boolean;
    title: string;
    items: {
      address: { enabled: boolean; text: string };
      phone: { enabled: boolean; text: string };
      email: { enabled: boolean; text: string };
      website: { enabled: boolean; text: string };
    };
  };
  socialMedia: {
    enabled: boolean;
    title: string;
    platforms: {
      facebook: { enabled: boolean; url: string };
      twitter: { enabled: boolean; url: string };
      instagram: { enabled: boolean; url: string };
      linkedin: { enabled: boolean; url: string };
      youtube: { enabled: boolean; url: string };
    };
  };
  newsletter: {
    enabled: boolean;
    title: string;
    description: string;
    placeholder: string;
    buttonText: string;
  };
  bottomBar: {
    enabled: boolean;
    copyright: string;
    links: Array<{
      text: string;
      url: string;
    }>;
  };
  styling: {
    customColors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
      title: string;
      link: string;
    };
    typography: {
      fontFamily: string;
      titleSize: string;
      textSize: string;
      fontWeight: string;
    };
    spacing: {
      padding: string;
      margin: string;
      gap: string;
    };
    effects: {
      shadows: boolean;
      borders: boolean;
      animations: boolean;
    };
  };
}

interface FooterBuilderProps {
  projectName: string;
  onComplete: (config: FooterConfig) => void;
  onBack: () => void;
}

const FooterBuilder: React.FC<FooterBuilderProps> = ({ projectName, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const [config, setConfig] = useState<FooterConfig>({
    companyInfo: {
      enabled: true,
      name: 'Your Company Name',
      description: 'We help businesses grow and succeed with innovative solutions.',
      logo: ''
    },
    quickLinks: {
      enabled: true,
      title: 'Quick Links',
      links: [
        { text: 'Home', url: '#' },
        { text: 'About', url: '#' },
        { text: 'Services', url: '#' },
        { text: 'Contact', url: '#' }
      ]
    },
    contactInfo: {
      enabled: true,
      title: 'Contact Info',
      items: {
        address: { enabled: true, text: '123 Business Street, City, Country' },
        phone: { enabled: true, text: '+1 (555) 123-4567' },
        email: { enabled: true, text: 'info@yourcompany.com' },
        website: { enabled: true, text: 'www.yourcompany.com' }
      }
    },
    socialMedia: {
      enabled: true,
      title: 'Follow Us',
      platforms: {
        facebook: { enabled: false, url: '' },
        twitter: { enabled: false, url: '' },
        instagram: { enabled: false, url: '' },
        linkedin: { enabled: false, url: '' },
        youtube: { enabled: false, url: '' }
      }
    },
    newsletter: {
      enabled: false,
      title: 'Newsletter',
      description: 'Subscribe to our newsletter for updates and insights.',
      placeholder: 'Enter your email',
      buttonText: 'Subscribe'
    },
    bottomBar: {
      enabled: true,
      copyright: '© 2024 Your Company Name. All rights reserved.',
      links: [
        { text: 'Privacy Policy', url: '#' },
        { text: 'Terms of Service', url: '#' }
      ]
    },
    styling: {
      customColors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#f59e0b',
        background: '#1f2937',
        text: '#f9fafb',
        title: '#ffffff',
        link: '#d1d5db'
      },
      typography: {
        fontFamily: 'Inter',
        titleSize: 'text-lg',
        textSize: 'text-sm',
        fontWeight: 'font-medium'
      },
      spacing: {
        padding: 'p-8',
        margin: 'm-4',
        gap: 'gap-6'
      },
      effects: {
        shadows: true,
        borders: true,
        animations: true
      }
    }
  });

  const steps = [
    'Company Information',
    'Quick Links',
    'Contact Information',
    'Social Media',
    'Newsletter',
    'Bottom Bar',
    'Styling & Colors'
  ];

  const updateConfig = (path: string, value: any) => {
    setConfig(prev => {
      const newConfig = { ...prev };
      const keys = path.split('.');
      let current: any = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newConfig;
    });
  };

  const ColorPicker = ({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) => (
    <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
      <span className="text-white/90 text-sm font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <div 
          className="w-8 h-8 rounded border-2 border-white/20 cursor-pointer"
          style={{ backgroundColor: value }}
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'color';
            input.value = value;
            input.onchange = (e) => onChange((e.target as HTMLInputElement).value);
            input.click();
          }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-20 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
          placeholder="#000000"
        />
      </div>
    </div>
  );

  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        return config.companyInfo.enabled ? 
          config.companyInfo.name.trim() !== '' && config.companyInfo.description.trim() !== '' : true;
      case 2:
        return config.quickLinks.enabled ? 
          config.quickLinks.title.trim() !== '' && config.quickLinks.links.length > 0 : true;
      case 3:
        return config.contactInfo.enabled ? 
          config.contactInfo.title.trim() !== '' && 
          Object.values(config.contactInfo.items).some(item => item.enabled && item.text.trim() !== '') : true;
      case 4:
        return config.socialMedia.enabled ? 
          config.socialMedia.title.trim() !== '' && 
          Object.values(config.socialMedia.platforms).some(platform => platform.enabled && platform.url.trim() !== '') : true;
      case 5:
        return config.newsletter.enabled ? 
          config.newsletter.title.trim() !== '' && config.newsletter.description.trim() !== '' : true;
      case 6:
        return config.bottomBar.enabled ? 
          config.bottomBar.copyright.trim() !== '' : true;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="companyInfoEnabled"
                checked={config.companyInfo.enabled}
                onChange={(e) => updateConfig('companyInfo.enabled', e.target.checked)}
                className="w-4 h-4 text-indigo-600 bg-white/10 border-white/20 rounded focus:ring-indigo-500"
              />
              <label htmlFor="companyInfoEnabled" className="text-white font-medium">
                Enable Company Information
              </label>
            </div>
            
            {config.companyInfo.enabled && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-white/90 text-sm font-medium">Company Name</label>
                  <input
                    type="text"
                    value={config.companyInfo.name}
                    onChange={(e) => updateConfig('companyInfo.name', e.target.value)}
                    placeholder="Your Company Name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-white/90 text-sm font-medium">Company Description</label>
                  <textarea
                    value={config.companyInfo.description}
                    onChange={(e) => updateConfig('companyInfo.description', e.target.value)}
                    placeholder="Brief description of your company..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-white/90 text-sm font-medium">Logo URL (Optional)</label>
                  <input
                    type="url"
                    value={config.companyInfo.logo}
                    onChange={(e) => updateConfig('companyInfo.logo', e.target.value)}
                    placeholder="https://example.com/logo.png"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}
          </div>
        );

      default:
        return <div className="text-white">Step not found</div>;
    }
  };
  const themeColors = {
        primary: 'from-purple-500 to-pink-500',
        accent: 'purple',
        bg: 'bg-purple-500/20',
        border : 'border-purple-500',
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className={`bg-gradient-to-r ${themeColors.primary} p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Layout size={24} />
                  <div>
                                     <h2 className="text-xl font-bold">Advanced Footer Builder</h2>
                     <p className="text-purple-100 text-sm">Step {currentStep} of 7 - Professional Design Tools</p>
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

        {/* Progress */}
        <div className="px-6 py-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60 text-sm">Step {currentStep} of {steps.length}</span>
            <span className="text-white/60 text-sm">{Math.round((currentStep / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h3 className="text-white font-semibold text-xl mb-2">{steps[currentStep - 1]}</h3>
            <p className="text-white/60 text-sm">
              {currentStep === 1 && "Set up your company information and branding"}
              {currentStep === 2 && "Add quick navigation links for your visitors"}
              {currentStep === 3 && "Include your business contact information"}
              {currentStep === 4 && "Link your social media profiles"}
              {currentStep === 5 && "Add a newsletter signup form"}
              {currentStep === 6 && "Configure the bottom bar with copyright and legal links"}
              {currentStep === 7 && "Customize the visual design and colors"}
            </p>
          </div>
          
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
                  Complete Footer
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
  )
};

export default FooterBuilder;
