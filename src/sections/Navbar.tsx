import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: '首页', href: '#hero' },
  { label: '产品', href: '#platform' },
  { label: '解决方案', href: '#why-choose' },
  { label: '工具', href: '#pricing' },
  { label: '客户案例', href: '#customers' },
  { label: '关于我们', href: '#faq' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled
          ? 'glass shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
      style={{
        transitionTimingFunction: 'var(--ease-out-expo)',
      }}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            className="flex items-center"
          >
            <img
              src="/logo.jpg"
              alt="胡杨出行"
              className={`transition-all duration-300 ${
                isScrolled ? 'h-10' : 'h-12'
              }`}
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="relative text-base font-medium text-[#1A1A1A] hover:text-[#F5A623] transition-colors duration-250 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-[#F5A623] transition-all duration-250 group-hover:w-full group-hover:left-0" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              onClick={() => scrollToSection('#cta')}
              className="bg-[#F5A623] hover:bg-[#FFB84D] text-white font-medium px-6 py-2.5 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                boxShadow: '0 4px 15px rgba(245, 166, 35, 0.3)',
              }}
            >
              立即咨询
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-[#1A1A1A]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
          }`}
          style={{
            transitionTimingFunction: 'var(--ease-out-expo)',
          }}
        >
          <div className="bg-white rounded-xl shadow-lg p-4 space-y-2">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="block py-3 px-4 text-[#1A1A1A] hover:text-[#F5A623] hover:bg-[#F5F5F5] rounded-lg transition-colors duration-200"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {link.label}
              </a>
            ))}
            <Button
              onClick={() => scrollToSection('#cta')}
              className="w-full bg-[#F5A623] hover:bg-[#FFB84D] text-white font-medium py-3 rounded-lg mt-4"
            >
              立即咨询
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
