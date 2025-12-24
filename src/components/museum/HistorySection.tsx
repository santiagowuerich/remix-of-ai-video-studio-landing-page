import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const timelineEvents = [
  {
    year: '1888',
    title: 'Construcción del Panóptico',
    description: 'El arquitecto italiano Juan Col diseña y construye la cárcel siguiendo el modelo panóptico de vigilancia, un innovador sistema carcelario de la época.',
    image: 'https://images.unsplash.com/photo-1541976844346-f18aeac57b06?q=80&w=600&auto=format&fit=crop',
  },
  {
    year: '1920',
    title: 'La Era de los Legendarios',
    description: 'Las paredes de La Unidad fueron testigo del paso de figuras legendarias como Mate Cosido y el Gaucho Lega, bandoleros que marcaron la historia del litoral argentino.',
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12a74?q=80&w=600&auto=format&fit=crop',
  },
  {
    year: '1975',
    title: 'Ampliación y Modernización',
    description: 'Se realizan importantes reformas estructurales, agregando nuevos pabellones y modernizando las instalaciones sin perder la esencia arquitectónica original.',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop',
  },
  {
    year: '2018',
    title: 'Cierre del Penal',
    description: 'Después de 130 años de funcionamiento, el penal cierra definitivamente sus puertas, iniciando una nueva etapa en la historia del edificio.',
    image: 'https://images.unsplash.com/photo-1509099863731-ef4bff19e808?q=80&w=600&auto=format&fit=crop',
  },
  {
    year: '2024',
    title: 'Renacimiento Cultural',
    description: 'La Unidad renace como museo y centro cultural inmersivo, preservando la memoria histórica mientras abraza la tecnología del siglo XXI.',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=600&auto=format&fit=crop',
  },
];

const TimelineItem = ({ event, index }: { event: typeof timelineEvents[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Content */}
      <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-block text-5xl md:text-7xl font-serif font-bold text-rust/40 mb-4"
        >
          {event.year}
        </motion.span>
        <h3 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-4">
          {event.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed max-w-md mx-auto md:mx-0">
          {event.description}
        </p>
      </div>

      {/* Center line dot */}
      <div className="hidden md:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-6 h-6 rounded-full bg-rust border-4 border-background shadow-lg shadow-rust/30 z-10"
        />
      </div>

      {/* Image */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="relative group overflow-hidden rounded-xl">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute inset-0 border border-rust/20 rounded-xl group-hover:border-rust/40 transition-colors" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export const HistorySection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="historia" className="section-padding bg-background relative overflow-hidden" ref={containerRef}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 -left-40 w-80 h-80 rounded-full bg-rust blur-[100px]" />
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 rounded-full bg-rust blur-[100px]" />
      </div>

      <div className="container-museum relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-rust font-medium uppercase tracking-widest text-sm mb-4 block">
            Cronología
          </span>
          <h2 className="font-serif text-foreground mb-6">
            Historia Viva
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Más de un siglo de historias entre estos muros. 
            Desde su construcción en 1888 hasta su transformación en centro cultural.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2">
            <motion.div
              className="absolute top-0 left-0 right-0 bg-rust timeline-line"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-20 md:space-y-32">
            {timelineEvents.map((event, index) => (
              <TimelineItem key={event.year} event={event} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};