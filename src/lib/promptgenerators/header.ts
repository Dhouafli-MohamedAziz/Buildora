export function generateHeaderPrompt(basePrompt: string, headerConfig: any) {
  let navigationItems = "";
  for (const item of headerConfig.navigation.items) {
  navigationItems += `\n   - ${item.label} (${item.link})${item.isActive}`;
  }
  let ctaItems = `\n   - ${headerConfig.cta.text} (${headerConfig.cta.link}) - Style: ${headerConfig.cta.style}`;
  let searchBar = `\n   - searchbar ${headerConfig.searchBar.enabled} -placeholder :${headerConfig.searchBar.placeholder} `;
  let userAcess = `\n   - userAcess ${headerConfig.userAccess.enabled} -  showLoginbutton :${headerConfig.userAccess.showLogin} - showSignupbutton : ${headerConfig.userAccess.showSignup}`;
return `
${basePrompt}

CONFIGURATION DU HEADER :
          - Nom de la marque : ${headerConfig.logo?.text}
          - Navigation : ${navigationItems}
          - Boutons CTA : ${ctaItems}
          - Search bar : ${searchBar}
          - User access : ${userAcess}

          - Header fixe : ${headerConfig.isSticky ? 'Oui' : 'Non'}
          - Style menu mobile : ${headerConfig.mobileMenuStyle}
          - Fonctionnalités supplémentaires : ${headerConfig.additionalFeatures?.join(', ') }
          - STYLING :
            * position : ${headerConfig.styling?.position}
            * background : ${headerConfig.styling?.background}
            * Color scheme : ${headerConfig.styling?.colorScheme}
            * theme : ${headerConfig.styling?.theme}
            * customColors : ${headerConfig.styling?.customColors}
            * typography : ${headerConfig.styling?.typography}
            * shadows : ${headerConfig.styling?.shadows}
            * borders : ${headerConfig.styling?.borders}
            * animations : ${headerConfig.styling?.animations}
          
          SPÉCIFICATIONS DÉTAILLÉES POUR UN HEADER MODERNE ET BEAU :
          
          STRUCTURE OBLIGATOIRE :
          - Header avec fond blanc/transparent et ombre subtile
          - Logo/Brand à gauche : Texte du brand "${headerConfig.logo?.text}" en gras avec couleur du thème
          - Navigation au centre : ${headerConfig.navigation}
          - Boutons CTA à droite : ${headerConfig.cta}
          
          STYLING OBLIGATOIRE :
          - Utilise EXACTEMENT les couleurs fournies dans la configuration design
          * position : ${headerConfig.styling?.position}
            * background : ${headerConfig.styling?.background}
            * Color scheme : ${headerConfig.styling?.colorScheme}
            * theme : ${headerConfig.styling?.theme}
            * customColors : ${headerConfig.styling?.customColors}
            * typography : ${headerConfig.styling?.typography}
            * shadows : ${headerConfig.styling?.shadows}
            * borders : ${headerConfig.styling?.borders}
            * animations : ${headerConfig.styling?.animations}
          ${headerConfig.styling?.theme === 'dark' ? '- Utilise un fond sombre avec texte clair' : ''}
          ${headerConfig.styling?.theme === 'gradient' ? '- Utilise un dégradé avec les couleurs primaire et accent' : ''}
          ${headerConfig.styling?.theme === 'glassmorphism' ? '- Utilise un effet glassmorphism avec backdrop-blur' : ''}
          - Header ${headerConfig.isSticky ? 'fixe en haut avec sticky top-0' : 'normal'}
          - Navigation avec hover effects et transitions
          - Boutons CTA avec les couleurs spécifiées
          - Responsive design parfait
          - CRITIQUE: Header doit avoir m-0 p-0 pour supprimer tous les espaces
          - CRITIQUE: Utilise w-full pour occuper toute la largeur
          - CRITIQUE: Pas d'espaces blancs entre le header et le contenu suivant
          
         
          FONCTIONNALITÉS SUPPLÉMENTAIRES :
          ${headerConfig.additionalFeatures?.includes('search') ? '- Barre de recherche avec icône magnifying glass' : ''}
          ${headerConfig.additionalFeatures?.includes('social') ? '- Icônes réseaux sociaux (Twitter, Facebook, Instagram)' : ''}
          ${headerConfig.additionalFeatures?.includes('language') ? '- Sélecteur de langue' : ''}
          
          ICÔNES OBLIGATOIRES :
          - Menu hamburger pour mobile
          - Icône de recherche si activée
          - Icônes réseaux sociaux si activées
          
          ANIMATIONS :
          - Fade-in pour le header
          - Hover effects sur navigation et boutons
          - Transitions fluides
          
          RESPONSIVE :
          - Desktop : Navigation visible, boutons CTA visibles
          - Mobile : Menu hamburger, navigation dans dropdown
          ` ;
        
}
