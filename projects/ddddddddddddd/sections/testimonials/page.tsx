'use client';

import { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sophie Martin",
    role: "Food Blogger",
    avatar: "/avatars/sophie.jpg",
    rating: 5,
    quote: "Une expérience culinaire exceptionnelle. Le chef transforme les produits locaux en véritables œuvres d'art."
  },
  {
    id: 2,
    name: "Thomas Leroy",
    role: "Critique gastronomique",
    avatar: "/avatars/thomas.jpg",
    rating: 4,
    quote: "Ambiance chaleureuse et plats innovants. Le risotto aux truffes est à tomber par terre !"
  },
  {
    id: 3,
    name: "Camille Dubois",
    role: "Client fidèle",
    avatar: "/avatars/camille.jpg",
    rating: 5,
    quote: "Je reviens chaque semaine tellement la qualité est constante. Service impeccable et carte des vins remarquable."
  }
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState('right');

  const nextTestimonial = () => {
    setDirection('right');
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setDirection('left');
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section aria-labelledby="testimonials-heading" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 id="testimonials-heading" className="text-3xl font-bold text-center mb-12 text-gray-900">
          Ce que nos clients disent
        </h2>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className={`flex transition-transform duration-500 ease-in-out ${
                direction === 'right' ? 'transform -translate-x-full' : 'transform translate-x-full'
              }`}
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                        <img 
                          src={testimonial.avatar} 
                          alt={`Photo de ${testimonial.name}`} 
                          className="w-full h-full object-cover"
                          width={64}
                          height={64}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{testimonial.name}</h3>
                        <p className="text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <Quote className="text-gray-300 w-8 h-8 mb-4" />
                    <blockquote className="text-gray-700 italic text-lg mb-6">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={prevTestimonial}
            aria-label="Témoignage précédent"
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button 
            onClick={nextTestimonial}
            aria-label="Témoignage suivant"
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 'right' : 'left');
                setCurrent(i);
              }}
              aria-label={`Aller au témoignage ${i + 1}`}
              className={`w-3 h-3 rounded-full transition-colors ${i === current ? 'bg-primary-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
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