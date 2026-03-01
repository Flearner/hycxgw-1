import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Initial load animation sequence
      tl.fromTo(
        tagRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.2
      )
        .fromTo(
          title1Ref.current,
          { x: -30, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
          { x: 0, opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.7 },
          0.4
        )
        .fromTo(
          title2Ref.current,
          { x: -30, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
          { x: 0, opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.7 },
          0.55
        )
        .fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          0.7
        )
        .fromTo(
          descRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          0.85
        )
        .fromTo(
          ctaRef.current?.children || [],
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1 },
          1.0
        )
        .fromTo(
          imageRef.current,
          { x: 100, rotateY: 15, opacity: 0 },
          { x: 0, rotateY: 0, opacity: 1, duration: 1 },
          0.6
        );

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: -10,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -right-20 -bottom-40 w-[600px] h-[600px] rounded-full opacity-[0.08]"
          style={{
            background: 'radial-gradient(circle, #F5A623 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute right-1/4 top-1/4 w-4 h-4 rounded-full bg-[#F5A623] opacity-20"
          style={{ animation: 'float 8s ease-in-out infinite' }}
        />
        <div
          className="absolute left-1/3 bottom-1/3 w-3 h-3 rounded-full bg-[#F5A623] opacity-15"
          style={{ animation: 'float 10s ease-in-out infinite 1s' }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content */}
          <div className="max-w-xl">
            {/* Tag */}
            <div
              ref={tagRef}
              className="inline-flex items-center px-4 py-2 rounded-full bg-[#F5A623]/10 text-[#F5A623] text-sm font-medium mb-6"
            >
              城际出行数字化解决方案
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold leading-tight text-[#1A1A1A] mb-4">
              <span ref={title1Ref} className="block">
                让每一辆车
              </span>
              <span ref={title2Ref} className="block text-[#F5A623]">
                都变成流动的提款机
              </span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-xl sm:text-2xl font-medium text-[#666666] mb-4"
            >
              告别对讲机，用数字大脑重塑你的车队
            </p>

            {/* Description */}
            <p
              ref={descRef}
              className="text-base sm:text-lg text-[#888888] leading-relaxed mb-8"
            >
              胡杨出行是面向城际客运企业的SaaS服务平台，提供用户端、司机端、运营端三端一体的数字化解决方案。支持城际拼车、包车、定制客运、顺风车、即时打车、货件托运六大业务模式。
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <Button
                onClick={() => scrollToSection('#cta')}
                className="bg-[#F5A623] hover:bg-[#FFB84D] text-white font-medium px-8 py-6 text-base rounded-lg transition-all duration-300 hover:scale-105 animate-pulse-glow"
              >
                免费咨询
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

            </div>
          </div>

          {/* Hero Image */}
          <div
            ref={imageRef}
            className="relative lg:pl-8 gpu-accelerated"
            style={{ perspective: '1000px' }}
          >
            <div className="relative">
              <img
                src="/hero-illustration.jpg"
                alt="胡杨出行平台"
                className="w-full max-w-lg mx-auto lg:max-w-none rounded-2xl shadow-2xl"
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#F5A623]/10 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#F5A623]/10 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
