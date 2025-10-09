export function generatePricingPrompt (basePrompt : string , pricingConfig : any) {
    return basePrompt + `
          CONFIGURATION DU PRICING :
          - Titre de la section : "${pricingConfig.title}"
          - Sous-titre : "${pricingConfig.subtitle}"
          - Nombre de plans : ${pricingConfig.plans.length}
          - Style des cartes : ${pricingConfig.cardStyle}
          - Disposition : ${pricingConfig.layout}
          - Alignement : ${pricingConfig.alignment}
          - Afficher les fonctionnalités : ${pricingConfig.showFeatures ? 'Oui' : 'Non'}
          - Afficher les badges : ${pricingConfig.showBadges ? 'Oui' : 'Non'}
          - Afficher la comparaison : ${pricingConfig.showComparison ? 'Oui' : 'Non'}
          - Animation : ${pricingConfig.animation}
          - DESIGN :
            * Thème : ${pricingConfig.design?.theme || 'light'}
            * Couleur primaire : ${pricingConfig.design?.primaryColor || '#3B82F6'}
            * Couleur secondaire : ${pricingConfig.design?.secondaryColor || '#1F2937'}
            * Couleur d'accent : ${pricingConfig.design?.accentColor || '#8B5CF6'}
            * Couleur du texte : ${pricingConfig.design?.textColor || '#1F2937'}
            * Couleur de fond : ${pricingConfig.design?.backgroundColor || '#FFFFFF'}
            * Style des cartes : ${pricingConfig.design?.cardStyle || 'elevated'}
            * Style des boutons : ${pricingConfig.design?.buttonStyle || 'rounded'}
            * Typographie : ${pricingConfig.design?.typography || 'modern'}

          PLANS DÉTAILLÉS :
          ${pricingConfig.plans.map((plan: any, index: number) => `
          - Plan ${index + 1} : "${plan.name}"
            * Prix : $${plan.price}/${plan.billingPeriod}
            * Description : "${plan.description}"
            * Populaire : ${plan.isPopular ? 'Oui' : 'Non'}
            * Mis en avant : ${plan.isHighlighted ? 'Oui' : 'Non'}
            * CTA : "${plan.cta.text}" (style: ${plan.cta.style})
            * Fonctionnalités : ${plan.features.join(', ')}
          `).join('')}

          SPÉCIFICATIONS DÉTAILLÉES POUR UNE SECTION PRICING MODERNE ET BEAUE :

          STRUCTURE OBLIGATOIRE :
          - Section pricing avec titre et sous-titre
          - Grille de plans selon la disposition choisie
          - Chaque plan avec prix, description, fonctionnalités, CTA
          - Espacement généreux entre les éléments

          STYLE DES CARTES SPÉCIFIQUE :
          - Style choisi : ${pricingConfig.cardStyle}
          ${pricingConfig.cardStyle === 'small' ? '- Cartes compactes avec padding minimal' : ''}
          ${pricingConfig.cardStyle === 'large' ? '- Cartes spacieuses avec padding généreux' : ''}
          ${pricingConfig.cardStyle === 'tiered' ? '- Hauteurs différentes selon l\'importance du plan' : ''}
          ${pricingConfig.cardStyle === 'horizontal' ? '- Disposition côte à côte' : ''}
          ${pricingConfig.cardStyle === 'stacked' ? '- Arrangement vertical empilé' : ''}
          ${pricingConfig.cardStyle === 'floating' ? '- Élévation avec ombres prononcées' : ''}
          ${pricingConfig.cardStyle === 'bordered' ? '- Bordures nettes et propres' : ''}
          ${pricingConfig.cardStyle === 'gradient' ? '- Dégradés de couleurs' : ''}

          LAYOUT SPÉCIFIQUE :
          - Disposition : ${pricingConfig.layout}
          ${pricingConfig.layout === 'grid-1' ? '- 1 colonne (grid grid-cols-1)' : ''}
          ${pricingConfig.layout === 'grid-2' ? '- 2 colonnes (grid grid-cols-1 md:grid-cols-2)' : ''}
          ${pricingConfig.layout === 'grid-3' ? '- 3 colonnes (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3)' : ''}
          ${pricingConfig.layout === 'grid-4' ? '- 4 colonnes (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4)' : ''}
          ${pricingConfig.layout === 'horizontal' ? '- Disposition horizontale (flex)' : ''}
          ${pricingConfig.layout === 'stacked' ? '- Disposition empilée (flex flex-col)' : ''}

          STYLING OBLIGATOIRE :
          - Alignement : ${pricingConfig.alignment}
          - Utilise EXACTEMENT les couleurs fournies dans la configuration design
          - Couleur primaire : ${pricingConfig.design?.primaryColor || '#3B82F6'} (pour les boutons CTA principaux)
          - Couleur secondaire : ${pricingConfig.design?.secondaryColor || '#1F2937'} (pour les éléments secondaires)
          - Couleur d'accent : ${pricingConfig.design?.accentColor || '#8B5CF6'} (pour les highlights)
          - Couleur du texte : ${pricingConfig.design?.textColor || '#1F2937'} (pour tout le texte)
          - Couleur de fond : ${pricingConfig.design?.backgroundColor || '#FFFFFF'} (pour le fond)
          - Thème : ${pricingConfig.design?.theme || 'light'}
          ${pricingConfig.design?.theme === 'dark' ? '- Utilise un fond sombre avec texte clair' : ''}
          ${pricingConfig.design?.theme === 'gradient' ? '- Utilise un dégradé avec les couleurs primaire et accent' : ''}
          ${pricingConfig.design?.theme === 'glassmorphism' ? '- Utilise un effet glassmorphism avec backdrop-blur' : ''}
          ${pricingConfig.design?.theme === 'minimal' ? '- Design épuré avec beaucoup d\'espace blanc' : ''}
          ${pricingConfig.design?.theme === 'bold' ? '- Design audacieux avec contraste fort' : ''}
          - Style des cartes : ${pricingConfig.design?.cardStyle || 'elevated'}
          - Style des boutons : ${pricingConfig.design?.buttonStyle || 'rounded'}
          - Typographie : ${pricingConfig.design?.typography || 'modern'}

          ÉLÉMENTS VISUELS :
          ${pricingConfig.showBadges ? `
          - Afficher les badges pour les plans populaires
          - Style : badges avec la couleur primaire
          - Position : en haut de la carte du plan populaire
          ` : ''}
          ${pricingConfig.showFeatures ? `
          - Afficher la liste des fonctionnalités pour chaque plan
          - Style : liste avec puces et icônes
          - Couleur : couleur du texte secondaire
          ` : ''}

          BOUTONS CTA DÉTAILLÉS :
          ${pricingConfig.plans.map((plan: any) => `
          - Bouton "${plan.cta.text}" pour le plan ${plan.name} :
            * Style: ${plan.cta.style === 'primary' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : plan.cta.style === 'secondary' ? 'bg-gray-100 text-gray-800 border border-gray-300' : 'border border-gray-300 text-gray-700 bg-white'}
            * Hover: ${plan.cta.style === 'primary' ? 'hover:from-purple-700 hover:to-blue-700' : 'hover:bg-gray-50'}
            * Padding: px-6 py-3
            * Border radius: ${pricingConfig.design?.buttonStyle === 'rounded' ? 'rounded-lg' : pricingConfig.design?.buttonStyle === 'sharp' ? 'rounded-none' : pricingConfig.design?.buttonStyle === 'pill' ? 'rounded-full' : 'rounded-lg'}
            * Font: font-semibold
          `).join('')}

          ANIMATIONS :
          - Animation d'entrée : ${pricingConfig.animation === 'fade-in' ? 'animate-fade-in' : pricingConfig.animation === 'slide-up' ? 'animate-slide-in-up' : pricingConfig.animation === 'stagger' ? 'animate-stagger avec délais' : 'pas d\'animation'}
          - Hover effects sur les cartes
          - Transitions fluides

          RESPONSIVE :
          - Mobile-first design
          - Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
          - Grille responsive selon la disposition choisie
          - Espacement adaptatif

          CRITIQUE: Respecte EXACTEMENT la configuration fournie
          CRITIQUE: Utilise les couleurs exactes du design
          CRITIQUE: Affiche tous les plans listés
          CRITIQUE: Applique le style de carte choisi
          Spécifications pour Pricing :
          - 3 plans tarifaires
          - Comparaison des fonctionnalités
          - Boutons d'action
          - Design moderne avec badges
          - Pricing attractif
          `;
        
}