import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { sectionName, projectDescription, theme, feedback, previousCode } = await req.json();

    if (!feedback || !previousCode) {
      return NextResponse.json({ success: false, message: 'Feedback et code précédent requis pour la régénération.' });
    }

    // Create specific prompts for each section type
    const getSectionPrompt = (section: string, description: string, theme: any, feedback: string, previousCode: string) => {
      const themeInfo = theme ? `
      THÈME DE DESIGN :
      - Nom du thème : ${theme.name}
      - Couleur primaire : ${theme.primary}
      - Couleur secondaire : ${theme.secondary}
      - Couleur d'accent : ${theme.accent}
      - Gradient : ${theme.gradient}
      
      Utilise ces couleurs dans ton design. Remplace les couleurs par défaut par celles du thème.
      ` : '';

      const basePrompt = `Tu es un développeur web expert. Régénère du HTML pur avec TailwindCSS pour la section "${section}" d'une landing page en tenant compte du feedback utilisateur.
      
      Le projet est : "${description}"
      
      ${themeInfo}
      
      FEEDBACK UTILISATEUR :
      "${feedback}"
      
      CODE PRÉCÉDENT :
      ${previousCode}
      
      INSTRUCTIONS SPÉCIALES :
      - Prends en compte le feedback utilisateur ci-dessus
      - Améliore le code précédent selon les demandes spécifiques
      - Garde les éléments qui fonctionnent bien
      - Modifie uniquement ce qui est demandé dans le feedback
      - Assure-toi que les modifications répondent exactement aux demandes
      
      Règles importantes :
      - Utilise HTML pur (pas de React/JSX)
      - Utilise TailwindCSS pour le style
      - Applique le thème de couleurs fourni
      - Crée un design moderne et responsive
      - Inclus des animations et transitions fluides
      - Utilise des icônes de Lucide React si nécessaire
      - Optimise pour le SEO et l'accessibilité
      - Ne génère pas de texte inutile
      - Ne mets pas \`\`\`html ou \`\`\`
      - CRITIQUE: Génère UNIQUEMENT du HTML pur avec TailwindCSS
      - Pas de descriptions, pas de commentaires, pas de texte explicatif
      - Le résultat doit être du HTML pur prêt à être rendu directement
      `;

      switch (section.toLowerCase()) {
        case 'header':
          return basePrompt + `
          Spécifications pour le Header :
          - Navigation responsive avec logo
          - Menu hamburger pour mobile
          - Call-to-action principal
          - Design moderne avec glassmorphism
          - Utilise des icônes Lucide React
          - IMPORTANT: Génère UNIQUEMENT un composant React fonctionnel avec 'use client'
          - Pas de HTML brut, pas de script tags, pas de balises HTML
          - Utilise uniquement des composants React et des hooks
          - Exporte le composant comme export default
          `;
        
        case 'hero':
          return basePrompt + `
          Spécifications pour le Hero :
          - Titre accrocheur et sous-titre
          - Call-to-action principal et secondaire
          - Image ou illustration moderne
          - Animations d'entrée
          - Design impactant
          `;
        
        case 'services':
          return basePrompt + `
          Spécifications pour Services :
          - Grille de 3-4 services
          - Icônes pour chaque service
          - Descriptions courtes et claires
          - Hover effects
          - Design professionnel
          `;
        
        case 'features':
          return basePrompt + `
          Spécifications pour Features :
          - Liste de fonctionnalités principales
          - Icônes et descriptions
          - Alternance image/texte
          - Animations au scroll
          - Design moderne
          `;
        
        case 'testimonials':
          return basePrompt + `
          Spécifications pour Testimonials :
          - Carrousel de témoignages
          - Photos et noms des clients
          - Étoiles de notation
          - Citations inspirantes
          - Design élégant
          `;
        
        case 'pricing':
          return basePrompt + `
          Spécifications pour Pricing :
          - 3 plans tarifaires
          - Comparaison des fonctionnalités
          - Boutons d'action
          - Design moderne avec badges
          - Pricing attractif
          `;
        
        case 'contact':
          return basePrompt + `
          Spécifications pour Contact :
          - Formulaire de contact
          - Informations de contact
          - Carte ou adresse
          - Design professionnel
          - Formulaire fonctionnel
          `;
        
        case 'faq':
          return basePrompt + `
          Spécifications pour FAQ :
          - Accordéon de questions/réponses
          - Animations fluides
          - Questions pertinentes
          - Design clair et lisible
          - FAQ interactive
          `;
        
        case 'gallery':
          return basePrompt + `
          Spécifications pour Gallery :
          - Grille d'images responsive
          - Lightbox pour agrandir
          - Filtres par catégorie
          - Animations au hover
          - Gallery moderne
          `;
        
        case 'cta':
          return basePrompt + `
          Spécifications pour CTA :
          - Section d'appel à l'action
          - Titre accrocheur
          - Bouton principal
          - Design contrasté
          - CTA impactant
          `;
        
        case 'footer':
          return basePrompt + `
          Spécifications pour Footer :
          - Liens de navigation
          - Réseaux sociaux
          - Informations légales
          - Newsletter signup
          - Footer complet
          `;
        
        default:
          return basePrompt;
      }
    };

    const prompt = getSectionPrompt(sectionName, projectDescription, theme, feedback, previousCode);

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer sk-27727cecdda84bc6b293fe1809c50c63`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are a professional front-end React developer specializing in modern landing pages. You excel at iterating on existing code based on user feedback.' },
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