import { motion } from 'framer-motion';
import { ChevronDown, Play, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1584752242818-b4bd7fb3fe10?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
        
        {/* Subtle grain texture */}
        <div 
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Rust/Orange accent glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-rust/20 blur-[150px] rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-museum text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rust/10 border border-rust/30 text-rust mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-rust animate-pulse" />
            <span className="text-sm font-medium">Desde 1888 • Corrientes, Argentina</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-serif text-foreground text-shadow-strong mb-6"
          >
            La Unidad:
            <br />
            <span className="text-rust">Donde el Pasado y el Futuro</span>
            <br />
            Convergen
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed text-shadow-subtle"
          >
            Recorre los muros de un Panóptico histórico. 
            Vive una experiencia sensorial única en el corazón de Corrientes.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/checkout"
              className="group flex items-center gap-3 bg-rust hover:bg-rust-light text-foreground font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-rust/30 hover:scale-105"
            >
              <Ticket className="w-5 h-5" />
              <span>Comprar Entradas</span>
            </Link>
            
            <button
              onClick={() => scrollToSection('#recorrido')}
              className="group flex items-center gap-3 border-2 border-foreground/30 hover:border-neon-cyan text-foreground font-semibold px-8 py-4 rounded-lg backdrop-blur-sm bg-background/10 transition-all duration-300 hover:bg-neon-cyan/10 hover:text-neon-cyan"
            >
              <Play className="w-5 h-5" />
              <span>Ver Recorrido 360°</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <button
            onClick={() => scrollToSection('#historia')}
            className="flex flex-col items-center gap-2 text-foreground/60 hover:text-rust transition-colors group"
            aria-label="Scroll down"
          >
            <span className="text-sm font-medium">Descubre más</span>
            <ChevronDown className="w-6 h-6 animate-bounce group-hover:text-rust" />
          </button>
        </motion.div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-20 left-8 w-20 h-20 border-l-2 border-t-2 border-rust/30" />
      <div className="absolute top-20 right-8 w-20 h-20 border-r-2 border-t-2 border-rust/30" />
      <div className="absolute bottom-20 left-8 w-20 h-20 border-l-2 border-b-2 border-rust/30" />
      <div className="absolute bottom-20 right-8 w-20 h-20 border-r-2 border-b-2 border-rust/30" />
    </section>
  );
};