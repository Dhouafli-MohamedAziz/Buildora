import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, X, Type, Info, MessageSquare, ToggleLeft, Grid, Shield, HelpCircle, Zap, Paintbrush } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  quote: string;
  rating: number;
  company?: string;
  position?: string;
  photo?: string;
  isEnabled: boolean;
  isHighlighted: boolean;
}

interface TestimonialsConfig {
  title: { text: string; enabled: boolean; };
  subtitle: { text: string; enabled: boolean; };
  testimonials: Testimonial[];
  layout: 'grid-2' | 'grid-3' | 'carousel' | 'list' | 'cards';
  alignment: 'left' | 'center' | 'right';
  showPhotos: boolean;
  showStars: boolean;
  showCompanies: boolean;
  animation: 'none' | 'fade-in' | 'slide-up' | 'stagger';
  design: {
    theme: 'light' | 'dark' | 'gradient' | 'glassmorphism' | 'minimal' | 'bold';
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    textColor: string;
    backgroundColor: string;
    cardStyle: 'elevated' | 'flat' | 'bordered' | 'gradient';
    starStyle: 'filled' | 'outline' | 'gradient';
    typography: 'modern' | 'classic' | 'minimal' | 'bold';
  };
}

interface TestimonialsBuilderProps {
  projectName: string;
  onComplete: (config: TestimonialsConfig) => void;
  onBack: () => void;
}

const TestimonialsBuilder: React.FC<TestimonialsBuilderProps> = ({ projectName, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<TestimonialsConfig>({
    title: { text: 'What Our Clients Say', enabled: true },
    subtitle: { text: 'Real feedback from satisfied customers', enabled: true },
    testimonials: [
      {
        id: 'testimonial-1',
        name: 'Sarah Johnson',
        quote: 'This product has completely transformed how we work. The ease of use and powerful features make it a game-changer.',
        rating: 5,
        company: 'TechCorp',
        position: 'CEO',
        isEnabled: true,
        isHighlighted: false,
      },
      {
        id: 'testimonial-2',
        name: 'Michael Chen',
        quote: 'Outstanding customer service and a product that delivers on its promises. Highly recommended!',
        rating: 5,
        company: 'StartupXYZ',
        position: 'Founder',
        isEnabled: true,
        isHighlighted: true,
      },
      {
        id: 'testimonial-3',
        name: 'Emily Rodriguez',
        quote: 'The best investment we\'ve made this year. The ROI was immediate and continues to grow.',
        rating: 5,
        company: 'GrowthLabs',
        position: 'Marketing Director',
        isEnabled: true,
        isHighlighted: false,
      },
    ],
    layout: 'grid-3',
    alignment: 'center',
    showPhotos: true,
    showStars: true,
    showCompanies: true,
    animation: 'fade-in',
    design: {
      theme: 'light',
      primaryColor: '#8b5cf6',
      secondaryColor: '#ec4899',
      accentColor: '#f59e0b',
      textColor: '#1f2937',
      backgroundColor: '#ffffff',
      cardStyle: 'elevated',
      starStyle: 'filled',
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
    { id: 3, title: 'Testimonials', icon: <MessageSquare size={20} /> },
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
        return config.testimonials.some(testimonial => testimonial.isEnabled);
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
              <p className="text-gray-300">Give your testimonials section a compelling title</p>
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
                    placeholder="What Our Clients Say"
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
              <p className="text-gray-300">Add a brief description to introduce your testimonials</p>
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
                    placeholder="Real feedback from satisfied customers"
                  />
                </div>
              )}
            </div>
          </div>
        );
      case 3: // Testimonials
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Testimonials</h3>
              <p className="text-gray-300">Configure your customer testimonials and reviews</p>
            </div>
            <div className="space-y-6">
              {config.testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="border border-gray-600 rounded-lg p-6 bg-gray-800/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <MessageSquare size={20} className="text-gray-400" />
                      <span className="font-medium text-white">Testimonial {index + 1}: {testimonial.name}</span>
                    </div>
                    <button
                      onClick={() => {
                        const newTestimonials = [...config.testimonials];
                        newTestimonials[index].isEnabled = !newTestimonials[index].isEnabled;
                        setConfig(prev => ({ ...prev, testimonials: newTestimonials }));
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${testimonial.isEnabled ? 'bg-purple-500' : 'bg-gray-600'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${testimonial.isEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  {testimonial.isEnabled && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Customer Name</label>
                          <input
                            type="text"
                            value={testimonial.name}
                            onChange={(e) => {
                              const newTestimonials = [...config.testimonials];
                              newTestimonials[index].name = e.target.value;
                              setConfig(prev => ({ ...prev, testimonials: newTestimonials }));
                            }}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                            placeholder="Sarah Johnson"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              const newTestimonials = [...config.testimonials];
                              newTestimonials[index].isHighlighted = !newTestimonials[index].isHighlighted;
                              setConfig(prev => ({ ...prev, testimonials: newTestimonials }));
                            }}
                            className={`px-3 py-2 rounded-lg text-sm transition-colors ${testimonial.isHighlighted ? 'bg-yellow-500 text-black' : 'bg-gray-600 text-gray-300'}`}
                          >
                            {testimonial.isHighlighted ? 'Highlighted' : 'Mark Highlighted'}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Testimonial Quote</label>
                        <textarea
                          value={testimonial.quote}
                          onChange={(e) => {
                            const newTestimonials = [...config.testimonials];
                            newTestimonials[index].quote = e.target.value;
                            setConfig(prev => ({ ...prev, testimonials: newTestimonials }));
                          }}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                          placeholder="Write the customer testimonial here..."
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Rating (1-5)</label>
                          <input
                            type="number"
                            min="1"
                            max="5"
                            value={testimonial.rating}
                            onChange={(e) => {
                              const newTestimonials = [...config.testimonials];
                              newTestimonials[index].rating = parseInt(e.target.value) || 5;
                              setConfig(prev => ({ ...prev, testimonials: newTestimonials }));
                            }}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                            placeholder="5"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                          <input
                            type="text"
                            value={testimonial.company || ''}
                            onChange={(e) => {
                              const newTestimonials = [...config.testimonials];
                              newTestimonials[index].company = e.target.value;
                              setConfig(prev => ({ ...prev, testimonials: newTestimonials }));
                            }}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                            placeholder="TechCorp"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Position</label>
                          <input
                            type="text"
                            value={testimonial.position || ''}
                            onChange={(e) => {
                              const newTestimonials = [...config.testimonials];
                              newTestimonials[index].position = e.target.value;
                              setConfig(prev => ({ ...prev, testimonials: newTestimonials }));
                            }}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                            placeholder="CEO"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <button
                onClick={() => {
                  const newTestimonial: Testimonial = {
                    id: `testimonial-${config.testimonials.length + 1}`,
                    name: '',
                    quote: '',
                    rating: 5,
                    isEnabled: true,
                    isHighlighted: false,
                  };
                  setConfig(prev => ({ ...prev, testimonials: [...prev.testimonials, newTestimonial] }));
                }}
                className="w-full p-4 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-gray-300 hover:border-gray-500 transition-colors"
              >
                + Add Testimonial
              </button>
            </div>
          </div>
        );
      case 4: // Layout & Display
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Layout & Display</h3>
              <p className="text-gray-300">Choose how your testimonials are displayed</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Layout Style</label>
                <div className="grid grid-cols-2 gap-4">
                  {(['grid-2', 'grid-3', 'carousel', 'list', 'cards'] as const).map((layout) => (
                    <button
                      key={layout}
                      onClick={() => setConfig(prev => ({ ...prev, layout }))}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${config.layout === layout ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'}`}
                    >
                      <div className="font-medium capitalize">{layout.replace('-', ' ')}</div>
                      <div className="text-xs opacity-75">
                        {layout === 'grid-2' && '2 columns grid'}
                        {layout === 'grid-3' && '3 columns grid'}
                        {layout === 'carousel' && 'Horizontal carousel'}
                        {layout === 'list' && 'Vertical list'}
                        {layout === 'cards' && 'Card layout'}
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
                  <MessageSquare size={20} className="text-gray-400" />
                  <span className="font-medium text-white">Show Customer Photos</span>
                </div>
                <button
                  onClick={() => setConfig(prev => ({ ...prev, showPhotos: !prev.showPhotos }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.showPhotos ? 'bg-purple-500' : 'bg-gray-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.showPhotos ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <MessageSquare size={20} className="text-gray-400" />
                  <span className="font-medium text-white">Show Star Ratings</span>
                </div>
                <button
                  onClick={() => setConfig(prev => ({ ...prev, showStars: !prev.showStars }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.showStars ? 'bg-purple-500' : 'bg-gray-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.showStars ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <MessageSquare size={20} className="text-gray-400" />
                  <span className="font-medium text-white">Show Company Names</span>
                </div>
                <button
                  onClick={() => setConfig(prev => ({ ...prev, showCompanies: !prev.showCompanies }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.showCompanies ? 'bg-purple-500' : 'bg-gray-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.showCompanies ? 'translate-x-6' : 'translate-x-1'}`} />
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
              <p className="text-gray-300">Choose animation effects for your testimonials</p>
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
              <p className="text-gray-300">Customize every aspect of your testimonials section's appearance</p>
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
                  description="Main brand color for accents and highlights"
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
                  description="Main background color of the testimonials section"
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
                  <label className="block text-sm font-medium text-gray-300 mb-3">Star Style</label>
                  <div className="space-y-2">
                    {(['filled', 'outline', 'gradient'] as const).map((style) => (
                      <button
                        key={style}
                        onClick={() => setConfig(prev => ({ ...prev, design: { ...prev.design, starStyle: style } }))}
                        className={`w-full p-3 rounded-lg border-2 transition-all text-left ${config.design.starStyle === style ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'}`}
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
          <h2 className="text-2xl font-bold text-white">Advanced Testimonials Builder</h2>
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

export default TestimonialsBuilder;









