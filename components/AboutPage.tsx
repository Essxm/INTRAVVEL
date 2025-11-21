
import React, { useEffect } from 'react';
import { CheckCircle, Globe, Clock, Award, Users, Phone } from 'lucide-react';
import { Language } from '../types';

interface Props {
  lang: Language;
}

const AboutPage: React.FC<Props> = ({ lang }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const t = {
    title: { ar: 'من نحن؟', en: 'Who We Are' },
    subtitle: { ar: 'إنترافل.. شريكك الموثوق في كل خطوة نحو العالم', en: 'Intravvel.. Your trusted partner in every step towards the world' },
    aboutDesc: { 
      ar: 'نحن منصة "إنترافل"، شركة سعودية رائدة متخصصة في تقديم حلول السفر المتكاملة وتسهيل إجراءات التأشيرات للمواطنين والمقيمين في المملكة العربية السعودية. نتميز بالدقة، السرعة، والمصداقية العالية في التعامل. هدفنا هو إزالة تعقيدات السفر وجعل الإجراءات روتينية وسلسة.',
      en: 'We are "Intravvel", a leading Saudi platform specializing in providing integrated travel solutions and facilitating visa procedures for citizens and residents in Saudi Arabia. We are characterized by accuracy, speed, and high credibility. Our goal is to remove travel complexities and make procedures routine and seamless.'
    },
    visionTitle: { ar: 'رؤيتنا', en: 'Our Vision' },
    visionDesc: { ar: 'أن نكون الخيار الأول والمرجع الأساسي لكل مسافر يبحث عن راحة البال وضمان الخدمة.', en: 'To be the first choice and primary reference for every traveler looking for peace of mind and service guarantee.' },
    valuesTitle: { ar: 'قيمنا والتزامنا', en: 'Our Values & Commitment' },
    countriesTitle: { ar: 'نخدم وجهات حول العالم', en: 'Destinations We Serve' },
    contactTitle: { ar: 'تواصل معنا', en: 'Contact Us' },
    contactDesc: { ar: 'فريقنا جاهز لخدمتك على مدار الساعة عبر واتساب', en: 'Our team is ready to serve you 24/7 via WhatsApp' },
  };

  const features = [
    { icon: <Clock size={32} />, title: { ar: 'انضباط في المواعيد', en: 'Punctuality' }, desc: { ar: 'نلتزم بتقديم الخدمة في الوقت المتفق عليه دون تأخير.', en: 'We commit to delivering service on time without delay.' } },
    { icon: <Award size={32} />, title: { ar: 'خبرة واحترافية', en: 'Expertise & Professionalism' }, desc: { ar: 'فريق عمل متخصص يراجع كل التفاصيل لضمان قبول طلبك.', en: 'A specialized team reviews every detail to ensure your application acceptance.' } },
    { icon: <CheckCircle size={32} />, title: { ar: 'شفافية تامة', en: 'Full Transparency' }, desc: { ar: 'لا رسوم خفية، نوضح لك كافة التكاليف والمتطلبات منذ البداية.', en: 'No hidden fees, we clarify all costs and requirements from the start.' } },
    { icon: <Users size={32} />, title: { ar: 'دعم مستمر', en: 'Continuous Support' }, desc: { ar: 'نرافقك من بداية التقديم وحتى استلام الجواز أو التأشيرة.', en: 'We accompany you from application start until passport or visa receipt.' } },
  ];

  const countries = [
    { name: { ar: 'منطقة الشنغن (أوروبا)', en: 'Schengen Area (Europe)' }, flags: ['EU', 'FR', 'DE', 'IT', 'ES'] },
    { name: { ar: 'الولايات المتحدة الأمريكية', en: 'United States' }, flags: ['US'] },
    { name: { ar: 'المملكة المتحدة (بريطانيا)', en: 'United Kingdom' }, flags: ['GB'] },
    { name: { ar: 'دول آسيا (الهند، الفلبين، إندونيسيا)', en: 'Asia (India, Philippines, Indonesia)' }, flags: ['IN', 'PH', 'ID'] },
    { name: { ar: 'دول الخليج', en: 'GCC Countries' }, flags: ['AE', 'QA', 'BH', 'KW', 'OM'] },
  ];

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-black text-textMain mb-6 relative inline-block">
            {t.title[lang]}
            <span className="absolute bottom-0 left-0 w-full h-2 bg-primary/20 rounded-full"></span>
          </h1>
          <p className="text-xl text-secondary leading-relaxed font-medium">
            {t.subtitle[lang]}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-100 rounded-3xl transform rotate-3"></div>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80" 
              alt="Team working" 
              className="relative rounded-3xl shadow-2xl border-4 border-white"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">{t.visionTitle[lang]}</h3>
            <p className="text-lg text-textMain leading-loose mb-8 border-l-4 border-primary px-4 bg-gray-50 py-4 rounded-r-xl">
              {t.aboutDesc[lang]}
            </p>
            <p className="text-lg text-secondary">
              {t.visionDesc[lang]}
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-textMain">{t.valuesTitle[lang]}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-primary/50 transition-all hover:-translate-y-2 text-center group">
                <div className="w-16 h-16 mx-auto bg-bgLight text-primary rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title[lang]}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Countries Section */}
        <div className="bg-textMain text-white rounded-3xl p-10 md:p-16 mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="text-center mb-12 relative z-10">
            <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold">{t.countriesTitle[lang]}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {countries.map((c, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur border border-white/10 p-6 rounded-xl hover:bg-white/20 transition-colors">
                <h3 className="font-bold text-lg mb-2">{c.name[lang]}</h3>
                <div className="flex gap-2">
                  {c.flags.map(f => (
                    <img key={f} src={`https://flagcdn.com/w40/${f.toLowerCase()}.png`} alt={f} className="w-6 h-4 rounded shadow-sm" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-textMain mb-4">{t.contactTitle[lang]}</h2>
          <p className="text-secondary mb-8">{t.contactDesc[lang]}</p>
          <a 
            href="https://wa.me/966500000000" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-[#20bd53] transition-transform hover:scale-105"
          >
            <Phone size={24} />
            <span>{lang === 'ar' ? 'تواصل معنا عبر واتساب' : 'Chat via WhatsApp'}</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
