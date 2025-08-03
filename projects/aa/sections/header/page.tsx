'use client';

<header class="fixed w-full z-50 backdrop-blur-md bg-white/80 shadow-sm">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16 md:h-20">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <a href="#" class="flex items-center" aria-label="Accueil">
          <svg class="h-8 w-8 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span class="ml-2 text-xl font-bold text-gray-900">aa</span>
        </a>
      </div>

      <!-- Navigation Desktop -->
      <nav class="hidden md:flex space-x-8">
        <a href="#features" class="text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium">Fonctionnalités</a>
        <a href="#pricing" class="text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium">Tarifs</a>
        <a href="#testimonials" class="text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium">Témoignages</a>
        <a href="#faq" class="text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium">FAQ</a>
      </nav>

      <!-- CTA Desktop -->
      <div class="hidden md:flex items-center space-x-4">
        <a href="#login" class="text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium">Connexion</a>
        <a href="#signup" class="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
          S'inscrire
        </a>
      </div>

      <!-- Menu Mobile -->
      <div class="md:hidden">
        <button id="mobile-menu-button" class="text-gray-700 hover:text-indigo-600 focus:outline-none" aria-label="Menu" aria-expanded="false">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu">
            <line x1="4" x2="20" y1="12" y2="12"/>
            <line x1="4" x2="20" y1="6" y2="6"/>
            <line x1="4" x2="20" y1="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Menu Dropdown -->
  <div id="mobile-menu" class="hidden md:hidden bg-white/95 backdrop-blur-md shadow-lg">
    <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      <a href="#features" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Fonctionnalités</a>
      <a href="#pricing" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Tarifs</a>
      <a href="#testimonials" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Témoignages</a>
      <a href="#faq" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">FAQ</a>
      <div class="pt-4 border-t border-gray-200">
        <a href="#login" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Connexion</a>
        <a href="#signup" class="block mt-2 px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">S'inscrire</a>
      </div>
    </div>
  </div>
</header>

<script>
  document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    
    this.setAttribute('aria-expanded', !isExpanded);
    menu.classList.toggle('hidden');
    
    // Animation toggle icon
    if (!isExpanded) {
      this.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      `;
    } else {
      this.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu">
          <line x1="4" x2="20" y1="12" y2="12"/>
          <line x1="4" x2="20" y1="6" y2="6"/>
          <line x1="4" x2="20" y1="18" y2="18"/>
        </svg>
      `;
    }
  });
</script>

export default function Header() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Your header content here */}
      </div>
    </section>
  );
}