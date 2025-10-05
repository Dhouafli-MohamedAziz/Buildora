'use client';

import React, { useState, useEffect } from 'react';
import { Check, X, RefreshCw, Eye, Code } from 'lucide-react';

interface DynamicSectionRendererProps {
  sectionName: string;
  sectionCode: string;
  onApprove: () => void;
  onReject: () => void;
  onRegenerate: (feedback: string) => void;
  isGenerating?: boolean;
}

export default function DynamicSectionRenderer({
  sectionName,
  sectionCode,
  onApprove,
  onReject,
  onRegenerate,
  isGenerating = false
}: DynamicSectionRendererProps) {
  const [showCode, setShowCode] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sectionCode) {
      try {
        // Create a complete HTML document with TailwindCSS
        const htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Section Preview</title>
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
                body { margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
                .preview-container { width: 100%; min-height: 100vh; }
              </style>
            </head>
            <body>
              <div class="preview-container">
                ${sectionCode}
              </div>
            </body>
          </html>
        `;

        // Create a blob URL for the HTML content
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        // Set the iframe source
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.className = 'w-full h-full border-0';
        iframe.onload = () => {
          setError(null);
        };
        iframe.onerror = () => {
          setError('Erreur lors du chargement du composant');
        };

        // Clear previous content and add iframe
        const container = document.getElementById('component-preview');
        if (container) {
          container.innerHTML = '';
          container.appendChild(iframe);
        }

        // Cleanup function
        return () => {
          URL.revokeObjectURL(url);
        };
      } catch (err) {
        console.error('Error creating component preview:', err);
        setError('Erreur lors de la création du composant');
      }
    }
  }, [sectionCode]);

  const handleRegenerate = () => {
    if (feedback.trim()) {
      onRegenerate(feedback);
      setFeedback('');
      setShowFeedback(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="w-full bg-purple-50 border-l-4 border-purple-400 shadow-lg animate-pulse transition-all duration-700 ease-in-out">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-purple-700 font-medium">Génération en cours...</p>
            <p className="text-purple-600 text-sm">L'IA crée votre contenu</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      {/* Section Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            Section {sectionName}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCode(!showCode)}
              className="p-2 bg-white hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
              title="Voir le code"
            >
              <Code size={16} />
            </button>
            <button
              onClick={() => setShowFeedback(!showFeedback)}
              className="p-2 bg-white hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
              title="Donner un feedback"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Code View */}
      {showCode && (
        <div className="bg-gray-900 text-green-400 p-4 font-mono text-sm overflow-x-auto">
          <pre>{sectionCode}</pre>
        </div>
      )}

      {/* Component Preview */}
      <div id="component-preview" className="min-h-[400px] w-full">
        {error ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center text-red-600">
              <p className="font-medium mb-2">Erreur de rendu</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-20">
            <div className="text-center text-gray-400">
              <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-2 animate-spin"></div>
              <p className="text-xs">Chargement du composant...</p>
            </div>
          </div>
        )}
      </div>

      {/* Feedback Section */}
      {showFeedback && (
        <div className="bg-gray-50 border-t border-gray-200 p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Que souhaitez-vous modifier ?
          </h4>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Décrivez les modifications souhaitées... (ex: changer les couleurs, ajouter plus d'animations, modifier le texte, etc.)"
            className="w-full p-3 rounded-lg bg-white border border-gray-300 text-gray-700 placeholder-gray-400 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={3}
          />
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleRegenerate}
              disabled={!feedback.trim()}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors flex items-center space-x-2 disabled:cursor-not-allowed"
            >
              <RefreshCw size={16} />
              <span>Régénérer</span>
            </button>
            <button
              onClick={() => setShowFeedback(false)}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Approval Controls */}
      <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
        <div className="flex space-x-3">
          <button
            onClick={onApprove}
            className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <Check size={16} />
            <span>Approuver</span>
          </button>
          <button
            onClick={onReject}
            className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <X size={16} />
            <span>Rejeter</span>
          </button>
        </div>
      </div>
    </div>
  );
}
