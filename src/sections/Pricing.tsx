import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, FileText, Download, Eye, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const tools = [
  {
    id: 'cost-calculator',
    icon: Calculator,
    title: '线路成本测算表',
    subtitle: '精准计算运营成本',
    description: '输入车辆数、油费、人工成本等参数，自动测算线路运营的盈亏平衡点，帮助您科学决策。',
    features: [
      '车辆固定成本测算',
      '变动成本分析',
      '盈亏平衡点计算',
      '多线路对比分析',
    ],
    color: '#F5A623',
    action: '立即领取',
  },
  {
    id: 'operation-sheet',
    icon: FileText,
    title: '线路运营表',
    subtitle: '标准化运营流程',
    description: '包含班次排班、司机管理、收入统计等核心运营指标的标准化表格，让运营更高效。',
    features: [
      '班次排班模板',
      '司机考勤管理',
      '日/周/月收入统计',
      '运营数据分析',
    ],
    color: '#4CAF50',
    action: '立即领取',
  },
  {
    id: 'growth-plan',
    icon: TrendingUp,
    title: '线路增长基础方案',
    subtitle: '业务增长指南',
    description: '基于十年行业经验总结的增长方法论，帮助您快速拓展线路业务，提升盈利能力。',
    features: [
      '新线路开拓策略',
      '客户获取方法',
      '定价策略建议',
      '竞争对手分析模板',
    ],
    color: '#2196F3',
    action: '立即领取',
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedTool, setSelectedTool] = useState<typeof tools[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              y: 50,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              delay: index * 0.15,
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleToolClick = (tool: typeof tools[0]) => {
    setSelectedTool(tool);
    setDialogOpen(true);
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="section-padding bg-[#F5F5F5] animate-section"
    >
      <div className="container-custom">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] mb-4">
            免费运营工具包
          </h2>
          <p className="text-lg sm:text-xl text-[#888888]">
            专业工具助力您的城际出行业务
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 gpu-accelerated h-full flex flex-col"
              >
                {/* Header with Icon */}
                <div
                  className="p-6 lg:p-8"
                  style={{ backgroundColor: `${tool.color}10` }}
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${tool.color}20` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: tool.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-1">
                    {tool.title}
                  </h3>
                  <p className="text-sm" style={{ color: tool.color }}>
                    {tool.subtitle}
                  </p>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8 flex-1 flex flex-col">
                  <p className="text-[#666666] text-sm leading-relaxed mb-6">
                    {tool.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8 flex-1">
                    {tool.features.map((feature, fIndex) => (
                      <div
                        key={fIndex}
                        className="flex items-center gap-3 text-sm text-[#1A1A1A]"
                      >
                        <ChevronRight
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: tool.color }}
                        />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handleToolClick(tool)}
                    className="w-full py-5 text-base font-medium rounded-lg transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: tool.color,
                      color: 'white',
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {tool.action}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-[#888888] text-sm">
            填写基本信息即可免费领取，我们的客户成功经理会在24小时内发送给您
          </p>
        </div>
      </div>

      {/* Tool Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedTool && (
                <>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${selectedTool.color}20` }}
                  >
                    <selectedTool.icon
                      className="w-5 h-5"
                      style={{ color: selectedTool.color }}
                    />
                  </div>
                  <span>{selectedTool?.title}</span>
                </>
              )}
            </DialogTitle>
            <DialogDescription className="pt-4">
              {selectedTool?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-[#F5F5F5] rounded-lg p-4">
              <h4 className="font-semibold text-[#1A1A1A] mb-3">包含内容：</h4>
              <ul className="space-y-2">
                {selectedTool?.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm text-[#666666]"
                  >
                    <Eye className="w-4 h-4 text-[#F5A623]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="您的姓名"
                className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 outline-none transition-all"
              />
              <input
                type="tel"
                placeholder="联系电话"
                className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 outline-none transition-all"
              />
              <input
                type="text"
                placeholder="公司名称（选填）"
                className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 outline-none transition-all"
              />
            </div>

            <Button
              onClick={() => {
                alert('提交成功！我们的客户成功经理会在24小时内将资料发送给您。');
                setDialogOpen(false);
              }}
              className="w-full py-5 bg-[#F5A623] hover:bg-[#FFB84D] text-white font-medium"
            >
              <Download className="w-4 h-4 mr-2" />
              确认领取
            </Button>

            <p className="text-xs text-[#888888] text-center">
              我们尊重您的隐私，信息仅用于发送资料
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
