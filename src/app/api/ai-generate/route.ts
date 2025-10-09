import { NextResponse } from 'next/server';
import { generateHeaderPrompt } from '@/lib/promptgenerators/header';

export async function POST(req: Request) {
  try {
    console.log('=== API ROUTE CALLED ===');
    const reqq = await req.json();
    console.log('Request received with body:', reqq);
    const { sectionName, projectDescription, feedback, previousCode } = reqq;



  console.log('=== AI GENERATION START ===');
  console.log('Section name:', sectionName);



      let config = null;
    switch (sectionName) {
      case 'Header':
        config = reqq.headerConfig;
        break;
      case 'Hero':
        config = reqq.heroConfig;
        break;
      case 'Features':
        config = reqq.featuresConfig;
        break;
      case 'Pricing':
        config = reqq.pricingConfig;
        break;
      case 'Services':
        config = reqq.servicesConfig;
        break;
      case 'Testimonials':
        config = reqq.testimonialsConfig;
        break;
      case 'FAQ':
        config = reqq.faqConfig;
        break;
      case 'Gallery':
        config = reqq.galleryConfig;
        break;
      case 'Contact':
        config = reqq.contactConfig;
        break;
      case 'CTA':
        config = reqq.ctaConfig;
        break;
      case 'Footer':
        config = reqq.footerConfig;
        break;
      default:
        return new Response(
          JSON.stringify({ error: `Unknown section name: ${sectionName}` }),
          { status: 400 }
        );
    }

    // Create specific prompts for each section type
    const getSectionPrompt = (
      section: string, 
      description: string, 
      feedback?: string, 
      previousCode?: string, 
      config?: any,
    ) => {


      let feedbackInfo = '';
      if (feedback && previousCode) {
        feedbackInfo = `
        
        FEEDBACK UTILISATEUR :
        "${feedback}"
        
        CODE PRÉCÉDENT :
        ${previousCode}
        
        INSTRUCTIONS SPÉCIALES :
        - Prends en compte le feedback utilisateur ci-dessus
        - Améliore le code précédent selon les demandes
        - Garde les éléments qui fonctionnent bien
        - Modifie uniquement ce qui est demandé
        `;
      }

      const basePrompt = `Tu es un développeur web expert. Crée du HTML pur avec TailwindCSS pour la section "${section}" d'une landing page.
      
      Le projet est : "${description}"
      
      ${feedbackInfo}
      
      Règles importantes :
      - Utilise HTML pur (pas de React/JSX)
      - Utilise TailwindCSS pour le style
      - Applique le thème de couleurs fourni
      - Crée un design moderne et responsive
      - Inclus des animations et transitions fluides
      - Utilise des icônes SVG de Lucide React (copie les SVG directement)
      - Optimise pour le SEO et l'accessibilité
      - Ne génère pas de texte inutile
      - Ne mets pas \`\`\`html ou \`\`\`
      - IMPORTANT: Génère UNIQUEMENT du HTML pur avec TailwindCSS
      - Inclus les icônes SVG directement dans le HTML
      - Utilise des animations TailwindCSS (animate-pulse, hover:scale-105, etc.)
      - Crée un design professionnel et moderne
      - CRITIQUE: Ne génère QUE le code HTML, pas de descriptions, pas de commentaires, pas de texte explicatif
      - Le résultat doit être du HTML pur prêt à être rendu directement
      - Utilise des gradients modernes et des effets visuels
      - Crée des hover effects élégants
      - Assure une typographie moderne et lisible
      - Utilise des espacements cohérents (padding, margin)
      - Crée des bordures arrondies modernes (rounded-lg, rounded-xl)
      - Utilise des ombres subtiles pour la profondeur
      - CRITIQUE: Supprime TOUS les marges et paddings par défaut (m-0 p-0)
      - CRITIQUE: Assure une intégration parfaite sans espaces blancs
      - CRITIQUE: Utilise w-full pour occuper toute la largeur disponible
      `;

      console.log('🔍 Section name for switch:', section);
      console.log('🔍 Section name lowercase:', section.toLowerCase());
      
      switch (section.toLowerCase()) {
        ////////////////////////HEADER////////////////////////
        case 'header':
          const headerSpecs = generateHeaderPrompt (basePrompt, config);
          console.log('=== HEADER PROMPT ===' , headerSpecs);
          return basePrompt + headerSpecs + `
          - CRITIQUE: Génère UNIQUEMENT du HTML pur avec TailwindCSS
          - Pas de descriptions, pas de commentaires, pas de texte explicatif
          - Le résultat doit être du HTML pur prêt à être rendu directement
          - Inclus TOUS les boutons CTA spécifiés
          - Utilise les couleurs du thème fourni
          - Crée un design moderne et professionnel
          - CRITIQUE: Respecte EXACTEMENT la configuration fournie
          `;
       /* 
        case 'hero':
          const heroSpecs = heroConfig ? `
          CONFIGURATION DU HERO :
          - Titre principal : "${heroConfig.headline}"
          - Sous-titre : "${heroConfig.subtitle}"
          - Bouton principal : "${heroConfig.primaryCTA.text}" (style: ${heroConfig.primaryCTA.style})
          ${heroConfig.secondaryCTA ? `- Bouton secondaire : "${heroConfig.secondaryCTA.text}" (style: ${heroConfig.secondaryCTA.style})` : ''}
          - Disposition : ${heroConfig.layout}
          - Alignement du texte : ${heroConfig.textAlignment}
          - Style de fond : ${heroConfig.backgroundStyle}
          - Animation : ${heroConfig.animation}
          - Indicateurs de confiance : ${heroConfig.trustIndicators.join(', ')}
          ${heroConfig.backgroundImage ? '- Image de fond fournie' : ''}
          ${heroConfig.contentImage ? '- Image de contenu fournie' : ''}
          - DESIGN :
            * Thème : ${heroConfig.design?.theme || 'light'}
            * Couleur primaire : ${heroConfig.design?.primaryColor || '#3B82F6'}
            * Couleur secondaire : ${heroConfig.design?.secondaryColor || '#1F2937'}
            * Couleur d'accent : ${heroConfig.design?.accentColor || '#8B5CF6'}
            * Couleur du texte : ${heroConfig.design?.textColor || '#1F2937'}
            * Couleur de fond : ${heroConfig.design?.backgroundColor || '#FFFFFF'}
            * Couleur d'overlay : ${heroConfig.design?.overlayColor || 'rgba(0, 0, 0, 0.1)'}
            * Style des boutons : ${heroConfig.design?.buttonStyle || 'rounded'}
            * Typographie : ${heroConfig.design?.typography || 'modern'}
          
          SPÉCIFICATIONS DÉTAILLÉES POUR UN HERO MODERNE ET BEAU :
          
          STRUCTURE OBLIGATOIRE :
          - Section hero avec hauteur minimale de 100vh
          - Titre principal : "${heroConfig.headline}" en très grande taille (text-5xl à text-7xl)
          - Sous-titre : "${heroConfig.subtitle}" en taille moyenne (text-lg à text-xl)
          - Boutons CTA avec espacement approprié
          - Indicateurs de confiance en bas si présents
          
          LAYOUT SPÉCIFIQUE :
          - Disposition : ${heroConfig.layout}
          ${heroConfig.layout === 'text-only' ? '- Contenu centré verticalement et horizontalement, pas d\'image' : ''}
          ${heroConfig.layout === 'text-image-left' ? '- Texte à gauche, image à droite (grid grid-cols-1 md:grid-cols-2)' : ''}
          ${heroConfig.layout === 'text-image-right' ? '- Texte à droite, image à gauche (grid grid-cols-1 md:grid-cols-2)' : ''}
          ${heroConfig.layout === 'text-image-center' ? '- Texte au-dessus, image en dessous centrée (flex flex-col)' : ''}
          ${heroConfig.layout === 'split-form' ? '- Texte à gauche, formulaire à droite (grid grid-cols-1 md:grid-cols-2)' : ''}
          
          INSTRUCTIONS SPÉCIFIQUES POUR LES IMAGES :
          ${heroConfig.backgroundImage ? `
          - Si backgroundImage est fourni, utilise-le comme background-image CSS
          - Exemple : style="background-image: url('${heroConfig.backgroundImage}'); background-size: cover; background-position: center;"
          - Ajoute un overlay sombre pour la lisibilité du texte : before:absolute before:inset-0 before:bg-black/50
          ` : ''}
          ${heroConfig.contentImage ? `
          - Si contentImage est fourni, utilise-le dans une balise <img>
          - Exemple : <img src="${heroConfig.contentImage}" alt="Hero content" class="w-full h-auto rounded-lg shadow-lg">
          - Positionne l'image selon le layout choisi
          ` : ''}
          
          STYLING OBLIGATOIRE :
          - Alignement du texte : ${heroConfig.textAlignment}
          - Fond : ${heroConfig.backgroundStyle === 'gradient' ? 'Dégradé avec les couleurs du thème' : heroConfig.backgroundStyle === 'solid' ? 'Couleur unie du thème' : heroConfig.backgroundStyle === 'image' ? 'Image de fond avec overlay' : 'Vidéo de fond'}
          - Utilise EXACTEMENT les couleurs fournies dans la configuration design
          - Couleur primaire : ${heroConfig.design?.primaryColor || '#3B82F6'} (pour les boutons CTA principaux)
          - Couleur secondaire : ${heroConfig.design?.secondaryColor || '#1F2937'} (pour les éléments secondaires)
          - Couleur d'accent : ${heroConfig.design?.accentColor || '#8B5CF6'} (pour les highlights)
          - Couleur du texte : ${heroConfig.design?.textColor || '#1F2937'} (pour tout le texte)
          - Couleur de fond : ${heroConfig.design?.backgroundColor || '#FFFFFF'} (pour le fond)
          - Couleur d'overlay : ${heroConfig.design?.overlayColor || 'rgba(0, 0, 0, 0.1)'} (pour les overlays)
          - Thème : ${heroConfig.design?.theme || 'light'}
          ${heroConfig.design?.theme === 'dark' ? '- Utilise un fond sombre avec texte clair' : ''}
          ${heroConfig.design?.theme === 'gradient' ? '- Utilise un dégradé avec les couleurs primaire et accent' : ''}
          ${heroConfig.design?.theme === 'glassmorphism' ? '- Utilise un effet glassmorphism avec backdrop-blur' : ''}
          ${heroConfig.design?.theme === 'minimal' ? '- Design épuré avec beaucoup d\'espace blanc' : ''}
          ${heroConfig.design?.theme === 'bold' ? '- Design audacieux avec contraste fort' : ''}
          - Style des boutons : ${heroConfig.design?.buttonStyle || 'rounded'}
          - Typographie : ${heroConfig.design?.typography || 'modern'}
          - Espacements généreux (padding, margin)
          
          BOUTONS CTA DÉTAILLÉS :
          - Bouton principal "${heroConfig.primaryCTA.text}" :
            * Style: ${heroConfig.primaryCTA.style === 'primary' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700' : heroConfig.primaryCTA.style === 'secondary' ? 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-50' : 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50'}
            * Taille: px-8 py-4
            * Border radius: rounded-lg
            * Font: font-bold text-lg
            * Animation: hover:scale-105 transition-transform
          
          ${heroConfig.secondaryCTA ? `
          - Bouton secondaire "${heroConfig.secondaryCTA.text}" :
            * Style: ${heroConfig.secondaryCTA.style === 'primary' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700' : heroConfig.secondaryCTA.style === 'secondary' ? 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-50' : 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50'}
            * Taille: px-6 py-3
            * Border radius: rounded-lg
            * Font: font-semibold
            * Animation: hover:scale-105 transition-transform
          ` : ''}
          
          IMAGES :
          ${heroConfig.backgroundImage ? `
          - Image de fond fournie (base64) : ${heroConfig.backgroundImage}
          - Utilise cette image comme background-image avec overlay pour la lisibilité du texte
          - Style CSS : background-image: url('${heroConfig.backgroundImage}');
          ` : ''}
          ${heroConfig.contentImage ? `
          - Image de contenu fournie (base64) : ${heroConfig.contentImage}
          - Utilise cette image dans une balise <img> selon la disposition choisie
          - Balise HTML : <img src="${heroConfig.contentImage}" alt="Hero content" class="...">
          ` : ''}
          ${!heroConfig.backgroundImage && !heroConfig.contentImage ? '- Utilise des icônes SVG modernes de Lucide React ou des illustrations CSS' : ''}
          
          ANIMATIONS :
          - Animation d'entrée : ${heroConfig.animation === 'fade-in' ? 'animate-fade-in' : heroConfig.animation === 'slide-up' ? 'animate-slide-in-up' : heroConfig.animation === 'zoom-in' ? 'animate-zoom-in' : 'pas d\'animation'}
          - Hover effects sur les boutons
          - Transitions fluides
          
          INDICATEURS DE CONFIANCE :
          ${heroConfig.trustIndicators.length > 0 ? `
          - Afficher en bas de la section : ${heroConfig.trustIndicators.join(', ')}
          - Style: badges avec fond gris clair et texte gris foncé
          - Disposition: flex wrap avec espacement
          ` : ''}
          
          RESPONSIVE :
          - Mobile-first design
          - Texte adaptatif selon la taille d'écran
          - Images responsives
          - Boutons empilés sur mobile si nécessaire
          ` : `
          Spécifications pour le Hero :
          - Titre accrocheur et sous-titre avec typographie moderne
          - Call-to-action principal et secondaire avec boutons stylés
          - Image ou illustration moderne (utilise des icônes Lucide React)
          - Animations d'entrée avec TailwindCSS (animate-fade-in, animate-slide-in)
          - Design impactant avec gradient et effets visuels
          - Utilise les couleurs du thème fourni
          - Responsive design (mobile-first)
          - Hover effects sur les boutons
          `;
          
          return basePrompt + heroSpecs + `
          - CRITIQUE: Génère UNIQUEMENT du HTML pur avec TailwindCSS
          - Pas de descriptions, pas de commentaires, pas de texte explicatif
          - Le résultat doit être du HTML pur prêt à être rendu directement
          - Inclus TOUS les boutons CTA spécifiés
          - Utilise les couleurs du thème fourni
          - Crée un design moderne et professionnel
          - Respecte EXACTEMENT la configuration fournie
          - INCLUS OBLIGATOIREMENT les images fournies (backgroundImage et contentImage) dans le HTML généré
          - Utilise les URLs base64 fournies directement dans les balises img et background-image
          `;
        
        case 'services':
          console.log('🎯 SERVICES CASE EXECUTED!');
          console.log('=== SERVICES PROMPT BEING CONSTRUCTED ===');
          console.log('Using servicesConfig:', servicesConfig ? 'YES' : 'NO');
          return servicesConfig ? basePrompt + `
          CONFIGURATION DES SERVICES :
          - Titre de la section : "${servicesConfig.title}"
          - Sous-titre : "${servicesConfig.subtitle}"
          - Nombre de services : ${servicesConfig.services.length}
          - Disposition : ${servicesConfig.layout}
          - Alignement : ${servicesConfig.alignment}
          - Afficher les icônes : ${servicesConfig.showIcons ? 'Oui' : 'Non'}
          - Afficher les images : ${servicesConfig.showImages ? 'Oui' : 'Non'}
          - Afficher les prix : ${servicesConfig.showPrices ? 'Oui' : 'Non'}
          - Animation : ${servicesConfig.animation}
          - DESIGN :
            * Thème : ${servicesConfig.design?.theme || 'light'}
            * Couleur primaire : ${servicesConfig.design?.primaryColor || '#3B82F6'}
            * Couleur secondaire : ${servicesConfig.design?.secondaryColor || '#1F2937'}
            * Couleur d'accent : ${servicesConfig.design?.accentColor || '#8B5CF6'}
            * Couleur du texte : ${servicesConfig.design?.textColor || '#1F2937'}
            * Couleur de fond : ${servicesConfig.design?.backgroundColor || '#FFFFFF'}
            * Style des cartes : ${servicesConfig.design?.cardStyle || 'elevated'}
            * Style des icônes : ${servicesConfig.design?.iconStyle || 'filled'}
            * Typographie : ${servicesConfig.design?.typography || 'modern'}

          SERVICES DÉTAILLÉS :
          ${servicesConfig.services.map((service: any, index: number) => `
          - Service ${index + 1} : "${service.title}"
            * Description : "${service.description}"
            * Icône : ${service.icon}
            * Prix : ${service.price ? `$${service.price}` : 'Non spécifié'}
            * Durée : ${service.duration || 'Non spécifié'}
            * Mise en avant : ${service.highlight ? 'Oui' : 'Non'}
            ${service.cta ? `* CTA : "${service.cta.text}" (${service.cta.style})` : ''}
          `).join('')}

          SPÉCIFICATIONS DÉTAILLÉES POUR UNE SECTION SERVICES MODERNE ET BEAUE :

          STRUCTURE OBLIGATOIRE :
          - Section services avec titre et sous-titre
          - Grille de services selon la disposition choisie
          - Chaque service avec icône, titre, description, prix (si activé)
          - Espacement généreux entre les éléments

          LAYOUT SPÉCIFIQUE :
          - Disposition : ${servicesConfig.layout}
          ${servicesConfig.layout === 'grid-2' ? '- Grille 2 colonnes (grid grid-cols-1 md:grid-cols-2)' : ''}
          ${servicesConfig.layout === 'grid-3' ? '- Grille 3 colonnes (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3)' : ''}
          ${servicesConfig.layout === 'grid-4' ? '- Grille 4 colonnes (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4)' : ''}
          ${servicesConfig.layout === 'list' ? '- Liste verticale (flex flex-col)' : ''}
          ${servicesConfig.layout === 'cards' ? '- Cartes avec ombres (grid avec shadow-lg)' : ''}
          ${servicesConfig.layout === 'horizontal' ? '- Disposition horizontale (flex)' : ''}

          STYLING OBLIGATOIRE :
          - Alignement : ${servicesConfig.alignment}
          - Utilise EXACTEMENT les couleurs fournies dans la configuration design
          - Couleur primaire : ${servicesConfig.design?.primaryColor || '#3B82F6'} (pour les icônes et accents)
          - Couleur secondaire : ${servicesConfig.design?.secondaryColor || '#1F2937'} (pour les textes)
          - Couleur d'accent : ${servicesConfig.design?.accentColor || '#8B5CF6'} (pour les highlights)
          - Couleur du texte : ${servicesConfig.design?.textColor || '#1F2937'} (pour tout le texte)
          - Couleur de fond : ${servicesConfig.design?.backgroundColor || '#FFFFFF'} (pour le fond)
          - Thème : ${servicesConfig.design?.theme || 'light'}
          ${servicesConfig.design?.theme === 'dark' ? '- Utilise un fond sombre avec texte clair' : ''}
          ${servicesConfig.design?.theme === 'gradient' ? '- Utilise un dégradé avec les couleurs primaire et accent' : ''}
          ${servicesConfig.design?.theme === 'glassmorphism' ? '- Utilise un effet glassmorphism avec backdrop-blur' : ''}
          ${servicesConfig.design?.theme === 'minimal' ? '- Design épuré avec beaucoup d\'espace blanc' : ''}
          ${servicesConfig.design?.theme === 'bold' ? '- Design audacieux avec contraste fort' : ''}
          - Style des cartes : ${servicesConfig.design?.cardStyle || 'elevated'}
          - Style des icônes : ${servicesConfig.design?.iconStyle || 'filled'}
          - Typographie : ${servicesConfig.design?.typography || 'modern'}

          ÉLÉMENTS VISUELS :
          ${servicesConfig.showIcons ? `
          - Afficher les icônes pour chaque service
          - Style des icônes : ${servicesConfig.design?.iconStyle || 'filled'}
          - Couleur des icônes : ${servicesConfig.design?.primaryColor || '#3B82F6'}
          - Taille des icônes : w-8 h-8 ou w-12 h-12 selon l'importance
          ` : ''}
          ${servicesConfig.showPrices ? `
          - Afficher les prix pour chaque service
          - Style : badges ou texte en gras avec la couleur primaire
          - Position : en haut à droite de chaque carte
          ` : ''}

          BOUTONS CTA DÉTAILLÉS :
          ${servicesConfig.services.map((service: any) => service.cta ? `
          - Bouton "${service.cta.text}" pour le service ${service.title} :
            * Style: ${service.cta.style === 'primary' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : service.cta.style === 'secondary' ? 'bg-gray-100 text-gray-800 border border-gray-300' : 'border border-gray-300 text-gray-700 bg-white'}
            * Hover: ${service.cta.style === 'primary' ? 'hover:from-purple-700 hover:to-blue-700' : 'hover:bg-gray-50'}
            * Padding: px-4 py-2
            * Border radius: rounded-lg
            * Font: font-semibold
          ` : '').join('')}

          ANIMATIONS :
          - Animation d'entrée : ${servicesConfig.animation === 'fade-in' ? 'animate-fade-in' : servicesConfig.animation === 'slide-up' ? 'animate-slide-in-up' : servicesConfig.animation === 'stagger' ? 'animate-stagger avec délais' : 'pas d\'animation'}
          - Hover effects sur les cartes
          - Transitions fluides

          RESPONSIVE :
          - Mobile-first design
          - Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
          - Grille responsive selon la disposition choisie
          - Espacement adaptatif

          CRITIQUE: Respecte EXACTEMENT la configuration fournie
          CRITIQUE: Utilise les couleurs exactes du design
          CRITIQUE: Affiche tous les services listés
          ` : basePrompt + `
          Spécifications pour Services :
          - Grille de 3-4 services avec TailwindCSS grid
          - Icônes SVG de Lucide React (copie les SVG directement)
          - Descriptions courtes et claires
          - Hover effects avec transitions
          - Design professionnel et moderne
          - Utilise des couleurs du thème fourni
          - Responsive design (mobile-first)
          - Animations d'entrée avec TailwindCSS
          - Exemple d'icône SVG: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5Z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          `;
        

        
        case 'testimonials':
          console.log('🎯 TESTIMONIALS CASE EXECUTED!');
          console.log('=== TESTIMONIALS PROMPT BEING CONSTRUCTED ===');
          console.log('Using testimonialsConfig:', testimonialsConfig ? 'YES' : 'NO');
          return testimonialsConfig ? basePrompt + `
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
          ` : basePrompt + `
          Spécifications pour Testimonials :
          - Carrousel de témoignages
          - Photos et noms des clients
          - Étoiles de notation
          - Citations inspirantes
          - Design élégant
          `;
        case 'features':
          console.log('🎯 FEATURES CASE EXECUTED!');
          console.log('=== FEATURES PROMPT BEING CONSTRUCTED ===');
          console.log('Using featuresConfig:', featuresConfig ? 'YES' : 'NO');
          return featuresConfig ? basePrompt + `
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
          ` : basePrompt + `
          Spécifications pour Features :
          - Section de fonctionnalités avec grille
          - Icônes et descriptions
          - Design moderne et responsive
          - Features attractives
          `;
        
        case 'pricing':
          console.log('🎯 PRICING CASE EXECUTED!');
          console.log('=== PRICING PROMPT BEING CONSTRUCTED ===');
          console.log('Using pricingConfig:', pricingConfig ? 'YES' : 'NO');
          return pricingConfig ? basePrompt + `
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
          ` : basePrompt + `
          Spécifications pour Pricing :
          - 3 plans tarifaires
          - Comparaison des fonctionnalités
          - Boutons d'action
          - Design moderne avec badges
          - Pricing attractif
          `;
        
        case 'contact':
          console.log('🎯 CONTACT CASE EXECUTED!');
          console.log('=== CONTACT PROMPT BEING CONSTRUCTED ===');
          console.log('Using contactConfig:', contactConfig ? 'YES' : 'NO');
          return contactConfig ? basePrompt + `
          CONFIGURATION DU CONTACT :
          - Titre de la section : "${contactConfig.title}"
          - Sous-titre : "${contactConfig.subtitle}"
          - Disposition : ${contactConfig.layout}
          - Alignement : ${contactConfig.alignment}
          - Afficher le formulaire : ${contactConfig.showForm ? 'Oui' : 'Non'}
          - Afficher les informations : ${contactConfig.showInfo ? 'Oui' : 'Non'}
          - Afficher la carte : ${contactConfig.showMap ? 'Oui' : 'Non'}
          - Animation : ${contactConfig.animation}
          - DESIGN :
            * Thème : ${contactConfig.design?.theme || 'light'}
            * Couleur primaire : ${contactConfig.design?.primaryColor || '#3B82F6'}
            * Couleur secondaire : ${contactConfig.design?.secondaryColor || '#1F2937'}
            * Couleur d'accent : ${contactConfig.design?.accentColor || '#8B5CF6'}
            * Couleur du texte : ${contactConfig.design?.textColor || '#1F2937'}
            * Couleur de fond : ${contactConfig.design?.backgroundColor || '#FFFFFF'}
            * Style du formulaire : ${contactConfig.design?.formStyle || 'modern'}
            * Style des boutons : ${contactConfig.design?.buttonStyle || 'rounded'}
            * Typographie : ${contactConfig.design?.typography || 'modern'}

          INFORMATIONS DE CONTACT :
          - Email : ${contactConfig.email || 'Non spécifié'}
          - Téléphone : ${contactConfig.phone || 'Non spécifié'}
          - Adresse : ${contactConfig.address || 'Non spécifiée'}
          - Horaires : ${contactConfig.hours || 'Non spécifiés'}
          - Réseaux sociaux : ${contactConfig.socialMedia?.join(', ') || 'Aucun'}

          CHAMPS DU FORMULAIRE :
          ${contactConfig.formFields?.map((field: any) => `
          - ${field.type} : ${field.required ? 'Obligatoire' : 'Optionnel'}
          `).join('') || 'Champs par défaut (nom, email, message)'}

          SPÉCIFICATIONS DÉTAILLÉES POUR UNE SECTION CONTACT MODERNE ET BEAUE :

          STRUCTURE OBLIGATOIRE :
          - Section contact avec titre et sous-titre
          - Formulaire de contact (si activé)
          - Informations de contact (si activées)
          - Carte ou adresse (si activée)
          - Espacement généreux entre les éléments

          LAYOUT SPÉCIFIQUE :
          - Disposition : ${contactConfig.layout}
          ${contactConfig.layout === 'form-info' ? '- Formulaire à gauche, informations à droite (grid grid-cols-1 md:grid-cols-2)' : ''}
          ${contactConfig.layout === 'info-form' ? '- Informations à gauche, formulaire à droite (grid grid-cols-1 md:grid-cols-2)' : ''}
          ${contactConfig.layout === 'form-only' ? '- Formulaire uniquement (flex flex-col)' : ''}
          ${contactConfig.layout === 'info-only' ? '- Informations uniquement (flex flex-col)' : ''}
          ${contactConfig.layout === 'centered' ? '- Tout centré (flex flex-col items-center)' : ''}

          STYLING OBLIGATOIRE :
          - Alignement : ${contactConfig.alignment}
          - Utilise EXACTEMENT les couleurs fournies dans la configuration design
          - Couleur primaire : ${contactConfig.design?.primaryColor || '#3B82F6'} (pour les boutons et accents)
          - Couleur secondaire : ${contactConfig.design?.secondaryColor || '#1F2937'} (pour les textes)
          - Couleur d'accent : ${contactConfig.design?.accentColor || '#8B5CF6'} (pour les highlights)
          - Couleur du texte : ${contactConfig.design?.textColor || '#1F2937'} (pour tout le texte)
          - Couleur de fond : ${contactConfig.design?.backgroundColor || '#FFFFFF'} (pour le fond)
          - Thème : ${contactConfig.design?.theme || 'light'}
          ${contactConfig.design?.theme === 'dark' ? '- Utilise un fond sombre avec texte clair' : ''}
          ${contactConfig.design?.theme === 'gradient' ? '- Utilise un dégradé avec les couleurs primaire et accent' : ''}
          ${contactConfig.design?.theme === 'glassmorphism' ? '- Utilise un effet glassmorphism avec backdrop-blur' : ''}
          ${contactConfig.design?.theme === 'minimal' ? '- Design épuré avec beaucoup d\'espace blanc' : ''}
          ${contactConfig.design?.theme === 'bold' ? '- Design audacieux avec contraste fort' : ''}
          - Style du formulaire : ${contactConfig.design?.formStyle || 'modern'}
          - Style des boutons : ${contactConfig.design?.buttonStyle || 'rounded'}
          - Typographie : ${contactConfig.design?.typography || 'modern'}

          ÉLÉMENTS VISUELS :
          ${contactConfig.showForm ? `
          - Afficher le formulaire de contact
          - Style du formulaire : ${contactConfig.design?.formStyle || 'modern'}
          - Champs : nom, email, message (ou champs personnalisés)
          - Bouton d'envoi avec la couleur primaire
          - Validation des champs obligatoires
          ` : ''}
          ${contactConfig.showInfo ? `
          - Afficher les informations de contact
          - Email : ${contactConfig.email || 'Non spécifié'}
          - Téléphone : ${contactConfig.phone || 'Non spécifié'}
          - Adresse : ${contactConfig.address || 'Non spécifiée'}
          - Horaires : ${contactConfig.hours || 'Non spécifiés'}
          - Icônes pour chaque type d'information
          ` : ''}
          ${contactConfig.showMap ? `
          - Afficher une carte ou une adresse
          - Style : iframe Google Maps ou carte stylisée
          - Adresse : ${contactConfig.address || 'Non spécifiée'}
          ` : ''}

          ANIMATIONS :
          - Animation d'entrée : ${contactConfig.animation === 'fade-in' ? 'animate-fade-in' : contactConfig.animation === 'slide-up' ? 'animate-slide-in-up' : contactConfig.animation === 'stagger' ? 'animate-stagger avec délais' : 'pas d\'animation'}
          - Hover effects sur les boutons et liens
          - Transitions fluides

          RESPONSIVE :
          - Mobile-first design
          - Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
          - Layout responsive selon la disposition choisie
          - Espacement adaptatif

          CRITIQUE: Respecte EXACTEMENT la configuration fournie
          CRITIQUE: Utilise les couleurs exactes du design
          CRITIQUE: Inclus toutes les informations de contact spécifiées
          ` : basePrompt + `
          Spécifications pour Contact :
          - Formulaire de contact
          - Informations de contact
          - Carte ou adresse
          - Design professionnel
          - Formulaire fonctionnel
          `;
        
        case 'faq':
          console.log('🎯 FAQ CASE EXECUTED!');
          console.log('=== FAQ PROMPT BEING CONSTRUCTED ===');
          console.log('Using faqConfig:', faqConfig ? 'YES' : 'NO');
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
        
        case 'gallery':
          console.log('🎯 GALLERY CASE EXECUTED!');
          console.log('=== GALLERY PROMPT BEING CONSTRUCTED ===');
          console.log('Using galleryConfig:', galleryConfig ? 'YES' : 'NO');
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
        
        case 'cta':
          console.log('🎯 CTA CASE EXECUTED!');
          console.log('=== CTA PROMPT BEING CONSTRUCTED ===');
          console.log('Using ctaConfig:', ctaConfig ? 'YES' : 'NO');
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
        
        case 'footer':
          console.log('🎯 FOOTER CASE EXECUTED!');
          console.log('=== FOOTER PROMPT BEING CONSTRUCTED ===');
          console.log('Using footerConfig:', footerConfig ? 'YES' : 'NO');
          return footerConfig ? basePrompt + `
          CONFIGURATION DU FOOTER :
          - Titre de la marque : "${footerConfig.brandName}"
          - Description : "${footerConfig.description}"
          - Disposition : ${footerConfig.layout}
          - Alignement : ${footerConfig.alignment}
          - Afficher les liens : ${footerConfig.showLinks ? 'Oui' : 'Non'}
          - Afficher les réseaux sociaux : ${footerConfig.showSocial ? 'Oui' : 'Non'}
          - Afficher la newsletter : ${footerConfig.showNewsletter ? 'Oui' : 'Non'}
          - Afficher les informations légales : ${footerConfig.showLegal ? 'Oui' : 'Non'}
          - Animation : ${footerConfig.animation}
          - DESIGN :
            * Thème : ${footerConfig.design?.theme || 'light'}
            * Couleur primaire : ${footerConfig.design?.primaryColor || '#3B82F6'}
            * Couleur secondaire : ${footerConfig.design?.secondaryColor || '#1F2937'}
            * Couleur d'accent : ${footerConfig.design?.accentColor || '#8B5CF6'}
            * Couleur du texte : ${footerConfig.design?.textColor || '#1F2937'}
            * Couleur de fond : ${footerConfig.design?.backgroundColor || '#FFFFFF'}
            * Style des liens : ${footerConfig.design?.linkStyle || 'underline'}
            * Style des boutons : ${footerConfig.design?.buttonStyle || 'rounded'}
            * Typographie : ${footerConfig.design?.typography || 'modern'}

          LIENS DE NAVIGATION :
          ${footerConfig.links?.map((linkGroup: any) => `
          - Groupe "${linkGroup.title}" :
            ${linkGroup.links.map((link: any) => `* ${link.text} (${link.url})`).join('\n')}
          `).join('') || 'Liens par défaut (Accueil, À propos, Services, Contact)'}

          RÉSEAUX SOCIAUX :
          ${footerConfig.socialMedia?.map((social: any) => `
          - ${social.platform} : ${social.url}
          `).join('') || 'Aucun réseau social spécifié'}

          INFORMATIONS LÉGALES :
          - Copyright : ${footerConfig.copyright || '© 2024 Tous droits réservés'}
          - Mentions légales : ${footerConfig.legalLinks?.join(', ') || 'Politique de confidentialité, Conditions d\'utilisation'}

          SPÉCIFICATIONS DÉTAILLÉES POUR UN FOOTER MODERNE ET BEAU :

          STRUCTURE OBLIGATOIRE :
          - Footer avec marque et description
          - Liens de navigation organisés par groupes
          - Réseaux sociaux avec icônes
          - Newsletter signup (si activé)
          - Informations légales en bas
          - Espacement généreux entre les éléments

          LAYOUT SPÉCIFIQUE :
          - Disposition : ${footerConfig.layout}
          ${footerConfig.layout === '4-columns' ? '- 4 colonnes (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4)' : ''}
          ${footerConfig.layout === '3-columns' ? '- 3 colonnes (grid grid-cols-1 md:grid-cols-3)' : ''}
          ${footerConfig.layout === '2-columns' ? '- 2 colonnes (grid grid-cols-1 md:grid-cols-2)' : ''}
          ${footerConfig.layout === 'stacked' ? '- Éléments empilés (flex flex-col)' : ''}
          ${footerConfig.layout === 'centered' ? '- Contenu centré (flex flex-col items-center)' : ''}

          STYLING OBLIGATOIRE :
          - Alignement : ${footerConfig.alignment}
          - Utilise EXACTEMENT les couleurs fournies dans la configuration design
          - Couleur primaire : ${footerConfig.design?.primaryColor || '#3B82F6'} (pour les accents)
          - Couleur secondaire : ${footerConfig.design?.secondaryColor || '#1F2937'} (pour les textes)
          - Couleur d'accent : ${footerConfig.design?.accentColor || '#8B5CF6'} (pour les highlights)
          - Couleur du texte : ${footerConfig.design?.textColor || '#1F2937'} (pour tout le texte)
          - Couleur de fond : ${footerConfig.design?.backgroundColor || '#FFFFFF'} (pour le fond)
          - Thème : ${footerConfig.design?.theme || 'light'}
          ${footerConfig.design?.theme === 'dark' ? '- Utilise un fond sombre avec texte clair' : ''}
          ${footerConfig.design?.theme === 'gradient' ? '- Utilise un dégradé avec les couleurs primaire et accent' : ''}
          ${footerConfig.design?.theme === 'glassmorphism' ? '- Utilise un effet glassmorphism avec backdrop-blur' : ''}
          ${footerConfig.design?.theme === 'minimal' ? '- Design épuré avec beaucoup d\'espace blanc' : ''}
          ${footerConfig.design?.theme === 'bold' ? '- Design audacieux avec contraste fort' : ''}
          - Style des liens : ${footerConfig.design?.linkStyle || 'underline'}
          - Style des boutons : ${footerConfig.design?.buttonStyle || 'rounded'}
          - Typographie : ${footerConfig.design?.typography || 'modern'}

          ÉLÉMENTS VISUELS :
          ${footerConfig.showLinks ? `
          - Afficher les liens de navigation
          - Style des liens : ${footerConfig.design?.linkStyle || 'underline'}
          - Organisation par groupes avec titres
          - Hover effects sur les liens
          ` : ''}
          ${footerConfig.showSocial ? `
          - Afficher les réseaux sociaux
          - Icônes SVG pour chaque plateforme
          - Couleur des icônes : ${footerConfig.design?.primaryColor || '#3B82F6'}
          - Hover effects sur les icônes
          ` : ''}
          ${footerConfig.showNewsletter ? `
          - Afficher le formulaire newsletter
          - Champ email avec bouton d'inscription
          - Style du bouton avec la couleur primaire
          ` : ''}
          ${footerConfig.showLegal ? `
          - Afficher les informations légales
          - Copyright : ${footerConfig.copyright || '© 2024 Tous droits réservés'}
          - Liens légaux : ${footerConfig.legalLinks?.join(', ') || 'Politique de confidentialité, Conditions d\'utilisation'}
          ` : ''}

          ANIMATIONS :
          - Animation d'entrée : ${footerConfig.animation === 'fade-in' ? 'animate-fade-in' : footerConfig.animation === 'slide-up' ? 'animate-slide-in-up' : footerConfig.animation === 'stagger' ? 'animate-stagger avec délais' : 'pas d\'animation'}
          - Hover effects sur les liens et icônes
          - Transitions fluides

          RESPONSIVE :
          - Mobile-first design
          - Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
          - Layout responsive selon la disposition choisie
          - Espacement adaptatif

          CRITIQUE: Respecte EXACTEMENT la configuration fournie
          CRITIQUE: Utilise les couleurs exactes du design
          CRITIQUE: Inclus tous les liens et informations spécifiés
          ` : basePrompt + `
          Spécifications pour Footer :
          - Liens de navigation
          - Réseaux sociaux
          - Informations légales
          - Newsletter signup
          - Footer complet
          `;
          */
        
        default:
          return basePrompt;
      }
    };

    const prompt = getSectionPrompt(
      sectionName, 
      projectDescription, 
      feedback, 
      previousCode, 
      config,
    );

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer sk-27727cecdda84bc6b293fe1809c50c63`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are a professional front-end React developer specializing in modern landing pages.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        top_p: 1,
        stream: false,
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
      return NextResponse.json({ success: false, message: 'Réponse IA vide.' });
    }

    let generatedCode = data.choices[0].message.content;

    // Clean if DeepSeek adds ```tsx or ```
    generatedCode = generatedCode
      .replace(/```tsx/g, '')
      .replace(/```jsx/g, '')
      .replace(/```html/g, '')
      .replace(/```/g, '')
      .trim();



    return NextResponse.json({ success: true, code: generatedCode });

  } catch (error) {
    console.error('Erreur DeepSeek:', error);
    return NextResponse.json({ success: false, message: 'Erreur API IA' });
  }
}
