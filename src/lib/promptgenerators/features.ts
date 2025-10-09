export function generateFeaturesPrompt (basePrompt : string , featuresConfig : any) {
    return basePrompt + `
          CONFIGURATION DES FEATURES :
          - Titre de la section : "${featuresConfig.title}"
          - Sous-titre : "${featuresConfig.subtitle}"
          - Nombre de fonctionnalités : ${featuresConfig.features.length}
          - Disposition : ${featuresConfig.layout}
          - Alignement : ${featuresConfig.alignment}
          - Afficher les numéros : ${featuresConfig.showNumbers ? 'Oui' : 'Non'}
          - Afficher les icônes : ${featuresConfig.showIcons ? 'Oui' : 'Non'}
          - Afficher les images : ${featuresConfig.showImages ? 'Oui' : 'Non'}
          - Animation : ${featuresConfig.animation}
          - DESIGN :
            * Thème : ${featuresConfig.design?.theme || 'light'}
            * Couleur primaire : ${featuresConfig.design?.primaryColor || '#3B82F6'}
            * Couleur secondaire : ${featuresConfig.design?.secondaryColor || '#1F2937'}
            * Couleur d'accent : ${featuresConfig.design?.accentColor || '#8B5CF6'}
            * Couleur du texte : ${featuresConfig.design?.textColor || '#1F2937'}
            * Couleur de fond : ${featuresConfig.design?.backgroundColor || '#FFFFFF'}
            * Style des cartes : ${featuresConfig.design?.cardStyle || 'elevated'}
            * Style des icônes : ${featuresConfig.design?.iconStyle || 'filled'}
            * Typographie : ${featuresConfig.design?.typography || 'modern'}
          
          FONCTIONNALITÉS DÉTAILLÉES :
          ${featuresConfig.features.map((feature: any, index: number) => `
          - Fonctionnalité ${index + 1} : "${feature.title}"
            * Description : "${feature.description}"
            * Icône : ${feature.icon}
            * Mise en avant : ${feature.highlight ? 'Oui' : 'Non'}
            ${feature.cta ? `* CTA : "${feature.cta.text}" (${feature.cta.style})` : ''}
          `).join('')}
          
          SPÉCIFICATIONS DÉTAILLÉES POUR UNE SECTION FEATURES MODERNE ET BEAUE :
          
          STRUCTURE OBLIGATOIRE :
          - Section features avec titre et sous-titre
          - Grille de fonctionnalités selon la disposition choisie
          - Chaque fonctionnalité avec icône, titre, description
          - Espacement généreux entre les éléments
          
          LAYOUT SPÉCIFIQUE :
          - Disposition : ${featuresConfig.layout}
          ${featuresConfig.layout === 'grid-2' ? '- Grille 2 colonnes (grid grid-cols-1 md:grid-cols-2)' : ''}
          ${featuresConfig.layout === 'grid-3' ? '- Grille 3 colonnes (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3)' : ''}
          ${featuresConfig.layout === 'grid-4' ? '- Grille 4 colonnes (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4)' : ''}
          ${featuresConfig.layout === 'list' ? '- Liste verticale (flex flex-col)' : ''}
          ${featuresConfig.layout === 'cards' ? '- Cartes avec ombres (grid avec shadow-lg)' : ''}
          ${featuresConfig.layout === 'timeline' ? '- Timeline verticale (flex flex-col avec bordures)' : ''}
          
          STYLING OBLIGATOIRE :
          - Alignement : ${featuresConfig.alignment}
          - Utilise EXACTEMENT les couleurs fournies dans la configuration design
          - Couleur primaire : ${featuresConfig.design?.primaryColor || '#3B82F6'} (pour les icônes et accents)
          - Couleur secondaire : ${featuresConfig.design?.secondaryColor || '#1F2937'} (pour les textes)
          - Couleur d'accent : ${featuresConfig.design?.accentColor || '#8B5CF6'} (pour les highlights)
          - Couleur du texte : ${featuresConfig.design?.textColor || '#1F2937'} (pour tout le texte)
          - Couleur de fond : ${featuresConfig.design?.backgroundColor || '#FFFFFF'} (pour le fond)
          - Thème : ${featuresConfig.design?.theme || 'light'}
          ${featuresConfig.design?.theme === 'dark' ? '- Utilise un fond sombre avec texte clair' : ''}
          ${featuresConfig.design?.theme === 'gradient' ? '- Utilise un dégradé avec les couleurs primaire et accent' : ''}
          ${featuresConfig.design?.theme === 'glassmorphism' ? '- Utilise un effet glassmorphism avec backdrop-blur' : ''}
          ${featuresConfig.design?.theme === 'minimal' ? '- Design épuré avec beaucoup d\'espace blanc' : ''}
          ${featuresConfig.design?.theme === 'bold' ? '- Design audacieux avec contraste fort' : ''}
          - Style des cartes : ${featuresConfig.design?.cardStyle || 'elevated'}
          - Style des icônes : ${featuresConfig.design?.iconStyle || 'filled'}
          - Typographie : ${featuresConfig.design?.typography || 'modern'}
          
          ICÔNES ET ÉLÉMENTS VISUELS :
          ${featuresConfig.showIcons ? `
          - Afficher les icônes pour chaque fonctionnalité
          - Style des icônes : ${featuresConfig.design?.iconStyle || 'filled'}
          - Couleur des icônes : ${featuresConfig.design?.primaryColor || '#3B82F6'}
          - Taille des icônes : w-8 h-8 ou w-12 h-12 selon l'importance
          ` : ''}
          ${featuresConfig.showNumbers ? `
          - Afficher les numéros pour chaque fonctionnalité
          - Style : badges circulaires avec la couleur primaire
          - Position : en haut à gauche de chaque carte
          ` : ''}
          
          ANIMATIONS :
          - Animation d'entrée : ${featuresConfig.animation === 'fade-in' ? 'animate-fade-in' : featuresConfig.animation === 'slide-up' ? 'animate-slide-in-up' : featuresConfig.animation === 'stagger' ? 'animate-stagger avec délais' : 'pas d\'animation'}
          - Hover effects sur les cartes
          - Transitions fluides
          
          RESPONSIVE :
          - Mobile-first design
          - Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
          - Grille responsive selon la disposition choisie
          - Espacement adaptatif
          
          CRITIQUE: Respecte EXACTEMENT la configuration fournie
          CRITIQUE: Utilise les couleurs exactes du design
          CRITIQUE: Affiche toutes les fonctionnalités listées
          Spécifications pour Features :
          - Section de fonctionnalités avec grille
          - Icônes et descriptions
          - Design moderne et responsive
          - Features attractives
          `;
        
}