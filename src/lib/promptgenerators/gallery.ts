export function generateGalleryPrompt (basePrompt : string , galleryConfig : any) {
    return galleryConfig ? basePrompt + `
          CONFIGURATION DE LA GALERIE :
          - Titre de la section : "${galleryConfig.title}"
          - Sous-titre : "${galleryConfig.subtitle}"
          - Nombre d'images : ${galleryConfig.images.length}
          - Disposition : ${galleryConfig.layout}
          - Alignement : ${galleryConfig.alignment}
          - Afficher les filtres : ${galleryConfig.showFilters ? 'Oui' : 'Non'}
          - Afficher les légendes : ${galleryConfig.showCaptions ? 'Oui' : 'Non'}
          - Afficher le lightbox : ${galleryConfig.showLightbox ? 'Oui' : 'Non'}
          - Animation : ${galleryConfig.animation}
          - DESIGN :
            * Thème : ${galleryConfig.design?.theme || 'light'}
            * Couleur primaire : ${galleryConfig.design?.primaryColor || '#3B82F6'}
            * Couleur secondaire : ${galleryConfig.design?.secondaryColor || '#1F2937'}
            * Couleur d'accent : ${galleryConfig.design?.accentColor || '#8B5CF6'}
            * Couleur du texte : ${galleryConfig.design?.textColor || '#1F2937'}
            * Couleur de fond : ${galleryConfig.design?.backgroundColor || '#FFFFFF'}
            * Style des images : ${galleryConfig.design?.imageStyle || 'rounded'}
            * Style des filtres : ${galleryConfig.design?.filterStyle || 'buttons'}
            * Typographie : ${galleryConfig.design?.typography || 'modern'}

          IMAGES DÉTAILLÉES :
          ${galleryConfig.images.map((image: any, index: number) => `
          - Image ${index + 1} : "${image.title}"
            * URL : ${image.url}
            * Catégorie : ${image.category || 'Général'}
            * Légende : "${image.caption || ''}"
            * Mise en avant : ${image.highlight ? 'Oui' : 'Non'}
          `).join('')}

          SPÉCIFICATIONS DÉTAILLÉES POUR UNE SECTION GALERIE MODERNE ET BEAUE :

          STRUCTURE OBLIGATOIRE :
          - Section galerie avec titre et sous-titre
          - Filtres par catégorie (si activés)
          - Grille d'images selon la disposition choisie
          - Légendes sous les images (si activées)
          - Espacement généreux entre les éléments

          LAYOUT SPÉCIFIQUE :
          - Disposition : ${galleryConfig.layout}
          ${galleryConfig.layout === 'grid-2' ? '- Grille 2 colonnes (grid grid-cols-1 md:grid-cols-2)' : ''}
          ${galleryConfig.layout === 'grid-3' ? '- Grille 3 colonnes (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3)' : ''}
          ${galleryConfig.layout === 'grid-4' ? '- Grille 4 colonnes (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4)' : ''}
          ${galleryConfig.layout === 'masonry' ? '- Disposition masonry avec hauteurs variables' : ''}
          ${galleryConfig.layout === 'carousel' ? '- Carrousel horizontal avec navigation' : ''}

          STYLING OBLIGATOIRE :
          - Alignement : ${galleryConfig.alignment}
          - Utilise EXACTEMENT les couleurs fournies dans la configuration design
          - Couleur primaire : ${galleryConfig.design?.primaryColor || '#3B82F6'} (pour les accents)
          - Couleur secondaire : ${galleryConfig.design?.secondaryColor || '#1F2937'} (pour les textes)
          - Couleur d'accent : ${galleryConfig.design?.accentColor || '#8B5CF6'} (pour les highlights)
          - Couleur du texte : ${galleryConfig.design?.textColor || '#1F2937'} (pour tout le texte)
          - Couleur de fond : ${galleryConfig.design?.backgroundColor || '#FFFFFF'} (pour le fond)
          - Thème : ${galleryConfig.design?.theme || 'light'}
          ${galleryConfig.design?.theme === 'dark' ? '- Utilise un fond sombre avec texte clair' : ''}
          ${galleryConfig.design?.theme === 'gradient' ? '- Utilise un dégradé avec les couleurs primaire et accent' : ''}
          ${galleryConfig.design?.theme === 'glassmorphism' ? '- Utilise un effet glassmorphism avec backdrop-blur' : ''}
          ${galleryConfig.design?.theme === 'minimal' ? '- Design épuré avec beaucoup d\'espace blanc' : ''}
          ${galleryConfig.design?.theme === 'bold' ? '- Design audacieux avec contraste fort' : ''}
          - Style des images : ${galleryConfig.design?.imageStyle || 'rounded'}
          - Style des filtres : ${galleryConfig.design?.filterStyle || 'buttons'}
          - Typographie : ${galleryConfig.design?.typography || 'modern'}

          ÉLÉMENTS VISUELS :
          ${galleryConfig.showFilters ? `
          - Afficher les filtres par catégorie
          - Style des filtres : ${galleryConfig.design?.filterStyle || 'buttons'}
          - Couleur des filtres actifs : ${galleryConfig.design?.primaryColor || '#3B82F6'}
          - Position : en haut de la galerie
          ` : ''}
          ${galleryConfig.showCaptions ? `
          - Afficher les légendes sous chaque image
          - Style : texte centré avec couleur du texte secondaire
          - Taille : text-sm
          ` : ''}
          ${galleryConfig.showLightbox ? `
          - Activer le lightbox pour agrandir les images
          - Animation : fade-in/fade-out
          - Overlay sombre pour le focus
          ` : ''}

          ANIMATIONS :
          - Animation d'entrée : ${galleryConfig.animation === 'fade-in' ? 'animate-fade-in' : galleryConfig.animation === 'slide-up' ? 'animate-slide-in-up' : galleryConfig.animation === 'stagger' ? 'animate-stagger avec délais' : 'pas d\'animation'}
          - Hover effects sur les images (zoom, overlay)
          - Transitions fluides

          RESPONSIVE :
          - Mobile-first design
          - Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
          - Grille responsive selon la disposition choisie
          - Espacement adaptatif

          CRITIQUE: Respecte EXACTEMENT la configuration fournie
          CRITIQUE: Utilise les couleurs exactes du design
          CRITIQUE: Affiche toutes les images listées
          CRITIQUE: Utilise les URLs d'images fournies
          ` : basePrompt + `
          Spécifications pour Gallery :
          - Grille d'images responsive
          - Lightbox pour agrandir
          - Filtres par catégorie
          - Animations au hover
          - Gallery moderne
          `;
        
}