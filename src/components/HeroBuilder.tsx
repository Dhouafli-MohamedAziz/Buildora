'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, Check, X, Layout, Image as ImageIcon, 
  Menu, Search, User, Home, Info, Phone, Settings, Palette,
  ChevronDown, ChevronRight, Upload, Trash2, Eye, EyeOff,
  Type, Droplets, Sparkles, Zap, Paintbrush, Star, Play, ArrowDown
} from 'lucide-react';

interface HeroConfig {
  headline: {
    text: string;
    style: 'h1' | 'h2' | 'h3';
  };
  subheadline: {
    text: string;
    enabled: boolean;
  };
  primaryCTA: {
    text: string;
    link: string;
    style: 'primary' | 'secondary' | 'outline';
  };
  secondaryCTA: {
    text: string;
    link: string;
    enabled: boolean;
    type: 'button' | 'link' | 'video';
  };
  visualElement: {
    type: 'image' | 'video' | 'illustration' | 'screenshot';
    image: File | null;
    imagePreview: string | null;
    videoUrl: string;
  };
  navigationAnchor: {
    enabled: boolean;
    text: string;
  };
  socialProof: {
    enabled: boolean;
    type: 'logos' | 'ratings' | 'testimonials';
    logos: Array<{
      name: string;
      image: File | null;
      imagePreview: string | null;
    }>;
    rating: number;
    testimonialText: string;
  };
  styling: {
    layout: 'left-text' | 'center' | 'right-text';
    background: 'transparent' | 'solid' | 'gradient' | 'image';
    customColors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
      headline: string;
      subheadline: string;
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

interface HeroBuilderProps {
  projectName: string;
  onComplete: (config: HeroConfig) => void;
  onBack: () => void;
}

const HeroBuilder: React.FC<HeroBuilderProps> = ({ projectName, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<HeroConfig>({
    headline: {
      text: `Welcome to ${projectName}`,
      style: 'h1',
    },
    subheadline: {
      text: 'Transform your ideas into reality with our powerful platform',
      enabled: true,
    },
    primaryCTA: {
      text: 'Get Started',
      link: '#cta',
      style: 'primary',
    },
    secondaryCTA: {
      text: 'Learn More',
      link: '#about',
      enabled: true,
      type: 'button',
    },
    visualElement: {
      type: 'image',
      image: null,
      imagePreview: null,
      videoUrl: '',
    },
    navigationAnchor: {
      enabled: true,
      text: 'Scroll to learn more',
    },
    socialProof: {
      enabled: false,
      type: 'logos',
      logos: [],
      rating: 4.5,
      testimonialText: 'Amazing platform that helped us grow!',
    },
    styling: {
      layout: 'left-text',
      background: 'gradient',
      customColors: {
        primary: '#8b5cf6',
        secondary: '#ec4899',
        accent: '#f59e0b',
        background: '#1e293b',
        text: '#f8fafc',
        headline: '#ffffff',
        subheadline: '#e2e8f0',
      },
      typography: {
        fontFamily: 'sans',
        fontSize: 'large',
        fontWeight: 'bold',
      },
      spacing: 'comfortable',
      shadows: 'subtle',
      borders: 'rounded',
      animations: 'fade',
    },
  });

  const steps = [
    { id: 1, title: 'Main Headline', icon: <Type size={20} /> },
    { id: 2, title: 'Subheadline', icon: <Info size={20} /> },
    { id: 3, title: 'Call to Action', icon: <ChevronRight size={20} /> },
    { id: 4, title: 'Visual Element', icon: <ImageIcon size={20} /> },
    { id: 5, title: 'Navigation Anchor', icon: <ArrowDown size={20} /> },
    { id: 6, title: 'Social Proof', icon: <Star size={20} /> },
    { id: 7, title: 'Layout & Design', icon: <Layout size={20} /> },
    { id: 8, title: 'Styling & Colors', icon: <Palette size={20} /> },
  ];

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
              <h3 className="text-xl font-semibold text-white mb-2">Main Headline (Hook)</h3>
              <p className="text-gray-300">Create a short, bold, and clear headline that answers "What is this website about?"</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Headline Text</label>
                <input
                  type="text"
                  value={config.headline.text}
                  onChange={(e) => setConfig(prev => ({ 
                    ...prev, 
                    headline: { ...prev.headline, text: e.target.value } 
                  }))}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                  placeholder="Build your dream website in minutes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Headline Style</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['h1', 'h2', 'h3'] as const).map((style) => (
                    <button
                      key={style}
                      onClick={() => setConfig(prev => ({ 
                        ...prev, 
                        headline: { ...prev.headline, style } 
                      }))}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        config.headline.style === style
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

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Subheadline (Value Proposition)</h3>
              <p className="text-gray-300">Explain why visitors should care about your product or service</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <Info size={20} className="text-gray-400" />
                  <span className="font-medium text-white">Enable Subheadline</span>
                </div>
                <button
                  onClick={() => setConfig(prev => ({ 
                    ...prev, 
                    subheadline: { ...prev.subheadline, enabled: !prev.subheadline.enabled } 
                  }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.subheadline.enabled ? 'bg-purple-500' : 'bg-gray-600'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    config.subheadline.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {config.subheadline.enabled && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subheadline Text</label>
                  <textarea
                    value={config.subheadline.text}
                    onChange={(e) => setConfig(prev => ({ 
                      ...prev, 
                      subheadline: { ...prev.subheadline, text: e.target.value } 
                    }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                    placeholder="No coding required. Professional designs that convert visitors into customers."
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Call to Action Buttons</h3>
              <p className="text-gray-300">Guide visitors to take the next step</p>
            </div>

            <div className="space-y-6">
              {/* Primary CTA */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">Primary CTA</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Button Text</label>
                    <input
                      type="text"
                      value={config.primaryCTA.text}
                      onChange={(e) => setConfig(prev => ({ 
                        ...prev, 
                        primaryCTA: { ...prev.primaryCTA, text: e.target.value } 
                      }))}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                      placeholder="Get Started"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Button Link</label>
                    <input
                      type="text"
                      value={config.primaryCTA.link}
                      onChange={(e) => setConfig(prev => ({ 
                        ...prev, 
                        primaryCTA: { ...prev.primaryCTA, link: e.target.value } 
                      }))}
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
                          onClick={() => setConfig(prev => ({ 
                            ...prev, 
                            primaryCTA: { ...prev.primaryCTA, style } 
                          }))}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            config.primaryCTA.style === style
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

              {/* Secondary CTA */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-white">Secondary CTA (Optional)</h4>
                  <button
                    onClick={() => setConfig(prev => ({ 
                      ...prev, 
                      secondaryCTA: { ...prev.secondaryCTA, enabled: !prev.secondaryCTA.enabled } 
                    }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      config.secondaryCTA.enabled ? 'bg-purple-500' : 'bg-gray-600'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.secondaryCTA.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {config.secondaryCTA.enabled && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Button Text</label>
                      <input
                        type="text"
                        value={config.secondaryCTA.text}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          secondaryCTA: { ...prev.secondaryCTA, text: e.target.value } 
                        }))}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                        placeholder="Learn More"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Button Type</label>
                      <div className="grid grid-cols-3 gap-3">
                        {(['button', 'link', 'video'] as const).map((type) => (
                          <button
                            key={type}
                            onClick={() => setConfig(prev => ({ 
                              ...prev, 
                              secondaryCTA: { ...prev.secondaryCTA, type } 
                            }))}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              config.secondaryCTA.type === type
                                ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                                : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                            }`}
                          >
                            <span className="capitalize">{type}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Visual Element</h3>
              <p className="text-gray-300">Choose a strong visual that matches your product or service</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Visual Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['image', 'video', 'illustration', 'screenshot'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setConfig(prev => ({ 
                        ...prev, 
                        visualElement: { ...prev.visualElement, type } 
                      }))}
                      className={`p-4 rounded-lg border-2 transition-all text-center ${
                        config.visualElement.type === type
                          ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                          : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                      }`}
                    >
                      <ImageIcon size={24} className="mx-auto mb-2" />
                      <span className="capitalize">{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              {config.visualElement.type === 'image' && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center bg-gray-800/30">
                    {config.visualElement.imagePreview ? (
                      <div className="space-y-2">
                        <img src={config.visualElement.imagePreview} alt="Visual preview" className="h-32 mx-auto object-contain" />
                        <p className="text-sm text-gray-400">{config.visualElement.image?.name}</p>
                        <button
                          onClick={() => setConfig(prev => ({ 
                            ...prev, 
                            visualElement: { ...prev.visualElement, image: null, imagePreview: null } 
                          }))}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          <Trash2 size={16} className="inline mr-1" />
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload size={32} className="mx-auto mb-2 text-gray-500" />
                        <p className="text-gray-300">Click to upload your visual</p>
                        <p className="text-sm text-gray-500">PNG, JPG, SVG up to 5MB</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            setConfig(prev => ({
                              ...prev,
                              visualElement: {
                                ...prev.visualElement,
                                image: file,
                                imagePreview: e.target?.result as string
                              }
                            }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                      id="visual-upload"
                    />
                    <label htmlFor="visual-upload" className="cursor-pointer">
                      <div className="mt-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors">
                        Choose File
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {config.visualElement.type === 'video' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Video URL</label>
                  <input
                    type="text"
                    value={config.visualElement.videoUrl}
                    onChange={(e) => setConfig(prev => ({ 
                      ...prev, 
                      visualElement: { ...prev.visualElement, videoUrl: e.target.value } 
                    }))}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                    placeholder="https://youtube.com/watch?v=..."
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
              <h3 className="text-xl font-semibold text-white mb-2">Navigation Anchor</h3>
              <p className="text-gray-300">Add a scroll indicator to guide users to more content</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <ArrowDown size={20} className="text-gray-400" />
                  <span className="font-medium text-white">Enable Navigation Anchor</span>
                </div>
                <button
                  onClick={() => setConfig(prev => ({ 
                    ...prev, 
                    navigationAnchor: { ...prev.navigationAnchor, enabled: !prev.navigationAnchor.enabled } 
                  }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.navigationAnchor.enabled ? 'bg-purple-500' : 'bg-gray-600'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    config.navigationAnchor.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {config.navigationAnchor.enabled && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Anchor Text</label>
                  <input
                    type="text"
                    value={config.navigationAnchor.text}
                    onChange={(e) => setConfig(prev => ({ 
                      ...prev, 
                      navigationAnchor: { ...prev.navigationAnchor, text: e.target.value } 
                    }))}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                    placeholder="Scroll to learn more"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Social Proof</h3>
              <p className="text-gray-300">Build trust with logos, ratings, or testimonials</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <Star size={20} className="text-gray-400" />
                  <span className="font-medium text-white">Enable Social Proof</span>
                </div>
                <button
                  onClick={() => setConfig(prev => ({ 
                    ...prev, 
                    socialProof: { ...prev.socialProof, enabled: !prev.socialProof.enabled } 
                  }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.socialProof.enabled ? 'bg-purple-500' : 'bg-gray-600'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    config.socialProof.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {config.socialProof.enabled && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Social Proof Type</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['logos', 'ratings', 'testimonials'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setConfig(prev => ({ 
                            ...prev, 
                            socialProof: { ...prev.socialProof, type } 
                          }))}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            config.socialProof.type === type
                              ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                              : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                          }`}
                        >
                          <span className="capitalize">{type}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {config.socialProof.type === 'ratings' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Rating (1-5)</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        value={config.socialProof.rating}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          socialProof: { ...prev.socialProof, rating: parseFloat(e.target.value) } 
                        }))}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                      />
                    </div>
                  )}

                  {config.socialProof.type === 'testimonials' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Testimonial Text</label>
                      <textarea
                        value={config.socialProof.testimonialText}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          socialProof: { ...prev.socialProof, testimonialText: e.target.value } 
                        }))}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                        placeholder="Amazing platform that helped us grow!"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Layout & Design</h3>
              <p className="text-gray-300">Choose how your hero section is structured</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Layout Style</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['left-text', 'center', 'right-text'] as const).map((layout) => (
                    <button
                      key={layout}
                      onClick={() => setConfig(prev => ({ 
                        ...prev, 
                        styling: { ...prev.styling, layout } 
                      }))}
                      className={`p-4 rounded-lg border-2 transition-all text-center ${
                        config.styling.layout === layout
                          ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                          : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                      }`}
                    >
                      <Layout size={24} className="mx-auto mb-2" />
                      <span className="capitalize">{layout.replace('-', ' ')}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Background Style</label>
                <div className="grid grid-cols-4 gap-3">
                  {(['transparent', 'solid', 'gradient', 'image'] as const).map((background) => (
                    <button
                      key={background}
                      onClick={() => setConfig(prev => ({ 
                        ...prev, 
                        styling: { ...prev.styling, background } 
                      }))}
                      className={`p-3 rounded-lg border-2 transition-all text-center ${
                        config.styling.background === background
                          ? 'border-purple-500 bg-purple-500/20 text-purple-300'
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
        );

      case 8:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Styling & Visual Design</h3>
              <p className="text-gray-300">Customize every aspect of your hero's appearance</p>
            </div>

            {/* Custom Color Pickers */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <Paintbrush size={24} className="text-purple-400" />
                <h4 className="text-xl font-semibold text-white">Custom Color Design</h4>
              </div>
              
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
                  description="Main background color of the hero"
                />
                
                <ColorPicker
                  label="Headline Color"
                  color={config.styling.customColors.headline}
                  onChange={(color) => setConfig(prev => ({
                    ...prev,
                    styling: {
                      ...prev.styling,
                      customColors: { ...prev.styling.customColors, headline: color }
                    }
                  }))}
                  description="Color for the main headline"
                />
                
                <ColorPicker
                  label="Subheadline Color"
                  color={config.styling.customColors.subheadline}
                  onChange={(color) => setConfig(prev => ({
                    ...prev,
                    styling: {
                      ...prev.styling,
                      customColors: { ...prev.styling.customColors, subheadline: color }
                    }
                  }))}
                  description="Color for the subheadline text"
                />
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-6">
                <Type size={24} className="text-purple-400" />
                <h4 className="text-xl font-semibold text-white">Typography</h4>
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Font Family</label>
                  <div className="space-y-2">
                    {(['sans', 'serif', 'mono', 'display'] as const).map((font) => (
                      <button
                        key={font}
                        onClick={() => setConfig(prev => ({ 
                          ...prev, 
                          styling: { ...prev.styling, typography: { ...prev.styling.typography, fontFamily: font } } 
                        }))}
                        className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                          config.styling.typography.fontFamily === font
                            ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                            : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                        }`}
                      >
                        <span className="capitalize">{font}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Font Size</label>
                  <div className="space-y-2">
                    {(['small', 'medium', 'large'] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => setConfig(prev => ({ 
                          ...prev, 
                          styling: { ...prev.styling, typography: { ...prev.styling.typography, fontSize: size } } 
                        }))}
                        className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                          config.styling.typography.fontSize === size
                            ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                            : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                        }`}
                      >
                        <span className="capitalize">{size}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Font Weight</label>
                  <div className="space-y-2">
                    {(['normal', 'medium', 'bold'] as const).map((weight) => (
                      <button
                        key={weight}
                        onClick={() => setConfig(prev => ({ 
                          ...prev, 
                          styling: { ...prev.styling, typography: { ...prev.styling.typography, fontWeight: weight } } 
                        }))}
                        className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                          config.styling.typography.fontWeight === weight
                            ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                            : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                        }`}
                      >
                        <span className="capitalize">{weight}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Effects */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles size={24} className="text-purple-400" />
                <h4 className="text-xl font-semibold text-white">Visual Effects</h4>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Spacing</label>
                  <div className="space-y-2">
                    {(['compact', 'comfortable', 'spacious'] as const).map((spacing) => (
                      <button
                        key={spacing}
                        onClick={() => setConfig(prev => ({ 
                          ...prev, 
                          styling: { ...prev.styling, spacing } 
                        }))}
                        className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                          config.styling.spacing === spacing
                            ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                            : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                        }`}
                      >
                        <span className="capitalize">{spacing}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Animations</label>
                  <div className="space-y-2">
                    {(['none', 'fade', 'slide', 'bounce'] as const).map((animation) => (
                      <button
                        key={animation}
                        onClick={() => setConfig(prev => ({ 
                          ...prev, 
                          styling: { ...prev.styling, animations: animation } 
                        }))}
                        className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                          config.styling.animations === animation
                            ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                            : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'
                        }`}
                      >
                        <span className="capitalize">{animation}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Hero Builder</h3>
            <p className="text-gray-300">Coming soon - Step {currentStep} implementation</p>
          </div>
        );
    }
  };

  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        return config.headline.text.trim() !== '';
      case 2:
        return !config.subheadline.enabled || config.subheadline.text.trim() !== '';
      case 3:
        return config.primaryCTA.text.trim() !== '';
      case 4:
        return config.visualElement.type !== 'image' || config.visualElement.image !== null;
      default:
        return true;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Layout size={24} />
              <div>
                <h2 className="text-xl font-bold">Advanced Hero Builder</h2>
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

        {/* Progress Steps */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  currentStep >= step.id
                    ? 'bg-purple-500 border-purple-500 text-white'
                    : 'border-gray-600 text-gray-400'
                }`}>
                  {currentStep > step.id ? <Check size={16} /> : step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-purple-500' : 'bg-gray-600'
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
              {currentStep === 8 ? (
                <button
                  onClick={() => onComplete(config)}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-all"
                >
                  <Check size={16} />
                  Complete Hero
                </button>
              ) : (
                <button
                  onClick={() => setCurrentStep(prev => Math.min(8, prev + 1))}
                  disabled={!canGoNext()}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                    canGoNext()
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90'
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

export default HeroBuilder;
