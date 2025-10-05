'use client';

import { useState } from 'react';
import { Check, X, RefreshCw, Eye, Code } from 'lucide-react';

interface SectionPreviewProps {
  sectionName: string;
  sectionCode: string;
  projectName: string;
  onApprove: () => void;
  onRegenerate: (feedback: string) => void;
  onViewCode: () => void;
  isGenerating?: boolean;
}

export default function SectionPreview({
  sectionName,
  sectionCode,
  projectName,
  onApprove,
  onRegenerate,
  onViewCode,
  isGenerating = false
}: SectionPreviewProps) {
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const handleRegenerate = () => {
    if (feedback.trim()) {
      onRegenerate(feedback);
      setFeedback('');
      setShowFeedback(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">
          Section {sectionName}
        </h3>
                 <div className="flex gap-2">
           <button
             onClick={onViewCode}
             disabled={isGenerating}
             className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
             title="Voir le code"
           >
             <Code size={16} />
           </button>
           <button
             onClick={() => setShowFeedback(!showFeedback)}
             disabled={isGenerating}
             className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
             title="Donner un feedback"
           >
             <RefreshCw size={16} />
           </button>
         </div>
      </div>

      {/* Section Preview */}
      <div className="bg-white rounded-lg overflow-hidden mb-4 shadow-lg">
        <div className="bg-gray-100 px-4 py-2 border-b flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Aperçu</span>
          <Eye size={16} className="text-gray-500" />
        </div>
        <div className="p-4 max-h-96 overflow-y-auto">
          <div 
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: sectionCode }}
          />
        </div>
      </div>

      {/* Feedback Section */}
      {showFeedback && (
        <div className="mb-4 p-4 bg-white/5 rounded-lg border border-white/10">
          <h4 className="text-sm font-medium text-white mb-2">
            Que souhaitez-vous modifier ?
          </h4>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Décrivez les modifications souhaitées... (ex: changer les couleurs, ajouter plus d'animations, modifier le texte, etc.)"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 resize-none"
            rows={3}
          />
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleRegenerate}
              disabled={!feedback.trim() || isGenerating}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                !feedback.trim() || isGenerating
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={16} className="animate-spin mr-2" />
                  Régénération...
                </>
              ) : (
                <>
                  <RefreshCw size={16} className="mr-2" />
                  Régénérer
                </>
              )}
            </button>
            <button
              onClick={() => {
                setShowFeedback(false);
                setFeedback('');
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-all"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

             {/* Action Buttons */}
       {isGenerating ? (
         <div className="flex items-center justify-center gap-3 px-4 py-3 bg-blue-600/20 border border-blue-500/30 rounded-lg">
           <RefreshCw size={18} className="animate-spin text-blue-400" />
           <span className="text-blue-400 font-medium">Régénération en cours...</span>
         </div>
       ) : (
         <div className="flex gap-3">
           <button
             onClick={onApprove}
             className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all hover:scale-105"
           >
             <Check size={18} />
             J'aime cette section
           </button>
           <button
             onClick={() => setShowFeedback(true)}
             className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all"
           >
             <X size={18} />
             Je veux des modifications
           </button>
         </div>
       )}
    </div>
  );
} 