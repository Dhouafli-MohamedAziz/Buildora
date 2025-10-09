export function generateContactPrompt (basePrompt : string , contactConfig : any) {
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
        
}