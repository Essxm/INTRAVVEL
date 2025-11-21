import React from 'react';
import { X, Check, MessageCircle } from 'lucide-react';
import { ServiceItem, Language } from '../types';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceItem | null;
  lang: Language;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, service, lang }) => {
  if (!isOpen || !service) return null;

  const whatsappMessage = `Hello Intravvel, I am interested in ${service.title.en}`;
  const whatsappLink = `https://wa.me/966500000000?text=${encodeURIComponent(whatsappMessage)}`;

  const t = {
    processing: { ar: 'مدة المعالجة', en: 'Processing Time' },
    requirements: { ar: 'المتطلبات', en: 'Requirements' },
    duration: { ar: 'مدة التأشيرة', en: 'Duration' },
    order: { ar: 'اطلب الخدمة عبر واتساب', en: 'Order via WhatsApp' },
    close: { ar: 'إغلاق', en: 'Close' },
    price: { ar: 'السعر', en: 'Price' },
    currency: { ar: 'ريال', en: 'SAR' }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200 scrollbar-hide">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 rtl:right-auto rtl:left-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <X size={24} className="text-gray-500" />
        </button>

        <div className="p-8 md:p-10">
          <div className="mb-8">
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-4 inline-block">
              {service.price} {t.currency[lang]}
            </span>
            <h2 className="text-3xl font-bold text-textMain mb-4">{service.title[lang]}</h2>
            <p className="text-secondary leading-relaxed text-lg">
              {service.description[lang]}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-bgLight p-5 rounded-2xl">
              <h4 className="font-bold text-textMain mb-2">{t.processing[lang]}</h4>
              <p className="text-primary font-semibold">{service.details.processingTime[lang]}</p>
            </div>
            <div className="bg-bgLight p-5 rounded-2xl">
              <h4 className="font-bold text-textMain mb-2">{t.duration[lang]}</h4>
              <p className="text-primary font-semibold">{service.details.duration[lang]}</p>
            </div>
          </div>

          <div className="mb-10">
            <h4 className="font-bold text-textMain mb-4 text-lg">{t.requirements[lang]}</h4>
            <ul className="space-y-3">
              {service.details.requirements[lang].map((req, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 min-w-[20px]">
                    <Check size={18} className="text-green-500" />
                  </div>
                  <span className="text-secondary">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#25D366] hover:bg-[#1ebc57] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg transition-all hover:-translate-y-1"
            >
              <MessageCircle size={24} />
              <span>{t.order[lang]}</span>
            </a>
            <button 
              onClick={onClose}
              className="w-full py-4 bg-gray-100 hover:bg-gray-200 text-secondary rounded-xl font-bold transition-colors"
            >
              {t.close[lang]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;