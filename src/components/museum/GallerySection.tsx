import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

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
          className="text-center mb-16"
        >
          <span className="text-rust font-medium uppercase tracking-widest text-sm mb-4 block">
            Imágenes
          </span>
          <h2 className="font-serif text-foreground mb-6">
            Galería Multimedia
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Del blanco y negro al color. Un viaje visual por 
            más de un siglo de historia.
          </p>
        </motion.div>

        {/* Main Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group"
        >
          {/* Main Image */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden">
            <motion.img
              key={currentIndex}
              src={galleryImages[currentIndex].src}
              alt={galleryImages[currentIndex].alt}
              className={`w-full h-full object-cover ${
                galleryImages[currentIndex].era === 'Archivo' ? 'grayscale' : ''
              }`}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            
            {/* Caption */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                  galleryImages[currentIndex].era === 'Archivo' 
                    ? 'bg-foreground/20 text-foreground' 
                    : 'bg-rust/20 text-rust'
                }`}>
                  {galleryImages[currentIndex].era}
                </span>
                <p className="text-foreground font-medium text-lg">
                  {galleryImages[currentIndex].caption}
                </p>
              </div>
              <button 
                className="p-3 rounded-full bg-background/50 backdrop-blur-sm text-foreground hover:bg-rust hover:text-foreground transition-colors"
                aria-label="Expandir imagen"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/50 backdrop-blur-sm text-foreground hover:bg-rust transition-all opacity-0 group-hover:opacity-100"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/50 backdrop-blur-sm text-foreground hover:bg-rust transition-all opacity-0 group-hover:opacity-100"
            aria-label="Imagen siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>

        {/* Thumbnails */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-3 mt-6 overflow-x-auto pb-2"
        >
          {galleryImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => goToSlide(index)}
              className={`relative flex-shrink-0 w-20 h-14 md:w-28 md:h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                index === currentIndex 
                  ? 'ring-2 ring-rust ring-offset-2 ring-offset-background scale-105' 
                  : 'opacity-50 hover:opacity-100'
              }`}
              aria-label={`Ver imagen ${index + 1}`}
            >
              <img
                src={image.src}
                alt=""
                className={`w-full h-full object-cover ${image.era === 'Archivo' ? 'grayscale' : ''}`}
              />
            </button>
          ))}
        </motion.div>

        {/* Dots indicator (mobile) */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'w-8 bg-rust' : 'bg-foreground/30'
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};