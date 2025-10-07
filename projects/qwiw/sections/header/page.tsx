'use client';

<header class="w-full bg-white shadow-sm">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <a href="#" class="text-2xl font-bold text-[#3B82F6] hover:text-[#8B5CF6] transition-colors duration-300">qwiw</a>
      </div>

      <!-- Navigation Desktop -->
      <div class="hidden md:block">
        <div class="ml-10 flex items-baseline space-x-8">
          <a href="#" class="text-[#1F2937] hover:text-[#3B82F6] px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105">Accueil</a>
          <a href="#" class="text-[#1F2937] hover:text-[#3B82F6] px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105">Fonctionnalités</a>
          <a href="#" class="text-[#1F2937] hover:text-[#3B82F6] px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105">Contact</a>
        </div>
      </div>

      <!-- CTA Desktop -->
      <div class="hidden md:block">
        <button class="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white hover:from-[#7C3AED] hover:to-[#2563EB] px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md">
          Commencer
        </button>
      </div>

      <!-- Menu Mobile -->
      <div class="md:hidden">
        <button class="text-[#1F2937] hover:text-[#3B82F6] p-2 rounded-md transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  </nav>
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