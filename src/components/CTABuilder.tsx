'use client';

import React, { useState } from 'react';
import { X, ArrowLeft, Settings, Check, Upload, Target, ArrowRight, Star, Zap } from 'lucide-react';

interface CTAConfig {
  sectionTitle: {
    enabled: boolean;
    title: string;
  };
  headline: {
    enabled: boolean;
    text: string;
  };
  subheadline: {
    enabled: boolean;
    text: string;
  };
  primaryCTA: {
    enabled: boolean;
    text: string;
    link: string;
    style: 'primary' | 'secondary' | 'outline' | 'ghost';
  };
  secondaryCTA: {
    enabled: boolean;
    text: string;
    link: string;
    style: 'primary' | 'secondary' | 'outline' | 'ghost';
  };
  visualElement: {
    enabled: boolean;
    type: 'image' | 'icon' | 'illustration' | 'none';
    content: string;
  };
  urgency: {
    enabled: boolean;
    type: 'countdown' | 'limited' | 'exclusive' | 'none';
    text: string;
  };
  socialProof: {
    enabled: boolean;
    type: 'testimonials' | 'numbers' | 'logos' | 'none';
    content: string;
  };
  styling: {
    customColors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
      title: string;
      button: string;
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

interface CTABuilderProps {
  projectName: string;
  onComplete: (config: CTAConfig) => void;
  onBack: () => void;
}

const CTABuilder: React.FC<CTABuilderProps> = ({ projectName, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const [config, setConfig] = useState<CTAConfig>({
    sectionTitle: {
      enabled: true,
      title: 'Ready to Get Started?'
    },
    headline: {
      enabled: true,
      text: 'Transform Your Business Today'
    },
    subheadline: {
      enabled: true,
      text: 'Join thousands of satisfied customers who have already taken the next step.'
    },
    primaryCTA: {
      enabled: true,
      text: 'Get Started Now',
      link: '#',
      style: 'primary'
    },
    secondaryCTA: {
      enabled: false,
      text: 'Learn More',
      link: '#',
      style: 'outline'
    },
    visualElement: {
      enabled: false,
      type: 'icon',
      content: '🚀'
    },
    urgency: {
      enabled: false,
      type: 'limited',
      text: 'Limited time offer - Act now!'
    },
    socialProof: {
      enabled: false,
      type: 'numbers',
      content: '10,000+ customers trust us'
    },
    styling: {
      customColors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#f59e0b',
        background: '#ffffff',
        text: '#1f2937',
        title: '#111827',
        button: '#ffffff'
      },
      typography: {
        fontFamily: 'Inter',
        titleSize: 'text-4xl',
        textSize: 'text-lg',
        fontWeight: 'font-semibold'
      },
      spacing: {
        padding: 'p-12',
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
    'Section Title',
    'Headline',
    'Subheadline',
    'Primary CTA',
    'Secondary CTA',
    'Visual Element',
    'Urgency & Social Proof',
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
        return config.sectionTitle.enabled ? config.sectionTitle.title.trim() !== '' : true;
      case 2:
        return config.headline.enabled ? config.headline.text.trim() !== '' : true;
      case 3:
        return config.subheadline.enabled ? config.subheadline.text.trim() !== '' : true;
      case 4:
        return config.primaryCTA.enabled ? 
          config.primaryCTA.text.trim() !== '' && config.primaryCTA.link.trim() !== '' : true;
      case 5:
        return config.secondaryCTA.enabled ? 
          config.secondaryCTA.text.trim() !== '' && config.secondaryCTA.link.trim() !== '' : true;
      case 6:
        return config.visualElement.enabled ? config.visualElement.content.trim() !== '' : true;
      case 7:
        return true;
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
                id="sectionTitleEnabled"
                checked={config.sectionTitle.enabled}
                onChange={(e) => updateConfig('sectionTitle.enabled', e.target.checked)}
                className="w-4 h-4 text-indigo-600 bg-white/10 border-white/20 rounded focus:ring-indigo-500"
              />
              <label htmlFor="sectionTitleEnabled" className="text-white font-medium">
                Enable Section Title
              </label>
            </div>
            
            {config.sectionTitle.enabled && (
              <div className="space-y-3">
                <label className="text-white/90 text-sm font-medium">Section Title</label>
                <input
                  type="text"
                  value={config.sectionTitle.title}
                  onChange={(e) => updateConfig('sectionTitle.title', e.target.value)}
                  placeholder="Ready to Get Started?"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
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
              <Target size={24} />
              <div>
                                 <h2 className="text-xl font-bold">Advanced CTA Builder</h2>
                 <p className="text-purple-100 text-sm">Step {currentStep} of 8 - Professional Design Tools</p>
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

export default CTABuilder;
