'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';
import AdvancedNavbar from '@/components/UserNavbar';
import { Check, ArrowRight } from 'lucide-react';

interface ColorPalette {
  name: string;
  colors: string[];
  gradient: string;
  description: string;
}

interface GradientShowcase {
  name: string;
  gradient: string;
  category: 'primary' | 'secondary' | 'accent' | 'background';
}

interface DesignSelections {
  colorPalette: ColorPalette | null;
  gradients: GradientShowcase[];
  effects: string[];
}

export default function DesignStudioPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'colors' | 'gradients' | 'effects' | 'components'>('colors');
  const [selectedGradient, setSelectedGradient] = useState<string | null>(null);
  
  // Design selections state
  const [selections, setSelections] = useState<DesignSelections>({
    colorPalette: null,
    gradients: [],
    effects: []
  });

  // Load saved selections from localStorage
  useEffect(() => {
    const savedSelections = localStorage.getItem('buildora-design-selections');
    if (savedSelections) {
      setSelections(JSON.parse(savedSelections));
    }
  }, []);

  // Save selections to localStorage
  const saveSelections = (newSelections: DesignSelections) => {
    setSelections(newSelections);
    localStorage.setItem('buildora-design-selections', JSON.stringify(newSelections));
  };

  const colorPalettes: ColorPalette[] = [
    {
      name: 'Primary Brand',
      colors: ['#8B5CF6', '#A855F7', '#C084FC', '#DDD6FE'],
      gradient: 'from-purple-500 via-pink-500 to-blue-500',
      description: 'Main brand colors for primary elements'
    },
    {
      name: 'Neon Vibes',
      colors: ['#FF0080', '#FF8C00', '#40E0D0', '#EE82EE'],
      gradient: 'from-pink-500 via-orange-500 to-cyan-500',
      description: 'Vibrant neon colors for high-impact sections'
    },
    {
      name: 'Ocean Dreams',
      colors: ['#0EA5E9', '#06B6D4', '#0891B2', '#0C4A6E'],
      gradient: 'from-blue-500 via-cyan-500 to-blue-700',
      description: 'Calming ocean tones for professional look'
    },
    {
      name: 'Sunset Glow',
      colors: ['#F59E0B', '#EF4444', '#EC4899', '#8B5CF6'],
      gradient: 'from-yellow-500 via-red-500 to-purple-500',
      description: 'Warm sunset colors for emotional appeal'
    },
    {
      name: 'Forest Magic',
      colors: ['#10B981', '#059669', '#047857', '#065F46'],
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      description: 'Nature-inspired greens for organic feel'
    },
    {
      name: 'Midnight Elegance',
      colors: ['#1E293B', '#334155', '#475569', '#64748B'],
      gradient: 'from-slate-800 via-slate-700 to-slate-600',
      description: 'Sophisticated dark tones for premium look'
    }
  ];

  const gradients: GradientShowcase[] = [
    // Primary Gradients
    { name: 'Purple to Pink', gradient: 'from-purple-500 to-pink-500', category: 'primary' },
    { name: 'Blue to Purple', gradient: 'from-blue-500 to-purple-500', category: 'primary' },
    { name: 'Pink to Orange', gradient: 'from-pink-500 to-orange-500', category: 'primary' },
    { name: 'Cyan to Blue', gradient: 'from-cyan-500 to-blue-500', category: 'primary' },
    
    // Secondary Gradients
    { name: 'Green to Blue', gradient: 'from-green-500 to-blue-500', category: 'secondary' },
    { name: 'Yellow to Red', gradient: 'from-yellow-500 to-red-500', category: 'secondary' },
    { name: 'Purple to Cyan', gradient: 'from-purple-500 to-cyan-500', category: 'secondary' },
    { name: 'Orange to Pink', gradient: 'from-orange-500 to-pink-500', category: 'secondary' },
    
    // Accent Gradients
    { name: 'Rainbow', gradient: 'from-red-500 via-yellow-500 to-blue-500', category: 'accent' },
    { name: 'Neon', gradient: 'from-pink-500 via-purple-500 to-cyan-500', category: 'accent' },
    { name: 'Sunset', gradient: 'from-orange-500 via-red-500 to-purple-500', category: 'accent' },
    { name: 'Ocean', gradient: 'from-blue-500 via-cyan-500 to-teal-500', category: 'accent' },
    
    // Background Gradients
    { name: 'Dark Purple', gradient: 'from-slate-900 via-purple-900 to-slate-900', category: 'background' },
    { name: 'Midnight', gradient: 'from-gray-900 via-slate-800 to-gray-900', category: 'background' },
    { name: 'Deep Ocean', gradient: 'from-blue-900 via-slate-900 to-blue-900', category: 'background' },
    { name: 'Cosmic', gradient: 'from-purple-900 via-pink-900 to-purple-900', category: 'background' }
  ];

  const visualEffects = [
    {
      name: 'Glass Morphism',
      description: 'Backdrop blur with transparency',
      className: 'bg-white/10 backdrop-blur-xl border border-white/10',
      code: 'bg-white/10 backdrop-blur-xl border border-white/10'
    },
    {
      name: 'Glow Effect',
      description: 'Box shadow with color glow',
      className: 'shadow-lg shadow-purple-500/25',
      code: 'shadow-lg shadow-purple-500/25'
    },
    {
      name: 'Hover Scale',
      description: 'Transform scale on hover',
      className: 'hover:scale-105 transition-transform duration-300',
      code: 'hover:scale-105 transition-transform duration-300'
    },
    {
      name: 'Gradient Text',
      description: 'Text with gradient background',
      className: 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent',
      code: 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'
    },
    {
      name: 'Animated Border',
      description: 'Border with gradient animation',
      className: 'border border-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-border',
      code: 'border border-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-border'
    },
    {
      name: 'Pulse Animation',
      description: 'Subtle pulse effect',
      className: 'animate-pulse',
      code: 'animate-pulse'
    }
  ];

  const filteredGradients = gradients.filter(g => 
    activeTab === 'gradients' 
  );

  // Selection handlers
  const handleColorPaletteSelect = (palette: ColorPalette) => {
    const newSelections = { ...selections, colorPalette: palette };
    saveSelections(newSelections);
  };

  const handleGradientSelect = (gradient: GradientShowcase) => {
    const isSelected = selections.gradients.some(g => g.name === gradient.name);
    let newGradients;
    
    if (isSelected) {
      newGradients = selections.gradients.filter(g => g.name !== gradient.name);
    } else {
      newGradients = [...selections.gradients, gradient];
    }
    
    const newSelections = { ...selections, gradients: newGradients };
    saveSelections(newSelections);
  };

  const handleEffectSelect = (effectCode: string) => {
    const isSelected = selections.effects.includes(effectCode);
    let newEffects;
    
    if (isSelected) {
      newEffects = selections.effects.filter(e => e !== effectCode);
    } else {
      newEffects = [...selections.effects, effectCode];
    }
    
    const newSelections = { ...selections, effects: newEffects };
    saveSelections(newSelections);
  };

  const handleCreateLandingPage = () => {
    // Create design description from selections
    let designDescription = "Design preferences: ";
    
    if (selections.colorPalette) {
      designDescription += `Color palette: ${selections.colorPalette.name} (${selections.colorPalette.colors.join(', ')}). `;
    }
    
    if (selections.gradients.length > 0) {
      designDescription += `Gradients: ${selections.gradients.map(g => g.name).join(', ')}. `;
    }
    
    if (selections.effects.length > 0) {
      designDescription += `Effects: ${selections.effects.length} visual effects selected. `;
    }

    // Save design description to localStorage for dashboard to use
    localStorage.setItem('buildora-design-description', designDescription);
    
    // Redirect to dashboard
    router.push('/dashboard');
  };

  const isSelected = (item: any, type: 'palette' | 'gradient' | 'effect') => {
    switch (type) {
      case 'palette':
        return selections.colorPalette?.name === item.name;
      case 'gradient':
        return selections.gradients.some(g => g.name === item.name);
      case 'effect':
        return selections.effects.includes(item.code);
      default:
        return false;
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col w-screen h-screen overflow-hidden text-white">
        {/* Animated background blobs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div 
            className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
            style={{ left: '20%', top: '10%' }}
          />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-bounce" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        </div>
        
        {/* Advanced Navbar */}
        <AdvancedNavbar />
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-0 w-full h-full pt-16 relative z-10">
          <div className="flex-1 min-h-0 w-full h-full overflow-y-auto">
            <div className="max-w-7xl mx-auto px-6 py-8">
              
              {/* Header Section */}
              <div className="mb-8 text-center">
                <h1 className="text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    Design Studio
                  </span>
                </h1>
                <p className="text-xl text-gray-400 mb-4">Select your design preferences for your landing page</p>
                
                {/* Selection Summary */}
                {(selections.colorPalette || selections.gradients.length > 0 || selections.effects.length > 0) && (
                  <div className="mb-6 p-4 bg-white/10 backdrop-blur-xl rounded-xl border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-2">Selected Design Elements:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selections.colorPalette && (
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                          🎨 {selections.colorPalette.name}
                        </span>
                      )}
                      {selections.gradients.map((gradient, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                          🌈 {gradient.name}
                        </span>
                      ))}
                      {selections.effects.length > 0 && (
                        <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                          ✨ {selections.effects.length} effects
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleCreateLandingPage}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-medium transition-all"
                  >
                    Create Landing Page with Selected Design
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                  
                  {(selections.colorPalette || selections.gradients.length > 0 || selections.effects.length > 0) && (
                    <button
                      onClick={() => {
                        saveSelections({ colorPalette: null, gradients: [], effects: [] });
                        localStorage.removeItem('buildora-design-selections');
                      }}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all border border-white/20"
                    >
                      Clear All Selections
                    </button>
                  )}
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="mb-8 flex justify-center">
                <div className="bg-white/10 backdrop-blur-xl rounded-xl p-1 border border-white/10">
                  <div className="flex">
                    {[
                      { id: 'colors', label: 'Color Palettes', icon: '🎨' },
                      { id: 'gradients', label: 'Gradients', icon: '🌈' },
                      { id: 'effects', label: 'Visual Effects', icon: '✨' },
                      { id: 'components', label: 'Components', icon: '🧩' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        <span className="mr-2">{tab.icon}</span>
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Color Palettes Section */}
              {activeTab === 'colors' && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-white text-center mb-8">Color Palettes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {colorPalettes.map((palette, index) => (
                      <div 
                        key={index} 
                        className={`relative cursor-pointer bg-white/10 backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
                          isSelected(palette, 'palette') 
                            ? 'border-purple-500 bg-purple-500/20' 
                            : 'border-white/10 hover:border-purple-500/30'
                        }`}
                        onClick={() => handleColorPaletteSelect(palette)}
                      >
                        {/* Selection indicator */}
                        {isSelected(palette, 'palette') && (
                          <div className="absolute top-4 right-4 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                        
                        <h3 className="text-xl font-bold text-white mb-4">{palette.name}</h3>
                        <p className="text-gray-400 mb-6">{palette.description}</p>
                        
                        {/* Color Swatches */}
                        <div className="flex space-x-2 mb-4">
                          {palette.colors.map((color, colorIndex) => (
                            <div
                              key={colorIndex}
                              className="w-12 h-12 rounded-lg border-2 border-white/20"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        
                        {/* Gradient Preview */}
                        <div className={`w-full h-16 rounded-lg bg-gradient-to-r ${palette.gradient} mb-4`}></div>
                        
                        {/* Color Codes */}
                        <div className="space-y-2">
                          {palette.colors.map((color, colorIndex) => (
                            <div key={colorIndex} className="flex items-center justify-between text-sm">
                              <span className="text-gray-300">Color {colorIndex + 1}</span>
                              <span className="text-gray-400 font-mono">{color}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gradients Section */}
              {activeTab === 'gradients' && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-white text-center mb-8">Gradient Collection</h2>
                  
                  {/* Category Filters */}
                  <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {['primary', 'secondary', 'accent', 'background'].map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveTab(category as any)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          activeTab === category
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : 'bg-white/10 text-gray-300 hover:text-white'
                        }`}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredGradients.map((gradient, index) => (
                      <div
                        key={index}
                        className={`group cursor-pointer relative ${
                          isSelected(gradient, 'gradient') ? 'ring-2 ring-purple-500' : ''
                        }`}
                        onClick={() => handleGradientSelect(gradient)}
                      >
                        {/* Selection indicator */}
                        {isSelected(gradient, 'gradient') && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center z-10">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                        
                        <div className={`w-full h-32 rounded-2xl bg-gradient-to-r ${gradient.gradient} mb-3 transition-transform duration-300 group-hover:scale-105`}></div>
                        <h3 className="text-white font-medium text-center">{gradient.name}</h3>
                        <p className="text-gray-400 text-sm text-center">{gradient.category}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Visual Effects Section */}
              {activeTab === 'effects' && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-white text-center mb-8">Visual Effects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visualEffects.map((effect, index) => (
                      <div 
                        key={index} 
                        className={`relative cursor-pointer bg-white/10 backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
                          isSelected(effect, 'effect') 
                            ? 'border-purple-500 bg-purple-500/20' 
                            : 'border-white/10 hover:border-purple-500/30'
                        }`}
                        onClick={() => handleEffectSelect(effect.code)}
                      >
                        {/* Selection indicator */}
                        {isSelected(effect, 'effect') && (
                          <div className="absolute top-4 right-4 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                        
                        <h3 className="text-lg font-bold text-white mb-3">{effect.name}</h3>
                        <p className="text-gray-400 text-sm mb-4">{effect.description}</p>
                        
                        {/* Effect Preview */}
                        <div className={`w-full h-20 rounded-lg ${effect.className} mb-4 flex items-center justify-center`}>
                          <span className="text-white font-medium">Preview</span>
                        </div>
                        
                        {/* Code */}
                        <div className="bg-slate-800 rounded-lg p-3">
                          <code className="text-green-400 text-xs">{effect.code}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Components Section */}
              {activeTab === 'components' && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-white text-center mb-8">Styled Components</h2>
                  
                  {/* Buttons */}
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                    <h3 className="text-2xl font-bold text-white mb-6">Buttons</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-medium transition-all">
                        Primary
                      </button>
                      <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all border border-white/20">
                        Secondary
                      </button>
                      <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl font-medium transition-all">
                        Accent
                      </button>
                      <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-medium transition-all">
                        Success
                      </button>
                    </div>
                  </div>

                  {/* Cards */}
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                    <h3 className="text-2xl font-bold text-white mb-6">Cards</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                        <h4 className="text-lg font-bold text-white mb-2">Gradient Card</h4>
                        <p className="text-gray-300">Beautiful gradient background</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                        <h4 className="text-lg font-bold text-white mb-2">Glass Card</h4>
                        <p className="text-gray-300">Glass morphism effect</p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                        <h4 className="text-lg font-bold text-white mb-2">Accent Card</h4>
                        <p className="text-gray-300">Blue accent colors</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Selected Gradient Modal */}
              {selectedGradient && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full mx-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">Gradient Code</h3>
                      <button
                        onClick={() => setSelectedGradient(null)}
                        className="text-gray-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                    <div className={`w-full h-32 rounded-lg bg-gradient-to-r ${selectedGradient} mb-4`}></div>
                    <div className="bg-slate-900 rounded-lg p-3">
                      <code className="text-green-400 text-sm">bg-gradient-to-r {selectedGradient}</code>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
} 