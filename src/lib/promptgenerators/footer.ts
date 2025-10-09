export function generateFooterPrompt (basePrompt : string , footerConfig : any) {
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
}