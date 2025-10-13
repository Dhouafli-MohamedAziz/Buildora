export function generateTestimonialsPrompt (basePrompt : string , testimonialsConfig : any) {
  interface Testimonial {
  id: string;
  name: string;
  quote: string;
  rating: number;
  company?: string;
  position?: string;
  photo?: string;
  isEnabled: boolean;
  isHighlighted: boolean;
}
    return testimonialsConfig? basePrompt + `
          CONFIGURATION DES TÉMOIGNAGES :
  - Titre de la section : "${testimonialsConfig.title.text}" (${testimonialsConfig.title.enabled ? 'Activé' : 'Désactivé'})
  - Sous-titre : "${testimonialsConfig.subtitle.text}" (${testimonialsConfig.subtitle.enabled ? 'Activé' : 'Désactivé'})
  - Nombre de témoignages : ${testimonialsConfig.testimonials.length}
  - Disposition : ${testimonialsConfig.layout}
  - Alignement du contenu : ${testimonialsConfig.alignment}
  - Afficher les photos : ${testimonialsConfig.showPhotos ? 'Oui' : 'Non'}
  - Afficher les étoiles : ${testimonialsConfig.showStars ? 'Oui' : 'Non'}
  - Afficher les entreprises : ${testimonialsConfig.showCompanies ? 'Oui' : 'Non'}
  - Animation : ${testimonialsConfig.animation}

  DESIGN :
    * Thème : ${testimonialsConfig.design.theme}
    * Couleur primaire : ${testimonialsConfig.design.primaryColor}
    * Couleur secondaire : ${testimonialsConfig.design.secondaryColor}
    * Couleur d'accent : ${testimonialsConfig.design.accentColor}
    * Couleur du texte : ${testimonialsConfig.design.textColor}
    * Couleur de fond : ${testimonialsConfig.design.backgroundColor}
    * Style des cartes : ${testimonialsConfig.design.cardStyle}
    * Style des étoiles : ${testimonialsConfig.design.starStyle}
    * Typographie : ${testimonialsConfig.design.typography}

TÉMOIGNAGES DÉTAILLÉS :
${testimonialsConfig.testimonials.map((testimonial: Testimonial, index: number) => `
  - Témoignage ${index + 1} :
    * Nom : "${testimonial.name}"
    * Citation : "${testimonial.quote}"
    * Note : ${testimonial.rating}/5
    * Entreprise : ${testimonial.company || 'Non spécifié'}
    * Poste : ${testimonial.position || 'Non spécifié'}
    * Photo : ${testimonial.photo ? 'Fournie' : 'Non fournie'}
    * Activé : ${testimonial.isEnabled ? 'Oui' : 'Non'}
    * Mis en avant : ${testimonial.isHighlighted ? 'Oui' : 'Non'}
`).join('')}

SPÉCIFICATIONS DÉTAILLÉES POUR UNE SECTION TÉMOIGNAGES MODERNE ET ATTRAYANTE :

STRUCTURE OBLIGATOIRE :
  - Section avec titre et sous-titre (si activés)
  - Conteneur principal avec disposition selon ${testimonialsConfig.layout}
  - Chaque témoignage inclut :
    * Photo (si showPhotos = true)
    * Nom du client
    * Citation (texte principal)
    * Note (étoiles si showStars = true)
    * Entreprise et poste (si showCompanies = true)
  - Espacement généreux entre les cartes et marges équilibrées

DISPOSITION :
  - Type : ${testimonialsConfig.layout}
  ${testimonialsConfig.layout === 'grid-2' ? '- Grille à 2 colonnes (grid grid-cols-1 md:grid-cols-2)' : ''}
  ${testimonialsConfig.layout === 'grid-3' ? '- Grille à 3 colonnes (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3)' : ''}
  ${testimonialsConfig.layout === 'carousel' ? '- Carrousel horizontal avec navigation (slides défilants)' : ''}
  ${testimonialsConfig.layout === 'list' ? '- Liste verticale (flex flex-col, espacement entre items)' : ''}
  ${testimonialsConfig.layout === 'cards' ? '- Cartes stylisées avec ombres et effets de survol' : ''}

STYLE & DESIGN :
  - Alignement du contenu : ${testimonialsConfig.alignment}
  - Couleurs à utiliser EXACTEMENT selon la configuration :
    * Primaire : ${testimonialsConfig.design.primaryColor}
    * Secondaire : ${testimonialsConfig.design.secondaryColor}
    * Accent : ${testimonialsConfig.design.accentColor}
    * Texte : ${testimonialsConfig.design.textColor}
    * Fond : ${testimonialsConfig.design.backgroundColor}
  - Thème : ${testimonialsConfig.design.theme}
    ${testimonialsConfig.design.theme === 'dark' ? '- Fond sombre avec texte clair' : ''}
    ${testimonialsConfig.design.theme === 'gradient' ? '- Fond en dégradé avec couleurs primaire et accent' : ''}
    ${testimonialsConfig.design.theme === 'glassmorphism' ? '- Effet glassmorphism (fond translucide + blur)' : ''}
    ${testimonialsConfig.design.theme === 'minimal' ? '- Design épuré, beaucoup d’espace blanc' : ''}
    ${testimonialsConfig.design.theme === 'bold' ? '- Design audacieux avec contrastes forts' : ''}
  - Style des cartes : ${testimonialsConfig.design.cardStyle}
  - Style des étoiles : ${testimonialsConfig.design.starStyle}
  - Typographie : ${testimonialsConfig.design.typography}

ÉLÉMENTS VISUELS :
  ${testimonialsConfig.showPhotos ? `
  - Afficher la photo de chaque client :
    * Format : avatar circulaire ou carré
    * Taille recommandée : w-12 h-12 à w-16 h-16
    * Position : coin supérieur gauche de la carte
  ` : ''}
  ${testimonialsConfig.showStars ? `
  - Afficher les étoiles de notation :
    * Style : ${testimonialsConfig.design.starStyle}
    * Couleur : ${testimonialsConfig.design.accentColor}
    * Position : en haut à droite ou sous la citation
  ` : ''}
  ${testimonialsConfig.showCompanies ? `
  - Afficher les informations d’entreprise :
    * Style : texte en italique ou badge
    * Couleur : ${testimonialsConfig.design.secondaryColor}
    * Position : bas de la carte
  ` : ''}

ANIMATIONS :
  - Type : ${testimonialsConfig.animation}
  - Effet : ${testimonialsConfig.animation === 'fade-in' ? 'Apparition douce' : testimonialsConfig.animation === 'slide-up' ? 'Glissement vers le haut' : testimonialsConfig.animation === 'stagger' ? 'Apparition échelonnée avec délais' : 'Aucune animation'}
  - Ajoute des hover effects et transitions fluides sur les cartes

RESPONSIVE DESIGN :
  - Mobile-first
  - Breakpoints : sm (640px), md (768px), lg (1024px), xl (1280px)
  - Grille et espacement adaptatifs selon la disposition
  - Lecture fluide sur tous les appareils

CONTRAINTES CRITIQUES :
  ✅ Respecter STRICTEMENT la configuration fournie
  ✅ Utiliser EXACTEMENT les couleurs du design
  ✅ Afficher tous les témoignages marqués isEnabled = true
  ✅ Mettre en avant ceux avec isHighlighted = true
`: basePrompt + `You are tasked with creating a **modern and visually appealing testimonials section** for a website. No configuration is provided, so you must generate everything from scratch, including content, layout, and design. Follow these instructions carefully:

1. **Section Structure**:
   - Include a **title** and a **subtitle** that feel professional and inviting.
   - Add **3–6 testimonials** with realistic names, photos, quotes, ratings (1–5 stars), companies, and positions.
   - Highlight at least **one featured testimonial**.

2. **Layout**:
   - Choose an engaging layout: grid (2–3 columns), carousel, or cards.
   - Ensure the layout is **responsive** (mobile-first) and looks good on all devices.
   - Include proper spacing and padding for readability.

3. **Design & Styling**:
   - Use a **modern and appealing theme**, can be light, dark, gradient, or glassmorphism.
   - Pick a **primary, secondary, accent, text, and background color** palette that looks cohesive.
   - Style cards with **elevation, borders, or shadows** to make testimonials stand out.
   - Show photos as **avatars** (circular or square) and include **stars** for ratings.
   - Typography should be modern and readable.

4. **Animations & Interactions**:
   - Include subtle **animations** on load (fade-in, slide-up, or staggered).
   - Add **hover effects** for interactive feel on cards or carousel slides.

5. **Content Details**:
   - For each testimonial, generate:
     * **Name** of a realistic person
     * **Quote** that sounds authentic and engaging
     * **Rating** from 1 to 5 stars
     * **Company** (optional)
     * **Position** (optional)
     * **Photo** URL (optional)
     * **Highlight** (boolean: true/false)

6. **Output**:
   - Return a JSON object that **matches the TestimonialsConfig structure**.
   - Ensure all boolean flags (isEnabled, isHighlighted) are set correctly.
   - Fill all fields logically; use defaults if necessary (e.g., company or photo can be optional).

**Constraints**:
- Ensure the section looks modern, elegant, and visually appealing.
- Ensure all generated testimonials appear realistic and diverse.
- Make the design cohesive in colors, spacing, and typography.`

}