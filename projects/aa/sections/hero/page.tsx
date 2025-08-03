'use client';

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Le Bistrot Gourmand - Restaurant gastronomique</title>
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
    <section class="relative bg-gradient-to-r from-amber-50 to-amber-100 overflow-hidden">
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-multiply"></div>
        
        <div class="container mx-auto px-6 py-24 md:py-32 lg:py-40 relative z-10">
            <div class="max-w-2xl mx-auto text-center animate-fade-in">
                <h1 class="text-4xl md:text-6xl font-bold text-amber-900 mb-6 animate-slide-up">
                    Savourez l'art culinaire français
                </h1>
                <p class="text-lg md:text-xl text-amber-800 mb-10 max-w-lg mx-auto animate-slide-up animate-delay-100">
                    Une expérience gastronomique unique où tradition et innovation se rencontrent
                </p>
                <div class="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up animate-delay-200">
                    <a href="#reservation" class="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-200">
                        Réserver une table
                    </a>
                    <a href="#menu" class="border-2 border-amber-600 text-amber-700 hover:bg-amber-50 font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                        Voir le menu
                    </a>
                </div>
            </div>
        </div>

        <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        
        <div class="absolute right-10 bottom-10 hidden lg:block animate-float">
            <div class="relative">
                <div class="w-64 h-64 bg-amber-500 rounded-full opacity-20 absolute -inset-4 animate-pulse"></div>
                <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1374&auto=format&fit=crop" alt="Plat gastronomique" class="w-56 h-56 object-cover rounded-full shadow-xl border-4 border-white relative">
            </div>
        </div>
    </section>

    <style>
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
        }
        .animate-fade-in {
            animation: fadeIn 1s ease-out;
        }
        .animate-slide-up {
            animation: slideUp 0.8s ease-out forwards;
        }
        .animate-delay-100 {
            animation-delay: 100ms;
        }
        .animate-delay-200 {
            animation-delay: 200ms;
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
    </style>
    <script>
        lucide.createIcons();
    </script>
</body>
</html>

export default function Hero() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Your hero content here */}
      </div>
    </section>
  );
}