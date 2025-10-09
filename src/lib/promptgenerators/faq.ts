export function generateFAQPrompt (basePrompt : string , faqConfig : any) {
    return faqConfig ? basePrompt + `
          CONFIGURATION DE LA FAQ :
          - Titre de la section : "${faqConfig.title}"
          - Sous-titre : "${faqConfig.subtitle}"
          - Nombre de questions : ${faqConfig.questions.length}
          - Disposition : ${faqConfig.layout}
          - Alignement : ${faqConfig.alignment}
          - Afficher les icônes : ${faqConfig.showIcons ? 'Oui' : 'Non'}
          - Afficher les catégories : ${faqConfig.showCategories ? 'Oui' : 'Non'}
          - Animation : ${faqConfig.animation}
          - DESIGN :
            * Thème : ${faqConfig.design?.theme || 'light'}
            * Couleur primaire : ${faqConfig.design?.primaryColor || '#3B82F6'}
            * Couleur secondaire : ${faqConfig.design?.secondaryColor || '#1F2937'}
            * Couleur d'accent : ${faqConfig.design?.accentColor || '#8B5CF6'}
            * Couleur du texte : ${faqConfig.design?.textColor || '#1F2937'}
            * Couleur de fond : ${faqConfig.design?.backgroundColor || '#FFFFFF'}
            * Style des accordéons : ${faqConfig.design?.accordionStyle || 'bordered'}
            * Style des icônes : ${faqConfig.design?.iconStyle || 'chevron'}
            * Typographie : ${faqConfig.design?.typography || 'modern'}

          QUESTIONS DÉTAILLÉES :
          ${faqConfig.questions.map((question: any, index: number) => `
          - Question ${index + 1} : "${question.question}"
            * Réponse : "${question.answer}"
            * Catégorie : ${question.category || 'Général'}
            * Mise en avant : ${question.highlight ? 'Oui' : 'Non'}
          `).join('')}

          SPÉCIFICATIONS DÉTAILLÉES POUR UNE SECTION FAQ MODERNE ET BEAUE :

          STRUCTURE OBLIGATOIRE :
          - Section FAQ avec titre et sous-titre
          - Accordéon de questions/réponses
          - Chaque question avec icône, texte, réponse dépliable
          - Espacement généreux entre les éléments

          LAYOUT SPÉCIFIQUE :
          - Disposition : ${faqConfig.layout}
          ${faqConfig.layout === 'single-column' ? '- Colonne unique (flex flex-col)' : ''}
          ${faqConfig.layout === 'two-columns' ? '- Deux colonnes (grid grid-cols-1 md:grid-cols-2)' : ''}
          ${faqConfig.layout === 'accordion' ? '- Accordéon vertical avec animations' : ''}
          ${faqConfig.layout === 'cards' ? '- Cartes séparées avec ombres' : ''}

          STYLING OBLIGATOIRE :
          - Alignement : ${faqConfig.alignment}
          - Utilise EXACTEMENT les couleurs fournies dans la configuration design
          - Couleur primaire : ${faqConfig.design?.primaryColor || '#3B82F6'} (pour les accents)
          - Couleur secondaire : ${faqConfig.design?.secondaryColor || '#1F2937'} (pour les textes)
          - Couleur d'accent : ${faqConfig.design?.accentColor || '#8B5CF6'} (pour les highlights)
          - Couleur du texte : ${faqConfig.design?.textColor || '#1F2937'} (pour tout le texte)
          - Couleur de fond : ${faqConfig.design?.backgroundColor || '#FFFFFF'} (pour le fond)
          - Thème : ${faqConfig.design?.theme || 'light'}
          ${faqConfig.design?.theme === 'dark' ? '- Utilise un fond sombre avec texte clair' : ''}
          ${faqConfig.design?.theme === 'gradient' ? '- Utilise un dégradé avec les couleurs primaire et accent' : ''}
          ${faqConfig.design?.theme === 'glassmorphism' ? '- Utilise un effet glassmorphism avec backdrop-blur' : ''}
          ${faqConfig.design?.theme === 'minimal' ? '- Design épuré avec beaucoup d\'espace blanc' : ''}
          ${faqConfig.design?.theme === 'bold' ? '- Design audacieux avec contraste fort' : ''}
          - Style des accordéons : ${faqConfig.design?.accordionStyle || 'bordered'}
          - Style des icônes : ${faqConfig.design?.iconStyle || 'chevron'}
          - Typographie : ${faqConfig.design?.typography || 'modern'}

          ÉLÉMENTS VISUELS :
          ${faqConfig.showIcons ? `
          - Afficher les icônes pour chaque question
          - Style des icônes : ${faqConfig.design?.iconStyle || 'chevron'}
          - Couleur des icônes : ${faqConfig.design?.primaryColor || '#3B82F6'}
          - Animation : rotation lors de l'ouverture/fermeture
          ` : ''}
          ${faqConfig.showCategories ? `
          - Afficher les catégories pour chaque question
          - Style : badges avec la couleur primaire
          - Position : en haut à droite de chaque question
          ` : ''}

          ANIMATIONS :
          - Animation d'entrée : ${faqConfig.animation === 'fade-in' ? 'animate-fade-in' : faqConfig.animation === 'slide-up' ? 'animate-slide-in-up' : faqConfig.animation === 'stagger' ? 'animate-stagger avec délais' : 'pas d\'animation'}
          - Animation d'ouverture/fermeture des accordéons
          - Transitions fluides

          RESPONSIVE :
          - Mobile-first design
          - Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
          - Layout responsive selon la disposition choisie
          - Espacement adaptatif

          CRITIQUE: Respecte EXACTEMENT la configuration fournie
          CRITIQUE: Utilise les couleurs exactes du design
          CRITIQUE: Affiche toutes les questions listées
          ` : basePrompt + `
          Spécifications pour FAQ :
          - Accordéon de questions/réponses
          - Animations fluides
          - Questions pertinentes
          - Design clair et lisible
          - FAQ interactive
          `;
        
}