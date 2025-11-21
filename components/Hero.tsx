
import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
}

const Typewriter = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Cursor blinking effect
  useEffect(() => {
    const timeout2 = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(timeout2);
  }, []);

  // Typing effect
  useEffect(() => {
    if (index >= words.length) {
      setIndex(0); // Loop back
      return;
    }

    const subIndexMax = words[index].length;

    if (subIndex === subIndexMax + 1 && !reverse) {
      // Finished typing word, wait before deleting
      const timeout = setTimeout(() => {
        setReverse(true);
      }, 2000); // Wait 2 seconds before deleting
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      // Finished deleting, move to next word
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 30 : 50); // Faster typing for longer list

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="text-white inline-block min-h-[1.5em]">
      {words[index].substring(0, subIndex)}
      <span className={`${blink ? 'opacity-100' : 'opacity-0'} transition-opacity ml-1 font-light text-gold`}>|</span>
    </span>
  );
};

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = {
    title: { 
      ar: 'إنترافل - بوابتك للسفر', 
      en: 'INTRAVVEL - Your Gateway to Travel' 
    },
    primaryBtn: { ar: 'اطلب خدمتك الآن', en: 'Order Service Now' },
    secondaryBtn: { ar: 'استكشف الخدمات', en: 'Explore Services' }
  };

  const typewriterWords = {
    ar: [
      "نجهّز لك ملف الشنغن بكل احتراف.",
      "نحجز لك موعد الشنغن بسرعة.",
      "نعدّ لك أبلكيشن أمريكا بدقّة.",
      "ننسّق لك موعد السفارة الأمريكية بسهولة.",
      "نصدّر لك تأشيرة الإمارات بكل سهولة.",
      "نصدّر لك تأشيرة البحرين بسرعة ومرونة.",
      "نصدّر لك تأشيرة قطر بخطوات بسيطة.",
      "نجدد لك الجواز الفلبيني بدون تعقيد.",
      "نجدد لك الجواز الهندي بسرعة وراحة.",
      "نجدد لك الجواز الإندونيسي بسلاسة.",
      "نحجز لك تذاكر الطيران بأفضل خيار.",
      "نأمّن لك فندق مناسب ومريح.",
      "نترجم لك مستنداتك بدقّة.",
      "نوفر لك التأمين للسفر براحة وأمان."
    ],
    en: [
      "We prepare your Schengen file professionally.",
      "We book your Schengen appointment quickly.",
      "We prepare your US application accurately.",
      "We coordinate your US Embassy appointment easily.",
      "We issue your UAE visa easily.",
      "We issue your Bahrain visa quickly and flexibly.",
      "We issue your Qatar visa with simple steps.",
      "We renew your Philippines passport without hassle.",
      "We renew your Indian passport quickly and comfortably.",
      "We renew your Indonesian passport smoothly.",
      "We book your flight tickets with the best option.",
      "We secure a suitable and comfortable hotel for you.",
      "We translate your documents accurately.",
      "We provide travel insurance for comfort and safety."
    ]
  };

  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-[85vh] min-h-[600px] w-full overflow-hidden flex items-center">
      {/* Static Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2674&auto=format&fit=crop")',
        }}
      ></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-900/80 to-blue-900/30 z-10"></div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 pt-20">
        <div className="max-w-4xl text-white">
          <div className="mb-6 inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="text-sm font-bold uppercase tracking-wide">
              {lang === 'ar' ? 'خدمات معتمدة ١٠٠٪' : '100% Certified Services'}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight drop-shadow-lg animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            {t.title[lang]}
          </h1>

          {/* Typewriter Effect Container - White Text */}
          <div className="text-2xl md:text-4xl font-bold mb-10 min-h-[80px] md:min-h-[60px] flex items-center text-white" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <Typewriter words={typewriterWords[lang]} />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <a 
              href="#visas"
              onClick={(e) => scrollToSection(e, 'visas')}
              className="bg-primary hover:bg-primaryDark text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1"
            >
              <span>{t.primaryBtn[lang]}</span>
              <Arrow size={20} />
            </a>
            
            <a 
              href="#passports"
              onClick={(e) => scrollToSection(e, 'passports')}
              className="bg-transparent hover:bg-white text-white hover:text-primary border-2 border-white px-8 py-4 rounded-full font-bold flex items-center justify-center transition-all"
            >
              {t.secondaryBtn[lang]}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
