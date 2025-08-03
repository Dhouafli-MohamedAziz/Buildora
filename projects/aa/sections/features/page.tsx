'use client';

<div class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold text-gray-900 mb-4" data-aos="fade-up">Nos fonctionnalités exceptionnelles</h2>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">Découvrez ce qui rend notre solution unique et puissante</p>
    </div>

    <!-- Feature 1 -->
    <div class="flex flex-col lg:flex-row items-center justify-between mb-24 gap-12">
      <div class="lg:w-1/2" data-aos="fade-right">
        <div class="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
            <path d="M3 3v18h18"></path>
            <rect width="4" height="7" x="7" y="3" rx="1"></rect>
            <rect width="4" height="4" x="7" y="14" rx="1"></rect>
            <rect width="4" height="11" x="15" y="3" rx="1"></rect>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Analyses en temps réel</h3>
        <p class="text-gray-600 mb-6">Obtenez des insights immédiats grâce à nos tableaux de bord interactifs et personnalisables.</p>
        <ul class="space-y-3">
          <li class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500 mr-2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span class="text-gray-700">Données actualisées toutes les 5 minutes</span>
          </li>
          <li class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500 mr-2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span class="text-gray-700">Alertes personnalisables</span>
          </li>
        </ul>
      </div>
      <div class="lg:w-1/2" data-aos="fade-left">
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Tableau de bord analytique" class="rounded-lg shadow-md w-full h-auto">
        </div>
      </div>
    </div>

    <!-- Feature 2 -->
    <div class="flex flex-col lg:flex-row-reverse items-center justify-between mb-24 gap-12">
      <div class="lg:w-1/2" data-aos="fade-left">
        <div class="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-600">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Sécurité renforcée</h3>
        <p class="text-gray-600 mb-6">Protégez vos données avec notre système de chiffrement de bout en bout et authentification multi-facteurs.</p>
        <ul class="space-y-3">
          <li class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500 mr-2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span class="text-gray-700">Certification ISO 27001</span>
          </li>
          <li class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500 mr-2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span class="text-gray-700">Sauvegardes automatiques quotidiennes</span>
          </li>
        </ul>
      </div>
      <div class="lg:w-1/2" data-aos="fade-right">
        <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 shadow-lg">
          <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Sécurité des données" class="rounded-lg shadow-md w-full h-auto">
        </div>
      </div>
    </div>

    <!-- Feature 3 -->
    <div class="flex flex-col lg:flex-row items-center justify-between gap-12">
      <div class="lg:w-1/2" data-aos="fade-right">
        <div class="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Collaboration simplifiée</h3>
        <p class="text-gray-600 mb-6">Travaillez efficacement en équipe avec nos outils de partage et de gestion des permissions.</p>
        <ul class="space-y-3">
          <li class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500 mr-2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span class="text-gray-700">Commentaires en temps réel</span>
          </li>
          <li class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500 mr-2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span class="text-gray-700">Historique des modifications</span>
          </li>
        </ul>
      </div>
      <div class="lg:w-1/2" data-aos="fade-left">
        <div class="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-8 shadow-lg">
          <img src="https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Équipe collaborant" class="rounded-lg shadow-md w-full h-auto">
        </div>
      </div>
    </div>
  </div>
</div>

<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  });
</script>

export default function Features() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Your features content here */}
      </div>
    </section>
  );
}