import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export const MerchHero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center section-padding pt-32">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--muted)/0.3),transparent_60%)]" />
      
      <div className="container-museum relative z-10 text-center max-w-3xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block text-sm font-medium tracking-[0.3em] uppercase text-institucional mb-6"
        >
          Tienda Oficial
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-foreground mb-6"
        >
          Merchandising Oficial
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lead text-muted-foreground mb-4"
        >
          Objetos que acompañan la memoria y la experiencia
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-muted-foreground max-w-lg mx-auto mb-10"
        >
          Cada producto oficial del museo contribuye directamente a la preservación
          del patrimonio histórico y a las actividades culturales de La Unidad.
          Al adquirirlos, apoyás nuestra misión.
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })}
          className="btn-primary inline-flex items-center gap-2"
        >
          Ver productos
          <ArrowDown className="w-4 h-4" />
        </motion.button>
      </div>
    </section>
  );
};
