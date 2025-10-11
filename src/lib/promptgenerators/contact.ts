export function generateContactPrompt (basePrompt : string , contactConfig : any) {
    return contactConfig ? basePrompt + `
          CONFIGURATION DU CONTACT :
  - Titre de la section : "${contactConfig.sectionTitle?.enabled ? contactConfig.sectionTitle.title : 'Non spécifié'}"
  - Texte d’introduction : "${contactConfig.introText?.enabled ? contactConfig.introText.text : 'Non spécifié'}"
  
  FORMULAIRE DE CONTACT :
  - Activé : ${contactConfig.contactForm?.enabled ? 'Oui' : 'Non'}
  - Texte du bouton : "${contactConfig.contactForm?.submitText || 'Envoyer'}"
  - Champs :
    ${contactConfig.contactForm?.fields?.length 
      ? contactConfig.contactForm.fields.map((field: any) => 
        `- ${field.label || field.name || 'Champ'} (${field.type}) : ${field.required ? 'Obligatoire' : 'Optionnel'}`
      ).join('\n    ')
      : '- Champs par défaut (nom, email, message)'}

  INFORMATIONS DE CONTACT :
  - Activées : ${contactConfig.contactInfo?.enabled ? 'Oui' : 'Non'}
  - Détails :
    ${contactConfig.contactInfo?.items?.length 
      ? contactConfig.contactInfo.items.map((item: any) => 
        `- ${item.label || item.type} : ${item.value || 'Non spécifié'}`
      ).join('\n    ')
      : '- Aucune information de contact définie'}

  RÉSEAUX SOCIAUX :
  - Activés : ${contactConfig.socialMedia?.enabled ? 'Oui' : 'Non'}
  - Plateformes :
    ${contactConfig.socialMedia?.platforms?.length 
      ? contactConfig.socialMedia.platforms.map((p: any) => 
        `- ${p.name || 'Réseau'} : ${p.url || 'URL non spécifiée'}`
      ).join('\n    ')
      : '- Aucun réseau social'}

  CARTE :
  - Activée : ${contactConfig.map?.enabled ? 'Oui' : 'Non'}
  - Adresse : "${contactConfig.map?.address || 'Non spécifiée'}"
  - Code d’intégration : "${contactConfig.map?.embedCode || 'Non spécifié'}"

  STYLING :
  - Couleurs personnalisées :
    ${contactConfig.styling?.customColors 
      ? Object.entries(contactConfig.styling.customColors).map(([k, v]) => `- ${k} : ${v}`).join('\n    ')
      : '- Non spécifiées'}
  - Typographie :
    ${contactConfig.styling?.typography 
      ? Object.entries(contactConfig.styling.typography).map(([k, v]) => `- ${k} : ${v}`).join('\n    ')
      : '- Typographie par défaut'}
  - Espacement :
    ${contactConfig.styling?.spacing 
      ? Object.entries(contactConfig.styling.spacing).map(([k, v]) => `- ${k} : ${v}`).join('\n    ')
      : '- Espacement par défaut'}
  - Effets :
    ${contactConfig.styling?.effects 
      ? Object.entries(contactConfig.styling.effects).map(([k, v]) => `- ${k} : ${v}`).join('\n    ')
      : '- Aucun effet spécial'}

  DIRECTIVES DE DESIGN :
  - Structure obligatoire :
    * Titre et texte d’introduction visibles si activés
    * Formulaire (si activé)
    * Informations de contact (si activées)
    * Carte ou adresse (si activée)
    * Espacement équilibré entre les éléments
  - Responsive et clair :
    * Design mobile-first
    * Transitions fluides
    * Alignement et couleurs cohérents avec la configuration

          ` : basePrompt + `
          Spécifications pour Contact :
          - Formulaire de contact
          - Informations de contact
          - Carte ou adresse
          - Design professionnel
          - Formulaire fonctionnel
          `;
        
}