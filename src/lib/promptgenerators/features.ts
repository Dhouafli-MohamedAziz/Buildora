export function generateFeaturesPrompt (basePrompt : string , featuresConfig : any) {
  interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  isEnabled: boolean;
  isHighlighted: boolean;
  ctaText?: string;
  ctaLink?: string;
}
    return  featuresConfig? basePrompt + `
          CONFIGURATION DES FEATURES :
  - Titre de la section : ${featuresConfig.title.enabled ? `"${featuresConfig.title.text}"` : 'Désactivé'}
  - Sous-titre : ${featuresConfig.subtitle.enabled ? `"${featuresConfig.subtitle.text}"` : 'Désactivé'}
  - Nombre de fonctionnalités : ${featuresConfig.features.length}
  - Disposition : ${featuresConfig.layout}
  - Alignement : ${featuresConfig.alignment}
  - Afficher les numéros : ${featuresConfig.showNumbers ? 'Oui' : 'Non'}
  - Afficher les icônes : ${featuresConfig.showIcons ? 'Oui' : 'Non'}
  - Afficher les images : ${featuresConfig.showImages ? 'Oui' : 'Non'}
  - Animation : ${featuresConfig.animation}

  DESIGN :
    * Thème : ${featuresConfig.design.theme}
    * Couleur primaire : ${featuresConfig.design.primaryColor}
    * Couleur secondaire : ${featuresConfig.design.secondaryColor}
    * Couleur d'accent : ${featuresConfig.design.accentColor}
    * Couleur du texte : ${featuresConfig.design.textColor}
    * Couleur de fond : ${featuresConfig.design.backgroundColor}
    * Style des cartes : ${featuresConfig.design.cardStyle}
    * Style des icônes : ${featuresConfig.design.iconStyle}
    * Typographie : ${featuresConfig.design.typography}

  FONCTIONNALITÉS DÉTAILLÉES :
  ${featuresConfig.features.map((feature: Feature, index: number) => `
  - Fonctionnalité ${index + 1} : "${feature.title}" ${!feature.isEnabled ? '(Désactivée)' : ''}
    * Description : "${feature.description}"
    * Icône : ${feature.icon || 'Aucune'}
    * Activée : ${feature.isEnabled ? 'Oui' : 'Non'}
    * Mise en avant : ${feature.isHighlighted ? 'Oui' : 'Non'}
    ${feature.ctaText ? `* CTA : "${feature.ctaText}" (${feature.ctaLink || '#'})` : ''}
  `).join('')}

  SPÉCIFICATIONS DÉTAILLÉES POUR UNE SECTION FEATURES MODERNE ET ATTRACTIVE :

  STRUCTURE OBLIGATOIRE :
  - Section avec titre et sous-titre (affichés uniquement si "enabled" = true)
  - Grille ou liste selon la disposition choisie
  - Chaque fonctionnalité doit comporter un titre, une description et une icône
  - Espacement généreux entre les éléments
  - Les fonctionnalités désactivées (isEnabled = false) ne doivent pas apparaître visuellement

  LAYOUT SPÉCIFIQUE :
  - Disposition : ${featuresConfig.layout}
  ${featuresConfig.layout === 'grid-2' ? '- Grille 2 colonnes (grid grid-cols-1 md:grid-cols-2)' : ''}
  ${featuresConfig.layout === 'grid-3' ? '- Grille 3 colonnes (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3)' : ''}
  ${featuresConfig.layout === 'grid-4' ? '- Grille 4 colonnes (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4)' : ''}
  ${featuresConfig.layout === 'list' ? '- Liste verticale (flex flex-col, alignement ${featuresConfig.alignment})' : ''}
  ${featuresConfig.layout === 'cards' ? '- Cartes avec ombres et hover (shadow-lg, rounded-2xl)' : ''}
  ${featuresConfig.layout === 'timeline' ? '- Timeline verticale avec points et bordures' : ''}

  STYLING OBLIGATOIRE :
  - Alignement global : ${featuresConfig.alignment}
  - Couleurs exactes à respecter :
      • Primaire : ${featuresConfig.design.primaryColor}
      • Secondaire : ${featuresConfig.design.secondaryColor}
      • Accent : ${featuresConfig.design.accentColor}
      • Texte : ${featuresConfig.design.textColor}
      • Fond : ${featuresConfig.design.backgroundColor}
  - Thème visuel : ${featuresConfig.design.theme}
  ${featuresConfig.design.theme === 'dark' ? '- Fond sombre et texte clair' : ''}
  ${featuresConfig.design.theme === 'gradient' ? '- Dégradé entre couleur primaire et accent' : ''}
  ${featuresConfig.design.theme === 'glassmorphism' ? '- Effet verre (backdrop-blur et transparence)' : ''}
  ${featuresConfig.design.theme === 'minimal' ? '- Design épuré avec beaucoup d’espace vide' : ''}
  ${featuresConfig.design.theme === 'bold' ? '- Design contrasté et typographie imposante' : ''}
  - Style des cartes : ${featuresConfig.design.cardStyle}
  - Style des icônes : ${featuresConfig.design.iconStyle}
  - Typographie : ${featuresConfig.design.typography}

  ICÔNES ET ÉLÉMENTS VISUELS :
  ${featuresConfig.showIcons ? `
  - Icônes visibles pour chaque fonctionnalité
  - Style : ${featuresConfig.design.iconStyle}
  - Couleur : ${featuresConfig.design.primaryColor}
  - Taille : w-8 h-8 ou w-12 h-12 selon importance
  ` : '- Icônes désactivées'}

  ${featuresConfig.showNumbers ? `
  - Numéros visibles pour chaque fonctionnalité
  - Style : badges circulaires avec la couleur primaire
  - Position : au-dessus ou à gauche du titre
  ` : '- Numéros désactivés'}

  ${featuresConfig.showImages ? `
  - Images affichées pour chaque fonctionnalité
  - Ratio : 1:1 ou 16:9 selon le design
  ` : '- Aucune image affichée'}

  ANIMATIONS :
  - Type : ${featuresConfig.animation}
  - Effets possibles :
      ${featuresConfig.animation === 'fade-in' ? '→ Apparition progressive (opacity + transform)' : ''}
      ${featuresConfig.animation === 'slide-up' ? '→ Glissement depuis le bas (translate-y)' : ''}
      ${featuresConfig.animation === 'stagger' ? '→ Apparition séquencée (delays par index)' : ''}
  - Hover effects fluides et transitions douces

  RESPONSIVE DESIGN :
  - Mobile-first design
  - Breakpoints : sm (640px), md (768px), lg (1024px), xl (1280px)
  - Grille adaptative selon layout
  - Espacements et tailles ajustés automatiquement

  CRITÈRES DE VALIDATION :
  - Respect strict de la configuration fournie
  - Utilisation exacte des couleurs
  - Affichage conditionnel du titre/sous-titre
  - Les fonctionnalités désactivées ne doivent pas apparaître
  - Section moderne, responsive et esthétiquement cohérente
`
 : basePrompt + `Design a clean, modern, and visually engaging Features section for a website that clearly highlights the main benefits or functionalities of a product or service.
The section should include:
A section title (e.g., “Our Features”, “Why Choose Us”, or “What Makes Us Different”).
A short introductory paragraph beneath the title, summarizing the value or mission in one or two sentences.
3 to 6 feature cards or blocks, each containing:
An icon or small illustration (simple and consistent style).
A feature title (concise, 2–4 words).
A short description (1–2 sentences explaining the benefit).
Layout & styling preferences:
Use a grid layout (3 columns on desktop, 1–2 columns on mobile).
Provide ample white space between features for readability.
Align icons and titles consistently.
Use soft shadows, rounded corners, and hover effects for interactivity.
Choose a color palette that matches the brand — typically a light background with accent colors for icons or highlights.
Optional elements:
A subtle background pattern, gradient, or divider line above/below the section.
A call-to-action at the bottom (e.g., “Discover More” or “Start Now”).
Support for dark mode.
Goal: The Features section should feel clear, professional, and user-friendly — visually communicating trust, innovation, and simplicity. It should be easy to scan and immediately make visitors understand the key strengths of the product or service. `
}