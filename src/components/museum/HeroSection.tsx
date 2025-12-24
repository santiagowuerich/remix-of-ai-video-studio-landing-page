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
      {/* Background Image - Prison Architecture */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />
        
        {/* Aggressive dark gradient - solid black at bottom 60%, fading up */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.1) 100%)',
          }}
        />
        
        {/* Subtle vignette for depth */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
          }}
        />
        
        {/* Subtle warm accent at bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-rust/10 blur-[120px] rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-museum text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-5xl mx-auto"
        >
          {/* Subtle Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <span className="text-sm font-medium tracking-widest uppercase text-rust/80">
              Desde 1888 • Corrientes, Argentina
            </span>
          </motion.div>

          {/* Main Title - Pure White */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-serif mb-6"
            style={{ color: '#FFFFFF', textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}
          >
            La Unidad:
            <br />
            <span className="text-rust">Donde el Pasado y el Futuro</span>
            <br />
            Convergen
          </motion.h1>

          {/* Subtitle - Pure White */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.9)', textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
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

    </section>
  );
};