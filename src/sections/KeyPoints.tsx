import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cloud, Grid3X3, Monitor, Brain, MapPin, Settings } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const keyPoints = [
  {
    icon: Cloud,
    title: 'SaaS模式',
    description: '无需自建系统，开箱即用，按需订阅',
  },
  {
    icon: Grid3X3,
    title: '六大业务模块',
    description: '城际拼车、包车、定制客运、顺风车、即时打车、货件托运',
  },
  {
    icon: Monitor,
    title: '三端一体',
    description: '用户端获客、司机端执行、运营端管控，全链路数字化',
  },
  {
    icon: Brain,
    title: 'AI技术+运营双赋能',
    description: '不只给工具，更给方法',
  },
  {
    icon: MapPin,
    title: '全国适配',
    description: '适配全国各地城际客运企业，多种套餐满足不同规模需求',
  },
  {
    icon: Settings,
    title: '可定制化',
    description: '系统功能和界面可根据企业特定需求进行灵活调整和扩展',
  },
];

export default function KeyPoints() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Cards animation with 3D flip
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { rotateY: -90, opacity: 0 },
            {
              rotateY: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              delay: index * 0.12,
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-white animate-section"
    >
      <div className="container-custom">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl font-bold text-center text-[#1A1A1A] mb-12"
        >
          不止提供软件
        </h2>

        {/* Key Points Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {keyPoints.map((point, index) => (
            <div
              key={point.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative bg-white rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-[#F5A623] transition-all duration-300 hover-lift gpu-accelerated h-full flex flex-col"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-[#F5A623]/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-[5deg] transition-transform duration-300">
                <point.icon className="w-7 h-7 text-[#F5A623]" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">
                {point.title}
              </h3>
              <p className="text-[#888888] leading-relaxed">
                {point.description}
              </p>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-[#F5A623]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
