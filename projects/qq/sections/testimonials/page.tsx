'use client';

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sophie Martin",
    role: "Food Blogger",
    avatar: "/avatars/sophie.jpg",
    rating: 5,
    quote: "Une expérience culinaire exceptionnelle. Les plats sont créatifs et les saveurs parfaitement équilibrées."
  },
  {
    id: 2,
    name: "Thomas Leroy",
    role: "Critique gastronomique",
    avatar: "/avatars/thomas.jpg",
    rating: 4,
    quote: "Ambiance chaleureuse et service impeccable. Le chef propose une interprétation moderne des classiques."
  },
  {
    id: 3,
    name: "Camille Dubois",
    role: "Client fidèle",
    avatar: "/avatars/camille.jpg",
    rating: 5,
    quote: "Je reviens chaque semaine tellement la qualité est constante. Le burger truffé est un must-try!"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('');

  const nextTestimonial = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const getAnimationClass = () => {
    if (direction === 'right') return 'animate-fadeInRight';
    if (direction === 'left') return 'animate-fadeInLeft';
    return '';
  };

  return (
    <section className="py-16 bg-gray-50" aria-label="Témoignages clients">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Ce que nos clients disent</h2>
        
        <div className="relative max-w-4xl mx-auto">
          <div className={`bg-white rounded-xl shadow-lg p-8 transition-all duration-500 ${getAnimationClass()}`}>
            <Quote className="w-8 h-8 text-amber-500 mb-4" />
            
            <p className="text-lg italic text-gray-700 mb-6">
              "{testimonials[currentIndex].quote}"
            </p>
            
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`w-5 h-5 ${i < testimonials[currentIndex].rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`}
                />
              ))}
            </div>
            
            <div className="flex items-center">
              <img 
                src={testimonials[currentIndex].avatar} 
                alt={testimonials[currentIndex].name}
                className="w-12 h-12 rounded-full object-cover mr-4"
                width={48}
                height={48}
              />
              <div>
                <h3 className="font-semibold text-gray-900">{testimonials[currentIndex].name}</h3>
                <p className="text-sm text-gray-600">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white p-2 rounded-full shadow-md hover:bg-amber-50 transition-colors"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-6 h-6 text-amber-600" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white p-2 rounded-full shadow-md hover:bg-amber-50 transition-colors"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-6 h-6 text-amber-600" />
          </button>
        </div>
        
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 'right' : 'left');
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-amber-600 w-6' : 'bg-gray-300'}`}
              aria-label={`Aller au témoignage ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.5s ease-out;
        }
        .animate-fadeInLeft {
          animation: fadeInLeft 0.5s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;

export default function Testimonials() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Your testimonials content here */}
      </div>
    </section>
  );
}