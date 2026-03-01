import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle, Clock, UserCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const trustIndicators = [
  { icon: Clock, text: '24小时内响应' },
  { icon: UserCheck, text: '专属客户成功经理' },
  { icon: MessageCircle, text: '免费系统演示' },
];

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleWordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background animation
      gsap.fromTo(
        bgRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Title words animation
      titleWordsRef.current.forEach((word, index) => {
        if (word) {
          gsap.fromTo(
            word,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: contentRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
              delay: 0.4 + index * 0.08,
            }
          );
        }
      });

      // Content animation
      const contentElements = contentRef.current?.querySelectorAll('.cta-content');
      if (contentElements) {
        gsap.fromTo(
          contentElements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
            delay: 0.7,
          }
        );
      }

      // Trust indicators animation
      const indicators = contentRef.current?.querySelectorAll('.trust-indicator');
      if (indicators) {
        gsap.fromTo(
          indicators,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
            delay: 1.1,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleWords = '立即开启您的数字化转型之路'.split('');

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-[#F5A623]"
      >
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%)',
          }}
        />

        {/* Floating shapes */}
        <div
          className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/10"
          style={{ animation: 'float 20s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white/5"
          style={{ animation: 'float 25s ease-in-out infinite 2s' }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-white/10"
          style={{ animation: 'float 18s ease-in-out infinite 1s' }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="container-custom relative z-10 text-center"
      >
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white mb-6">
          {titleWords.map((char, index) => (
            <span
              key={index}
              ref={(el) => { titleWordsRef.current[index] = el; }}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>

        {/* Description */}
        <p className="cta-content text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-10">
          加入数百家已成功转型的客运企业，让胡杨出行成为您的数字化合作伙伴
        </p>

        {/* CTA Buttons */}
        <div className="cta-content flex flex-wrap justify-center gap-4 mb-12">
          <Button
            className="bg-white text-[#F5A623] hover:bg-white/90 font-medium px-8 py-6 text-base rounded-lg transition-all duration-300 hover:scale-105 animate-pulse-glow"
            onClick={() => {
              alert('感谢您的关注！我们的客户成功经理将尽快与您联系。');
            }}
          >
            联系我们
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
          {trustIndicators.map((indicator) => {
            const Icon = indicator.icon;
            return (
              <div
                key={indicator.text}
                className="trust-indicator flex items-center gap-2 text-white/80"
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{indicator.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
