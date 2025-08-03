'use client';

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gallery - Restaurrent</title>
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div class="max-w-7xl mx-auto">
            <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Notre Galerie</h2>
            
            <!-- Filtres -->
            <div class="flex flex-wrap justify-center gap-4 mb-12">
                <button class="px-6 py-2 rounded-full bg-amber-600 text-white font-medium transition-all hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2" data-filter="all">Tout voir</button>
                <button class="px-6 py-2 rounded-full bg-gray-100 text-gray-800 font-medium transition-all hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2" data-filter="interieur">Intérieur</button>
                <button class="px-6 py-2 rounded-full bg-gray-100 text-gray-800 font-medium transition-all hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2" data-filter="exterieur">Extérieur</button>
                <button class="px-6 py-2 rounded-full bg-gray-100 text-gray-800 font-medium transition-all hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2" data-filter="plats">Nos plats</button>
            </div>
            
            <!-- Grille d'images -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Item 1 -->
                <div class="gallery-item group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl" data-category="interieur">
                    <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                         alt="Intérieur du restaurant" 
                         class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105">
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <button class="lightbox-trigger opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 p-3 bg-amber-600 rounded-full text-white">
                            <i data-lucide="maximize"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Item 2 -->
                <div class="gallery-item group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl" data-category="exterieur">
                    <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80" 
                         alt="Terrasse du restaurant" 
                         class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105">
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <button class="lightbox-trigger opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 p-3 bg-amber-600 rounded-full text-white">
                            <i data-lucide="maximize"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Item 3 -->
                <div class="gallery-item group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl" data-category="plats">
                    <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" 
                         alt="Plat signature" 
                         class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105">
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <button class="lightbox-trigger opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 p-3 bg-amber-600 rounded-full text-white">
                            <i data-lucide="maximize"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Item 4 -->
                <div class="gallery-item group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl" data-category="interieur">
                    <img src="https://images.unsplash.com/photo-1587017539504-67cfbddac569?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                         alt="Bar du restaurant" 
                         class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105">
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <button class="lightbox-trigger opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 p-3 bg-amber-600 rounded-full text-white">
                            <i data-lucide="maximize"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Item 5 -->
                <div class="gallery-item group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl" data-category="plats">
                    <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=781&q=80" 
                         alt="Dessert maison" 
                         class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105">
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <button class="lightbox-trigger opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 p-3 bg-amber-600 rounded-full text-white">
                            <i data-lucide="maximize"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Item 6 -->
                <div class="gallery-item group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl" data-category="exterieur">
                    <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                         alt="Vue panoramique" 
                         class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105">
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <button class="lightbox-trigger opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 p-3 bg-amber-600 rounded-full text-white">
                            <i data-lucide="maximize"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Lightbox -->
        <div id="lightbox" class="fixed inset-0 bg-black bg-opacity-90 z-50 hidden items-center justify-center p-4">
            <div class="relative max-w-4xl w-full">
                <button id="close-lightbox" class="absolute -top-12 right-0 text-white hover:text-amber-400 transition-colors">
                    <i data-lucide="x" class="w-8 h-8"></i>
                </button>
                <img id="lightbox-img" src="" alt="" class="w-full max-h-[80vh] object-contain">
            </div>
        </div>
    </section>

    <script>
        // Initialisation des icônes Lucide
        lucide.createIcons();
        
        // Filtrage de la galerie
        const filterButtons = document.querySelectorAll('[data-filter]');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Mise à jour des boutons actifs
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-amber-600', 'text-white');
                    btn.classList.add('bg-gray-100', 'text-gray-800');
                });
                
                button.classList.add('bg-amber-600', 'text-white');
                button.classList.remove('bg-gray-100', 'text-gray-800');
                
                // Filtrage des éléments
                const filter = button.dataset.filter;
                
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
        
        // Lightbox
        const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeLightbox = document.getElementById('close-lightbox');
        
        lightboxTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const imgSrc = trigger.closest('.gallery-item').querySelector('img').src;
                const imgAlt = trigger.closest('.gallery-item').querySelector('img').alt;
                
                lightboxImg.src = imgSrc;
                lightboxImg.alt = imgAlt;
                lightbox.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            });
        });
        
        closeLightbox.addEventListener('click', () => {
            lightbox.classList.add('hidden');
            document.body.style.overflow = '';
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    </script>
</body>
</html>

export default function Gallery() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Your gallery content here */}
      </div>
    </section>
  );
}