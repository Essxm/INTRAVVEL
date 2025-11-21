
import React from 'react';
import { Plane, Building2, ShieldCheck, Languages } from 'lucide-react';
import { ServiceItem, Language } from '../types';

interface Props {
  lang: Language;
  onOpenModal: (item: ServiceItem) => void;
}

const AdditionalServices: React.FC<Props> = ({ lang, onOpenModal }) => {
  const t = {
    uponRequest: { ar: 'حسب الطلب', en: 'Upon Request' },
    contactUs: { ar: 'تواصل معنا', en: 'Contact Us' }
  };

  const items: ServiceItem[] = [
    {
      id: 'add-1',
      title: { ar: 'حجوزات طيران', en: 'Flight Booking' },
      price: 40,
      originalPrice: 60,
      icon: <Plane size={32} />,
      description: { ar: 'نساعدك في إيجاد أفضل رحلات الطيران بأرخص الأسعار.', en: 'We help you find the best flights at the cheapest prices.' },
      details: {
        duration: { ar: 'فوري', en: 'Instant' },
        processingTime: { ar: 'فوري', en: 'Instant' },
        requirements: { ar: ['صورة الجواز', 'تاريخ السفر'], en: ['Passport Copy', 'Travel Dates'] }
      }
    },
    {
      id: 'add-2',
      title: { ar: 'حجوزات فنادق', en: 'Hotel Booking' },
      price: 40,
      originalPrice: 60,
      icon: <Building2 size={32} />,
      description: { ar: 'عروض حصرية على أفضل الفنادق حول العالم.', en: 'Exclusive offers on the best hotels worldwide.' },
      details: {
        duration: { ar: 'فوري', en: 'Instant' },
        processingTime: { ar: 'فوري', en: 'Instant' },
        requirements: { ar: ['الوجهة', 'عدد الأشخاص'], en: ['Destination', 'Number of people'] }
      }
    },
    {
      id: 'add-3',
      title: { ar: 'تأمين سفر', en: 'Travel Insurance' },
      price: t.uponRequest[lang],
      icon: <ShieldCheck size={32} />,
      description: { ar: 'تأمين سفر شامل يغطي كورونا والطوارئ الطبية.', en: 'Comprehensive travel insurance covering COVID and medical emergencies.' },
      details: {
        duration: { ar: '10 دقائق', en: '10 Minutes' },
        processingTime: { ar: 'فوري', en: 'Instant' },
        requirements: { ar: ['صورة الجواز', 'تواريخ السفر'], en: ['Passport Copy', 'Travel Dates'] }
      }
    },
    {
      id: 'add-4',
      title: { ar: 'ترجمة معتمدة', en: 'Certified Translation' },
      price: t.uponRequest[lang],
      icon: <Languages size={32} />,
      description: { ar: 'ترجمة مستندات رسمية لجميع اللغات.', en: 'Official document translation for all languages.' },
      details: {
        duration: { ar: '24 ساعة', en: '24 Hours' },
        processingTime: { ar: '24 ساعة', en: '24 Hours' },
        requirements: { ar: ['المستند الأصلي'], en: ['Original Document'] }
      }
    }
  ];

  return (
    <section id="additional" className="py-20 bg-white scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-textMain mb-4">
            {lang === 'ar' ? 'خدمات إضافية' : 'Additional Services'}
          </h2>
          <p className="text-secondary text-lg">
            {lang === 'ar' ? 'كل ما تحتاجه لرحلة متكاملة في مكان واحد' : 'Everything you need for a complete trip in one place'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div 
              key={item.id} 
              onClick={() => onOpenModal(item)}
              className="group bg-bgLight p-8 rounded-3xl hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer text-center border border-transparent hover:border-primary/20"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-white text-primary flex items-center justify-center shadow-md mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              {item.originalPrice && (
                   <span className="inline-block bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-lg mb-2 shadow-sm">
                     {lang === 'ar' ? 'عرض خاص' : 'Sale'}
                   </span>
              )}
              <h3 className="text-xl font-bold mb-2">{item.title[lang]}</h3>
              <p className="text-sm text-secondary group-hover:text-blue-100 mb-4 line-clamp-2">
                {item.description[lang]}
              </p>
              <div className="flex items-center justify-center gap-2 bg-white/50 group-hover:bg-white/10 rounded-xl py-2">
                <span className="font-bold text-lg">
                  {typeof item.price === 'number' 
                    ? `${item.price} ${lang === 'ar' ? 'ريال' : 'SAR'}`
                    : <span className="text-sm">{item.price}</span>
                  }
                </span>
                {item.originalPrice && (
                  <span className="text-sm text-gray-400 group-hover:text-blue-200 line-through decoration-red-400 decoration-2">
                    {item.originalPrice}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdditionalServices;
