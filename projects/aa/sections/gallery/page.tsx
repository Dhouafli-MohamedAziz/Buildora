'use client';

<div class="container mx-auto px-4 py-16">
  <h2 class="text-3xl font-bold text-center mb-12">Our Gallery</h2>
  
  <!-- Filter Buttons -->
  <div class="flex flex-wrap justify-center gap-4 mb-12">
    <button class="px-6 py-2 rounded-full bg-primary text-white font-medium transition-all hover:bg-primary-dark filter-btn active" data-filter="all">All</button>
    <button class="px-6 py-2 rounded-full bg-gray-200 font-medium transition-all hover:bg-gray-300 filter-btn" data-filter="food">Food</button>
    <button class="px-6 py-2 rounded-full bg-gray-200 font-medium transition-all hover:bg-gray-300 filter-btn" data-filter="interior">Interior</button>
    <button class="px-6 py-2 rounded-full bg-gray-200 font-medium transition-all hover:bg-gray-300 filter-btn" data-filter="events">Events</button>
  </div>
  
  <!-- Gallery Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <!-- Item 1 -->
    <div class="gallery-item group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl" data-category="food">
      <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
           alt="Delicious food presentation" 
           class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110">
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
        <span class="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-white text-xl font-semibold">
          View
        </span>
      </div>
    </div>
    
    <!-- Item 2 -->
    <div class="gallery-item group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl" data-category="interior">
      <img src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
           alt="Restaurant interior design" 
           class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110">
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
        <span class="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-white text-xl font-semibold">
          View
        </span>
      </div>
    </div>
    
    <!-- Item 3 -->
    <div class="gallery-item group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl" data-category="events">
      <img src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
           alt="Special event at our restaurant" 
           class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110">
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
        <span class="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-white text-xl font-semibold">
          View
        </span>
      </div>
    </div>
    
    <!-- Item 4 -->
    <div class="gallery-item group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl" data-category="food">
      <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
           alt="Gourmet dish presentation" 
           class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110">
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
        <span class="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-white text-xl font-semibold">
          View
        </span>
      </div>
    </div>
    
    <!-- Item 5 -->
    <div class="gallery-item group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl" data-category="interior">
      <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
           alt="Elegant dining area" 
           class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110">
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
        <span class="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-white text-xl font-semibold">
          View
        </span>
      </div>
    </div>
    
    <!-- Item 6 -->
    <div class="gallery-item group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl" data-category="events">
      <img src="https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
           alt="Private dining experience" 
           class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110">
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
        <span class="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-white text-xl font-semibold">
          View
        </span>
      </div>
    </div>
  </div>
</div>

<!-- Lightbox Modal -->
<div id="lightbox" class="fixed inset-0 bg-black bg-opacity-90 z-50 hidden items-center justify-center p-4">
  <div class="relative max-w-4xl w-full">
    <button id="close-lightbox" class="absolute -top-12 right-0 text-white hover:text-primary transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
    <img id="lightbox-img" src="" alt="" class="w-full max-h-[80vh] object-contain">
  </div>
</div>

<script>
  // Filter functionality
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active button
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active', 'bg-primary', 'text-white'));
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.add('bg-gray-200'));
      this.classList.add('active', 'bg-primary', 'text-white');
      this.classList.remove('bg-gray-200');
      
      // Filter items
      const filter = this.dataset.filter;
      document.querySelectorAll('.gallery-item').forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
  
  // Lightbox functionality
  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function() {
      const lightbox = document.getElementById('lightbox');
      const lightboxImg = document.getElementById('lightbox-img');
      
      lightboxImg.src = this.src;
      lightboxImg.alt = this.alt;
      lightbox.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });
  
  document.getElementById('close-lightbox').addEventListener('click', function() {
    document.getElementById('lightbox').classList.add('hidden');
    document.body.style.overflow = '';
  });
</script>

export default function Gallery() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Your gallery content here */}
      </div>
    </section>
  );
}