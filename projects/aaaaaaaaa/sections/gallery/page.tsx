'use client';

<section class="py-16 bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4]">
  <div class="container mx-auto px-4">
    <h2 class="text-4xl font-bold text-white text-center mb-12">Gallery</h2>
    
    <!-- Filter Buttons -->
    <div class="flex flex-wrap justify-center gap-4 mb-12">
      <button class="filter-btn px-6 py-2 rounded-full bg-white text-[#0EA5E9] font-medium transition-all hover:bg-[#E0F2FE] hover:scale-105 active:scale-95" data-filter="all">All</button>
      <button class="filter-btn px-6 py-2 rounded-full bg-white text-[#0EA5E9] font-medium transition-all hover:bg-[#E0F2FE] hover:scale-105 active:scale-95" data-filter="nature">Nature</button>
      <button class="filter-btn px-6 py-2 rounded-full bg-white text-[#0EA5E9] font-medium transition-all hover:bg-[#E0F2FE] hover:scale-105 active:scale-95" data-filter="wildlife">Wildlife</button>
      <button class="filter-btn px-6 py-2 rounded-full bg-white text-[#0EA5E9] font-medium transition-all hover:bg-[#E0F2FE] hover:scale-105 active:scale-95" data-filter="landscape">Landscape</button>
    </div>
    
    <!-- Gallery Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <!-- Gallery Item 1 -->
      <div class="gallery-item group relative overflow-hidden rounded-xl shadow-xl transition-all duration-500 hover:shadow-2xl" data-category="nature">
        <img src="https://source.unsplash.com/random/600x400/?ocean" alt="Ocean view" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110">
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <h3 class="text-white text-xl font-bold">Ocean Sunset</h3>
        </div>
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button class="lightbox-btn p-3 bg-white/90 rounded-full text-[#0EA5E9] hover:bg-white transition-all" aria-label="View image">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Gallery Item 2 -->
      <div class="gallery-item group relative overflow-hidden rounded-xl shadow-xl transition-all duration-500 hover:shadow-2xl" data-category="wildlife">
        <img src="https://source.unsplash.com/random/600x400/?dolphin" alt="Dolphin swimming" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110">
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <h3 class="text-white text-xl font-bold">Dolphin</h3>
        </div>
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button class="lightbox-btn p-3 bg-white/90 rounded-full text-[#0EA5E9] hover:bg-white transition-all" aria-label="View image">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Gallery Item 3 -->
      <div class="gallery-item group relative overflow-hidden rounded-xl shadow-xl transition-all duration-500 hover:shadow-2xl" data-category="landscape">
        <img src="https://source.unsplash.com/random/600x400/?beach" alt="Tropical beach" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110">
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <h3 class="text-white text-xl font-bold">Tropical Beach</h3>
        </div>
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button class="lightbox-btn p-3 bg-white/90 rounded-full text-[#0EA5E9] hover:bg-white transition-all" aria-label="View image">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Gallery Item 4 -->
      <div class="gallery-item group relative overflow-hidden rounded-xl shadow-xl transition-all duration-500 hover:shadow-2xl" data-category="nature">
        <img src="https://source.unsplash.com/random/600x400/?waves" alt="Ocean waves" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110">
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <h3 class="text-white text-xl font-bold">Ocean Waves</h3>
        </div>
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button class="lightbox-btn p-3 bg-white/90 rounded-full text-[#0EA5E9] hover:bg-white transition-all" aria-label="View image">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Gallery Item 5 -->
      <div class="gallery-item group relative overflow-hidden rounded-xl shadow-xl transition-all duration-500 hover:shadow-2xl" data-category="wildlife">
        <img src="https://source.unsplash.com/random/600x400/?turtle" alt="Sea turtle" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110">
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <h3 class="text-white text-xl font-bold">Sea Turtle</h3>
        </div>
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button class="lightbox-btn p-3 bg-white/90 rounded-full text-[#0EA5E9] hover:bg-white transition-all" aria-label="View image">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Gallery Item 6 -->
      <div class="gallery-item group relative overflow-hidden rounded-xl shadow-xl transition-all duration-500 hover:shadow-2xl" data-category="landscape">
        <img src="https://source.unsplash.com/random/600x400/?island" alt="Tropical island" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110">
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <h3 class="text-white text-xl font-bold">Tropical Island</h3>
        </div>
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button class="lightbox-btn p-3 bg-white/90 rounded-full text-[#0EA5E9] hover:bg-white transition-all" aria-label="View image">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Lightbox Modal -->
  <div id="lightbox-modal" class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300">
    <div class="relative max-w-4xl w-full">
      <button id="close-lightbox" class="absolute -top-12 right-0 text-white hover:text-[#E0F2FE] transition-colors" aria-label="Close lightbox">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <img id="lightbox-image" src="" alt="" class="w-full max-h-[80vh] object-contain">
    </div>
  </div>
</section>

<script>
  // Simple filter functionality
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.dataset.filter;
      
      // Update active button
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('bg-[#E0F2FE]', 'scale-105'));
      this.classList.add('bg-[#E0F2FE]', 'scale-105');
      
      // Filter items
      document.querySelectorAll('.gallery-item').forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hidden');
          item.style.animation = 'fadeIn 0.5s ease-out';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
  
  // Lightbox functionality
  document.querySelectorAll('.lightbox-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const imgSrc = this.closest('.gallery-item').querySelector('img').src;
      const imgAlt = this.closest('.gallery-item').querySelector('img').alt;
      
      document.getElementById('lightbox-image').src = imgSrc;
      document.getElementById('lightbox-image').alt = imgAlt;
      document.getElementById('lightbox-modal').classList.remove('opacity-0', 'pointer-events-none');
    });
  });
  
  document.getElementById('close-lightbox').addEventListener('click', function() {
    document.getElementById('lightbox-modal').classList.add('opacity-0', 'pointer-events-none');
  });
</script>

<style>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .gallery-item {
    animation: fadeIn 0.5s ease-out;
  }
</style>

export default function Gallery() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Your gallery content here */}
      </div>
    </section>
  );
}