import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  product: {
    title: '产品',
    links: ['用户端小程序', '司机端APP', '运营后台', '定制开发'],
  },
  solutions: {
    title: '解决方案',
    links: ['城际拼车', '定制客运', '城际包车', '顺风车'],
  },
  support: {
    title: '支持',
    links: ['帮助中心', '使用文档', 'API接口', '联系我们'],
  },
  company: {
    title: '公司',
    links: ['关于我们', '加入我们', '新闻动态', '合作伙伴'],
  },
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo animation
      gsap.fromTo(
        logoRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Links columns animation
      const columns = linksRef.current?.querySelectorAll('.footer-column');
      if (columns) {
        gsap.fromTo(
          columns,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: linksRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            delay: 0.2,
          }
        );
      }

      // Bottom bar animation
      gsap.fromTo(
        bottomRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bottomRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
          delay: 0.8,
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-[#1A1A1A] text-white pt-16 pb-8"
    >
    </footer>
  );
}
