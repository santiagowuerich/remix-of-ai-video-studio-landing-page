import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1584752242818-b4bd7fb3fe10?q=80&w=1200&auto=format&fit=crop',
    alt: 'Vista exterior del Panóptico histórico',
    era: 'Actual',
    caption: 'La fachada restaurada del edificio',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1509099863731-ef4bff19e808?q=80&w=1200&auto=format&fit=crop',
    alt: 'Celdas históricas en blanco y negro',
    era: 'Archivo',
    caption: 'Las celdas originales, circa 1920',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1200&auto=format&fit=crop',
    alt: 'Instalación de arte contemporáneo',
    era: 'Actual',
    caption: 'Sala inmersiva con proyecciones',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1541976844346-f18aeac57b06?q=80&w=1200&auto=format&fit=crop',
    alt: 'Patio central del edificio',
    era: 'Archivo',
    caption: 'El patio de recreo, 1935',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop',
    alt: 'Experiencia de luz y sonido',
    era: 'Actual',
    caption: 'Show de mapping nocturno',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    alt: 'Patio gastronómico renovado',
    era: 'Actual',
    caption: 'El nuevo espacio gastronómico',
  },
];

export const GallerySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <section id="galeria" className="section-padding bg-background relative overflow-hidden" ref={ref}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rust/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rust/50 to-transparent" />

      <div className="container-museum">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="text-rust font-medium uppercase tracking-widest text-sm mb-4 block">
            Imágenes
          </span>
          <h2 className="font-serif text-foreground mb-4 md:mb-6">
            Galería Multimedia
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg px-4">
            Del blanco y negro al color. Un viaje visual por 
            más de un siglo de historia.
          </p>
        </motion.div>

        {/* Main Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Image */}
          <div 
            className="relative aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] rounded-xl md:rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => setIsLightboxOpen(true)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={galleryImages[currentIndex].src}
                alt={galleryImages[currentIndex].alt}
                className={`w-full h-full object-cover ${
                  galleryImages[currentIndex].era === 'Archivo' ? 'grayscale' : ''
                }`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            
            {/* Caption */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                galleryImages[currentIndex].era === 'Archivo' 
                  ? 'bg-foreground/20 text-foreground' 
                  : 'bg-rust/20 text-rust'
              }`}>
                {galleryImages[currentIndex].era}
              </span>
              <p className="text-foreground font-medium text-sm md:text-lg">
                {galleryImages[currentIndex].caption}
              </p>
            </div>

            {/* Counter */}
            <div className="absolute top-4 right-4 bg-background/50 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-foreground text-sm font-medium">
                {currentIndex + 1} / {galleryImages.length}
              </span>
            </div>
          </div>

          {/* Navigation Arrows - Hidden on mobile, shown on desktop */}
          <button
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/50 backdrop-blur-sm text-foreground hover:bg-rust transition-all items-center justify-center"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/50 backdrop-blur-sm text-foreground hover:bg-rust transition-all items-center justify-center"
            aria-label="Imagen siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>

        {/* Thumbnails - Scrollable on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex gap-2 md:gap-3 mt-4 md:mt-6 overflow-x-auto pb-2 scrollbar-hide md:justify-center"
        >
          {galleryImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => goToSlide(index)}
              className={`relative flex-shrink-0 w-16 h-12 md:w-24 md:h-16 lg:w-28 lg:h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                index === currentIndex 
                  ? 'ring-2 ring-rust ring-offset-2 ring-offset-background scale-105' 
                  : 'opacity-50 hover:opacity-100'
              }`}
              aria-label={`Ver imagen ${index + 1}`}
            >
              <img
                src={image.src}
                alt=""
                loading="lazy"
                className={`w-full h-full object-cover ${image.era === 'Archivo' ? 'grayscale' : ''}`}
              />
            </button>
          ))}
        </motion.div>

        {/* Mobile swipe indicator */}
        <p className="text-center text-muted-foreground text-sm mt-4 md:hidden">
          Desliza para ver más →
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 p-3 rounded-full bg-card text-foreground hover:bg-rust transition-colors z-10"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-card text-foreground hover:bg-rust transition-colors"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.img
              key={currentIndex}
              src={galleryImages[currentIndex].src}
              alt={galleryImages[currentIndex].alt}
              className={`max-w-full max-h-[80vh] object-contain rounded-lg ${
                galleryImages[currentIndex].era === 'Archivo' ? 'grayscale' : ''
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-card text-foreground hover:bg-rust transition-colors"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                galleryImages[currentIndex].era === 'Archivo' 
                  ? 'bg-foreground/20 text-foreground' 
                  : 'bg-rust/20 text-rust'
              }`}>
                {galleryImages[currentIndex].era}
              </span>
              <p className="text-foreground font-medium">
                {galleryImages[currentIndex].caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
