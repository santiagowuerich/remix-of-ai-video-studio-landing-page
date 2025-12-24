import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, Instagram, Facebook, ExternalLink, Calendar } from 'lucide-react';

const scheduleData = [
  { day: 'Martes a Viernes', hours: '10:00 - 20:00' },
  { day: 'Sábados', hours: '09:00 - 22:00' },
  { day: 'Domingos y Feriados', hours: '09:00 - 18:00' },
  { day: 'Lunes', hours: 'Cerrado' },
];

const ticketPrices = [
  { type: 'General', price: '$2.500', note: '' },
  { type: 'Estudiantes', price: '$1.500', note: 'Con credencial' },
  { type: 'Jubilados', price: '$1.000', note: '' },
  { type: 'Menores de 12', price: 'Gratis', note: 'Acompañados' },
];

export const InfoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="info" className="section-padding bg-card relative overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-rust/5 blur-[200px] rounded-full" />
      
      <div className="container-museum relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-rust font-medium uppercase tracking-widest text-sm mb-4 block">
            Planifica tu visita
          </span>
          <h2 className="font-serif text-foreground mb-6">
            Información Práctica
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Todo lo que necesitas saber para vivir la experiencia La Unidad.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Map & Location */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Map placeholder */}
            <div className="relative rounded-2xl overflow-hidden mb-8 group">
              <div className="aspect-[4/3] bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.3!2d-58.833!3d-27.466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDI3JzU3LjYiUyA1OMKwNDknNTguOCJX!5e0!3m2!1ses!2sar!4v1"
                  className="w-full h-full grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación del Museo La Unidad"
                />
              </div>
              <div className="absolute inset-0 border border-rust/20 rounded-2xl pointer-events-none" />
              
              {/* Location overlay */}
              <div className="absolute bottom-4 left-4 right-4 glass-card rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-rust/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-rust" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Av. 3 de Abril 57</h4>
                    <p className="text-sm text-muted-foreground">Corrientes Capital, Argentina</p>
                    <a 
                      href="https://goo.gl/maps/example" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-rust hover:underline mt-1"
                    >
                      Cómo llegar <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <a 
                href="tel:+543794000000"
                className="glass-card rounded-xl p-4 flex items-center gap-4 hover:border-rust/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-rust/10 flex items-center justify-center group-hover:bg-rust/20 transition-colors">
                  <Phone className="w-5 h-5 text-rust" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Teléfono</span>
                  <span className="text-foreground font-medium">+54 379 400-0000</span>
                </div>
              </a>

              <a 
                href="mailto:info@museolaunidad.com.ar"
                className="glass-card rounded-xl p-4 flex items-center gap-4 hover:border-rust/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-rust/10 flex items-center justify-center group-hover:bg-rust/20 transition-colors">
                  <Mail className="w-5 h-5 text-rust" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Email</span>
                  <span className="text-foreground font-medium text-sm">info@museolaunidad.com.ar</span>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Column - Schedule & Tickets */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Schedule */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-rust/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-rust" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground">Horarios</h3>
              </div>
              
              <div className="space-y-3">
                {scheduleData.map((item, index) => (
                  <div 
                    key={index}
                    className={`flex justify-between items-center py-3 border-b border-border last:border-0 ${
                      item.hours === 'Cerrado' ? 'opacity-50' : ''
                    }`}
                  >
                    <span className="text-muted-foreground">{item.day}</span>
                    <span className={`font-medium ${item.hours === 'Cerrado' ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tickets */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-rust/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-rust" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground">Entradas</h3>
              </div>
              
              <div className="space-y-3 mb-6">
                {ticketPrices.map((item, index) => (
                  <div 
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <span className="text-foreground">{item.type}</span>
                      {item.note && (
                        <span className="text-xs text-muted-foreground block">{item.note}</span>
                      )}
                    </div>
                    <span className={`font-semibold ${item.price === 'Gratis' ? 'text-neon-cyan' : 'text-rust'}`}>
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-rust hover:bg-rust-light text-foreground font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-rust/30">
                Comprar Entradas Online
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-background hover:bg-rust/20 text-muted-foreground hover:text-rust transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-background hover:bg-rust/20 text-muted-foreground hover:text-rust transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};