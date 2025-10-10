export function generateGalleryPrompt (basePrompt : string , galleryConfig : any) {
    return galleryConfig ? basePrompt + `
          CONFIGURATION DE LA GALERIE :
          - Titre de la section : "${galleryConfig.title.text}"
          - Introduction : "${galleryConfig.intro.text}"
          - Nombre d'images : ${galleryConfig.images.items.length}
          - Disposition : ${galleryConfig.layout.type} (${galleryConfig.layout.columns} colonnes)
          - Espacement : ${galleryConfig.layout.spacing}
          - Légendes activées : ${galleryConfig.captions.enabled ? 'Oui' : 'Non'}
          - Position des légendes : ${galleryConfig.captions.position}
          - Effet au survol : ${galleryConfig.hoverEffects.enabled ? galleryConfig.hoverEffects.type : 'Aucun'}
          - Lightbox : ${galleryConfig.lightbox.enabled ? 'Oui' : 'Non'}
          - Navigation Lightbox : ${galleryConfig.lightbox.showNavigation ? 'Oui' : 'Non'}
          - Filtres par catégorie : ${galleryConfig.categories.enabled ? 'Oui' : 'Non'}
          - Bouton CTA : ${galleryConfig.cta.enabled ? `"${galleryConfig.cta.text}" (${galleryConfig.cta.link})` : 'Non'}
          - Espacement global : ${galleryConfig.styling.spacing}
          - Animation globale : ${galleryConfig.styling.animations}

          DESIGN :
            * Couleurs personnalisées : ${JSON.stringify(galleryConfig.styling.customColors)}
            * Typographie : ${JSON.stringify(galleryConfig.styling.typography)}

          IMAGES DÉTAILLÉES :
          ${galleryConfig.images.items.map((image: any, index: number) => `
          - Image ${index + 1} :
            * Titre : "${image.title || ''}"
            * URL : ${image.url}
            * Catégorie : ${image.category || 'Général'}
            * Légende : "${image.caption || ''}"
            * Mise en avant : ${image.highlight ? 'Oui' : 'Non'}
          `).join('')}

          STRUCTURE OBLIGATOIRE :
          - Section galerie avec titre et introduction
          - Filtres par catégorie (si activés)
          - Grille d’images selon la disposition choisie (${galleryConfig.layout.type})
          - Légendes positionnées ${galleryConfig.captions.position} (si activées)
          - Espacement : ${galleryConfig.layout.spacing}

          LAYOUT SPÉCIFIQUE :
          ${galleryConfig.layout.type === 'grid' ? `- Grille de ${galleryConfig.layout.columns} colonnes` : ''}
          ${galleryConfig.layout.type === 'masonry' ? '- Disposition masonry avec hauteurs variables' : ''}
          ${galleryConfig.layout.type === 'carousel' ? '- Carrousel horizontal avec navigation' : ''}

          STYLING :
          - Espacement : ${galleryConfig.styling.spacing}
          - Animation : ${galleryConfig.styling.animations}
          - Effet au survol : ${galleryConfig.hoverEffects.enabled ? galleryConfig.hoverEffects.type : 'Aucun'}
          - Couleurs : ${JSON.stringify(galleryConfig.styling.customColors)}
          - Typographie : ${JSON.stringify(galleryConfig.styling.typography)}

          ÉLÉMENTS VISUELS :
          ${galleryConfig.categories.enabled ? `
          - Afficher les filtres de catégorie
          - Liste des catégories : ${galleryConfig.categories.items.join(', ')}
          ` : ''}
          ${galleryConfig.captions.enabled ? `
          - Légendes activées sous les images
          - Position : ${galleryConfig.captions.position}
          ` : ''}
          ${galleryConfig.lightbox.enabled ? `
          - Lightbox activé avec navigation : ${galleryConfig.lightbox.showNavigation ? 'Oui' : 'Non'}
          - Animation de transition : fade
          ` : ''}

          ANIMATIONS ET INTERACTIONS :
          - Animation globale : ${galleryConfig.styling.animations}
          - Hover effects : ${galleryConfig.hoverEffects.enabled ? galleryConfig.hoverEffects.type : 'aucun'}
          - Transitions fluides et naturelles

          RESPONSIVE :
          - Design mobile-first
          - Breakpoints standard : sm / md / lg / xl
          - Nombre de colonnes ajusté selon la taille d’écran
          - Espacement adaptable

          CRITIQUE :
          - Respecte EXACTEMENT les valeurs du galleryConfig
          - Utilise les couleurs et typographies spécifiées
          - Affiche toutes les images listées
          - Structure la galerie selon la disposition choisie
          ` : basePrompt + `
          Spécifications pour Gallery :
          - Grille d'images responsive
          - Lightbox pour agrandir
          - Filtres par catégorie
          - Animations au hover
          - Gallery moderne
          `;
        
}