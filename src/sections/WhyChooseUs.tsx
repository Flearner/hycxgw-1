import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    title: '十年行业深耕',
    description:
      '团队成员拥有十年城际客运从业经验，深刻了解传统客运企业的运营痛点——不知道如何获客、司机管理混乱、调度派单不合理、手工做账常遗漏、每日报表不清晰。胡杨出行的每一个功能，都是从真实运营场景中打磨出来的。',
    image: '/reason1-experience.jpg',
    stat: '10+',
    statLabel: '年行业经验',
    features: [],
    icon: null,
  },
  {
    title: 'AI技术+运营双赋能',
    description:
      '胡杨出行saas系统不只是一套软件工具，更提供AI驱动的运营赋能：AI营销工具智能生成推广内容，城际运营AI知识库沉淀行业最佳实践，现代化工具管理更有效，数据驱动决策辅助线路运营优化。',
    image: '/reason2-ai.jpg',
    stat: null,
    statLabel: null,
    features: ['AI营销工具', '城际运营知识库', '数据驱动决策'],
    icon: Sparkles,
  },
  {
    title: '多种套餐，灵活适配',
    description:
      '无论是刚起步的个体运营者，还是拥有百辆车的客运公司，胡杨出行提供多种套餐方案，按需选择，按需付费，让每一分投入都产生回报。',
    image: '/tcnr.png',
    stat: null,
    statLabel: null,
    features: [],
    icon: null,
    tags: ['起步版', '成长版', '旗舰版'],
  },
  {
    title: '合规运营保障',
    description:
      '定制客运模块符合交通运输部《客规》要求，支持电子售检票、班线管理、途径点设置，帮助传统客运企业合规转型。',
    image: '/reason4-compliance.jpg',
    stat: null,
    statLabel: null,
    features: [],
    icon: Shield,
    badge: '符合交通运输部《客规》',
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Items animation
      itemsRef.current.forEach((item, index) => {
        if (item) {
          const isEven = index % 2 === 1;
          const image = item.querySelector('.reason-image');
          const content = item.querySelector('.reason-content');

          // Image animation
          gsap.fromTo(
            image,
            { x: isEven ? 100 : -100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          );

          // Content animation
          gsap.fromTo(
            content,
            { x: isEven ? -50 : 50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 70%',
                toggleActions: 'play none none none',
              },
              delay: 0.2,
            }
          );

          // Features/tags animation
          const features = item.querySelectorAll('.feature-item, .tag-item');
          gsap.fromTo(
            features,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.15,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 60%',
                toggleActions: 'play none none none',
              },
              delay: 0.4,
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why-choose"
      ref={sectionRef}
      className="section-padding bg-[#F5F5F5] animate-section"
    >
      <div className="container-custom">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-center text-[#1A1A1A] mb-16"
        >
          为什么选择胡杨出行
        </h2>

        {/* Reasons List */}
        <div className="space-y-20 lg:space-y-32">
          {reasons.map((reason, index) => {
            const isEven = index % 2 === 1;
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                ref={(el) => { itemsRef.current[index] = el; }}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  isEven ? '' : ''
                }`}
              >
                {/* Image */}
                <div
                  className={`reason-image relative ${
                    isEven ? 'lg:order-2' : ''
                  }`}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={reason.image}
                      alt={reason.title}
                      className="w-full h-auto object-cover"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl bg-[#F5A623]/10" />
                </div>

                {/* Content */}
                <div
                  className={`reason-content ${isEven ? 'lg:order-1' : ''}`}
                >
                  {/* Badge */}
                  {reason.badge && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5A623]/10 text-[#F5A623] text-sm font-medium mb-4">
                      <Shield className="w-4 h-4" />
                      {reason.badge}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-4">
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base sm:text-lg text-[#666666] leading-relaxed mb-6">
                    {reason.description}
                  </p>

                  {/* Stat */}
                  {reason.stat && (
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-4xl sm:text-5xl font-bold text-[#F5A623]">
                        {reason.stat}
                      </span>
                      <span className="text-[#888888]">{reason.statLabel}</span>
                    </div>
                  )}

                  {/* Features */}
                  {reason.features.length > 0 && (
                    <div className="space-y-3 mb-6">
                      {reason.features.map((feature) => (
                        <div
                          key={feature}
                          className="feature-item flex items-center gap-3"
                        >
                          <div className="w-6 h-6 rounded-full bg-[#F5A623]/10 flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-[#F5A623]" />
                          </div>
                          <span className="text-[#1A1A1A] font-medium">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  {reason.tags && (
                    <div className="flex flex-wrap gap-3">
                      {reason.tags.map((tag) => (
                        <span
                          key={tag}
                          className="tag-item px-4 py-2 rounded-lg bg-white border border-[#E5E5E5] text-[#1A1A1A] font-medium text-sm hover:border-[#F5A623] hover:text-[#F5A623] transition-colors duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Icon decoration */}
                  {Icon && (
                    <div className="mt-6 inline-flex items-center gap-2 text-[#F5A623]">
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        智能化解决方案
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
