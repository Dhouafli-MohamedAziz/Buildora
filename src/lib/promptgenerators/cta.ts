export function generateCTAPrompt (basePrompt : string , ctaConfig : any) {
    return ctaConfig ? basePrompt + `
          CONFIGURATION DU CTA :
          - Titre principal : "${ctaConfig.headline}"
          - Sous-titre : "${ctaConfig.subtitle}"
          - Bouton principal : "${ctaConfig.primaryCTA.text}" (style: ${ctaConfig.primaryCTA.style})
          ${ctaConfig.secondaryCTA ? `- Bouton secondaire : "${ctaConfig.secondaryCTA.text}" (style: ${ctaConfig.secondaryCTA.style})` : ''}
          - Disposition : ${ctaConfig.layout}
          - Alignement : ${ctaConfig.alignment}
          - Style de fond : ${ctaConfig.backgroundStyle}
          - Animation : ${ctaConfig.animation}
          - DESIGN :
            * Thème : ${ctaConfig.design?.theme || 'light'}
            * Couleur primaire : ${ctaConfig.design?.primaryColor || '#3B82F6'}
            * Couleur secondaire : ${ctaConfig.design?.secondaryColor || '#1F2937'}
            * Couleur d'accent : ${ctaConfig.design?.accentColor || '#8B5CF6'}
            * Couleur du texte : ${ctaConfig.design?.textColor || '#1F2937'}
            * Couleur de fond : ${ctaConfig.design?.backgroundColor || '#FFFFFF'}
            * Style des boutons : ${ctaConfig.design?.buttonStyle || 'rounded'}
            * Typographie : ${ctaConfig.design?.typography || 'modern'}

          SPÉCIFICATIONS DÉTAILLÉES POUR UNE SECTION CTA MODERNE ET BEAUE :

          STRUCTURE OBLIGATOIRE :
          - Section CTA avec titre principal et sous-titre
          - Bouton principal avec style défini
          - Bouton secondaire (si spécifié)
          - Espacement généreux entre les éléments

          LAYOUT SPÉCIFIQUE :
          - Disposition : ${ctaConfig.layout}
          ${ctaConfig.layout === 'centered' ? '- Contenu centré (flex flex-col items-center)' : ''}
          ${ctaConfig.layout === 'left-aligned' ? '- Contenu aligné à gauche (flex flex-col items-start)' : ''}
          ${ctaConfig.layout === 'split' ? '- Titre à gauche, boutons à droite (flex justify-between items-center)' : ''}
          ${ctaConfig.layout === 'stacked' ? '- Éléments empilés verticalement (flex flex-col)' : ''}

          STYLING OBLIGATOIRE :
          - Alignement : ${ctaConfig.alignment}
          - Utilise EXACTEMENT les couleurs fournies dans la configuration design
          - Couleur primaire : ${ctaConfig.design?.primaryColor || '#3B82F6'} (pour les boutons CTA principaux)
          - Couleur secondaire : ${ctaConfig.design?.secondaryColor || '#1F2937'} (pour les éléments secondaires)
          - Couleur d'accent : ${ctaConfig.design?.accentColor || '#8B5CF6'} (pour les highlights)
          - Couleur du texte : ${ctaConfig.design?.textColor || '#1F2937'} (pour tout le texte)
          - Couleur de fond : ${ctaConfig.design?.backgroundColor || '#FFFFFF'} (pour le fond)
          - Thème : ${ctaConfig.design?.theme || 'light'}
          ${ctaConfig.design?.theme === 'dark' ? '- Utilise un fond sombre avec texte clair' : ''}
          ${ctaConfig.design?.theme === 'gradient' ? '- Utilise un dégradé avec les couleurs primaire et accent' : ''}
          ${ctaConfig.design?.theme === 'glassmorphism' ? '- Utilise un effet glassmorphism avec backdrop-blur' : ''}
          ${ctaConfig.design?.theme === 'minimal' ? '- Design épuré avec beaucoup d\'espace blanc' : ''}
          ${ctaConfig.design?.theme === 'bold' ? '- Design audacieux avec contraste fort' : ''}
          - Style des boutons : ${ctaConfig.design?.buttonStyle || 'rounded'}
          - Typographie : ${ctaConfig.design?.typography || 'modern'}

          BOUTONS CTA DÉTAILLÉS :
          - Bouton principal "${ctaConfig.primaryCTA.text}" :
            * Style: ${ctaConfig.primaryCTA.style === 'primary' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : ctaConfig.primaryCTA.style === 'secondary' ? 'bg-gray-100 text-gray-800 border border-gray-300' : 'border border-gray-300 text-gray-700 bg-white'}
            * Hover: ${ctaConfig.primaryCTA.style === 'primary' ? 'hover:from-purple-700 hover:to-blue-700' : 'hover:bg-gray-50'}
            * Taille: px-8 py-4
            * Border radius: ${ctaConfig.design?.buttonStyle === 'rounded' ? 'rounded-lg' : ctaConfig.design?.buttonStyle === 'sharp' ? 'rounded-none' : ctaConfig.design?.buttonStyle === 'pill' ? 'rounded-full' : 'rounded-lg'}
            * Font: font-bold text-lg
            * Animation: hover:scale-105 transition-transform

          ${ctaConfig.secondaryCTA ? `
          - Bouton secondaire "${ctaConfig.secondaryCTA.text}" :
            * Style: ${ctaConfig.secondaryCTA.style === 'primary' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : ctaConfig.secondaryCTA.style === 'secondary' ? 'bg-gray-100 text-gray-800 border border-gray-300' : 'border border-gray-300 text-gray-700 bg-white'}
            * Hover: ${ctaConfig.secondaryCTA.style === 'primary' ? 'hover:from-purple-700 hover:to-blue-700' : 'hover:bg-gray-50'}
            * Taille: px-6 py-3
            * Border radius: ${ctaConfig.design?.buttonStyle === 'rounded' ? 'rounded-lg' : ctaConfig.design?.buttonStyle === 'sharp' ? 'rounded-none' : ctaConfig.design?.buttonStyle === 'pill' ? 'rounded-full' : 'rounded-lg'}
            * Font: font-semibold
            * Animation: hover:scale-105 transition-transform
          ` : ''}

          ANIMATIONS :
          - Animation d'entrée : ${ctaConfig.animation === 'fade-in' ? 'animate-fade-in' : ctaConfig.animation === 'slide-up' ? 'animate-slide-in-up' : ctaConfig.animation === 'zoom-in' ? 'animate-zoom-in' : 'pas d\'animation'}
          - Hover effects sur les boutons
          - Transitions fluides

          RESPONSIVE :
          - Mobile-first design
          - Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
          - Layout responsive selon la disposition choisie
          - Espacement adaptatif

          CRITIQUE: Respecte EXACTEMENT la configuration fournie
          CRITIQUE: Utilise les couleurs exactes du design
          CRITIQUE: Inclus tous les boutons CTA spécifiés
          ` : basePrompt + `
          Spécifications pour CTA :
          - Section d'appel à l'action
          - Titre accrocheur
          - Bouton principal
          - Design contrasté
          - CTA impactant
          `;
        
}