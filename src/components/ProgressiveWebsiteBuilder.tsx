'use client';

import React, { useState, useEffect } from 'react';

interface ProgressiveWebsiteBuilderProps {
  selectedSections: string[];
  sectionCodes: { [key: string]: string };
  currentSectionIndex: number;
  isGeneratingSection: boolean;
  currentGeneratingSection: string | null;
  onApprove: () => void;
  onRegenerate: (feedback: string) => void;
}

export default function ProgressiveWebsiteBuilder({
  selectedSections,
  sectionCodes,
  currentSectionIndex,
  isGeneratingSection,
  currentGeneratingSection,
  onApprove,
  onRegenerate
}: ProgressiveWebsiteBuilderProps) {
  const [error, setError] = useState<string | null>(null);



  // Show only the current section being reviewed
  const createCurrentSectionHTML = () => {
    const currentSection = selectedSections[currentSectionIndex];
    const currentSectionCode = sectionCodes[currentSection];

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Website Preview</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
            .website-container { width: 100%; min-height: 100vh; }
            .loading-section { 
              background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
              background-size: 200% 100%;
              animation: loading 1.5s infinite;
              min-height: 200px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 2px dashed #d1d5db;
              border-radius: 8px;
              margin: 20px 0;
            }
            @keyframes loading {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          </style>
        </head>
        <body>
          <div class="website-container">
            ${currentSectionCode || ''}
            
            ${isGeneratingSection ? `
            <div class="loading-section">
              <div style="text-align: center; color: #6b7280;">
                <div style="width: 40px; height: 40px; border: 3px solid #e5e7eb; border-top: 3px solid #8b5cf6; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 16px;"></div>
                <p style="font-weight: 500; margin: 0 0 8px;">Génération en cours...</p>
                <p style="font-size: 14px; margin: 0;">Section ${currentGeneratingSection}</p>
              </div>
            </div>
            ` : ''}
          </div>
        </body>
      </html>
    `;
  };

  const currentSection = selectedSections[currentSectionIndex];
  const currentSectionCode = sectionCodes[currentSection];
  
  // Simple debug logging
  console.log('🎨 ProgressiveWebsiteBuilder:', {
    currentSection,
    currentSectionIndex,
    hasCurrentSectionCode: !!currentSectionCode,
    currentSectionCodeLength: currentSectionCode?.length || 0,
    sectionCodesKeys: Object.keys(sectionCodes),
    contentPreview: currentSectionCode?.substring(0, 200) + '...'
  });

  return (
    <div className="w-full h-full bg-white">
      {/* Current Section Preview */}
      <div className="w-full h-full">
        {error ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center text-red-600">
              <p className="font-medium mb-2">Erreur de rendu</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
                          ) : currentSectionCode ? (
            <div className="w-full h-full">
              {/* Debug indicator */}
              <div className="bg-blue-100 p-2 text-xs text-blue-800 border-b">
                Content found! Section: {currentSection}, Length: {currentSectionCode.length} chars
              </div>
              
              {/* Try iframe approach */}
              <iframe
                srcDoc={`
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <script src="https://cdn.tailwindcss.com"></script>
                      <style>
                        body { margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
                      </style>
                    </head>
                    <body>
                      ${currentSectionCode}
                    </body>
                  </html>
                `}
                className="w-full h-full border-0"
                title="Section Preview"
              />
            </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center text-gray-400 mb-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-2 animate-spin"></div>
              <p className="text-xs">Aucun contenu généré trouvé</p>
            </div>
            
            {/* Debug Info */}
            <div className="bg-gray-100 p-4 rounded-lg text-xs text-gray-600 max-w-md">
              <p><strong>Debug Info:</strong></p>
              <p>Current Section Index: {currentSectionIndex}</p>
              <p>Selected Sections: {selectedSections.join(', ')}</p>
              <p>Current Section: {selectedSections[currentSectionIndex]}</p>
              <p>Section Codes Keys: {Object.keys(sectionCodes).join(', ')}</p>
              <p>Has Current Section Code: {!!sectionCodes[selectedSections[currentSectionIndex]] ? 'Yes' : 'No'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
