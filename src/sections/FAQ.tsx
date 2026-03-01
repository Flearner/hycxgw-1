import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: '胡杨出行是什么？',
    answer:
      '胡杨出行是一款城际出行服务SaaS平台，为客运企业提供用户端、司机端、运营端三端一体的数字化解决方案，支持城际拼车、包车、定制客运、顺风车、打车和货件托运六大业务模式。团队拥有十年城际客运从业经验，提供"AI技术+运营"双赋能服务。',
  },
  {
    question: '接入胡杨出行需要自己开发系统吗？',
    answer:
      '不需要。胡杨出行采用SaaS模式，开箱即用，企业注册后即可获得完整的用户端小程序/APP、司机端APP和运营管理后台，无需技术团队。我们的客户成功经理会协助您完成系统配置和上线。',
  },
  {
    question: '胡杨出行和其他出行系统有什么区别？',
    answer:
      '胡杨出行不只提供软件工具，更提供AI营销工具和城际运营知识库，实现"AI技术+运营"双赋能。团队十年行业经验，深刻理解运营痛点，每个功能都从真实场景打磨而来。我们还提供线下运营陪跑服务，确保客户成功。',
  },
  {
    question: '胡杨出行支持定制客运合规运营吗？',
    answer:
      '支持。平台定制客运模块符合交通运输部相关规定，提供电子售检票、班线管理、途径点设置等功能，帮助企业实现合规的线上线下结合运营。',
  },
  {
    question: '有哪些套餐可以选择？',
    answer:
      '胡杨出行提供起步版（19,800元/年）、成长版（39,800元/年）、旗舰版（79,800元/年）三种套餐，从个体运营者到大型客运公司均可按需选择。每种套餐都有不同的功能组合和服务支持。',
  },
  {
    question: '如何开始使用胡杨出行？',
    answer:
      '点击"免费试用"按钮，填写基本信息，我们的客户成功经理会在24小时内与您联系，协助您完成系统开通和初始配置。整个过程简单快捷，通常3-5个工作日即可上线运营。',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
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

      // Items animation - alternating left/right
      itemsRef.current.forEach((item, index) => {
        if (item) {
          const isLeft = index % 2 === 0;
          
          gsap.fromTo(
            item,
            { 
              x: isLeft ? -30 : 30, 
              opacity: 0 
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: item,
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

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Split FAQs into two columns
  const leftFaqs = faqs.filter((_, i) => i % 2 === 0);
  const rightFaqs = faqs.filter((_, i) => i % 2 === 1);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="section-padding bg-[#F5F5F5] animate-section"
    >
      <div className="container-custom">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] mb-4">
            常见问题
          </h2>
          <p className="text-lg sm:text-xl text-[#888888]">
            您可能想了解的问题
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {leftFaqs.map((faq, idx) => {
              const actualIndex = idx * 2;
              const isOpen = openIndex === actualIndex;

              return (
                <div
                  key={actualIndex}
                  ref={(el) => { itemsRef.current[actualIndex] = el; }}
                  className={`bg-white rounded-xl overflow-hidden transition-all duration-300 ${
                    isOpen ? 'shadow-lg ring-2 ring-[#F5A623]' : 'shadow-md hover:shadow-lg'
                  }`}
                >
                  <button
                    onClick={() => toggleItem(actualIndex)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-semibold text-[#1A1A1A] pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#F5A623] flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-400 ${
                      isOpen ? 'max-h-96' : 'max-h-0'
                    }`}
                    style={{
                      transitionTimingFunction: 'var(--ease-spring)',
                    }}
                  >
                    <div className="px-5 pb-5">
                      <div className="pt-2 border-t border-[#E5E5E5]">
                        <p className="text-[#666666] leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-4 md:mt-10">
            {rightFaqs.map((faq, idx) => {
              const actualIndex = idx * 2 + 1;
              const isOpen = openIndex === actualIndex;

              return (
                <div
                  key={actualIndex}
                  ref={(el) => { itemsRef.current[actualIndex] = el; }}
                  className={`bg-white rounded-xl overflow-hidden transition-all duration-300 ${
                    isOpen ? 'shadow-lg ring-2 ring-[#F5A623]' : 'shadow-md hover:shadow-lg'
                  }`}
                >
                  <button
                    onClick={() => toggleItem(actualIndex)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-semibold text-[#1A1A1A] pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#F5A623] flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-400 ${
                      isOpen ? 'max-h-96' : 'max-h-0'
                    }`}
                    style={{
                      transitionTimingFunction: 'var(--ease-spring)',
                    }}
                  >
                    <div className="px-5 pb-5">
                      <div className="pt-2 border-t border-[#E5E5E5]">
                        <p className="text-[#666666] leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
