export function generateTestimonialsPrompt (basePrompt : string , testimonialsConfig : any) {
    return  basePrompt + `
          CONFIGURATION DES TÉMOIGNAGES :
          - Titre de la section : "${testimonialsConfig.title}"
          - Sous-titre : "${testimonialsConfig.subtitle}"
          - Nombre de témoignages : ${testimonialsConfig.testimonials.length}
          - Disposition : ${testimonialsConfig.layout}
          - Alignement : ${testimonialsConfig.alignment}
          - Afficher les photos : ${testimonialsConfig.showPhotos ? 'Oui' : 'Non'}
          - Afficher les étoiles : ${testimonialsConfig.showStars ? 'Oui' : 'Non'}
          - Afficher les entreprises : ${testimonialsConfig.showCompanies ? 'Oui' : 'Non'}
          - Animation : ${testimonialsConfig.animation}
          - DESIGN :
            * Thème : ${testimonialsConfig.design?.theme || 'light'}
            * Couleur primaire : ${testimonialsConfig.design?.primaryColor || '#3B82F6'}
            * Couleur secondaire : ${testimonialsConfig.design?.secondaryColor || '#1F2937'}
            * Couleur d'accent : ${testimonialsConfig.design?.accentColor || '#8B5CF6'}
            * Couleur du texte : ${testimonialsConfig.design?.textColor || '#1F2937'}
            * Couleur de fond : ${testimonialsConfig.design?.backgroundColor || '#FFFFFF'}
            * Style des cartes : ${testimonialsConfig.design?.cardStyle || 'elevated'}
            * Style des étoiles : ${testimonialsConfig.design?.starStyle || 'filled'}
            * Typographie : ${testimonialsConfig.design?.typography || 'modern'}

          TÉMOIGNAGES DÉTAILLÉS :
          ${testimonialsConfig.testimonials.map((testimonial: any, index: number) => `
          - Témoignage ${index + 1} : "${testimonial.name}"
            * Citation : "${testimonial.quote}"
            * Note : ${testimonial.rating}/5
            * Entreprise : ${testimonial.company || 'Non spécifié'}
            * Poste : ${testimonial.position || 'Non spécifié'}
            * Photo : ${testimonial.photo ? 'Fournie' : 'Non fournie'}
            * Mise en avant : ${testimonial.highlight ? 'Oui' : 'Non'}
          `).join('')}

          SPÉCIFICATIONS DÉTAILLÉES POUR UNE SECTION TÉMOIGNAGES MODERNE ET BEAUE :

          STRUCTURE OBLIGATOIRE :
          - Section témoignages avec titre et sous-titre
          - Grille de témoignages selon la disposition choisie
          - Chaque témoignage avec photo, nom, citation, note, entreprise
          - Espacement généreux entre les éléments

          LAYOUT SPÉCIFIQUE :
          - Disposition : ${testimonialsConfig.layout}
          ${testimonialsConfig.layout === 'grid-2' ? '- Grille 2 colonnes (grid grid-cols-1 md:grid-cols-2)' : ''}
          ${testimonialsConfig.layout === 'grid-3' ? '- Grille 3 colonnes (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3)' : ''}
          ${testimonialsConfig.layout === 'carousel' ? '- Carrousel horizontal avec navigation' : ''}
          ${testimonialsConfig.layout === 'list' ? '- Liste verticale (flex flex-col)' : ''}
          ${testimonialsConfig.layout === 'cards' ? '- Cartes avec ombres (grid avec shadow-lg)' : ''}

          STYLING OBLIGATOIRE :
          - Alignement : ${testimonialsConfig.alignment}
          - Utilise EXACTEMENT les couleurs fournies dans la configuration design
          - Couleur primaire : ${testimonialsConfig.design?.primaryColor || '#3B82F6'} (pour les accents)
          - Couleur secondaire : ${testimonialsConfig.design?.secondaryColor || '#1F2937'} (pour les textes)
          - Couleur d'accent : ${testimonialsConfig.design?.accentColor || '#8B5CF6'} (pour les highlights)
          - Couleur du texte : ${testimonialsConfig.design?.textColor || '#1F2937'} (pour tout le texte)
          - Couleur de fond : ${testimonialsConfig.design?.backgroundColor || '#FFFFFF'} (pour le fond)
          - Thème : ${testimonialsConfig.design?.theme || 'light'}
          ${testimonialsConfig.design?.theme === 'dark' ? '- Utilise un fond sombre avec texte clair' : ''}
          ${testimonialsConfig.design?.theme === 'gradient' ? '- Utilise un dégradé avec les couleurs primaire et accent' : ''}
          ${testimonialsConfig.design?.theme === 'glassmorphism' ? '- Utilise un effet glassmorphism avec backdrop-blur' : ''}
          ${testimonialsConfig.design?.theme === 'minimal' ? '- Design épuré avec beaucoup d\'espace blanc' : ''}
          ${testimonialsConfig.design?.theme === 'bold' ? '- Design audacieux avec contraste fort' : ''}
          - Style des cartes : ${testimonialsConfig.design?.cardStyle || 'elevated'}
          - Style des étoiles : ${testimonialsConfig.design?.starStyle || 'filled'}
          - Typographie : ${testimonialsConfig.design?.typography || 'modern'}

          ÉLÉMENTS VISUELS :
          ${testimonialsConfig.showPhotos ? `
          - Afficher les photos pour chaque témoignage
          - Style : avatars circulaires ou carrés avec bordures
          - Taille : w-12 h-12 ou w-16 h-16
          - Position : en haut à gauche de chaque carte
          ` : ''}
          ${testimonialsConfig.showStars ? `
          - Afficher les étoiles pour chaque témoignage
          - Style des étoiles : ${testimonialsConfig.design?.starStyle || 'filled'}
          - Couleur des étoiles : ${testimonialsConfig.design?.accentColor || '#8B5CF6'}
          - Position : en haut à droite de chaque carte
          ` : ''}
          ${testimonialsConfig.showCompanies ? `
          - Afficher les entreprises pour chaque témoignage
          - Style : texte en italique ou badges
          - Couleur : couleur du texte secondaire
          - Position : en bas de chaque carte
          ` : ''}

          ANIMATIONS :
          - Animation d'entrée : ${testimonialsConfig.animation === 'fade-in' ? 'animate-fade-in' : testimonialsConfig.animation === 'slide-up' ? 'animate-slide-in-up' : testimonialsConfig.animation === 'stagger' ? 'animate-stagger avec délais' : 'pas d\'animation'}
          - Hover effects sur les cartes
          - Transitions fluides

          RESPONSIVE :
          - Mobile-first design
          - Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
          - Grille responsive selon la disposition choisie
          - Espacement adaptatif

          CRITIQUE: Respecte EXACTEMENT la configuration fournie
          CRITIQUE: Utilise les couleurs exactes du design
          CRITIQUE: Affiche tous les témoignages listés
          Spécifications pour Testimonials :
          - Carrousel de témoignages
          - Photos et noms des clients
          - Étoiles de notation
          - Citations inspirantes
          - Design élégant
          `;
}