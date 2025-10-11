export function generatePricingPrompt (basePrompt : string , pricingConfig : any) {
    return pricingConfig?  basePrompt + `
          CONFIGURATION DU PRICING :
          - Titre de la section : "${pricingConfig.title.text}"
          - Introduction : "${pricingConfig.intro.text}"
          - Nombre de plans : ${pricingConfig.plans.length}
          - Bascule mensuel/annuel activée : ${pricingConfig.billingToggle.enabled ? 'Oui' : 'Non'}
          - Réduction annuelle : ${pricingConfig.billingToggle.yearlyDiscount ? pricingConfig.billingToggle.yearlyDiscount + '%' : 'Aucune'}
          - Comparaison des plans : ${pricingConfig.comparison.enabled ? 'Oui' : 'Non'}
          - Garanties : ${pricingConfig.guarantees.enabled ? pricingConfig.guarantees.items.join(', ') : 'Aucune'}
          - FAQ activée : ${pricingConfig.faq.enabled ? 'Oui' : 'Non'}
          - Bouton CTA : ${pricingConfig.cta.enabled ? `"${pricingConfig.cta.text}" (${pricingConfig.cta.link})` : 'Non'}
          - Espacement global : ${pricingConfig.styling.spacing}
          - Animation : ${pricingConfig.styling.animations}

          DESIGN :
            * Couleurs personnalisées : ${JSON.stringify(pricingConfig.styling.customColors)}
            * Typographie : ${JSON.stringify(pricingConfig.styling.typography)}

          PLANS DÉTAILLÉS :
          ${pricingConfig.plans.map((plan: any, index: number) => `
          - Plan ${index + 1} : "${plan.name}"
            * Prix : ${plan.price} ${plan.billingPeriod ? '/' + plan.billingPeriod : ''}
            * Description : "${plan.description || ''}"
            * Populaire : ${plan.isPopular ? 'Oui' : 'Non'}
            * Mis en avant : ${plan.isHighlighted ? 'Oui' : 'Non'}
            * CTA : ${plan.cta && plan.cta.text ? `"${plan.cta.text}"` : 'Aucun CTA défini'}
            * Fonctionnalités : ${Array.isArray(plan.features) ? plan.features.join(', ') : 'Aucune'}
          `).join('')}

          SPÉCIFICATIONS DÉTAILLÉES POUR UNE SECTION PRICING MODERNE ET BEAUE :

          STRUCTURE OBLIGATOIRE :
          - Section pricing avec titre et introduction
          - Grille de plans selon la configuration
          - Chaque plan doit inclure : nom, prix, description, CTA, et fonctionnalités
          - Bascule mensuel/annuel si activée
          - Espacement : ${pricingConfig.styling.spacing}

          LAYOUT ET STYLE :
          - Les cartes de plan doivent être équilibrées et lisibles
          - Chaque plan doit clairement afficher le CTA et les fonctionnalités
          - Animation globale : ${pricingConfig.styling.animations}
          - Transitions fluides et effets au survol doux

          COMPARAISON ET GARANTIES :
          ${pricingConfig.comparison.enabled ? `
          - Tableau comparatif visible sous les plans
          - Met en avant les différences clés entre les offres
          ` : ''}
          ${pricingConfig.guarantees.enabled ? `
          - Liste des garanties à afficher sous les plans :
          ${pricingConfig.guarantees.items.map((g: string, i: number) => `   * Garantie ${i + 1} : ${g}`).join('\n')}
          ` : ''}

          FAQ :
          ${pricingConfig.faq.enabled ? `
          - Foire aux questions activée
          - Questions/réponses à afficher après la section Pricing
          - Liste : ${pricingConfig.faq.items.map((item: any) => `"${item.question}"`).join(', ')}
          ` : 'Aucune FAQ'}

          CTA FINAL :
          ${pricingConfig.cta.enabled ? `
          - Bouton principal "${pricingConfig.cta.text}"
          - Lien : ${pricingConfig.cta.link}
          - Style cohérent avec la typographie et les couleurs définies
          ` : 'Aucun bouton CTA global'}

          STYLING :
          - Espacement : ${pricingConfig.styling.spacing}
          - Animation : ${pricingConfig.styling.animations}
          - Couleurs : ${JSON.stringify(pricingConfig.styling.customColors)}
          - Typographie : ${JSON.stringify(pricingConfig.styling.typography)}

          ANIMATIONS ET INTERACTIONS :
          - Effet d’entrée : ${pricingConfig.styling.animations === 'fade' ? 'Fondu progressif' : pricingConfig.styling.animations === 'slide' ? 'Glissement' : 'Aucun effet défini'}
          - Hover sur les cartes : légère élévation ou zoom
          - Transitions fluides entre états (hover, actif, sélectionné)

          RESPONSIVE :
          - Design mobile-first
          - Grille adaptative pour sm / md / lg / xl
          - Espacement adaptatif
          - CTA et comparaison toujours visibles

          CRITIQUE :
          - Respecte EXACTEMENT la configuration fournie
          - Utilise les couleurs et la typographie personnalisées
          - Affiche tous les plans fournis
          - Rend la section claire, équilibrée et moderne
          - Assure cohérence entre plans, garanties, et CTA

          ` : basePrompt + `
          Spécifications pour Pricing :
          - 3-4 plans de tarification avec TailwindCSS grid
          - Carte de plan avec nom, prix, description, fonctionnalités, CTA
          - Bascule mensuel/annuel
          - Comparaison des plans en tableau
          - FAQ sous la section pricing
          - Design professionnel et moderne
          - Utilise des couleurs du thème fourni
          - Responsive design (mobile-first)
          - Animations d'entrée avec TailwindCSS
` ;
        
}