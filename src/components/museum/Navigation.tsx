import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MapPin } from 'lucide-react';

const navLinks = [
  { name: 'Inicio', href: '#hero' },
  { name: 'Historia', href: '#historia' },
  { name: 'Recorrido', href: '#recorrido' },
  { name: 'Galería', href: '#galeria' },
  { name: 'Visítanos', href: '#info' },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass-navbar py-3' : 'glass-navbar-transparent py-6'
        }`}
      >
        <div className="container-museum flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-rust/20 border border-rust/30 flex items-center justify-center group-hover:bg-rust/30 transition-colors">
              <span className="font-serif text-rust font-bold text-lg">U</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-serif text-lg font-semibold text-foreground">La Unidad</span>
              <span className="block text-xs text-muted-foreground -mt-1">Museo de la Cárcel</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className="text-sm font-medium text-foreground/80 hover:text-rust transition-colors underline-animation"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#info"
              onClick={(e) => { e.preventDefault(); scrollToSection('#info'); }}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>Corrientes, ARG</span>
            </a>
            <button
              onClick={() => scrollToSection('#info')}
              className="bg-rust hover:bg-rust-light text-foreground font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-rust/30"
            >
              Entradas
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-rust transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div 
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="relative pt-24 px-6">
              <div className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="text-2xl font-serif font-semibold text-foreground hover:text-rust transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => scrollToSection('#info')}
                  className="mt-6 bg-rust hover:bg-rust-light text-foreground font-semibold px-8 py-4 rounded-lg transition-all duration-300 w-full"
                >
                  Comprar Entradas
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};