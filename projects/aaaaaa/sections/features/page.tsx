'use client';

import { useState, useEffect } from 'react';
import { 
  Utensils, 
  Clock, 
  MapPin, 
  Salad, 
  Gift, 
  Phone 
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const FeatureCard = ({ icon, title, description, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center p-6 bg-white rounded-xl shadow-lg transition-all duration-500 ease-in-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary-100 text-primary-600">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

const FeatureSection = ({ imageLeft = false, title, description, imageSrc }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section 
      ref={ref}
      className={`py-12 px-4 sm:px-6 lg:px-8 ${inView ? 'animate-fadeIn' : 'opacity-0'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col ${imageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}>
          <div className="md:w-1/2">
            <img 
              src={imageSrc} 
              alt={title} 
              className="rounded-xl shadow-xl w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
            <p className="text-lg text-gray-600 mb-8">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Utensils size={24} />,
      title: "Cuisine artisanale",
      description: "Nos plats sont préparés avec des ingrédients frais et locaux par nos chefs expérimentés."
    },
    {
      icon: <Clock size={24} />,
      title: "Service rapide",
      description: "Commandez en ligne et bénéficiez d'un service express pour les déjeuners d'affaires."
    },
    {
      icon: <MapPin size={24} />,
      title: "Emplacement idéal",
      description: "Situé en centre-ville avec un accès facile et un parking à proximité."
    },
    {
      icon: <Salad size={24} />,
      title: "Options végétariennes",
      description: "Large sélection de plats végétariens et végétaliens pour tous les régimes."
    },
    {
      icon: <Gift size={24} />,
      title: "Fidélité récompensée",
      description: "Programme de fidélité avec des avantages exclusifs pour nos clients réguliers."
    },
    {
      icon: <Phone size={24} />,
      title: "Réservation facile",
      description: "Réservez votre table en quelques clics via notre application mobile ou site web."
    }
  ];

  const featureSections = [
    {
      title: "Découvrez notre carte saisonnière",
      description: "Notre menu évolue avec les saisons pour vous proposer des produits frais et de qualité. Chaque plat est une création unique de nos chefs, mettant en valeur les meilleurs produits régionaux.",
      imageSrc: "/images/seasonal-menu.jpg"
    },
    {
      title: "Expérience culinaire exceptionnelle",
      description: "Dans un cadre chaleureux et élégant, vivez une expérience gastronomique mémorable. Notre service attentionné et notre ambiance raffinée feront de votre repas un moment inoubliable.",
      imageSrc: "/images/dining-experience.jpg",
      imageLeft: true
    }
  ];

  return (
    <section className="py-16 bg-gray-50" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos atouts</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez ce qui fait de notre restaurant une expérience unique
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>

        {featureSections.map((section, index) => (
          <FeatureSection 
            key={index}
            title={section.title}
            description={section.description}
            imageSrc={section.imageSrc}
            imageLeft={section.imageLeft}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;

export default function Features() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Your features content here */}
      </div>
    </section>
  );
}