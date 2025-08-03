'use client';

<header class="fixed w-full z-50 backdrop-blur-md bg-white/80 shadow-sm">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16 md:h-20">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <a href="/" class="flex items-center" aria-label="Restaurrent">
          <svg class="h-8 w-8 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L20 9v6l-8 4-8-4V9l8-4.2zM12 15a3 3 0 110-6 3 3 0 010 6z"/>
          </svg>
          <span class="ml-2 text-xl font-bold text-gray-900">Restaurrent</span>
        </a>
      </div>

      <!-- Navigation Desktop -->
      <nav class="hidden md:flex space-x-8">
        <a href="#features" class="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium">Features</a>
        <a href="#menu" class="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium">Menu</a>
        <a href="#testimonials" class="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium">Testimonials</a>
        <a href="#contact" class="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium">Contact</a>
      </nav>

      <!-- CTA Desktop -->
      <div class="hidden md:flex items-center space-x-4">
        <a href="#reservation" class="px-4 py-2 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
          Book a table
        </a>
      </div>

      <!-- Mobile menu button -->
      <div class="md:hidden flex items-center">
        <button id="mobile-menu-button" class="text-gray-700 hover:text-amber-600 focus:outline-none" aria-label="Open menu">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile menu -->
  <div id="mobile-menu" class="hidden md:hidden bg-white/95 backdrop-blur-sm">
    <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      <a href="#features" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50">Features</a>
      <a href="#menu" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50">Menu</a>
      <a href="#testimonials" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50">Testimonials</a>
      <a href="#contact" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50">Contact</a>
      <a href="#reservation" class="block px-3 py-2 mt-2 rounded-md text-base font-medium text-white bg-amber-600 hover:bg-amber-700">Book a table</a>
    </div>
  </div>
</header>

<script>
  document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
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