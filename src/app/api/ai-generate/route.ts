import { NextResponse } from 'next/server';
import { generateHeaderPrompt } from '@/lib/promptgenerators/header';
import { generateHeroPrompt } from '@/lib/promptgenerators/hero';
import { generateFeaturesPrompt } from '@/lib/promptgenerators/features';
import { generatePricingPrompt } from '@/lib/promptgenerators/pricing';
import { generateServicesPrompt } from '@/lib/promptgenerators/services';
import { generateTestimonialsPrompt } from '@/lib/promptgenerators/testimonials';
import { generateFAQPrompt } from '@/lib/promptgenerators/faq';
import { generateGalleryPrompt } from '@/lib/promptgenerators/gallery';
import { generateContactPrompt } from '@/lib/promptgenerators/contact';
import { generateCTAPrompt } from '@/lib/promptgenerators/cta';
import { generateFooterPrompt } from '@/lib/promptgenerators/footer';


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
        case 'header':
          const headerSpecs = generateHeaderPrompt (basePrompt, config);
          console.log('=== HEADER PROMPT ===' , headerSpecs);
          return headerSpecs + `
          - CRITIQUE: Génère UNIQUEMENT du HTML pur avec TailwindCSS
          - Pas de descriptions, pas de commentaires, pas de texte explicatif
          - Le résultat doit être du HTML pur prêt à être rendu directement
          - Inclus TOUS les boutons CTA spécifiés
          - Utilise les couleurs du thème fourni
          - Crée un design moderne et professionnel
          - CRITIQUE: Respecte EXACTEMENT la configuration fournie
          `;
      
        case 'hero':
          const heroSpecs = generateHeroPrompt (basePrompt, config);
          console.log('=== HERO PROMPT ===' , heroSpecs);
          return heroSpecs + `
          - CRITIQUE: Génère UNIQUEMENT du HTML pur avec TailwindCSS
          - Pas de descriptions, pas de commentaires, pas de texte explicatif
          - Le résultat doit être du HTML pur prêt à être rendu directement
          - Inclus TOUS les boutons CTA spécifiés
          - Utilise les couleurs du thème fourni
          - Crée un design moderne et professionnel
          - Respecte EXACTEMENT la configuration fournie
          - INCLUS OBLIGATOIREMENT les images fournies (backgroundImage et contentImage) dans le HTML généré
          - Utilise les URLs base64 fournies directement dans les balises img et background-image `
          ;

    
          
        case 'services':
          const servicesSpecs = generateServicesPrompt (basePrompt, config);
          console.log(servicesSpecs)
          return servicesSpecs

       
        case 'testimonials':
        const testimonialsSpecs = generateTestimonialsPrompt (basePrompt, config);
        return testimonialsSpecs;  
        
      
        case 'features':
          const featuresSpecs = generateFeaturesPrompt (basePrompt, config);
          return featuresSpecs;

        
        case 'pricing':
          const pricingSpecs = generatePricingPrompt (basePrompt, config);
          return pricingSpecs;
         
          
        case 'contact':
          const contactSpecs = generateContactPrompt (basePrompt, config);
          return contactSpecs;  
        

        case 'faq':
          const faqSpecs = generateFAQPrompt (basePrompt, config);
          return faqSpecs;
        

        case 'gallery':
          const gallerySpecs = generateGalleryPrompt (basePrompt, config);
          return gallerySpecs;
        

        case 'cta':
          const ctaSpecs = generateCTAPrompt (basePrompt, config);
          return ctaSpecs;
          

        case 'footer':
          const footerSpecs = generateFooterPrompt (basePrompt, config);
          return footerSpecs;
        

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
