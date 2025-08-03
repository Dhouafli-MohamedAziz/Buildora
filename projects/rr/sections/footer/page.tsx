'use client';

<footer class="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      <!-- Logo & Description -->
      <div class="space-y-4">
        <h2 class="text-2xl font-bold">Restaurrent</h2>
        <p class="text-gray-400">Découvrez une expérience culinaire exceptionnelle dans notre restaurant.</p>
        <div class="flex space-x-4">
          <a href="#" aria-label="Facebook" class="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#" aria-label="Instagram" class="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="#" aria-label="Twitter" class="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
          </a>
        </div>
      </div>

      <!-- Navigation -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Navigation</h3>
        <ul class="space-y-2">
          <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Accueil</a></li>
          <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Menu</a></li>
          <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Réservation</a></li>
          <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Événements</a></li>
          <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Contact</a></li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Contact</h3>
        <ul class="space-y-2 text-gray-400">
          <li class="flex items-start space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin mt-0.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>123 Rue Gourmande, Paris 75000</span>
          </li>
          <li class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>+33 1 23 45 67 89</span>
          </li>
          <li class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <span>contact@restaurrent.com</span>
          </li>
        </ul>
      </div>

      <!-- Newsletter -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Newsletter</h3>
        <p class="text-gray-400 mb-4">Abonnez-vous pour recevoir nos offres spéciales.</p>
        <form class="flex flex-col sm:flex-row gap-2">
          <input type="email" placeholder="Votre email" class="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 flex-grow" required>
          <button type="submit" class="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded transition-colors font-medium">S'abonner</button>
        </form>
      </div>
    </div>

    <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p class="text-gray-400 text-sm mb-4 md:mb-0">© 2023 Restaurrent. Tous droits réservés.</p>
      <div class="flex space-x-6">
        <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">Mentions légales</a>
        <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">Politique de confidentialité</a>
        <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">CGV</a>
      </div>
    </div>
  </div>
</footer>

export default function Footer() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Your footer content here */}
      </div>
    </section>
  );
}