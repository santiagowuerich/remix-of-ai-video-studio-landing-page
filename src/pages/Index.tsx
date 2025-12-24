import { Navigation } from '@/components/museum/Navigation';
import { HeroSection } from '@/components/museum/HeroSection';
import { HistorySection } from '@/components/museum/HistorySection';
import { ToursSection } from '@/components/museum/ToursSection';
import { GallerySection } from '@/components/museum/GallerySection';
import { InfoSection } from '@/components/museum/InfoSection';
import { MuseumFooter } from '@/components/museum/MuseumFooter';

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main role="main">
        <HeroSection />
        <HistorySection />
        <ToursSection />
        <GallerySection />
        <InfoSection />
      </main>
      
      <MuseumFooter />
    </div>
  );
}
