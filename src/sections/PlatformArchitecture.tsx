import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Car, Settings, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tabs = [
  {
    id: 'user',
    label: '用户端',
    icon: Users,
    title: '用户端 - 乘客小程序/APP',
    description: '为客运企业提供面向乘客的在线预约和下单系统',
    image: '/platform-user.jpg',
    features: [
      { title: '城际拼车', desc: '智能匹配同方向乘客，多人共享座位，降低乘客出行成本' },
      { title: '城际包车', desc: '独享整车服务，支持家庭出行、商务用车等场景' },
      { title: '定制客运', desc: '班线化运营，在线购票、选择班次和途径站点、微信扫码检票' },
      { title: '顺风车', desc: '车主发布行程，乘客匹配顺路订单，分摊出行费用' },
      { title: '即时打车', desc: '一键叫车，实时查看司机位置，在线支付' },
      { title: '货件托运', desc: '城际小件物流，司机顺路带货，在线下单实时追踪' },
    ],
  },
  {
    id: 'driver',
    label: '司机端',
    icon: Car,
    title: '司机端 - 司机APP',
    description: '为司机提供高效的接单和运营工具',
    image: '/platform-driver.jpg',
    features: [
      { title: '多业务接单', desc: '城际用车、定制客运、顺风车、即时打车统一管理' },
      { title: '智能调度', desc: '系统派单+抢单大厅双模式，按城市、区县、时间筛选订单' },
      { title: '行程管理', desc: '导航接客、尾号验证码核验身份、途径点管理、行程追踪' },
      { title: '定制客运工具', desc: '班次查看、在线售票、扫码检票、补票、上车人核验' },
      { title: '司机钱包', desc: '收入明细、微信/支付宝提现' },
      { title: '四重认证', desc: '实名认证、驾驶证认证、车辆认证、网约车资质认证' },
    ],
  },
  {
    id: 'admin',
    label: '运营端',
    icon: Settings,
    title: '运营端 - 管理后台',
    description: '为客运企业管理者提供全面的运营管控能力',
    image: '/platform-admin.jpg',
    features: [
      { title: '营运计划', desc: '班次排班调度、改派、加班管理、批量停班/复班、留座管理' },
      { title: '售票管理', desc: '售票明细查看、历史数据分析' },
      { title: '租车管理', desc: '订单全流程管理、车牌号分配' },
      { title: '订单监控', desc: '全业务类型订单实时追踪' },
      { title: '系统管理', desc: '用户协议、隐私协议、常见问题、系统消息、客服' },
    ],
  },
];

export default function PlatformArchitecture() {
  const [activeTab, setActiveTab] = useState('user');
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const activeTabData = tabs.find((tab) => tab.id === activeTab) || tabs[0];

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

      // Tabs animation
      gsap.fromTo(
        tabsRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: tabsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          delay: 0.2,
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { rotateY: 30, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          delay: 0.4,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Tab change animation
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0.8, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'expo.out' }
      );
    }
  }, [activeTab]);

  return (
    <section
      id="platform"
      ref={sectionRef}
      className="section-padding bg-white animate-section"
    >
      <div className="container-custom">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] mb-4">
            平台架构
          </h2>
          <p className="text-lg sm:text-xl text-[#888888]">
            三端一体，全链路数字化
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          ref={tabsRef}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-[#F5F5F5] rounded-xl p-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-[#F5A623] text-white shadow-lg'
                      : 'text-[#666666] hover:text-[#1A1A1A] hover:bg-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div
          ref={contentRef}
          className="gpu-accelerated"
          style={{ perspective: '1000px' }}
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-3">
                {activeTabData.title}
              </h3>
              <p className="text-base sm:text-lg text-[#888888] mb-8">
                {activeTabData.description}
              </p>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {activeTabData.features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="group p-4 rounded-xl bg-[#F5F5F5] hover:bg-white hover:shadow-lg border border-transparent hover:border-[#F5A623]/30 transition-all duration-300"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#F5A623]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-[#F5A623]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1A1A1A] mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-[#888888] leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={activeTabData.image}
                  alt={activeTabData.title}
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -z-10 -top-4 -left-4 w-full h-full rounded-2xl bg-[#F5A623]/10" />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#F5A623]/10 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
