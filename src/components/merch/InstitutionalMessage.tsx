import { motion } from 'framer-motion';
import { Heart, Building, Sparkles } from 'lucide-react';

export const InstitutionalMessage = () => {
  const points = [
    {
      icon: Building,
      title: 'Preservación',
      text: 'Cada compra contribuye al mantenimiento y restauración del edificio histórico, patrimonio cultural de la provincia.',
    },
    {
      icon: Heart,
      title: 'Comunidad',
      text: 'Los fondos financian talleres educativos, visitas guiadas gratuitas y programas culturales abiertos a la comunidad.',
    },
    {
      icon: Sparkles,
      title: 'Memoria',
      text: 'Cada objeto lleva consigo una historia. Al adquirirlo, te convertís en parte activa de la preservación de nuestra memoria colectiva.',
    },
  ];

  return (
    <section className="section-padding border-t border-border">
      <div className="container-museum max-w-4xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-medium tracking-[0.3em] uppercase text-institucional mb-4 block"
        >
          Nuestra Misión
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-foreground mb-6"
        >
          Más que objetos, compromiso
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lead text-muted-foreground mb-16 max-w-2xl mx-auto"
        >
          El merchandising oficial del Museo La Unidad no es solo una tienda.
          Es una forma de participar activamente en la preservación del patrimonio
          y la memoria histórica de Corrientes.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {points.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-full bg-institucional/10 border border-institucional/20 flex items-center justify-center mx-auto mb-4">
                <point.icon className="w-5 h-5 text-institucional" />
              </div>
              <h4 className="text-foreground font-semibold mb-2">{point.title}</h4>
              <p className="text-sm text-muted-foreground">{point.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
