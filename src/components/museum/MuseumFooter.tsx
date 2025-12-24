import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const footerLinks = {
  museo: [
    { name: 'Historia', href: '#historia' },
    { name: 'Recorrido', href: '#recorrido' },
    { name: 'Galería', href: '#galeria' },
    { name: 'Eventos', href: '#' },
  ],
  visita: [
    { name: 'Horarios', href: '#info' },
    { name: 'Entradas', href: '#info' },
    { name: 'Cómo llegar', href: '#info' },
    { name: 'Accesibilidad', href: '#' },
  ],
  legal: [
    { name: 'Privacidad', href: '#' },
    { name: 'Términos', href: '#' },
    { name: 'Contacto', href: '#info' },
  ],
};

export const MuseumFooter = () => {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="container-museum py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-rust/20 border border-rust/30 flex items-center justify-center">
                <span className="font-serif text-rust font-bold text-xl">U</span>
              </div>
              <div>
                <span className="font-serif text-xl font-semibold text-foreground block">La Unidad</span>
                <span className="text-xs text-muted-foreground">Museo de la Cárcel</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Donde el pasado y el futuro convergen. Un espacio de memoria, 
              cultura y tecnología en el corazón de Corrientes.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-rust" />
              <span>Av. 3 de Abril 57, Corrientes</span>
            </div>
          </div>

          {/* Links - Museo */}
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">Museo</h4>
            <ul className="space-y-3">
              {footerLinks.museo.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="text-muted-foreground hover:text-rust transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Visita */}
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">Tu Visita</h4>
            <ul className="space-y-3">
              {footerLinks.visita.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="text-muted-foreground hover:text-rust transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Institutional */}
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">Institucional</h4>
            <ul className="space-y-3 mb-6">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="text-muted-foreground hover:text-rust transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Government logo placeholder */}
            <div className="pt-4 border-t border-border">
              <span className="text-xs text-muted-foreground block mb-2">Con el apoyo de</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                  <span className="text-xs font-bold text-muted-foreground">CTS</span>
                </div>
                <span className="text-xs text-muted-foreground">Gobierno de Corrientes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Museo La Unidad. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            Construido con pasión para preservar nuestra historia
          </p>
        </motion.div>
      </div>
    </footer>
  );
};