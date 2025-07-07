'use client';

import { useState } from 'react';
import { Layout } from 'lucide-react';

interface Theme {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}

const themes: Theme[] = [
  {
    name: "Electric Gold",
    primaryColor: "#FFD700",
    secondaryColor: "#000000",
    fontFamily: "Poppins"
  },
  {
    name: "Ocean Blue",
    primaryColor: "#1E90FF",
    secondaryColor: "#87CEEB",
    fontFamily: "Inter"
  },
  {
    name: "Forest Green",
    primaryColor: "#228B22",
    secondaryColor: "#90EE90",
    fontFamily: "Montserrat"
  }
];

const styleOptions = [
  { value: 'bold', label: 'Bold' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'modern', label: 'Modern' },
  { value: 'classic', label: 'Classic' }
];

export default function StyleSelector() {
  const [selectedStyle, setSelectedStyle] = useState('bold');
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Select Style</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {styleOptions.map((style) => (
            <button
              key={style.value}
              onClick={() => setSelectedStyle(style.value)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedStyle === style.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-center mb-2">
                <Layout size={20} className="text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {style.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Select Theme</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => setSelectedTheme(theme)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedTheme.name === theme.name
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div 
                className="h-24 rounded-lg mb-2"
                style={{
                  background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`
                }}
              />
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  {theme.name}
                </span>
                <span className="text-xs text-gray-500">
                  {theme.fontFamily}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Preview</h4>
        <div 
          className="p-4 rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${selectedTheme.primaryColor}, ${selectedTheme.secondaryColor})`,
            fontFamily: selectedTheme.fontFamily
          }}
        >
          <h3 className="text-lg font-bold text-white mb-2">Sample Heading</h3>
          <p className="text-white/80">This is a preview of how your content will look with the selected style and theme.</p>
        </div>
      </div>
    </div>
  );
} 