'use client';

<div class="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">Des tarifs adaptés à vos besoins</h2>
      <p class="mt-4 text-xl text-gray-600">Choisissez le plan qui correspond à votre activité</p>
    </div>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
      <!-- Plan Basique -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
        <div class="p-8">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl font-bold text-gray-900">Basique</h3>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Populaire</span>
          </div>
          <p class="mt-4 text-gray-600">Parfait pour les petits restaurants</p>
          <div class="mt-6">
            <p class="text-4xl font-extrabold text-gray-900">19€<span class="text-base font-medium text-gray-500">/mois</span></p>
          </div>
          <ul class="mt-8 space-y-3">
            <li class="flex items-start">
              <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="ml-3 text-gray-700">Gestion de 1 restaurant</span>
            </li>
            <li class="flex items-start">
              <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="ml-3 text-gray-700">Jusqu'à 50 commandes/mois</span>
            </li>
            <li class="flex items-start">
              <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="ml-3 text-gray-700">Support par email</span>
            </li>
          </ul>
          <div class="mt-8">
            <button class="w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out">
              Essai gratuit
            </button>
          </div>
        </div>
      </div>

      <!-- Plan Professionnel -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 transform scale-105 border-2 border-blue-500">
        <div class="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">Recommandé</div>
        <div class="p-8">
          <h3 class="text-2xl font-bold text-gray-900">Professionnel</h3>
          <p class="mt-4 text-gray-600">Idéal pour les chaînes de restaurants</p>
          <div class="mt-6">
            <p class="text-4xl font-extrabold text-gray-900">49€<span class="text-base font-medium text-gray-500">/mois</span></p>
          </div>
          <ul class="mt-8 space-y-3">
            <li class="flex items-start">
              <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="ml-3 text-gray-700">Gestion de 3 restaurants</span>
            </li>
            <li class="flex items-start">
              <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="ml-3 text-gray-700">Jusqu'à 300 commandes/mois</span>
            </li>
            <li class="flex items-start">
              <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="ml-3 text-gray-700">Support prioritaire</span>
            </li>
            <li class="flex items-start">
              <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="ml-3 text-gray-700">Statistiques avancées</span>
            </li>
          </ul>
          <div class="mt-8">
            <button class="w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out">
              Commencer
            </button>
          </div>
        </div>
      </div>

      <!-- Plan Entreprise -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
        <div class="p-8">
          <h3 class="text-2xl font-bold text-gray-900">Entreprise</h3>
          <p class="mt-4 text-gray-600">Solution sur mesure</p>
          <div class="mt-6">
            <p class="text-4xl font-extrabold text-gray-900">99€<span class="text-base font-medium text-gray-500">/mois</span></p>
          </div>
          <ul class="mt-8 space-y-3">
            <li class="flex items-start">
              <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="ml-3 text-gray-700">Restaurants illimités</span>
            </li>
            <li class="flex items-start">
              <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="ml-3 text-gray-700">Commandes illimitées</span>
            </li>
            <li class="flex items-start">
              <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="ml-3 text-gray-700">Support 24/7</span>
            </li>
            <li class="flex items-start">
              <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="ml-3 text-gray-700">API personnalisée</span>
            </li>
            <li class="flex items-start">
              <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="ml-3 text-gray-700">Formation dédiée</span>
            </li>
          </ul>
          <div class="mt-8">
            <button class="w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 transition duration-150 ease-in-out">
              Nous contacter
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-16 text-center">
      <p class="text-gray-600">Vous avez des questions sur nos tarifs ? <a href="#" class="font-medium text-blue-600 hover:text-blue-500">Contactez notre équipe</a></p>
    </div>
  </div>
</div>

export default function Pricing() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Your pricing content here */}
      </div>
    </section>
  );
}