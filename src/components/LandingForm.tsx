'use client';

import { useState } from 'react';

interface LandingFormData {
  title: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  fontFamily: string;
  layout: 'centered' | 'left-aligned';
  showTestimonials: boolean;
  testimonials: string[];
  showPricing: boolean;
  pricingPlans: {
    name: string;
    price: string;
    features: string[];
  }[];
}

const FONT_OPTIONS = [
  { value: 'Inter', label: 'Inter (Modern)' },
  { value: 'Roboto', label: 'Roboto (Clean)' },
  { value: 'Poppins', label: 'Poppins (Elegant)' },
  { value: 'Montserrat', label: 'Montserrat (Professional)' },
];

export default function LandingForm() {
  const [formData, setFormData] = useState<LandingFormData>({
    title: '',
    description: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    features: ['', '', ''],
    ctaText: 'Get Started',
    ctaLink: '#',
    fontFamily: 'Inter',
    layout: 'centered',
    showTestimonials: false,
    testimonials: ['', '', ''],
    showPricing: false,
    pricingPlans: [
      { name: 'Basic', price: '$9', features: ['', '', ''] },
      { name: 'Pro', price: '$29', features: ['', '', ''] },
      { name: 'Enterprise', price: '$99', features: ['', '', ''] },
    ],
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const handleTestimonialChange = (index: number, value: string) => {
    const newTestimonials = [...formData.testimonials];
    newTestimonials[index] = value;
    setFormData({ ...formData, testimonials: newTestimonials });
  };

  const handlePricingFeatureChange = (planIndex: number, featureIndex: number, value: string) => {
    const newPricingPlans = [...formData.pricingPlans];
    newPricingPlans[planIndex].features[featureIndex] = value;
    setFormData({ ...formData, pricingPlans: newPricingPlans });
  };

  const generateLandingPage = () => {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.title}</title>
    <link href="https://fonts.googleapis.com/css2?family=${formData.fontFamily.replace(' ', '+')}:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-color: ${formData.primaryColor};
            --secondary-color: ${formData.secondaryColor};
            --font-family: '${formData.fontFamily}', sans-serif;
        }
        body {
            font-family: var(--font-family);
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }
        .hero {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 4rem 2rem;
            text-align: ${formData.layout === 'centered' ? 'center' : 'left'};
        }
        .features {
            padding: 4rem 2rem;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }
        .feature-card {
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .testimonials {
            padding: 4rem 2rem;
            background: #f8fafc;
        }
        .testimonial-card {
            padding: 2rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-bottom: 1rem;
        }
        .pricing {
            padding: 4rem 2rem;
        }
        .pricing-card {
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .cta {
            background: var(--primary-color);
            color: white;
            padding: 4rem 2rem;
            text-align: center;
        }
        .cta-button {
            display: inline-block;
            padding: 1rem 2rem;
            background: white;
            color: var(--primary-color);
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin-top: 1rem;
        }
    </style>
</head>
<body>
    <section class="hero">
        <h1>${formData.title}</h1>
        <p>${formData.description}</p>
    </section>

    <section class="features">
        ${formData.features.map(feature => `
            <div class="feature-card">
                <h3>${feature}</h3>
            </div>
        `).join('')}
    </section>

    ${formData.showTestimonials ? `
    <section class="testimonials">
        <h2>What Our Customers Say</h2>
        ${formData.testimonials.map(testimonial => `
            <div class="testimonial-card">
                <p>${testimonial}</p>
            </div>
        `).join('')}
    </section>
    ` : ''}

    ${formData.showPricing ? `
    <section class="pricing">
        <h2>Pricing Plans</h2>
        <div class="grid grid-cols-3 gap-4">
            ${formData.pricingPlans.map(plan => `
                <div class="pricing-card">
                    <h3>${plan.name}</h3>
                    <p class="price">${plan.price}</p>
                    <ul>
                        ${plan.features.map(feature => `
                            <li>${feature}</li>
                        `).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>
    </section>
    ` : ''}

    <section class="cta">
        <h2>Ready to get started?</h2>
        <a href="${formData.ctaLink}" class="cta-button">${formData.ctaText}</a>
    </section>
</body>
</html>
    `;

    // Create a Blob with the HTML content
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'landing-page.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Create Your Landing Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Page Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Enter your page title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded"
              rows={3}
              placeholder="Enter your page description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Primary Color</label>
              <input
                type="color"
                value={formData.primaryColor}
                onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                className="w-full h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Secondary Color</label>
              <input
                type="color"
                value={formData.secondaryColor}
                onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                className="w-full h-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Font Family</label>
            <select
              value={formData.fontFamily}
              onChange={(e) => setFormData({ ...formData, fontFamily: e.target.value })}
              className="w-full p-2 border rounded"
            >
              {FONT_OPTIONS.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Layout</label>
            <select
              value={formData.layout}
              onChange={(e) => setFormData({ ...formData, layout: e.target.value as 'centered' | 'left-aligned' })}
              className="w-full p-2 border rounded"
            >
              <option value="centered">Centered</option>
              <option value="left-aligned">Left Aligned</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Features</label>
            {formData.features.map((feature, index) => (
              <input
                key={index}
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="w-full p-2 border rounded mb-2"
                placeholder={`Feature ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showTestimonials"
              checked={formData.showTestimonials}
              onChange={(e) => setFormData({ ...formData, showTestimonials: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="showTestimonials" className="text-sm font-medium">
              Include Testimonials Section
            </label>
          </div>

          {formData.showTestimonials && (
            <div>
              <label className="block text-sm font-medium mb-2">Testimonials</label>
              {formData.testimonials.map((testimonial, index) => (
                <textarea
                  key={index}
                  value={testimonial}
                  onChange={(e) => handleTestimonialChange(index, e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                  rows={2}
                  placeholder={`Testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showPricing"
              checked={formData.showPricing}
              onChange={(e) => setFormData({ ...formData, showPricing: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="showPricing" className="text-sm font-medium">
              Include Pricing Section
            </label>
          </div>

          {formData.showPricing && (
            <div>
              <label className="block text-sm font-medium mb-2">Pricing Plans</label>
              {formData.pricingPlans.map((plan, planIndex) => (
                <div key={planIndex} className="mb-4 p-4 border rounded">
                  <input
                    type="text"
                    value={plan.name}
                    onChange={(e) => {
                      const newPlans = [...formData.pricingPlans];
                      newPlans[planIndex].name = e.target.value;
                      setFormData({ ...formData, pricingPlans: newPlans });
                    }}
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Plan Name"
                  />
                  <input
                    type="text"
                    value={plan.price}
                    onChange={(e) => {
                      const newPlans = [...formData.pricingPlans];
                      newPlans[planIndex].price = e.target.value;
                      setFormData({ ...formData, pricingPlans: newPlans });
                    }}
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Price"
                  />
                  {plan.features.map((feature, featureIndex) => (
                    <input
                      key={featureIndex}
                      type="text"
                      value={feature}
                      onChange={(e) => handlePricingFeatureChange(planIndex, featureIndex, e.target.value)}
                      className="w-full p-2 border rounded mb-2"
                      placeholder={`Feature ${featureIndex + 1}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">CTA Text</label>
              <input
                type="text"
                value={formData.ctaText}
                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Call to action text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">CTA Link</label>
              <input
                type="text"
                value={formData.ctaLink}
                onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Call to action link"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
            <button
              onClick={generateLandingPage}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Generate & Download
            </button>
          </div>
        </div>

        {showPreview && (
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Preview</h2>
            <div className="border rounded-lg overflow-hidden">
              <iframe
                srcDoc={`
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <style>
                        body { margin: 0; padding: 0; }
                        .preview-container { 
                          transform: scale(0.5); 
                          transform-origin: top left;
                          width: 200%;
                          height: 200%;
                        }
                      </style>
                    </head>
                    <body>
                      <div class="preview-container">
                        ${generateLandingPage().replace('<!DOCTYPE html>', '')}
                      </div>
                    </body>
                  </html>
                `}
                className="w-full h-[800px]"
                title="Preview"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 