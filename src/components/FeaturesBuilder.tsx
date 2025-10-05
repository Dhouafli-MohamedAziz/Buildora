import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, X, Type, Info, Star, ToggleLeft, Grid, Shield, HelpCircle, Zap, Paintbrush } from 'lucide-react';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  isEnabled: boolean;
  isHighlighted: boolean;
  ctaText?: string;
  ctaLink?: string;
}

interface FeaturesConfig {
  title: { text: string; enabled: boolean; };
  subtitle: { text: string; enabled: boolean; };
  features: Feature[];
  layout: 'grid-2' | 'grid-3' | 'grid-4' | 'list' | 'cards' | 'timeline';
  alignment: 'left' | 'center' | 'right';
  showNumbers: boolean;
  showIcons: boolean;
  showImages: boolean;
  animation: 'none' | 'fade-in' | 'slide-up' | 'stagger';
  design: {
    theme: 'light' | 'dark' | 'gradient' | 'glassmorphism' | 'minimal' | 'bold';
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    textColor: string;
    backgroundColor: string;
    cardStyle: 'elevated' | 'flat' | 'bordered' | 'gradient';
    iconStyle: 'filled' | 'outline' | 'gradient';
    typography: 'modern' | 'classic' | 'minimal' | 'bold';
  };
}

interface FeaturesBuilderProps {
  projectName: string;
  onComplete: (config: FeaturesConfig) => void;
  onBack: () => void;
}

const FeaturesBuilder: React.FC<FeaturesBuilderProps> = ({ projectName, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<FeaturesConfig>({
    title: { text: 'Key Features', enabled: true },
    subtitle: { text: 'Discover what makes us special', enabled: true },
    features: [
      {
        id: 'feature-1',
        title: 'Easy to Use',
        description: 'Intuitive interface designed for the best user experience',
        icon: 'Zap',
        isEnabled: true,
        isHighlighted: false,
      },
      {
        id: 'feature-2',
        title: 'Fast Performance',
        description: 'Lightning-fast loading times and smooth interactions',
        icon: 'Star',
        isEnabled: true,
        isHighlighted: true,
      },
      {
        id: 'feature-3',
        title: 'Secure & Reliable',
        description: 'Enterprise-grade security with 99.9% uptime guarantee',
        icon: 'Shield',
        isEnabled: true,
        isHighlighted: false,
      },
    ],
    layout: 'grid-3',
    alignment: 'center',
    showNumbers: false,
    showIcons: true,
    showImages: false,
    animation: 'fade-in',
    design: {
      theme: 'light',
      primaryColor: '#8b5cf6',
      secondaryColor: '#ec4899',
      accentColor: '#f59e0b',
      textColor: '#1f2937',
      backgroundColor: '#ffffff',
      cardStyle: 'elevated',
      iconStyle: 'filled',
      typography: 'modern',
    },
  });

  // Color picker component (reused from PricingBuilder)
  const ColorPicker = ({ label, color, onChange, description }: { label: string; color: string; onChange: (color: string) => void; description?: string; }) => {
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

  const steps = [
    { id: 1, title: 'Section Title', icon: <Type size={20} /> },
    { id: 2, title: 'Subtitle', icon: <Info size={20} /> },
    { id: 3, title: 'Features', icon: <Star size={20} /> },
    { id: 4, title: 'Layout & Display', icon: <Grid size={20} /> },
    { id: 5, title: 'Visual Elements', icon: <ToggleLeft size={20} /> },
    { id: 6, title: 'Animations', icon: <Zap size={20} /> },
    { id: 7, title: 'Styling & Colors', icon: <Paintbrush size={20} /> },
  ];

  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        return !config.title.enabled || config.title.text.trim() !== '';
      case 2:
        return !config.subtitle.enabled || config.subtitle.text.trim() !== '';
      case 3:
        return config.features.some(feature => feature.isEnabled);
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Section Title
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Section Title</h3>
              <p className="text-gray-300">Give your features section a compelling title</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <Type size={20} className="text-gray-400" />
                  <span className="font-medium text-white">Enable Section Title</span>
                </div>
                <button
                  onClick={() => setConfig(prev => ({ ...prev, title: { ...prev.title, enabled: !prev.title.enabled } }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.title.enabled ? 'bg-purple-500' : 'bg-gray-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.title.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              {config.title.enabled && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title Text</label>
                  <input
                    type="text"
                    value={config.title.text}
                    onChange={(e) => setConfig(prev => ({ ...prev, title: { ...prev.title, text: e.target.value } }))}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                    placeholder="Key Features"
                  />
                </div>
              )}
            </div>
          </div>
        );
      case 2: // Subtitle
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Subtitle</h3>
              <p className="text-gray-300">Add a brief description to introduce your features</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <Info size={20} className="text-gray-400" />
                  <span className="font-medium text-white">Enable Subtitle</span>
                </div>
                <button
                  onClick={() => setConfig(prev => ({ ...prev, subtitle: { ...prev.subtitle, enabled: !prev.subtitle.enabled } }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.subtitle.enabled ? 'bg-purple-500' : 'bg-gray-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.subtitle.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              {config.subtitle.enabled && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle Text</label>
                  <textarea
                    value={config.subtitle.text}
                    onChange={(e) => setConfig(prev => ({ ...prev, subtitle: { ...prev.subtitle, text: e.target.value } }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                    placeholder="Discover what makes us special"
                  />
                </div>
              )}
            </div>
          </div>
        );
      case 3: // Features
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Features</h3>
              <p className="text-gray-300">Configure your features and their descriptions</p>
            </div>
            <div className="space-y-6">
              {config.features.map((feature, index) => (
                <div key={feature.id} className="border border-gray-600 rounded-lg p-6 bg-gray-800/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Star size={20} className="text-gray-400" />
                      <span className="font-medium text-white">Feature {index + 1}: {feature.title}</span>
                    </div>
                    <button
                      onClick={() => {
                        const newFeatures = [...config.features];
                        newFeatures[index].isEnabled = !newFeatures[index].isEnabled;
                        setConfig(prev => ({ ...prev, features: newFeatures }));
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${feature.isEnabled ? 'bg-purple-500' : 'bg-gray-600'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${feature.isEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  {feature.isEnabled && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Feature Title</label>
                          <input
                            type="text"
                            value={feature.title}
                            onChange={(e) => {
                              const newFeatures = [...config.features];
                              newFeatures[index].title = e.target.value;
                              setConfig(prev => ({ ...prev, features: newFeatures }));
                            }}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                            placeholder="Easy to Use"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              const newFeatures = [...config.features];
                              newFeatures[index].isHighlighted = !newFeatures[index].isHighlighted;
                              setConfig(prev => ({ ...prev, features: newFeatures }));
                            }}
                            className={`px-3 py-2 rounded-lg text-sm transition-colors ${feature.isHighlighted ? 'bg-yellow-500 text-black' : 'bg-gray-600 text-gray-300'}`}
                          >
                            {feature.isHighlighted ? 'Highlighted' : 'Mark Highlighted'}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                        <textarea
                          value={feature.description}
                          onChange={(e) => {
                            const newFeatures = [...config.features];
                            newFeatures[index].description = e.target.value;
                            setConfig(prev => ({ ...prev, features: newFeatures }));
                          }}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                          placeholder="Describe this feature..."
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Icon Name</label>
                          <input
                            type="text"
                            value={feature.icon}
                            onChange={(e) => {
                              const newFeatures = [...config.features];
                              newFeatures[index].icon = e.target.value;
                              setConfig(prev => ({ ...prev, features: newFeatures }));
                            }}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                            placeholder="Zap"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">CTA Text (Optional)</label>
                          <input
                            type="text"
                            value={feature.ctaText || ''}
                            onChange={(e) => {
                              const newFeatures = [...config.features];
                              newFeatures[index].ctaText = e.target.value;
                              setConfig(prev => ({ ...prev, features: newFeatures }));
                            }}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                            placeholder="Learn More"
                          />
                        </div>
                      </div>
                      {feature.ctaText && (
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">CTA Link</label>
                          <input
                            type="text"
                            value={feature.ctaLink || ''}
                            onChange={(e) => {
                              const newFeatures = [...config.features];
                              newFeatures[index].ctaLink = e.target.value;
                              setConfig(prev => ({ ...prev, features: newFeatures }));
                            }}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                            placeholder="#"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <button
                onClick={() => {
                  const newFeature: Feature = {
                    id: `feature-${config.features.length + 1}`,
                    title: '',
                    description: '',
                    icon: 'Star',
                    isEnabled: true,
                    isHighlighted: false,
                  };
                  setConfig(prev => ({ ...prev, features: [...prev.features, newFeature] }));
                }}
                className="w-full p-4 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-gray-300 hover:border-gray-500 transition-colors"
              >
                + Add Feature
              </button>
            </div>
          </div>
        );
      case 4: // Layout & Display
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Layout & Display</h3>
              <p className="text-gray-300">Choose how your features are displayed</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Layout Style</label>
                <div className="grid grid-cols-2 gap-4">
                  {(['grid-2', 'grid-3', 'grid-4', 'list', 'cards', 'timeline'] as const).map((layout) => (
                    <button
                      key={layout}
                      onClick={() => setConfig(prev => ({ ...prev, layout }))}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${config.layout === layout ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'}`}
                    >
                      <div className="font-medium capitalize">{layout.replace('-', ' ')}</div>
                      <div className="text-xs opacity-75">
                        {layout === 'grid-2' && '2 columns grid'}
                        {layout === 'grid-3' && '3 columns grid'}
                        {layout === 'grid-4' && '4 columns grid'}
                        {layout === 'list' && 'Vertical list'}
                        {layout === 'cards' && 'Card layout'}
                        {layout === 'timeline' && 'Timeline style'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Text Alignment</label>
                <div className="grid grid-cols-3 gap-4">
                  {(['left', 'center', 'right'] as const).map((alignment) => (
                    <button
                      key={alignment}
                      onClick={() => setConfig(prev => ({ ...prev, alignment }))}
                      className={`p-4 rounded-lg border-2 transition-all text-center ${config.alignment === alignment ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'}`}
                    >
                      <div className="font-medium capitalize">{alignment}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 5: // Visual Elements
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Visual Elements</h3>
              <p className="text-gray-300">Choose which visual elements to display</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <Star size={20} className="text-gray-400" />
                  <span className="font-medium text-white">Show Feature Numbers</span>
                </div>
                <button
                  onClick={() => setConfig(prev => ({ ...prev, showNumbers: !prev.showNumbers }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.showNumbers ? 'bg-purple-500' : 'bg-gray-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.showNumbers ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <Star size={20} className="text-gray-400" />
                  <span className="font-medium text-white">Show Icons</span>
                </div>
                <button
                  onClick={() => setConfig(prev => ({ ...prev, showIcons: !prev.showIcons }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.showIcons ? 'bg-purple-500' : 'bg-gray-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.showIcons ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <Star size={20} className="text-gray-400" />
                  <span className="font-medium text-white">Show Images</span>
                </div>
                <button
                  onClick={() => setConfig(prev => ({ ...prev, showImages: !prev.showImages }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.showImages ? 'bg-purple-500' : 'bg-gray-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.showImages ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>
        );
      case 6: // Animations
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Animations</h3>
              <p className="text-gray-300">Choose animation effects for your features</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Animation Style</label>
              <div className="grid grid-cols-2 gap-4">
                {(['none', 'fade-in', 'slide-up', 'stagger'] as const).map((animation) => (
                  <button
                    key={animation}
                    onClick={() => setConfig(prev => ({ ...prev, animation }))}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${config.animation === animation ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'}`}
                  >
                    <div className="font-medium capitalize">{animation.replace('-', ' ')}</div>
                    <div className="text-xs opacity-75">
                      {animation === 'none' && 'No animations'}
                      {animation === 'fade-in' && 'Fade in effect'}
                      {animation === 'slide-up' && 'Slide up from bottom'}
                      {animation === 'stagger' && 'Staggered entrance'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 7: // Styling & Colors
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Styling & Visual Design</h3>
              <p className="text-gray-300">Customize every aspect of your features section's appearance</p>
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
                  color={config.design.primaryColor}
                  onChange={(color) => setConfig(prev => ({ ...prev, design: { ...prev.design, primaryColor: color } }))}
                  description="Main brand color for icons and highlights"
                />
                <ColorPicker
                  label="Secondary Color"
                  color={config.design.secondaryColor}
                  onChange={(color) => setConfig(prev => ({ ...prev, design: { ...prev.design, secondaryColor: color } }))}
                  description="Supporting color for accents and hover states"
                />
                <ColorPicker
                  label="Accent Color"
                  color={config.design.accentColor}
                  onChange={(color) => setConfig(prev => ({ ...prev, design: { ...prev.design, accentColor: color } }))}
                  description="Highlight color for special elements"
                />
                <ColorPicker
                  label="Background Color"
                  color={config.design.backgroundColor}
                  onChange={(color) => setConfig(prev => ({ ...prev, design: { ...prev.design, backgroundColor: color } }))}
                  description="Main background color of the features section"
                />
                <ColorPicker
                  label="Text Color"
                  color={config.design.textColor}
                  onChange={(color) => setConfig(prev => ({ ...prev, design: { ...prev.design, textColor: color } }))}
                  description="Color for all text content"
                />
              </div>
            </div>
            {/* Design Options */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <Paintbrush size={24} className="text-purple-400" />
                <h4 className="text-xl font-semibold text-white">Design Options</h4>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Theme</label>
                  <div className="space-y-2">
                    {(['light', 'dark', 'gradient', 'glassmorphism', 'minimal', 'bold'] as const).map((theme) => (
                      <button
                        key={theme}
                        onClick={() => setConfig(prev => ({ ...prev, design: { ...prev.design, theme } }))}
                        className={`w-full p-3 rounded-lg border-2 transition-all text-left ${config.design.theme === theme ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'}`}
                      >
                        <span className="capitalize">{theme}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Card Style</label>
                  <div className="space-y-2">
                    {(['elevated', 'flat', 'bordered', 'gradient'] as const).map((style) => (
                      <button
                        key={style}
                        onClick={() => setConfig(prev => ({ ...prev, design: { ...prev.design, cardStyle: style } }))}
                        className={`w-full p-3 rounded-lg border-2 transition-all text-left ${config.design.cardStyle === style ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'}`}
                      >
                        <span className="capitalize">{style}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Icon Style</label>
                  <div className="space-y-2">
                    {(['filled', 'outline', 'gradient'] as const).map((style) => (
                      <button
                        key={style}
                        onClick={() => setConfig(prev => ({ ...prev, design: { ...prev.design, iconStyle: style } }))}
                        className={`w-full p-3 rounded-lg border-2 transition-all text-left ${config.design.iconStyle === style ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'}`}
                      >
                        <span className="capitalize">{style}</span>
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
            <h3 className="text-xl font-semibold text-white mb-2">Step {currentStep}</h3>
            <p className="text-gray-300">Coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col border border-purple-700/50">
        <div className="p-4 border-b border-purple-700/50 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Advanced Features Builder</h2>
          <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          <div className="w-64 bg-gray-800/50 border-r border-purple-700/50 p-4 overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-4">Steps</h3>
            <ul className="space-y-2">
              {steps.map((step) => (
                <li key={step.id}>
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${
                      currentStep === step.id
                        ? 'bg-purple-700/30 text-purple-300 font-medium'
                        : 'text-gray-300 hover:bg-gray-700/30'
                    }`}
                  >
                    {step.icon}
                    <span>{step.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-grow p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {renderStepContent()}
          </div>
        </div>

        <div className="p-4 border-t border-purple-700/50 flex justify-between items-center">
          <button
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
              currentStep === 1
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            <ArrowLeft size={20} /> Back
          </button>
          <span className="text-sm text-gray-400">Step {currentStep} of {steps.length}</span>
          {currentStep === steps.length ? (
            <button
              onClick={() => onComplete(config)}
              disabled={!canGoNext()}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                canGoNext()
                  ? 'bg-green-600 text-white hover:bg-green-500'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Check size={20} /> Complete
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(prev => Math.min(steps.length, prev + 1))}
              disabled={!canGoNext()}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                canGoNext()
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturesBuilder;









