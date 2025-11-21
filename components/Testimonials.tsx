import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonial, Language } from '../types';

interface TestimonialsProps {
  lang: Language;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: { ar: 'أحمد العتيبي', en: 'Ahmed Al-Otaibi' },
    rating: 5,
    comment: { 
      ar: 'خدمة ممتازة وسريعة جداً. استلمت تأشيرة الشنغن في وقت قياسي. شكراً لفريق إنترافل.',
      en: 'Excellent and very fast service. Received Schengen visa in record time. Thanks Intravvel team.'
    },
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: '2',
    name: { ar: 'سارة محمد', en: 'Sarah Mohammed' },
    rating: 5,
    comment: { 
      ar: 'تعامل راقي واحترافي. ساعدوني في تجديد جواز العاملة المنزلية بدون أي تعقيد.',
      en: 'Classy and professional dealing. Helped me renew the domestic worker passport without any complexity.'
    },
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: '3',
    name: { ar: 'خالد السهلي', en: 'Khalid Al-Sahli' },
    rating: 5,
    comment: { 
      ar: 'أفضل سعر وجدته لحجز مواعيد السفارة الأمريكية. أنصح بالتعامل معهم بشدة.',
      en: 'Best price I found for US Embassy appointments. Highly recommend dealing with them.'
    },
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  }
];

const Testimonials: React.FC<TestimonialsProps> = ({ lang }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setActiveIndex((activeIndex + 1) % testimonials.length);
  const prev = () => setActiveIndex((activeIndex - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 bg-primary text-white overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          {lang === 'ar' ? 'آراء عملائنا السعداء' : 'Happy Client Reviews'}
        </h2>

        <div className="max-w-4xl mx-auto relative">
          {/* Controls */}
          <button onClick={prev} className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur z-10">
            <ChevronLeft size={24} className="rtl:rotate-180" />
          </button>
          <button onClick={next} className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur z-10">
            <ChevronRight size={24} className="rtl:rotate-180" />
          </button>

          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out" 
              style={{ transform: `translateX(${lang === 'ar' ? activeIndex * 100 : -activeIndex * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t.id} className="min-w-full px-4">
                  <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12">
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} className="text-gold fill-gold" />
                      ))}
                    </div>
                    <p className="text-xl md:text-2xl leading-relaxed mb-8 font-light">
                      "{t.comment[lang]}"
                    </p>
                    <div className="flex flex-col items-center gap-3">
                      <img src={t.avatar} alt={t.name[lang]} className="w-16 h-16 rounded-full border-2 border-gold" />
                      <h4 className="font-bold text-lg">{t.name[lang]}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${idx === activeIndex ? 'bg-white w-8' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;