'use client';

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Settings, Check, Upload, Menu, Plus, Trash2 } from 'lucide-react';
import { 
  ArrowLeft, ArrowRight, Layout, Image as ImageIcon, 
   Search, User, Palette,
  Type, Sparkles, Zap, Paintbrush
} from 'lucide-react';
interface ServiceItem {
  id: string;
  enabled: boolean;
  icon: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface ServicesConfig {
  sectionTitle: {
    enabled: boolean;
    title: string;
  };
  introText: {
    enabled: boolean;
    text: string;
  };
  services: ServiceItem[];
  layout: {
    type: 'grid' | 'list' | 'cards';
    columns: 2 | 3 | 4;
    iconPosition: 'top' | 'left' | 'right';
  };
  callToAction: {
    enabled: boolean;
    text: string;
    link: string;
    style: 'primary' | 'secondary' | 'outline' | 'ghost';
  };
  styling: {
    customColors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
      title: string;
      card: string;
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
      hoverEffects: boolean;
    };
  };
}

interface ServicesBuilderProps {
  projectName: string;
  onComplete: (config: ServicesConfig) => void;
  onBack: () => void;
}

const ServicesBuilder: React.FC<ServicesBuilderProps> = ({ projectName, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const [config, setConfig] = useState<ServicesConfig>({
    sectionTitle: {
      enabled: true,
      title: 'Our Services'
    },
    introText: {
      enabled: true,
      text: 'We provide modern solutions to help your business grow faster.'
    },
    services: [
      {
        id: '1',
        enabled: true,
        icon: '💻',
        title: 'Web Development',
        description: 'Custom websites and web applications built with modern technologies.',
        imageUrl: ''
      },
      {
        id: '2',
        enabled: true,
        icon: '🎨',
        title: 'Graphic Design',
        description: 'Professional design solutions for your brand and marketing materials.',
        imageUrl: ''
      },
      {
        id: '3',
        enabled: true,
        icon: '📈',
        title: 'SEO Optimization',
        description: 'Improve your search rankings and drive more organic traffic.',
        imageUrl: ''
      }
    ],
    layout: {
      type: 'grid',
      columns: 3,
      iconPosition: 'top'
    },
    callToAction: {
      enabled: false,
      text: 'Need a custom solution? Contact us today.',
      link: '#',
      style: 'primary'
    },
    styling: {
      customColors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#f59e0b',
        background: '#ffffff',
        text: '#1f2937',
        title: '#111827',
        card: '#f9fafb'
      },
      typography: {
        fontFamily: 'Inter',
        titleSize: 'text-2xl',
        textSize: 'text-base',
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
        animations: true,
        hoverEffects: true
      }
    }
  });

  const steps = [
    'Section Title',
    'Intro Text',
    'Services',
    'Layout',
    'Call to Action',
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

  const updateService = (id: string, field: keyof ServiceItem, value: any) => {
    setConfig(prev => ({
      ...prev,
      services: prev.services.map(service => 
        service.id === id ? { ...service, [field]: value } : service
      )
    }));
  };

  const addService = () => {
    const newId = (config.services.length + 1).toString();
    const newService: ServiceItem = {
      id: newId,
      enabled: true,
      icon: '✨',
      title: 'New Service',
      description: 'Description of your new service.',
      imageUrl: ''
    };
    
    setConfig(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));
  };

  const removeService = (id: string) => {
    setConfig(prev => ({
      ...prev,
      services: prev.services.filter(service => service.id !== id)
    }));
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
        return config.introText.enabled ? config.introText.text.trim() !== '' : true;
      case 3:
        return config.services.some(service => service.enabled && service.title.trim() !== '' && service.description.trim() !== '');
      case 4:
        return true;
      case 5:
        return config.callToAction.enabled ? 
          config.callToAction.text.trim() !== '' && config.callToAction.link.trim() !== '' : true;
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
                  placeholder="Our Services"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-white/60 text-xs">
                  Examples: "Our Services", "What We Do", "How We Can Help You"
                </p>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="introTextEnabled"
                checked={config.introText.enabled}
                onChange={(e) => updateConfig('introText.enabled', e.target.checked)}
                className="w-4 h-4 text-indigo-600 bg-white/10 border-white/20 rounded focus:ring-indigo-500"
              />
              <label htmlFor="introTextEnabled" className="text-white font-medium">
                Enable Intro Text
              </label>
            </div>
            
            {config.introText.enabled && (
              <div className="space-y-3">
                <label className="text-white/90 text-sm font-medium">Intro Text</label>
                <textarea
                  value={config.introText.text}
                  onChange={(e) => updateConfig('introText.text', e.target.value)}
                  placeholder="We provide modern solutions to help your business grow faster."
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
                <p className="text-white/60 text-xs">
                  1-2 lines explaining the purpose of your services
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold text-lg">Services</h3>
              <button
                onClick={addService}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 rounded-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Service
              </button>
            </div>
            
            <div className="space-y-4">
              {config.services.map((service, index) => (
                <div key={service.id} className="p-4 bg-white/5 rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={`service_${service.id}`}
                        checked={service.enabled}
                        onChange={(e) => updateService(service.id, 'enabled', e.target.checked)}
                        className="w-4 h-4 text-indigo-600 bg-white/10 border-white/20 rounded focus:ring-indigo-500"
                      />
                      <label htmlFor={`service_${service.id}`} className="text-white font-medium">
                        Service {index + 1}
                      </label>
                    </div>
                    <button
                      onClick={() => removeService(service.id)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {service.enabled && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-white/90 text-sm font-medium">Icon (Emoji)</label>
                          <input
                            type="text"
                            value={service.icon}
                            onChange={(e) => updateService(service.id, 'icon', e.target.value)}
                            placeholder="💻"
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-white/90 text-sm font-medium">Image URL (Optional)</label>
                          <input
                            type="url"
                            value={service.imageUrl}
                            onChange={(e) => updateService(service.id, 'imageUrl', e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-white/90 text-sm font-medium">Service Title</label>
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => updateService(service.id, 'title', e.target.value)}
                          placeholder="Web Development"
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-white/90 text-sm font-medium">Description</label>
                        <textarea
                          value={service.description}
                          onChange={(e) => updateService(service.id, 'description', e.target.value)}
                          placeholder="Custom websites and web applications built with modern technologies."
                          rows={3}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                        />
                        <p className="text-white/60 text-xs">
                          2-3 lines max about what it is and why it helps the user
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="text-white/90 text-sm font-medium">Layout Type</label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => updateConfig('layout.type', 'grid')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    config.layout.type === 'grid'
                      ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400'
                      : 'border-white/20 bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">📱</div>
                    <div className="text-sm font-medium">Grid</div>
                  </div>
                </button>
                <button
                  onClick={() => updateConfig('layout.type', 'list')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    config.layout.type === 'list'
                      ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400'
                      : 'border-white/20 bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">📋</div>
                    <div className="text-sm font-medium">List</div>
                  </div>
                </button>
                <button
                  onClick={() => updateConfig('layout.type', 'cards')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    config.layout.type === 'cards'
                      ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400'
                      : 'border-white/20 bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">🃏</div>
                    <div className="text-sm font-medium">Cards</div>
                  </div>
                </button>
              </div>
            </div>
            
            {config.layout.type === 'grid' && (
              <div className="space-y-4">
                <label className="text-white/90 text-sm font-medium">Number of Columns</label>
                <div className="grid grid-cols-3 gap-4">
                  {[2, 3, 4].map((cols) => (
                    <button
                      key={cols}
                      onClick={() => updateConfig('layout.columns', cols)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        config.layout.columns === cols
                          ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400'
                          : 'border-white/20 bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      {cols} Columns
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <label className="text-white/90 text-sm font-medium">Icon Position</label>
              <div className="grid grid-cols-3 gap-4">
                {['top', 'left', 'right'].map((position) => (
                  <button
                    key={position}
                    onClick={() => updateConfig('layout.iconPosition', position)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      config.layout.iconPosition === position
                        ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400'
                        : 'border-white/20 bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    {position.charAt(0).toUpperCase() + position.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="ctaEnabled"
                checked={config.callToAction.enabled}
                onChange={(e) => updateConfig('callToAction.enabled', e.target.checked)}
                className="w-4 h-4 text-indigo-600 bg-white/10 border-white/20 rounded focus:ring-indigo-500"
              />
              <label htmlFor="ctaEnabled" className="text-white font-medium">
                Enable Call to Action
              </label>
            </div>
            
            {config.callToAction.enabled && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-white/90 text-sm font-medium">CTA Text</label>
                  <input
                    type="text"
                    value={config.callToAction.text}
                    onChange={(e) => updateConfig('callToAction.text', e.target.value)}
                    placeholder="Need a custom solution? Contact us today."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <p className="text-white/60 text-xs">
                    Examples: "Need a custom solution? Contact us today.", "Book a free consultation."
                  </p>
                </div>
                
                <div className="space-y-3">
                  <label className="text-white/90 text-sm font-medium">CTA Link</label>
                  <input
                    type="text"
                    value={config.callToAction.link}
                    onChange={(e) => updateConfig('callToAction.link', e.target.value)}
                    placeholder="# or https://..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-white/90 text-sm font-medium">Button Style</label>
                  <select
                    value={config.callToAction.style}
                    onChange={(e) => updateConfig('callToAction.style', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="primary">Primary (Filled)</option>
                    <option value="secondary">Secondary (Alternative)</option>
                    <option value="outline">Outline</option>
                    <option value="ghost">Ghost</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg">Custom Color Palette</h3>
              <div className="grid grid-cols-1 gap-4">
                <ColorPicker
                  label="Primary Color"
                  value={config.styling.customColors.primary}
                  onChange={(value) => updateConfig('styling.customColors.primary', value)}
                />
                <ColorPicker
                  label="Secondary Color"
                  value={config.styling.customColors.secondary}
                  onChange={(value) => updateConfig('styling.customColors.secondary', value)}
                />
                <ColorPicker
                  label="Accent Color"
                  value={config.styling.customColors.accent}
                  onChange={(value) => updateConfig('styling.customColors.accent', value)}
                />
                <ColorPicker
                  label="Background Color"
                  value={config.styling.customColors.background}
                  onChange={(value) => updateConfig('styling.customColors.background', value)}
                />
                <ColorPicker
                  label="Text Color"
                  value={config.styling.customColors.text}
                  onChange={(value) => updateConfig('styling.customColors.text', value)}
                />
                <ColorPicker
                  label="Title Color"
                  value={config.styling.customColors.title}
                  onChange={(value) => updateConfig('styling.customColors.title', value)}
                />
                <ColorPicker
                  label="Card Background"
                  value={config.styling.customColors.card}
                  onChange={(value) => updateConfig('styling.customColors.card', value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg">Typography</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-white/90 text-sm font-medium">Font Family</label>
                  <select
                    value={config.styling.typography.fontFamily}
                    onChange={(e) => updateConfig('styling.typography.fontFamily', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Inter">Inter</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Poppins">Poppins</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Lato">Lato</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-white/90 text-sm font-medium">Title Size</label>
                  <select
                    value={config.styling.typography.titleSize}
                    onChange={(e) => updateConfig('styling.typography.titleSize', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="text-xl">Small</option>
                    <option value="text-2xl">Medium</option>
                    <option value="text-3xl">Large</option>
                    <option value="text-4xl">Extra Large</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-white/90 text-sm font-medium">Text Size</label>
                  <select
                    value={config.styling.typography.textSize}
                    onChange={(e) => updateConfig('styling.typography.textSize', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="text-sm">Small</option>
                    <option value="text-base">Medium</option>
                    <option value="text-lg">Large</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-white/90 text-sm font-medium">Font Weight</label>
                  <select
                    value={config.styling.typography.fontWeight}
                    onChange={(e) => updateConfig('styling.typography.fontWeight', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="font-normal">Normal</option>
                    <option value="font-medium">Medium</option>
                    <option value="font-semibold">Semi Bold</option>
                    <option value="font-bold">Bold</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg">Spacing & Effects</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-white/90 text-sm font-medium">Padding</label>
                  <select
                    value={config.styling.spacing.padding}
                    onChange={(e) => updateConfig('styling.spacing.padding', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="p-4">Small</option>
                    <option value="p-6">Medium</option>
                    <option value="p-8">Large</option>
                    <option value="p-12">Extra Large</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-white/90 text-sm font-medium">Gap</label>
                  <select
                    value={config.styling.spacing.gap}
                    onChange={(e) => updateConfig('styling.spacing.gap', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="gap-4">Small</option>
                    <option value="gap-6">Medium</option>
                    <option value="gap-8">Large</option>
                    <option value="gap-12">Extra Large</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="shadows"
                    checked={config.styling.effects.shadows}
                    onChange={(e) => updateConfig('styling.effects.shadows', e.target.checked)}
                    className="w-4 h-4 text-indigo-600 bg-white/10 border-white/20 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="shadows" className="text-white/90 text-sm">
                    Enable Shadows
                  </label>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="borders"
                    checked={config.styling.effects.borders}
                    onChange={(e) => updateConfig('styling.effects.borders', e.target.checked)}
                    className="w-4 h-4 text-indigo-600 bg-white/10 border-white/20 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="borders" className="text-white/90 text-sm">
                    Enable Borders
                  </label>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="animations"
                    checked={config.styling.effects.animations}
                    onChange={(e) => updateConfig('styling.effects.animations', e.target.checked)}
                    className="w-4 h-4 text-indigo-600 bg-white/10 border-white/20 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="animations" className="text-white/90 text-sm">
                    Enable Animations
                  </label>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="hoverEffects"
                    checked={config.styling.effects.hoverEffects}
                    onChange={(e) => updateConfig('styling.effects.hoverEffects', e.target.checked)}
                    className="w-4 h-4 text-indigo-600 bg-white/10 border-white/20 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="hoverEffects" className="text-white/90 text-sm">
                    Enable Hover Effects
                  </label>
                </div>
              </div>
            </div>
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
              <Menu size={24} />
              <div>
                                 <h2 className="text-xl font-bold">Advanced Services Builder</h2>
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
          <div className="mb-6">
            <h3 className="text-white font-semibold text-xl mb-2">{steps[currentStep - 1]}</h3>
            <p className="text-white/60 text-sm">
              {currentStep === 1 && "Choose a section title for your services"}
              {currentStep === 2 && "Write a short introduction explaining your services"}
              {currentStep === 3 && "Add and configure your service items"}
              {currentStep === 4 && "Choose the layout and display options"}
              {currentStep === 5 && "Add an optional call-to-action button"}
              {currentStep === 6 && "Customize the visual design and colors"}
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

export default ServicesBuilder;
