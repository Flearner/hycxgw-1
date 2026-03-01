import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bus, Route, Users, Share2, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const customers = [
  {
    icon: Bus,
    title: '城际客运公司',
    description: '传统班线客运企业数字化转型',
    color: '#F5A623',
  },
  {
    icon: Route,
    title: '定制客运运营商',
    description: '合规定制客运线上化运营',
    color: '#4CAF50',
  },
  {
    icon: Users,
    title: '车队管理公司',
    description: '中小车队的调度和订单管理',
    color: '#2196F3',
  },
  {
    icon: Share2,
    title: '城际拼车平台',
    description: '拼车业务的快速搭建和运营',
    color: '#9C27B0',
  },
  {
    icon: User,
    title: '个体运营者',
    description: '个人或小团队的城际出行业务起步',
    color: '#FF5722',
  },
];

export default function TargetCustomers() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
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

      // Cards animation - radial expand from center
      const centerIndex = Math.floor(customers.length / 2);
      
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const distanceFromCenter = Math.abs(index - centerIndex);
          
          gsap.fromTo(
            card,
            { 
              scale: 0, 
              rotate: -10,
              opacity: 0 
            },
            {
              scale: 1,
              rotate: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              delay: 0.2 + distanceFromCenter * 0.1,
            }
          );

          // Icon pop animation
          const icon = card.querySelector('.customer-icon');
          gsap.fromTo(
            icon,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.4,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
              delay: 0.5 + index * 0.15,
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="customers"
      ref={sectionRef}
      className="section-padding bg-white animate-section"
    >
      <div className="container-custom">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] mb-4">
            适用客户
          </h2>
          <p className="text-lg sm:text-xl text-[#888888]">
            无论您是哪种类型，胡杨出行都能满足您的需求
          </p>
        </div>

        {/* Customers Grid - Honeycomb Style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {customers.map((customer, index) => {
            const Icon = customer.icon;
            const isCenter = index === Math.floor(customers.length / 2);

            return (
              <div
                key={customer.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`group relative bg-white rounded-2xl p-6 shadow-lg border border-[#E5E5E5] hover:border-[#F5A623] transition-all duration-300 hover:scale-105 hover:shadow-xl gpu-accelerated cursor-pointer h-full flex flex-col ${
                  isCenter ? 'md:scale-110' : ''
                }`}
              >
                {/* Icon */}
                <div
                  className="customer-icon w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto transition-transform duration-300 group-hover:rotate-[10deg]"
                  style={{
                    backgroundColor: `${customer.color}15`,
                  }}
                >
                  <Icon
                    className="w-8 h-8"
                    style={{ color: customer.color }}
                  />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-[#1A1A1A] text-center mb-2">
                  {customer.title}
                </h3>
                <p className="text-sm text-[#888888] text-center leading-relaxed">
                  {customer.description}
                </p>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${customer.color}10 0%, transparent 70%)`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
