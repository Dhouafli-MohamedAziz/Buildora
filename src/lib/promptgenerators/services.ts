export function generateServicesPrompt (basePrompt : string , servicesConfig : any) {
    return servicesConfig ? basePrompt + `
          CONFIGURATION DES SERVICES :
- Titre de la section : ${servicesConfig.sectionTitle.enabled ? `"${servicesConfig.sectionTitle.title}"` : "Titre désactivé"}
- Texte d’introduction : ${servicesConfig.introText.enabled ? `"${servicesConfig.introText.text}"` : "Texte d’introduction désactivé"}
- Nombre total de services : ${servicesConfig.services.length}
- Type de disposition : ${servicesConfig.layout.type} (Colonnes : ${servicesConfig.layout.columns})
- Position des icônes : ${servicesConfig.layout.iconPosition}
- Appel à l’action global : ${servicesConfig.callToAction.enabled ? `"${servicesConfig.callToAction.text}" (${servicesConfig.callToAction.style})"` : "Désactivé"}

STYLING GLOBAL :
- Couleurs personnalisées : ${JSON.stringify(servicesConfig.styling.customColors)}
- Typographie : ${JSON.stringify(servicesConfig.styling.typography)}
- Espacements : ${JSON.stringify(servicesConfig.styling.spacing)}
- Effets visuels : ${JSON.stringify(servicesConfig.styling.effects)}

SERVICES DÉTAILLÉS :
${servicesConfig.services.map((service: any, index: number) => `
- Service ${index + 1} :
  * Titre : "${service.title}"
  * Description : "${service.description}"
  * Icône : ${service.icon ? `"${service.icon}"` : "Non spécifiée"}
  * Lien : ${service.link ? `"${service.link}"` : "Non spécifié"}
  ${service.cta ? `* Bouton CTA : "${service.cta.text}" (${service.cta.style})` : '* Aucun CTA spécifié'}
`).join('')}

SPÉCIFICATIONS DÉTAILLÉES POUR UNE SECTION SERVICES MODERNE ET ATTRACTIVE :

STRUCTURE OBLIGATOIRE :
- Section contenant un titre (si activé) et un texte d’introduction (si activé)
- Grille de services selon la disposition choisie (${servicesConfig.layout.type})
- Chaque service contient une icône, un titre, une description et un CTA (si présent)
- Espacement généreux et mise en valeur claire de chaque carte de service

LAYOUT SPÉCIFIQUE :
${servicesConfig.layout.type === 'grid' ? `
- Disposition en grille (grid)
- Colonnes : ${servicesConfig.layout.columns} (ex. grid grid-cols-1 md:grid-cols-${servicesConfig.layout.columns})
- Icônes positionnées en ${servicesConfig.layout.iconPosition} de chaque carte
` : servicesConfig.layout.type === 'list' ? `
- Disposition en liste verticale (flex flex-col space-y-6)
- Icônes alignées à ${servicesConfig.layout.iconPosition} du texte
` : `
- Type de layout personnalisé : ${servicesConfig.layout.type}
`}

STYLING OBLIGATOIRE :
- Respecter les couleurs définies dans la configuration
- Couleurs principales : ${JSON.stringify(servicesConfig.styling.customColors)}
- Typographie cohérente avec ${JSON.stringify(servicesConfig.styling.typography)}
- Espacements adaptés : ${JSON.stringify(servicesConfig.styling.spacing)}
- Effets visuels (ombres, hover, transitions) : ${JSON.stringify(servicesConfig.styling.effects)}
- Les cartes de service doivent avoir des bords ${servicesConfig.styling.effects?.borders || 'arrondis'} et une ombre ${servicesConfig.styling.effects?.shadow || 'subtile'}

BOUTONS CTA :
${servicesConfig.callToAction.enabled ? `
- Appel à l’action global :
  * Texte : "${servicesConfig.callToAction.text}"
  * Lien : "${servicesConfig.callToAction.link}"
  * Style : ${servicesConfig.callToAction.style === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200'}
` : '- Aucun appel à l’action global activé'}

${servicesConfig.services.map((service: any) => service.cta ? `
- Bouton individuel pour "${service.title}" :
  * Texte : "${service.cta.text}"
  * Style : ${service.cta.style === 'primary' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700' : 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50'}
  * Taille : px-4 py-2
  * Effet : hover:scale-105 transition-transform
` : '').join('')}

ANIMATIONS & INTERACTIVITÉ :
- Animation d’entrée douce (fade-in ou slide-up)
- Hover sur les cartes avec effet d’ombre et légère mise à l’échelle
- Transitions fluides sur tous les boutons et éléments interactifs

RESPONSIVE DESIGN :
- Mobile-first
- Ajustement automatique du nombre de colonnes selon la taille d’écran
- Texte et icônes adaptatifs
- Espacement et marges ajustés dynamiquement
`: basePrompt + `
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

}