'use client';

<footer class="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      <!-- Logo and description -->
      <div class="space-y-4">
        <h2 class="text-2xl font-bold">Restqurent</h2>
        <p class="text-gray-400">La solution innovante pour la gestion de restaurants.</p>
        <div class="flex space-x-4">
          <a href="#" aria-label="Facebook" class="text-gray-400 hover:text-white transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#" aria-label="Twitter" class="text-gray-400 hover:text-white transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
          </a>
          <a href="#" aria-label="Instagram" class="text-gray-400 hover:text-white transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="#" aria-label="LinkedIn" class="text-gray-400 hover:text-white transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
      </div>

      <!-- Quick links -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Liens rapides</h3>
        <ul class="space-y-2">
          <li><a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">Accueil</a></li>
          <li><a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">Fonctionnalités</a></li>
          <li><a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">Tarifs</a></li>
          <li><a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">FAQ</a></li>
        </ul>
      </div>

      <!-- Legal -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Légal</h3>
        <ul class="space-y-2">
          <li><a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">Mentions légales</a></li>
          <li><a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">Politique de confidentialité</a></li>
          <li><a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">CGU</a></li>
          <li><a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">Cookies</a></li>
        </ul>
      </div>

      <!-- Newsletter -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Newsletter</h3>
        <p class="text-gray-400 mb-4">Abonnez-vous pour recevoir nos dernières actualités.</p>
        <form class="flex flex-col sm:flex-row gap-2">
          <input type="email" placeholder="Votre email" class="px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow">
          <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900">
            S'abonner
          </button>
        </form>
      </div>
    </div>

    <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p class="text-gray-400 text-sm mb-4 md:mb-0">© 2023 Restqurent. Tous droits réservés.</p>
      <div class="flex space-x-6">
        <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors duration-300">Conditions d'utilisation</a>
        <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors duration-300">Politique de confidentialité</a>
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