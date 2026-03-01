import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import KeyPoints from './sections/KeyPoints';
import WhyChooseUs from './sections/WhyChooseUs';
import PlatformArchitecture from './sections/PlatformArchitecture';
import Pricing from './sections/Pricing';
import TargetCustomers from './sections/TargetCustomers';
import FAQ from './sections/FAQ';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import CustomerService from './sections/CustomerService';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize scroll animations
    const ctx = gsap.context(() => {
      // Animate sections on scroll
      gsap.utils.toArray<HTMLElement>('.animate-section').forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0.9, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <KeyPoints />
        <WhyChooseUs />
        <PlatformArchitecture />
        <Pricing />
        <TargetCustomers />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <CustomerService />
    </div>
  );
}

export default App;
