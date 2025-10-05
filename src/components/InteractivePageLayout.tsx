'use client';

import React, { useState, useEffect } from 'react';
import { Check, X, RefreshCw, Sparkles, Eye } from 'lucide-react';

interface InteractivePageLayoutProps {
  selectedSections: string[];
  currentGeneratingSection: string | null;
  sectionApprovalStatus: Record<string, 'pending' | 'approved' | 'rejected'>;
  sectionCodes: Record<string, string>;
  currentSectionCode: string;
  showSectionPreview: boolean;
  isGeneratingSection: boolean;
  currentSectionIndex: number;
  onApprove: () => void;
  onReject: () => void;
  onRegenerate: (feedback: string) => void;
  projectName: string;
}



// SectionLoader component for generating state
const SectionLoader: React.FC<{ sectionName: string }> = ({ sectionName }) => (
  <div className="w-full h-24 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-dashed border-purple-200 rounded-lg flex items-center justify-center animate-pulse">
    <div className="text-center">
      <div className="w-6 h-6 border-2 border-purple-400 border-t-purple-600 rounded-full animate-spin mx-auto mb-2"></div>
      <p className="text-purple-600 text-sm font-medium">Generating {sectionName}...</p>
    </div>
  </div>
);

// Section component for rendered content
const Section: React.FC<{ 
  children: React.ReactNode; 
  isCurrent?: boolean;
  sectionName?: string;
  onApprove?: () => void;
  onReject?: () => void;
  onRegenerate?: (feedback: string) => void;
}> = ({ children, isCurrent = false, sectionName, onApprove, onReject, onRegenerate }) => {
  const [feedback, setFeedback] = useState('');

  return (
    <div
      className={`w-full relative transition-all duration-400 ease-in-out ${
        isCurrent ? 'ring-2 ring-purple-500 ring-opacity-50 rounded-lg shadow-lg' : ''
      }`}
      style={{ animation: 'fadeIn 0.4s ease-in-out' }}
    >
      <div className="w-full">
        {children}
      </div>
      
      {/* Current section overlay */}
      {isCurrent && (
        <div className="absolute inset-0 bg-gradient-to-t from-purple-50/30 via-transparent to-transparent pointer-events-none rounded-lg">
          <div className="absolute top-2 right-2 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>En cours de révision</span>
          </div>
          <div className="absolute top-2 left-2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            {sectionName}
          </div>
        </div>
      )}
    </div>
  );
};

const InteractivePageLayout: React.FC<InteractivePageLayoutProps> = ({
  selectedSections,
  currentGeneratingSection,
  sectionApprovalStatus,
  sectionCodes,
  currentSectionCode,
  showSectionPreview,
  isGeneratingSection,
  currentSectionIndex,
  onApprove,
  onReject,
  onRegenerate,
  projectName
}) => {
  const [feedback, setFeedback] = React.useState('');

  // Get all sections to display
  const getDisplaySections = () => {
    const sections = [];
    
    // Add approved sections
    selectedSections.forEach((sectionName, index) => {
      if (sectionApprovalStatus[sectionName] === 'approved' && sectionCodes[sectionName]) {
        sections.push({
          name: sectionName,
          code: sectionCodes[sectionName],
          isCurrent: false,
          isGenerating: false
        });
      }
    });

    // Add current section if it's being previewed
    if (showSectionPreview && selectedSections[currentSectionIndex] && sectionCodes[selectedSections[currentSectionIndex]]) {
      sections.push({
        name: selectedSections[currentSectionIndex],
        code: sectionCodes[selectedSections[currentSectionIndex]],
        isCurrent: true,
        isGenerating: false
      });
    }

    return sections;
  };

  const displaySections = getDisplaySections();

  // Generate complete HTML page
  const generateCompletePage = () => {
    const headContent = `
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${projectName}</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
        .fade-in { animation: fadeIn 0.5s ease-in; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .section { margin-bottom: 2rem; }
        .section:last-child { margin-bottom: 0; }
      </style>
    `;

    const bodyContent = displaySections.map(section => `
      <div class="section fade-in">
        ${section.code}
      </div>
    `).join('');

    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        ${headContent}
      </head>
      <body class="bg-white">
        <div class="min-h-screen">
          ${bodyContent}
        </div>
      </body>
      </html>
    `;
  };

           return (
      <div className="w-full max-w-none bg-white border-l border-gray-200 h-full flex flex-col">
        {/* Page Builder Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="bg-white min-h-full">
            {/* Page content */}
            <div className="w-full">
              {displaySections.length > 0 ? (
                <div className="w-full">
                                   {displaySections.map((section, index) => (
                   <div key={`${section.name}-${index}`} className="w-full">
                     <div 
                       dangerouslySetInnerHTML={{ __html: section.code }}
                       className="w-full"
                       style={{ 
                         fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                         lineHeight: '1.6'
                       }}
                     />
                   </div>
                 ))}
                </div>
             ) : (
               <div className="p-8 text-center text-gray-500">
                 <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                 <p className="text-lg font-medium mb-2">Votre landing page</p>
                 <p className="text-sm">Les sections générées apparaîtront ici</p>
               </div>
             )}

             {/* Show loader for currently generating section */}
             {isGeneratingSection && currentGeneratingSection && (
               <div key={`generating-${currentGeneratingSection}`} className="w-full">
                 <SectionLoader sectionName={currentGeneratingSection} />
               </div>
             )}

             {/* Show loader for sections that haven't started yet */}
             {selectedSections.map((sectionName, index) => {
               const isApproved = sectionApprovalStatus[sectionName] === 'approved';
               const hasCode = sectionCodes[sectionName];
               const isCurrent = sectionName === selectedSections[currentSectionIndex] && showSectionPreview;
               const isGenerating = currentGeneratingSection === sectionName;
               
               // Only show loader if section hasn't been processed yet
               if (!isApproved && !hasCode && !isCurrent && !isGenerating && index <= currentSectionIndex) {
                 return (
                   <div key={`waiting-${sectionName}`} className="w-full">
                     <SectionLoader sectionName={sectionName} />
                   </div>
                 );
               }
               
               return null;
             })}
           </div>
         </div>
       </div>

      

      {/* Progress indicator */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {Object.values(sectionApprovalStatus).filter(status => status === 'approved').length}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Progression</p>
              <p className="text-xs text-gray-500">
                {Object.values(sectionApprovalStatus).filter(status => status === 'approved').length} / {selectedSections.length} sections
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">
              {Math.round((Object.values(sectionApprovalStatus).filter(status => status === 'approved').length / selectedSections.length) * 100)}%
            </p>
          </div>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
            style={{ 
              width: `${(Object.values(sectionApprovalStatus).filter(status => status === 'approved').length / selectedSections.length) * 100}%` 
            }}
          ></div>
        </div>
      </div>

      {/* CSS for fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default InteractivePageLayout;
