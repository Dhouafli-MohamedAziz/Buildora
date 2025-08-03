'use client';

<div class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Services</h2>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">Des solutions sur mesure pour répondre à tous vos besoins</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Service 1 -->
      <div class="group bg-gray-50 rounded-xl p-8 transition-all duration-300 hover:bg-indigo-50 hover:shadow-lg hover:-translate-y-2">
        <div class="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-200 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-600">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-3">Sécurité Premium</h3>
        <p class="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Protection avancée pour vos données sensibles avec des technologies de pointe.</p>
      </div>

      <!-- Service 2 -->
      <div class="group bg-gray-50 rounded-xl p-8 transition-all duration-300 hover:bg-blue-50 hover:shadow-lg hover:-translate-y-2">
        <div class="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
            <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-3">Solutions Cloud</h3>
        <p class="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Infrastructure cloud scalable pour une performance optimale à tout moment.</p>
      </div>

      <!-- Service 3 -->
      <div class="group bg-gray-50 rounded-xl p-8 transition-all duration-300 hover:bg-purple-50 hover:shadow-lg hover:-translate-y-2">
        <div class="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-600">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-3">Design Personnalisé</h3>
        <p class="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Interfaces sur mesure conçues pour une expérience utilisateur exceptionnelle.</p>
      </div>

      <!-- Service 4 -->
      <div class="group bg-gray-50 rounded-xl p-8 transition-all duration-300 hover:bg-green-50 hover:shadow-lg hover:-translate-y-2">
        <div class="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-3">Support 24/7</h3>
        <p class="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Assistance technique disponible à tout moment pour répondre à vos besoins.</p>
      </div>
    </div>
  </div>
</div>

export default function Services() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Your services content here */}
      </div>
    </section>
  );
}