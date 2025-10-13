'use client';

import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight, Settings, Check, Upload, Mail, Phone, MapPin, Clock, Globe, MessageSquare } from 'lucide-react';

interface ContactConfig {
  sectionTitle: {
    enabled: boolean;
    title: string;
  };
  introText: {
    enabled: boolean;
    text: string;
  };
  contactForm: {
    enabled: boolean;
    fields: {
      name: boolean;
      email: boolean;
      phone: boolean;
      subject: boolean;
      message: boolean;
    };
    submitText: string;
  };
  contactInfo: {
    enabled: boolean;
    items: {
      address: { enabled: boolean; text: string };
      phone: { enabled: boolean; text: string };
      email: { enabled: boolean; text: string };
      hours: { enabled: boolean; text: string };
      website: { enabled: boolean; text: string };
    };
  };
  socialMedia: {
    enabled: boolean;
    platforms: {
      facebook: { enabled: boolean; url: string };
      twitter: { enabled: boolean; url: string };
      instagram: { enabled: boolean; url: string };
      linkedin: { enabled: boolean; url: string };
      youtube: { enabled: boolean; url: string };
    };
  };
  map: {
    enabled: boolean;
    address: string;
    embedCode: string;
  };
  styling: {
    customColors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
      title: string;
      form: string;
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

interface ContactBuilderProps {
  projectName: string;
  onComplete: (config: ContactConfig) => void;
  onBack: () => void;
}

const ContactBuilder: React.FC<ContactBuilderProps> = ({ projectName, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const [config, setConfig] = useState<ContactConfig>({
    sectionTitle: {
      enabled: true,
      title: 'Contact Us'
    },
    introText: {
      enabled: true,
      text: 'Get in touch with us. We\'d love to hear from you.'
    },
    contactForm: {
      enabled: true,
      fields: {
        name: true,
        email: true,
        phone: false,
        subject: true,
        message: true
      },
      submitText: 'Send Message'
    },
    contactInfo: {
      enabled: true,
      items: {
        address: { enabled: true, text: '123 Business Street, City, Country' },
        phone: { enabled: true, text: '+1 (555) 123-4567' },
        email: { enabled: true, text: 'info@yourcompany.com' },
        hours: { enabled: false, text: 'Mon-Fri: 9AM-6PM' },
        website: { enabled: false, text: 'www.yourcompany.com' }
      }
    },
    socialMedia: {
      enabled: false,
      platforms: {
        facebook: { enabled: false, url: '' },
        twitter: { enabled: false, url: '' },
        instagram: { enabled: false, url: '' },
        linkedin: { enabled: false, url: '' },
        youtube: { enabled: false, url: '' }
      }
    },
    map: {
      enabled: false,
      address: '',
      embedCode: ''
    },
    styling: {
      customColors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#f59e0b',
        background: '#ffffff',
        text: '#1f2937',
        title: '#111827',
        form: '#f9fafb'
      },
      typography: {
        fontFamily: 'Inter',
        titleSize: 'text-3xl',
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
        animations: true
      }
    }
  });

  const steps = [
    'Section Title',
    'Intro Text',
    'Contact Form',
    'Contact Information',
    'Social Media',
    'Map Integration',
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

  const ColorPicker = ({ 
    label, 
    value, 
    onChange 
  }: { 
    label: string; 
    value: string; 
    onChange: (value: string) => void 
  }) => (
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
        return config.contactForm.enabled ? config.contactForm.submitText.trim() !== '' : true;
      case 4:
        return config.contactInfo.enabled ? 
          Object.values(config.contactInfo.items).some(item => item.enabled && item.text.trim() !== '') : true;
      case 5:
        return config.socialMedia.enabled ? 
          Object.values(config.socialMedia.platforms).some(platform => platform.enabled && platform.url.trim() !== '') : true;
      case 6:
        return config.map.enabled ? config.map.address.trim() !== '' : true;
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
                  placeholder="Contact Us"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
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
                  placeholder="Get in touch with us. We'd love to hear from you."
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="contactFormEnabled"
                checked={config.contactForm.enabled}
                onChange={(e) => updateConfig('contactForm.enabled', e.target.checked)}
                className="w-4 h-4 text-indigo-600 bg-white/10 border-white/20 rounded focus:ring-indigo-500"
              />
              <label htmlFor="contactFormEnabled" className="text-white font-medium">
                Enable Contact Form
              </label>
            </div>
            
            {config.contactForm.enabled && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="text-white/90 text-sm font-medium">Form Fields</label>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(config.contactForm.fields).map(([field, enabled]) => (
                      <div key={field} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={`field_${field}`}
                          checked={enabled}
                          onChange={(e) => updateConfig(`contactForm.fields.${field}`, e.target.checked)}
                          className="w-4 h-4 text-indigo-600 bg-white/10 border-white/20 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor={`field_${field}`} className="text-white/90 text-sm capitalize">
                          {field}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-white/90 text-sm font-medium">Submit Button Text</label>
                  <input
                    type="text"
                    value={config.contactForm.submitText}
                    onChange={(e) => updateConfig('contactForm.submitText', e.target.value)}
                    placeholder="Send Message"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="contactInfoEnabled"
                checked={config.contactInfo.enabled}
                onChange={(e) => updateConfig('contactInfo.enabled', e.target.checked)}
                className="w-4 h-4 text-indigo-600 bg-white/10 border-white/20 rounded focus:ring-indigo-500"
              />
              <label htmlFor="contactInfoEnabled" className="text-white font-medium">
                Enable Contact Information
              </label>
            </div>
            
            {config.contactInfo.enabled && (
              <div className="space-y-4">
                {Object.entries(config.contactInfo.items).map(([item, config]) => (
                  <div key={item} className="p-4 bg-white/5 rounded-lg space-y-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={`contact_${item}`}
                        checked={config.enabled}
                        onChange={(e) => updateConfig(`contactInfo.items.${item}.enabled`, e.target.checked)}
                        className="w-4 h-4 text-indigo-600 bg-white/10 border-white/20 rounded focus:ring-indigo-500"
                      />
                      <label htmlFor={`contact_${item}`} className="text-white font-medium capitalize">
                        {item}
                      </label>
                    </div>
                    
                    {config.enabled && (
                      <input
                        type="text"
                        value={config.text}
                        onChange={(e) => updateConfig(`contactInfo.items.${item}.text`, e.target.value)}
                        placeholder={`Enter ${item}...`}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="socialMediaEnabled"
                checked={config.socialMedia.enabled}
                onChange={(e) => updateConfig('socialMedia.enabled', e.target.checked)}
                className="w-4 h-4 text-indigo-600 bg-white/10 border-white/20 rounded focus:ring-indigo-500"
              />
              <label htmlFor="socialMediaEnabled" className="text-white font-medium">
                Enable Social Media Links
              </label>
            </div>
            
            {config.socialMedia.enabled && (
              <div className="space-y-4">
                {Object.entries(config.socialMedia.platforms).map(([platform, config]) => (
                  <div key={platform} className="p-4 bg-white/5 rounded-lg space-y-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={`social_${platform}`}
                        checked={config.enabled}
                        onChange={(e) => updateConfig(`socialMedia.platforms.${platform}.enabled`, e.target.checked)}
                        className="w-4 h-4 text-indigo-600 bg-white/10 border-white/20 rounded focus:ring-indigo-500"
                      />
                      <label htmlFor={`social_${platform}`} className="text-white font-medium capitalize">
                        {platform}
                      </label>
                    </div>
                    
                    {config.enabled && (
                      <input
                        type="url"
                        value={config.url}
                        onChange={(e) => updateConfig(`socialMedia.platforms.${platform}.url`, e.target.value)}
                        placeholder={`https://${platform}.com/yourprofile`}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="mapEnabled"
                checked={config.map.enabled}
                onChange={(e) => updateConfig('map.enabled', e.target.checked)}
                className="w-4 h-4 text-indigo-600 bg-white/10 border-white/20 rounded focus:ring-indigo-500"
              />
              <label htmlFor="mapEnabled" className="text-white font-medium">
                Enable Map Integration
              </label>
            </div>
            
            {config.map.enabled && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="text-white/90 text-sm font-medium">Address</label>
                  <input
                    type="text"
                    value={config.map.address}
                    onChange={(e) => updateConfig('map.address', e.target.value)}
                    placeholder="Enter your business address"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-white/90 text-sm font-medium">Custom Embed Code (Optional)</label>
                  <textarea
                    value={config.map.embedCode}
                    onChange={(e) => updateConfig('map.embedCode', e.target.value)}
                    placeholder="Paste Google Maps embed code here..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                  <p className="text-white/60 text-xs">
                    Leave empty to auto-generate from address, or paste custom embed code
                  </p>
                </div>
              </div>
            )}
          </div>
        );

      case 7:
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
                  label="Form Background"
                  value={config.styling.customColors.form}
                  onChange={(value) => updateConfig('styling.customColors.form', value)}
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
                    <option value="text-2xl">Small</option>
                    <option value="text-3xl">Medium</option>
                    <option value="text-4xl">Large</option>
                    <option value="text-5xl">Extra Large</option>
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
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
              <div>
                                 <h2 className="text-xl font-bold">Advanced Contact Builder</h2>
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
        <div className="px-6 py-4 border-b border-gray-700">
          <div className="flex items-center justify-between ">
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

export default ContactBuilder;
