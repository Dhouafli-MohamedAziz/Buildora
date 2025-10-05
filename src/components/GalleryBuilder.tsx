import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, X, Type, Info, Grid3X3, Sparkles, Eye, Filter, Zap, ImageIcon, Paintbrush } from 'lucide-react';

interface GalleryConfig {
  title: { text: string; enabled: boolean; };
  intro: { text: string; enabled: boolean; };
  layout: { type: 'grid' | 'masonry' | 'carousel'; columns: number; spacing: 'compact' | 'comfortable' | 'spacious'; };
  captions: { enabled: boolean; position: 'below' | 'overlay' | 'none'; };
  hoverEffects: { enabled: boolean; type: 'zoom' | 'overlay' | 'slide' | 'none'; };
  lightbox: { enabled: boolean; showNavigation: boolean; };
  categories: { enabled: boolean; items: string[]; };
  cta: { enabled: boolean; text: string; link: string; };
  images: { items: Array<{ id: string; file: File | null; preview: string | null; caption: string; category: string; }>; };
  styling: {
    customColors: { primary: string; secondary: string; accent: string; background: string; title: string; text: string; overlay: string; };
    typography: { fontFamily: 'sans' | 'serif' | 'mono' | 'display'; fontSize: 'small' | 'medium' | 'large'; fontWeight: 'normal' | 'medium' | 'bold'; };
    spacing: 'compact' | 'comfortable' | 'spacious';
    animations: 'none' | 'fade' | 'slide' | 'bounce';
  };
}

interface GalleryBuilderProps {
  projectName: string;
  onComplete: (config: GalleryConfig) => void;
  onBack: () => void;
}

const GalleryBuilder: React.FC<GalleryBuilderProps> = ({ projectName, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<GalleryConfig>({
    title: { text: '', enabled: true },
    intro: { text: '', enabled: false },
    layout: { type: 'grid', columns: 3, spacing: 'comfortable' },
    captions: { enabled: false, position: 'below' },
    hoverEffects: { enabled: true, type: 'zoom' },
    lightbox: { enabled: true, showNavigation: true },
    categories: { enabled: false, items: [] },
    cta: { enabled: false, text: '', link: '' },
    images: { items: [] },
    styling: {
      customColors: { primary: '#8b5cf6', secondary: '#ec4899', accent: '#f59e0b', background: '#1e293b', title: '#f8fafc', text: '#e2e8f0', overlay: '#00000080' },
      typography: { fontFamily: 'sans', fontSize: 'medium', fontWeight: 'medium' },
      spacing: 'comfortable',
      animations: 'fade',
    },
  });

  // Color picker component (reused from HeaderBuilder)
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
    { id: 2, title: 'Intro Text', icon: <Info size={20} /> },
    { id: 3, title: 'Layout & Grid', icon: <Grid3X3 size={20} /> },
    { id: 4, title: 'Captions', icon: <Type size={20} /> },
    { id: 5, title: 'Hover Effects', icon: <Sparkles size={20} /> },
    { id: 6, title: 'Lightbox', icon: <Eye size={20} /> },
    { id: 7, title: 'Categories', icon: <Filter size={20} /> },
    { id: 8, title: 'Call to Action', icon: <Zap size={20} /> },
    { id: 9, title: 'Images', icon: <ImageIcon size={20} /> },
    { id: 10, title: 'Styling & Colors', icon: <Paintbrush size={20} /> },
  ];

  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        return !config.title.enabled || config.title.text.trim() !== '';
      case 2:
        return !config.intro.enabled || config.intro.text.trim() !== '';
      case 8:
        return !config.cta.enabled || (config.cta.text.trim() !== '' && config.cta.link.trim() !== '');
      case 9:
        return config.images.items.length > 0;
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
               <p className="text-gray-300">Give your gallery a clear, descriptive title</p>
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
                     placeholder="Our Work"
                   />
                 </div>
               )}
             </div>
           </div>
         );
       case 2: // Intro Text
         return (
           <div className="space-y-6">
             <div className="text-center">
               <h3 className="text-xl font-semibold text-white mb-2">Intro Text</h3>
               <p className="text-gray-300">Add a brief description to explain what visitors will see</p>
             </div>
             <div className="space-y-4">
               <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                 <div className="flex items-center gap-3">
                   <Info size={20} className="text-gray-400" />
                   <span className="font-medium text-white">Enable Intro Text</span>
                 </div>
                 <button
                   onClick={() => setConfig(prev => ({ ...prev, intro: { ...prev.intro, enabled: !prev.intro.enabled } }))}
                   className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.intro.enabled ? 'bg-purple-500' : 'bg-gray-600'}`}
                 >
                   <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.intro.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                 </button>
               </div>
               {config.intro.enabled && (
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-2">Intro Text</label>
                   <textarea
                     value={config.intro.text}
                     onChange={(e) => setConfig(prev => ({ ...prev, intro: { ...prev.intro, text: e.target.value } }))}
                     rows={3}
                     className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                     placeholder="A collection of our latest projects and achievements."
                   />
                 </div>
               )}
             </div>
           </div>
         );
       case 3: // Layout & Grid
         return (
           <div className="space-y-6">
             <div className="text-center">
               <h3 className="text-xl font-semibold text-white mb-2">Layout & Grid</h3>
               <p className="text-gray-300">Choose how your images will be displayed</p>
             </div>
             <div className="space-y-6">
               <div>
                 <label className="block text-sm font-medium text-gray-300 mb-3">Layout Type</label>
                 <div className="grid grid-cols-3 gap-3">
                   {(['grid', 'masonry', 'carousel'] as const).map((type) => (
                     <button
                       key={type}
                       onClick={() => setConfig(prev => ({ ...prev, layout: { ...prev.layout, type } }))}
                       className={`p-4 rounded-lg border-2 transition-all text-center ${config.layout.type === type ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'}`}
                     >
                       <Grid3X3 size={24} className="mx-auto mb-2" />
                       <span className="capitalize">{type}</span>
                     </button>
                   ))}
                 </div>
               </div>
               {config.layout.type === 'grid' && (
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-3">Number of Columns</label>
                   <div className="grid grid-cols-4 gap-3">
                     {[2, 3, 4, 5].map((cols) => (
                       <button
                         key={cols}
                         onClick={() => setConfig(prev => ({ ...prev, layout: { ...prev.layout, columns: cols } }))}
                         className={`p-3 rounded-lg border-2 transition-all text-center ${config.layout.columns === cols ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'}`}
                       >
                         {cols} Cols
                       </button>
                     ))}
                   </div>
                 </div>
               )}
               <div>
                 <label className="block text-sm font-medium text-gray-300 mb-3">Spacing</label>
                 <div className="grid grid-cols-3 gap-3">
                   {(['compact', 'comfortable', 'spacious'] as const).map((spacing) => (
                     <button
                       key={spacing}
                       onClick={() => setConfig(prev => ({ ...prev, layout: { ...prev.layout, spacing } }))}
                       className={`p-3 rounded-lg border-2 transition-all text-center ${config.layout.spacing === spacing ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'}`}
                     >
                       <span className="capitalize">{spacing}</span>
                     </button>
                   ))}
                 </div>
               </div>
             </div>
           </div>
         );
       case 4: // Captions
         return (
           <div className="space-y-6">
             <div className="text-center">
               <h3 className="text-xl font-semibold text-white mb-2">Captions</h3>
               <p className="text-gray-300">Add descriptions to your images</p>
             </div>
             <div className="space-y-4">
               <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                 <div className="flex items-center gap-3">
                   <Type size={20} className="text-gray-400" />
                   <span className="font-medium text-white">Enable Captions</span>
                 </div>
                 <button
                   onClick={() => setConfig(prev => ({ ...prev, captions: { ...prev.captions, enabled: !prev.captions.enabled } }))}
                   className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.captions.enabled ? 'bg-purple-500' : 'bg-gray-600'}`}
                 >
                   <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.captions.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                 </button>
               </div>
               {config.captions.enabled && (
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-3">Caption Position</label>
                   <div className="grid grid-cols-3 gap-3">
                     {(['below', 'overlay', 'none'] as const).map((position) => (
                       <button
                         key={position}
                         onClick={() => setConfig(prev => ({ ...prev, captions: { ...prev.captions, position } }))}
                         className={`p-3 rounded-lg border-2 transition-all text-center ${config.captions.position === position ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'}`}
                       >
                         <span className="capitalize">{position}</span>
                       </button>
                     ))}
                   </div>
                 </div>
               )}
             </div>
           </div>
         );
       case 5: // Hover Effects
         return (
           <div className="space-y-6">
             <div className="text-center">
               <h3 className="text-xl font-semibold text-white mb-2">Hover Effects</h3>
               <p className="text-gray-300">Add interactive effects when users hover over images</p>
             </div>
             <div className="space-y-4">
               <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                 <div className="flex items-center gap-3">
                   <Sparkles size={20} className="text-gray-400" />
                   <span className="font-medium text-white">Enable Hover Effects</span>
                 </div>
                 <button
                   onClick={() => setConfig(prev => ({ ...prev, hoverEffects: { ...prev.hoverEffects, enabled: !prev.hoverEffects.enabled } }))}
                   className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.hoverEffects.enabled ? 'bg-purple-500' : 'bg-gray-600'}`}
                 >
                   <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.hoverEffects.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                 </button>
               </div>
               {config.hoverEffects.enabled && (
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-3">Effect Type</label>
                   <div className="grid grid-cols-2 gap-3">
                     {(['zoom', 'overlay', 'slide', 'none'] as const).map((type) => (
                       <button
                         key={type}
                         onClick={() => setConfig(prev => ({ ...prev, hoverEffects: { ...prev.hoverEffects, type } }))}
                         className={`p-4 rounded-lg border-2 transition-all text-center ${config.hoverEffects.type === type ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'}`}
                       >
                         <Sparkles size={24} className="mx-auto mb-2" />
                         <span className="capitalize">{type}</span>
                       </button>
                     ))}
                   </div>
                 </div>
               )}
             </div>
           </div>
         );
       case 6: // Lightbox
         return (
           <div className="space-y-6">
             <div className="text-center">
               <h3 className="text-xl font-semibold text-white mb-2">Lightbox Feature</h3>
               <p className="text-gray-300">Allow users to view images in full size</p>
             </div>
             <div className="space-y-4">
               <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                 <div className="flex items-center gap-3">
                   <Eye size={20} className="text-gray-400" />
                   <span className="font-medium text-white">Enable Lightbox</span>
                 </div>
                 <button
                   onClick={() => setConfig(prev => ({ ...prev, lightbox: { ...prev.lightbox, enabled: !prev.lightbox.enabled } }))}
                   className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.lightbox.enabled ? 'bg-purple-500' : 'bg-gray-600'}`}
                 >
                   <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.lightbox.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                 </button>
               </div>
               {config.lightbox.enabled && (
                 <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                   <div className="flex items-center gap-3">
                     <Eye size={20} className="text-gray-400" />
                     <span className="font-medium text-white">Show Navigation Arrows</span>
                   </div>
                   <button
                     onClick={() => setConfig(prev => ({ ...prev, lightbox: { ...prev.lightbox, showNavigation: !prev.lightbox.showNavigation } }))}
                     className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.lightbox.showNavigation ? 'bg-purple-500' : 'bg-gray-600'}`}
                   >
                     <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.lightbox.showNavigation ? 'translate-x-6' : 'translate-x-1'}`} />
                   </button>
                 </div>
               )}
             </div>
           </div>
         );
       case 7: // Categories
         return (
           <div className="space-y-6">
             <div className="text-center">
               <h3 className="text-xl font-semibold text-white mb-2">Categories & Filters</h3>
               <p className="text-gray-300">Organize your gallery with categories</p>
             </div>
             <div className="space-y-4">
               <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                 <div className="flex items-center gap-3">
                   <Filter size={20} className="text-gray-400" />
                   <span className="font-medium text-white">Enable Categories</span>
                 </div>
                 <button
                   onClick={() => setConfig(prev => ({ ...prev, categories: { ...prev.categories, enabled: !prev.categories.enabled } }))}
                   className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.categories.enabled ? 'bg-purple-500' : 'bg-gray-600'}`}
                 >
                   <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.categories.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                 </button>
               </div>
               {config.categories.enabled && (
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-2">Category Names (comma separated)</label>
                   <input
                     type="text"
                     value={config.categories.items.join(', ')}
                     onChange={(e) => setConfig(prev => ({ 
                       ...prev, 
                       categories: { 
                         ...prev.categories, 
                         items: e.target.value.split(',').map(item => item.trim()).filter(item => item.length > 0)
                       } 
                     }))}
                     className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                     placeholder="Web Design, Photography, Mobile Apps"
                   />
                 </div>
               )}
             </div>
           </div>
         );
       case 8: // Call to Action
         return (
           <div className="space-y-6">
             <div className="text-center">
               <h3 className="text-xl font-semibold text-white mb-2">Call to Action</h3>
               <p className="text-gray-300">Add a button below the gallery to guide visitors</p>
             </div>
             <div className="space-y-4">
               <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                 <div className="flex items-center gap-3">
                   <Zap size={20} className="text-gray-400" />
                   <span className="font-medium text-white">Enable CTA Button</span>
                 </div>
                 <button
                   onClick={() => setConfig(prev => ({ ...prev, cta: { ...prev.cta, enabled: !prev.cta.enabled } }))}
                   className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.cta.enabled ? 'bg-purple-500' : 'bg-gray-600'}`}
                 >
                   <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.cta.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                 </button>
               </div>
               {config.cta.enabled && (
                 <div className="space-y-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-300 mb-2">Button Text</label>
                     <input
                       type="text"
                       value={config.cta.text}
                       onChange={(e) => setConfig(prev => ({ ...prev, cta: { ...prev.cta, text: e.target.value } }))}
                       className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                       placeholder="See More Projects"
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-300 mb-2">Button Link</label>
                     <input
                       type="text"
                       value={config.cta.link}
                       onChange={(e) => setConfig(prev => ({ ...prev, cta: { ...prev.cta, link: e.target.value } }))}
                       className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                       placeholder="#contact"
                     />
                   </div>
                 </div>
               )}
             </div>
           </div>
         );
       case 9: // Images
         return (
           <div className="space-y-6">
             <div className="text-center">
               <h3 className="text-xl font-semibold text-white mb-2">Upload Images</h3>
               <p className="text-gray-300">Add images to your gallery</p>
             </div>
             <div className="space-y-4">
               <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center bg-gray-800/30">
                 <ImageIcon size={32} className="mx-auto mb-2 text-gray-500" />
                 <p className="text-gray-300">Click to upload images</p>
                 <p className="text-sm text-gray-500">PNG, JPG, SVG up to 5MB each</p>
                 <input
                   type="file"
                   accept="image/*"
                   multiple
                   onChange={(e) => {
                     const files = Array.from(e.target.files || []);
                     const newItems = files.map((file, index) => ({
                       id: `img-${Date.now()}-${index}`,
                       file,
                       preview: URL.createObjectURL(file),
                       caption: '',
                       category: config.categories.items[0] || 'All'
                     }));
                     setConfig(prev => ({
                       ...prev,
                       images: { items: [...prev.images.items, ...newItems] }
                     }));
                   }}
                   className="hidden"
                   id="gallery-upload"
                 />
                 <label htmlFor="gallery-upload" className="cursor-pointer">
                   <div className="mt-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors">
                     Choose Files
                   </div>
                 </label>
               </div>
               {config.images.items.length > 0 && (
                 <div className="space-y-4">
                   <h4 className="text-lg font-medium text-white">Uploaded Images ({config.images.items.length})</h4>
                   <div className="grid grid-cols-2 gap-4">
                     {config.images.items.map((item, index) => (
                       <div key={item.id} className="border border-gray-600 rounded-lg p-3 bg-gray-800/30">
                         <img src={item.preview} alt={`Image ${index + 1}`} className="w-full h-24 object-cover rounded mb-2" />
                         <input
                           type="text"
                           value={item.caption}
                           onChange={(e) => {
                             const newItems = [...config.images.items];
                             newItems[index].caption = e.target.value;
                             setConfig(prev => ({ ...prev, images: { items: newItems } }));
                           }}
                           className="w-full px-2 py-1 text-sm border border-gray-600 rounded bg-gray-800/50 text-white placeholder-gray-400"
                           placeholder="Image caption"
                         />
                       </div>
                     ))}
                   </div>
                 </div>
               )}
             </div>
           </div>
         );
       case 10: // Styling & Colors
         return (
           <div className="space-y-8">
             <div className="text-center">
               <h3 className="text-xl font-semibold text-white mb-2">Styling & Visual Design</h3>
               <p className="text-gray-300">Customize every aspect of your gallery's appearance</p>
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
                   onChange={(color) => setConfig(prev => ({ ...prev, styling: { ...prev.styling, customColors: { ...prev.styling.customColors, primary: color } } }))}
                   description="Main brand color for buttons and highlights"
                 />
                 <ColorPicker
                   label="Secondary Color"
                   color={config.styling.customColors.secondary}
                   onChange={(color) => setConfig(prev => ({ ...prev, styling: { ...prev.styling, customColors: { ...prev.styling.customColors, secondary: color } } }))}
                   description="Supporting color for accents and hover states"
                 />
                 <ColorPicker
                   label="Accent Color"
                   color={config.styling.customColors.accent}
                   onChange={(color) => setConfig(prev => ({ ...prev, styling: { ...prev.styling, customColors: { ...prev.styling.customColors, accent: color } } }))}
                   description="Highlight color for special elements"
                 />
                 <ColorPicker
                   label="Background Color"
                   color={config.styling.customColors.background}
                   onChange={(color) => setConfig(prev => ({ ...prev, styling: { ...prev.styling, customColors: { ...prev.styling.customColors, background: color } } }))}
                   description="Main background color of the gallery"
                 />
                 <ColorPicker
                   label="Title Color"
                   color={config.styling.customColors.title}
                   onChange={(color) => setConfig(prev => ({ ...prev, styling: { ...prev.styling, customColors: { ...prev.styling.customColors, title: color } } }))}
                   description="Color for section title and headings"
                 />
                 <ColorPicker
                   label="Text Color"
                   color={config.styling.customColors.text}
                   onChange={(color) => setConfig(prev => ({ ...prev, styling: { ...prev.styling, customColors: { ...prev.styling.customColors, text: color } } }))}
                   description="Color for body text and captions"
                 />
                 <ColorPicker
                   label="Overlay Color"
                   color={config.styling.customColors.overlay}
                   onChange={(color) => setConfig(prev => ({ ...prev, styling: { ...prev.styling, customColors: { ...prev.styling.customColors, overlay: color } } }))}
                   description="Color for image overlays and hover effects"
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
                         onClick={() => setConfig(prev => ({ ...prev, styling: { ...prev.styling, typography: { ...prev.styling.typography, fontFamily: font } } }))}
                         className={`w-full p-3 rounded-lg border-2 transition-all text-left ${config.styling.typography.fontFamily === font ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'}`}
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
                         onClick={() => setConfig(prev => ({ ...prev, styling: { ...prev.styling, typography: { ...prev.styling.typography, fontSize: size } } }))}
                         className={`w-full p-3 rounded-lg border-2 transition-all text-left ${config.styling.typography.fontSize === size ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'}`}
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
                         onClick={() => setConfig(prev => ({ ...prev, styling: { ...prev.styling, typography: { ...prev.styling.typography, fontWeight: weight } } }))}
                         className={`w-full p-3 rounded-lg border-2 transition-all text-left ${config.styling.typography.fontWeight === weight ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'}`}
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
                         onClick={() => setConfig(prev => ({ ...prev, styling: { ...prev.styling, spacing } }))}
                         className={`w-full p-3 rounded-lg border-2 transition-all text-left ${config.styling.spacing === spacing ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'}`}
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
                         onClick={() => setConfig(prev => ({ ...prev, styling: { ...prev.styling, animations: animation } }))}
                         className={`w-full p-3 rounded-lg border-2 transition-all text-left ${config.styling.animations === animation ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-gray-600 hover:border-gray-500 bg-gray-800/50 text-gray-300'}`}
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
          <h2 className="text-2xl font-bold text-white">Advanced Gallery Builder</h2>
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

export default GalleryBuilder;
