'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, Play } from 'lucide-react';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className={`lg:w-1/2 space-y-6 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Découvrez une <span className="text-orange-600">expérience culinaire</span> exceptionnelle
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-lg">
              Notre restaurant vous propose des plats raffinés préparés avec des ingrédients frais et locaux.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                Réserver une table <ChevronRight size={20} />
              </button>
              <button className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors duration-300">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-600">
                  <Play size={16} fill="currentColor" />
                </span>
                Voir la vidéo
              </button>
            </div>
          </div>
          <div className={`lg:w-1/2 transition-all duration-700 delay-150 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="Restaurant élégant avec service de qualité" 
                className="w-full h-auto rounded-2xl shadow-xl"
                width={800}
                height={600}
                loading="eager"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Ouvert maintenant</p>
                    <p className="text-sm text-gray-500">12h - 23h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

export default function Hero() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Your hero content here */}
      </div>
    </section>
  );
}