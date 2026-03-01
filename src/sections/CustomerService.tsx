import { useState, useEffect } from 'react';
import { MessageCircle, X, Phone, Mail, MessageSquare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function CustomerService() {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  useEffect(() => {
    // Show button after scrolling down
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contactMethods = [
    {
      icon: Phone,
      title: '电话咨询',
      subtitle: '400-XXX-XXXX',
      description: '工作日 9:00-18:00',
      action: () => {
        alert('客服热线：400-XXX-XXXX\n工作时间：周一至周五 9:00-18:00');
      },
      color: '#F5A623',
    },
    {
      icon: MessageSquare,
      title: '微信咨询',
      subtitle: '扫码添加客服微信',
      description: '实时在线解答',
      action: () => {
        alert('请搜索微信号：huyangchuxing\n或扫描官网底部二维码添加客服');
      },
      color: '#4CAF50',
    },
    {
      icon: Mail,
      title: '邮件咨询',
      subtitle: 'contact@huyangchuxing.com',
      description: '24小时内回复',
      action: () => {
        window.location.href = 'mailto:contact@huyangchuxing.com';
      },
      color: '#2196F3',
    },
  ];

  return (
    <>
      {/* Floating Customer Service Button */}
      <div
        className={`fixed right-6 bottom-6 z-50 transition-all duration-500 ${
          showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Quick Actions */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 space-y-3 mb-3">
            {contactMethods.map((method, index) => (
              <button
                key={method.title}
                onClick={method.action}
                className="flex items-center gap-3 bg-white rounded-full shadow-lg px-4 py-3 hover:shadow-xl transition-all duration-300 hover:scale-105 whitespace-nowrap"
                style={{
                  animation: `slideInRight 0.3s ease-out ${index * 0.1}s both`,
                }}
              >
                <span className="text-sm font-medium text-[#1A1A1A]">
                  {method.title}
                </span>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${method.color}15` }}
                >
                  <method.icon className="w-5 h-5" style={{ color: method.color }} />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            isOpen ? 'bg-[#1A1A1A]' : 'bg-[#F5A623]'
          }`}
          style={{
            boxShadow: isOpen
              ? '0 4px 20px rgba(0,0,0,0.3)'
              : '0 4px 20px rgba(245, 166, 35, 0.4)',
          }}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Contact Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-[#1A1A1A]">
              联系客服
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {contactMethods.map((method) => (
              <button
                key={method.title}
                onClick={method.action}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#F5F5F5] hover:bg-white hover:shadow-lg transition-all duration-300 text-left"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${method.color}15` }}
                >
                  <method.icon className="w-6 h-6" style={{ color: method.color }} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A]">{method.title}</h4>
                  <p className="text-sm text-[#F5A623]">{method.subtitle}</p>
                  <p className="text-xs text-[#888888]">{method.description}</p>
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* CSS Animation */}
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
