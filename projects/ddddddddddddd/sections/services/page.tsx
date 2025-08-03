'use client';

import { useState } from 'react';
import { Utensils, Truck, Clock, HeartHandshake } from 'lucide-react';

const ServicesSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      icon: <Utensils className="w-8 h-8" />,
      title: "Cuisine raffinée",
      description: "Plats préparés avec des ingrédients frais et locaux par nos chefs étoilés."
    },
    {
      id: 2,
      icon: <Truck className="w-8 h-8" />,
      title: "Livraison rapide",
      description: "Service de livraison express pour déguster nos plats chez vous."
    },
    {
      id: 3,
      icon: <Clock className="w-8 h-8" />,
      title: "Ouverture étendue",
      description: "Service continu de 11h à 23h pour satisfaire toutes vos envies."
    },
    {
      id: 4,
      icon: <HeartHandshake className="w-8 h-8" />,
      title: "Service personnalisé",
      description: "Une équipe attentionnée pour rendre chaque visite mémorable."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto">
        <h2 id="services-heading" className="text-3xl font-bold text-center text-gray-900 mb-12">
          Nos Services Exceptionnels
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className={`relative bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ease-in-out 
                ${hoveredCard === service.id ? 'transform -translate-y-2 shadow-xl' : ''}`}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 mx-auto 
                ${hoveredCard === service.id ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-600'}`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center">
                {service.description}
              </p>
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-amber-500 transition-all duration-300 
                ${hoveredCard === service.id ? 'w-full' : 'w-0 mx-auto'}`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

export default function Services() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Your services content here */}
      </div>
    </section>
  );
}