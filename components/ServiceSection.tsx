
import React from 'react';
import { ArrowUpRight, ArrowUpLeft, MessageCircle } from 'lucide-react';
import { ServiceItem, Language } from '../types';

interface ServiceSectionProps {
  title: { ar: string; en: string };
  subtitle?: { ar: string; en: string };
  items: ServiceItem[];
  lang: Language;
  id: string;
  onOpenModal: (item: ServiceItem) => void;
  cols?: number;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ title, subtitle, items, lang, id, onOpenModal, cols = 4 }) => {
  const Arrow = lang === 'ar' ? ArrowUpLeft : ArrowUpRight;

  const handleOrderService = (e: React.MouseEvent) => {
    e.stopPropagation();
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id={id} className="py-20 bg-white odd:bg-bgLight scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-textMain mb-4 relative inline-block">
            {title[lang]}
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary rounded-full"></span>
          </h2>
          {subtitle && <p className="text-secondary text-lg mt-4">{subtitle[lang]}</p>}
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${cols} gap-6`}>
          {items.map((item) => (
            <div 
              key={item.id} 
              className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col h-full"
              onClick={() => onOpenModal(item)}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 rounded-2xl bg-bgLight flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform overflow-hidden border border-gray-100">
                  {item.flagCode ? (
                    <img 
                      src={`https://flagcdn.com/w160/${item.flagCode.toLowerCase()}.png`}
                      alt={item.flagCode}
                      className="w-full h-full object-fill rounded-2xl"
                    />
                  ) : (
                     <span className="text-primary">{item.icon}</span>
                  )}
                </div>
                {item.originalPrice && (
                   <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-lg">
                     {lang === 'ar' ? 'عرض خاص' : 'Sale'}
                   </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-textMain mb-2 group-hover:text-primary transition-colors">
                {item.title[lang]}
              </h3>
              
              <div className="mt-auto pt-4">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-black text-primary">{item.price}</span>
                  <span className="text-sm text-secondary font-medium">{lang === 'ar' ? 'ريال' : 'SAR'}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-400 line-through mx-2">
                      {item.originalPrice}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <button className="w-full py-3 rounded-xl border border-primary text-primary font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-all">
                    <span>{lang === 'ar' ? 'تفاصيل الخدمة' : 'View Details'}</span>
                    <Arrow size={18} />
                  </button>
                  
                  <button 
                    onClick={handleOrderService}
                    className="w-full py-3 rounded-xl bg-primary text-white font-bold flex items-center justify-center gap-2 hover:bg-primaryDark shadow-md hover:shadow-lg transition-all"
                  >
                    <span>{lang === 'ar' ? 'اطلب الخدمة' : 'Order Service'}</span>
                    <MessageCircle size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
