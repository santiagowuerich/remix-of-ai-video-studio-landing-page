import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Eye, Grid3X3, Sparkles, Coffee, Clock, Users } from 'lucide-react';

const experiences = [
  {
    id: 'panoptico',
    icon: Eye,
    title: 'El Panóptico',
    subtitle: 'Arquitectura de Control',
    description: 'Descubre el revolucionario sistema de vigilancia diseñado por Jeremy Bentham. Un solo punto para observar todo el edificio.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format&fit=crop',
    duration: '45 min',
    capacity: '20 personas',
    accent: 'rust',
  },
  {
    id: 'celdas',
    icon: Grid3X3,
    title: 'Celdas Históricas',
    subtitle: 'La Vida Intramuros',
    description: 'Recorre las celdas restauradas y experimenta las condiciones de vida de los reclusos a través de recreaciones históricas.',
    image: 'https://images.unsplash.com/photo-1509099863731-ef4bff19e808?q=80&w=600&auto=format&fit=crop',
    duration: '30 min',
    capacity: '15 personas',
    accent: 'cyan',
  },
  {
    id: 'inmersiva',
    icon: Sparkles,
    title: 'Sala Inmersiva',
    subtitle: 'Tecnología & Arte',
    description: 'Sumérgete en proyecciones de mapping 360° que dan vida a las historias de La Unidad. Una experiencia sensorial única.',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop',
    duration: '25 min',
    capacity: '30 personas',
    accent: 'yellow',
  },
  {
    id: 'gastronomico',
    icon: Coffee,
    title: 'Patio Gastronómico',
    subtitle: 'La Nueva Vida',
    description: 'El antiguo patio de recreo ahora alberga una propuesta gastronómica de autor. Historia y sabor en cada bocado.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop',
    duration: 'Sin límite',
    capacity: '60 personas',
    accent: 'rust',
  },
];

const ExperienceCard = ({ experience, index }: { experience: typeof experiences[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = experience.icon;

  const accentColors = {
    rust: 'from-rust/20 to-rust/5 hover:border-rust/50 group-hover:text-rust',
    cyan: 'from-neon-cyan/20 to-neon-cyan/5 hover:border-neon-cyan/50 group-hover:text-neon-cyan',
    yellow: 'from-neon-yellow/20 to-neon-yellow/5 hover:border-neon-yellow/50 group-hover:text-neon-yellow',
  };

  const iconColors = {
    rust: 'bg-rust/20 text-rust group-hover:bg-rust group-hover:text-foreground',
    cyan: 'bg-neon-cyan/20 text-neon-cyan group-hover:bg-neon-cyan group-hover:text-background',
    yellow: 'bg-neon-yellow/20 text-neon-yellow group-hover:bg-neon-yellow group-hover:text-background',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      <div className={`glass-card rounded-2xl overflow-hidden transition-all duration-500 h-full cursor-pointer`}>
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={experience.image}
            alt={experience.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          
          {/* Icon overlay */}
          <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${iconColors[experience.accent as keyof typeof iconColors]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {experience.subtitle}
          </span>
          <h3 className="text-xl font-serif font-semibold text-foreground mt-2 mb-3 group-hover:text-rust transition-colors">
            {experience.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            {experience.description}
          </p>

          {/* Meta info */}
          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span>{experience.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              <span>{experience.capacity}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ToursSection = () => {
  return (
    <section id="recorrido" className="section-padding bg-card relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              hsl(var(--foreground)) 10px,
              hsl(var(--foreground)) 11px
            )`,
          }}
        />
      </div>

      <div className="container-museum relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-rust font-medium uppercase tracking-widest text-sm mb-4 block">
            Experiencias
          </span>
          <h2 className="font-serif text-foreground mb-6">
            El Recorrido
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Cuatro experiencias únicas que te transportarán a través del tiempo.
            Elige tu aventura en La Unidad.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="bg-rust hover:bg-rust-light text-foreground font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-rust/30 hover:scale-105">
            Reservar Recorrido Completo
          </button>
        </motion.div>
      </div>
    </section>
  );
};