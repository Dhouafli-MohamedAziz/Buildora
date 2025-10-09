export function generateHeroPrompt (basePrompt : string , heroConfig : any) {
    console.log('Generating hero prompt with config:', heroConfig);
    return heroConfig ? `
${basePrompt}
${heroConfig}
CONFIGURATION DU HERO :
          === HERO CONFIGURATION ===
- Headline: "${heroConfig.headline.text}" (style: ${heroConfig.headline.style})
- Subheadline: "${heroConfig.subheadline.enabled ? heroConfig.subheadline.text : 'Subheadline disabled'}"
- Primary Call-To-Action (CTA): "${heroConfig.primaryCTA.text}" → link: "${heroConfig.primaryCTA.link}" (style: ${heroConfig.primaryCTA.style})
- Secondary CTA: ${heroConfig.secondaryCTA.enabled ? `"${heroConfig.secondaryCTA.text}" → link: "${heroConfig.secondaryCTA.link}" (type: ${heroConfig.secondaryCTA.type})` : "Disabled"}
- Visual Element: ${heroConfig.visualElement.type} ${heroConfig.visualElement.image ? '(Custom Image Provided)' : heroConfig.visualElement.videoUrl ? `(Video: ${heroConfig.visualElement.videoUrl})` : '(No Media)'}
- Navigation Anchor: ${heroConfig.navigationAnchor.enabled ? `"${heroConfig.navigationAnchor.text}"` : "Disabled"}
- Social Proof: 
  - Enabled: ${heroConfig.socialProof.enabled}
  - Type: ${heroConfig.socialProof.type}
  - Rating: ${heroConfig.socialProof.rating}
  - Testimonial: "${heroConfig.socialProof.testimonialText}"
- Styling:
  - Layout: ${heroConfig.styling.layout}
  - Background: ${heroConfig.styling.background}
  - Colors: ${JSON.stringify(heroConfig.styling.customColors)}
  - Typography: ${JSON.stringify(heroConfig.styling.typography)}
  - Spacing: ${heroConfig.styling.spacing}
  - Shadows: ${heroConfig.styling.shadows}
  - Borders: ${heroConfig.styling.borders}
  - Animations: ${heroConfig.styling.animations}      
          STRUCTURE OBLIGATOIRE :
- Section hero avec hauteur minimale de 100vh
- Titre principal : "${heroConfig.headline.text}" (taille : très grande, text-5xl à text-7xl, style : ${heroConfig.headline.style})
- Sous-titre : ${heroConfig.subheadline.enabled ? `"${heroConfig.subheadline.text}" (taille moyenne : text-lg à text-xl)` : "Sous-titre désactivé"}
- Boutons CTA (espacés correctement, alignés selon le layout)
- Indicateur de navigation (anchor) si activé : ${heroConfig.navigationAnchor.enabled ? `"${heroConfig.navigationAnchor.text}"` : "Désactivé"}
- Zone visuelle (image, illustration ou vidéo) selon ${heroConfig.visualElement.type}

LAYOUT SPÉCIFIQUE :
- Disposition : ${heroConfig.styling.layout}
${heroConfig.styling.layout === 'left-text' ? "- Texte à gauche, image/élément visuel à droite (grid grid-cols-1 md:grid-cols-2)" : ""}
${heroConfig.styling.layout === 'right-text' ? "- Texte à droite, image/élément visuel à gauche (grid grid-cols-1 md:grid-cols-2)" : ""}
${heroConfig.styling.layout === 'centered' ? "- Texte centré avec image ou illustration en dessous (flex flex-col items-center text-center)" : ""}
${heroConfig.styling.layout === 'text-only' ? "- Contenu uniquement textuel, centré verticalement et horizontalement" : ""}

ÉLÉMENT VISUEL :
${heroConfig.visualElement.type === 'image' ? `
- Utiliser l’image fournie (si disponible)
- <img src="\${heroConfig.visualElement.imagePreview}" alt="Hero image" class="w-full h-auto rounded-lg shadow-lg">
` : heroConfig.visualElement.type === 'video' ? `
- Utiliser la vidéo fournie : \${heroConfig.visualElement.videoUrl}
- <video autoplay loop muted class="w-full rounded-lg shadow-lg"></video>
` : `
- Utiliser une illustration ou une icône SVG moderne (type : ${heroConfig.visualElement.type})
`}

STYLING OBLIGATOIRE :
- Fond : ${heroConfig.styling.background === 'gradient' ? 'Dégradé avec les couleurs du thème' : heroConfig.styling.background === 'solid' ? 'Couleur unie' : 'Thème personnalisé'}
- Couleurs personnalisées : ${JSON.stringify(heroConfig.styling.customColors)}
- Typographie : ${JSON.stringify(heroConfig.styling.typography)}
- Espacements : ${heroConfig.styling.spacing}
- Ombres : ${heroConfig.styling.shadows}
- Bords : ${heroConfig.styling.borders}
- Animation d’apparition : ${heroConfig.styling.animations === 'fade' ? 'Fondu en entrée (fade-in)' : heroConfig.styling.animations === 'slide' ? 'Glissement vers le haut' : 'Animation par défaut'}

BOUTONS CTA :
- Bouton principal "${heroConfig.primaryCTA.text}" :
  * Lien : ${heroConfig.primaryCTA.link}
  * Style : ${heroConfig.primaryCTA.style === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : heroConfig.primaryCTA.style === 'secondary' ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'outline border border-gray-400'}
  * Taille : px-8 py-4
  * Font : font-bold text-lg
  * Animation : hover:scale-105 transition-transform

${heroConfig.secondaryCTA && heroConfig.secondaryCTA.enabled ? `
- Bouton secondaire "${heroConfig.secondaryCTA.text}" :
  * Lien : ${heroConfig.secondaryCTA.link}
  * Type : ${heroConfig.secondaryCTA.type}
  * Style : ${heroConfig.secondaryCTA.style === 'primary' ? 'bg-blue-600 text-white' : heroConfig.secondaryCTA.style === 'secondary' ? 'bg-gray-200 text-gray-800' : 'border border-gray-400 text-gray-700'}
  * Taille : px-6 py-3
  * Font : font-semibold
  * Animation : hover:scale-105 transition-transform
` : '- Bouton secondaire désactivé'}

SOCIAL PROOF :
${heroConfig.socialProof.enabled ? `
- Type : ${heroConfig.socialProof.type}
- Logos : ${heroConfig.socialProof.logos.length > 0 ? 'Afficher les logos des partenaires' : 'Aucun logo fourni'}
- Note moyenne : ${heroConfig.socialProof.rating} / 5
- Témoignage : "${heroConfig.socialProof.testimonialText}"
` : '- Social proof désactivé'}

RESPONSIVE DESIGN :
- Mobile-first
- Textes adaptatifs selon la taille d’écran
- Images et vidéos responsives
- Boutons empilés sur mobile
- Marges et paddings ajustés
          ` : basePrompt + `
          Spécifications pour le Hero :
          - Titre accrocheur et sous-titre avec typographie moderne
          - Call-to-action principal et secondaire avec boutons stylés
          - Image ou illustration moderne (utilise des icônes Lucide React)
          - Animations d'entrée avec TailwindCSS (animate-fade-in, animate-slide-in)
          - Design impactant avec gradient et effets visuels
          - Utilise les couleurs du thème fourni
          - Responsive design (mobile-first)
          - Hover effects sur les boutons
          `
          ;
          
          
        

} 