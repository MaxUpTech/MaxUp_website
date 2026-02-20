import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ClientLogos from '@/components/ClientLogos';
import ServicesGrid from '@/components/ServicesGrid';
import PortfolioPreview from '@/components/PortfolioPreview';
import AboutTeaser from '@/components/AboutTeaser';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <ClientLogos />
      <ServicesGrid />
      <PortfolioPreview />
      <AboutTeaser />
      <CTABanner />
      <Footer />
    </>
  );
}
