import React from 'react';

interface Component {
  id: string;
  name: string;
  type: string;
  preview: string;
}

const components: Component[] = [
  {
    id: 'hero',
    name: 'Hero Section',
    type: 'section',
    preview: 'A full-width hero section with title and CTA'
  },
  {
    id: 'features',
    name: 'Features Grid',
    type: 'section',
    preview: 'A grid of features with icons and descriptions'
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    type: 'section',
    preview: 'Customer testimonials with images and quotes'
  },
  {
    id: 'cta',
    name: 'Call to Action',
    type: 'section',
    preview: 'A prominent call-to-action section'
  }
];

export default function ComponentLibrary() {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Available Components</h2>
      <div className="grid grid-cols-1 gap-4">
        {components.map((component) => (
          <div
            key={component.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', JSON.stringify(component));
            }}
          >
            <h3 className="font-semibold">{component.name}</h3>
            <p className="text-sm text-gray-600">{component.preview}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 