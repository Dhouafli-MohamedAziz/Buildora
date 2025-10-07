'use client';

<header class="w-full bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 backdrop-blur-lg bg-opacity-90 border-b border-white border-opacity-10">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <div class="flex-shrink-0 flex items-center">
        <a href="#" class="text-white text-xl font-bold tracking-tight hover:text-purple-300 transition-colors duration-300">
          drtfygu
        </a>
      </div>

      <!-- Menu Desktop -->
      <div class="hidden md:block">
        <div class="ml-10 flex items-baseline space-x-8">
          <a href="#" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105">Accueil</a>
          <a href="#" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105">Fonctionnalités</a>
          <a href="#" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105">Tarifs</a>
          <a href="#" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105">Contact</a>
        </div>
      </div>

      <!-- CTA Desktop -->
      <div class="hidden md:flex items-center space-x-4">
        <a href="#" class="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white hover:bg-opacity-10">
          Connexion
        </a>
        <a href="#" class="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-purple-500 hover:to-blue-500">
          Essai Gratuit
        </a>
      </div>

      <!-- Menu Mobile -->
      <div class="md:hidden">
        <button class="text-gray-300 hover:text-white focus:outline-none focus:text-white transition-colors duration-300" aria-label="Menu">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>
  </nav>

  <!-- Menu Mobile Expanded -->
  <div class="md:hidden hidden bg-black bg-opacity-50 backdrop-blur-lg">
    <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      <a href="#" class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300">Accueil</a>
      <a href="#" class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300">Fonctionnalités</a>
      <a href="#" class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300">Tarifs</a>
      <a href="#" class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300">Contact</a>
      <div class="pt-4 pb-3 border-t border-gray-700">
        <a href="#" class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300">Connexion</a>
        <a href="#" class="bg-gradient-to-r from-purple-600 to-blue-600 text-white block px-3 py-2 rounded-lg text-base font-medium mt-2 shadow-lg transition-all duration-300 hover:scale-105">Essai Gratuit</a>
      </div>
    </div>
  </div>
</header>

export default function Header() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Your header content here */}
      </div>
    </section>
  );
}