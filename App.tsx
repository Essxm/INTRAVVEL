
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceSection from './components/ServiceSection';
import AdditionalServices from './components/AdditionalServices';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ServiceModal from './components/ServiceModal';
import AboutPage from './components/AboutPage';
import { ServiceItem, Language } from './types';

// --- Data Definitions ---
const visaServices: ServiceItem[] = [
  {
    id: 'visa-1',
    title: { ar: 'تجهيز ملف شنغن', en: 'Schengen File Preparation' },
    price: 199,
    flagCode: 'EU',
    description: { 
      ar: 'خدمة تعبئة وتجهيز ملف الشنغن كاملاً بدون موعد (حجوزات، تأمين، نماذج). الموعد على العميل.',
      en: 'Complete Schengen file preparation without appointment (bookings, insurance, forms). Appointment is on the client.'
    },
    details: {
      duration: { ar: 'تصل إلى 90 يوم', en: 'Up to 90 Days' },
      processingTime: { ar: '15 - 30 يوم عمل', en: '15 - 30 Business Days' },
      requirements: { 
        ar: [
          'جواز سفر ساري لمدة 6 أشهر على الأقل', 
          'صورتان شخصيتان بخلفية بيضاء', 
          'كشف حساب بنكي لآخر 3 أشهر', 
          'تذاكر طيران ذهاب وعودة', 
          'تأمين سفر يغطي منطقة الشنغن'
        ],
        en: [
          'Valid passport for at least 6 months', 
          '2 personal photos with white background', 
          'Bank statement for last 3 months', 
          'Round-trip flight tickets', 
          'Travel insurance covering Schengen area'
        ]
      }
    }
  },
  {
    id: 'visa-2',
    title: { ar: 'تعبئة أبلكيشن أمريكا', en: 'US Application Filling' },
    price: 89,
    originalPrice: 130,
    flagCode: 'US',
    description: { 
      ar: 'تعبئة نماذج تأشيرة الولايات المتحدة بكل احترافية، شاملة دعم الاستمارات والأبلكيشن.',
      en: 'Professional US visa form filling, including application support and review.'
    },
    details: {
      duration: { ar: 'حسب السفارة', en: 'Embassy Dependent' },
      processingTime: { ar: '24 - 48 ساعة', en: '24 - 48 Hours' },
      requirements: { 
        ar: [
          'جواز سفر ساري لمدة 6 أشهر', 
          'صورة شخصية حديثة (5x5سم)', 
          'بيانات شخصية كاملة', 
          'سجل السفر السابق (إن وجد)', 
          'معلومات عن الزيارة'
        ],
        en: [
          'Valid passport for 6 months', 
          'Recent photo (5x5cm)', 
          'Complete personal data', 
          'Previous travel history (if any)', 
          'Visit information'
        ]
      }
    }
  },
  {
    id: 'visa-3',
    title: { ar: 'حجز موعد شنغن', en: 'Schengen Appointment' },
    price: '150-250',
    flagCode: 'EU',
    description: { 
      ar: 'حجز مواعيد التأشيرات المختلفة بأسعار تنافسية لجميع دول الشنغن (ألمانيا، فرنسا، إيطاليا، وغيرها).',
      en: 'Competitive visa appointment booking for all Schengen countries (Germany, France, Italy, etc.).'
    },
    details: {
      duration: { ar: 'مقابلة شخصية', en: 'Personal Interview' },
      processingTime: { ar: '1 - 3 أيام عمل', en: '1 - 3 Business Days' },
      requirements: { 
        ar: [
          'جواز سفر ساري 6 أشهر', 
          'تحديد دولة الدخول الرئيسية', 
          'توفر المستندات الأساسية', 
          'رسوم السفارة جاهزة', 
          'تاريخ السفر والعودة المتوقع'
        ],
        en: [
          'Valid passport (6 months)', 
          'Main entry country selection', 
          'Basic documents availability', 
          'Embassy fees ready', 
          'Expected travel and return dates'
        ]
      }
    }
  },
  {
    id: 'visa-4',
    title: { ar: 'حجز موعد أمريكا', en: 'US Appointment' },
    price: 899,
    originalPrice: 1000,
    flagCode: 'US',
    description: { 
      ar: 'حجز موعد مقابلة السفارة الأمريكية (الرياض/جدة) مع متابعة كاملة للإجراءات والتنسيق.',
      en: 'US Embassy interview booking (Riyadh/Jeddah) with full procedure follow-up and coordination.'
    },
    details: {
      duration: { ar: 'مقابلة شخصية', en: 'Personal Interview' },
      processingTime: { ar: '1 - 5 أيام عمل', en: '1 - 5 Business Days' },
      requirements: { 
        ar: [
          'إكمال النموذج DS-160', 
          'سداد رسوم السفارة ($160)', 
          'صورة شخصية مطابقة للمواصفات', 
          'جواز سفر ساري', 
          'مستندات داعمة للزيارة'
        ],
        en: [
          'Completed DS-160 Form', 
          'Embassy fee payment ($160)', 
          'Compliant personal photo', 
          'Valid passport', 
          'Supporting visit documents'
        ]
      }
    }
  }
];

const passportServices: ServiceItem[] = [
  {
    id: 'pass-1',
    title: { ar: 'تجديد جواز الهند', en: 'India Passport Renewal' },
    price: 69,
    flagCode: 'IN',
    description: { 
      ar: 'تجديد جواز السفر الهندي إلكترونيًا للمقيمين. تشمل الأبلكيشن وحجز الموعد. (رسوم السفارة 360 ريال).', 
      en: 'Online Indian passport renewal for residents. Includes application and appointment. (Embassy fee 360 SAR).' 
    },
    details: {
      duration: { ar: '10 سنوات أو 1 سنة', en: '10 Years or 1 Year' },
      processingTime: { ar: '15 - 28 يوم عمل', en: '15 - 28 Business Days' },
      requirements: { 
        ar: [
          'جواز السفر الأصلي والصورة', 
          'الإقامة الأصلية + صورة', 
          'برنت من أبشر بتاريخ انتهاء الإقامة', 
          'سداد رسوم المكتب (69 ريال)',
          'سداد رسوم السفارة', 
          'تطبيق توكلنا'
        ],
        en: [
          'Original passport + copy', 
          'Original Iqama + copy', 
          'Absher print (expiry date)', 
          'Office fee payment (69 SAR)',
          'Embassy fee payment', 
          'Tawakkalna App'
        ]
      }
    }
  },
  {
    id: 'pass-2',
    title: { ar: 'تجديد جواز الفلبين', en: 'Philippines Passport Renewal' },
    price: 69,
    flagCode: 'PH',
    description: { 
      ar: 'إجراءات تجديد الجواز الفلبيني بسرعة ودقة. تشمل الأبلكيشن وحجز الموعد. (رسوم السفارة 240 ريال).', 
      en: 'Fast and accurate Philippines passport renewal. Includes application and appointment. (Embassy fee 240 SAR).' 
    },
    details: {
      duration: { ar: '10 سنوات', en: '10 Years' },
      processingTime: { ar: '4 - 6 أسابيع عمل', en: '4 - 6 Business Weeks' },
      requirements: { 
        ar: [
          'جواز السفر الأصلي', 
          'الإقامة الأصلية + صورة', 
          'صورتان شخصيتان حديثتان', 
          'نسخة من تأشيرة الخروج والعودة', 
          'سداد رسوم المكتب (69 ريال)',
          'سداد رسوم السفارة'
        ],
        en: [
          'Original passport', 
          'Original Iqama + copy', 
          '2 recent personal photos', 
          'Exit/Re-entry visa copy', 
          'Office fee payment (69 SAR)',
          'Embassy fee payment'
        ]
      }
    }
  },
  {
    id: 'pass-3',
    title: { ar: 'تجديد جواز إندونيسيا', en: 'Indonesia Passport Renewal' },
    price: 69,
    flagCode: 'ID',
    description: { 
      ar: 'تجديد جواز السفر الإندونيسي بأبسط الخطوات. تشمل الأبلكيشن وحجز الموعد. (رسوم السفارة 300 ريال).', 
      en: 'Simple Indonesia passport renewal steps. Includes application and appointment. (Embassy fee 300 SAR).' 
    },
    details: {
      duration: { ar: '5 سنوات', en: '5 Years' },
      processingTime: { ar: '3 - 4 أسابيع عمل', en: '3 - 4 Business Weeks' },
      requirements: { 
        ar: [
          'جواز السفر الأصلي', 
          'الإقامة الأصلية + صورة', 
          'صورتان شخصيتان حديثتان', 
          'نسخة من تأشيرة الخروج والعودة', 
          'سداد رسوم المكتب (69 ريال)',
          'سداد رسوم السفارة'
        ],
        en: [
          'Original passport', 
          'Original Iqama + copy', 
          '2 recent personal photos', 
          'Exit/Re-entry visa copy', 
          'Office fee payment (69 SAR)',
          'Embassy fee payment'
        ]
      }
    }
  }
];

const gulfServices: ServiceItem[] = [
  {
    id: 'gulf-1',
    title: { ar: 'تأشيرة الإمارات للمقيمين', en: 'UAE Visa for Residents' },
    price: 349,
    flagCode: 'AE',
    description: { 
      ar: 'تأشيرة دخول سريعة للإمارات مع دعم كامل للمقيمين في المملكة.', 
      en: 'Fast entry visa to UAE with full support for KSA residents.' 
    },
    details: {
      duration: { ar: '30 يوم', en: '30 Days' },
      processingTime: { ar: '3 - 5 أيام عمل', en: '3 - 5 Business Days' },
      requirements: { 
        ar: [
          'جواز سفر ساري لمدة 6 أشهر', 
          'صورة شخصية بخلفية بيضاء', 
          'صورة من الإقامة سارية المفعول', 
          'سداد رسوم الخدمة (349 ريال)'
        ],
        en: [
          'Valid passport for 6 months', 
          'Personal photo with white background', 
          'Valid Iqama copy', 
          'Service fee payment (349 SAR)'
        ]
      }
    }
  },
  {
    id: 'gulf-2',
    title: { ar: 'تأشيرة البحرين للمقيمين', en: 'Bahrain Visa for Residents' },
    price: 149,
    flagCode: 'BH',
    description: { 
      ar: 'تأشيرة دخول متعدد لمدة 3 أشهر، إصدار سريع للمقيمين في السعودية.', 
      en: '3-month multiple entry visa, fast issuance for KSA residents.' 
    },
    details: {
      duration: { ar: '3 أشهر دخول متعدد', en: '3 Months Multiple Entry' },
      processingTime: { ar: '2 - 5 أيام عمل', en: '2 - 5 Business Days' },
      requirements: { 
        ar: [
          'جواز سفر ساري لمدة 6 أشهر', 
          'صورة شخصية بخلفية بيضاء', 
          'صورة من الإقامة سارية المفعول', 
          'سداد رسوم الخدمة (149 ريال)'
        ],
        en: [
          'Valid passport for 6 months', 
          'Personal photo with white background', 
          'Valid Iqama copy', 
          'Service fee payment (149 SAR)'
        ]
      }
    }
  },
  {
    id: 'gulf-3',
    title: { ar: 'تأشيرة قطر', en: 'Qatar Visa' },
    price: 99,
    flagCode: 'QA',
    description: { 
      ar: 'تأشيرة دخول لمرة واحدة صالحة لـ 3 أشهر. متطلبات الحجز الفندقي عبر منصة (هيا).', 
      en: 'Single entry visa valid for 3 months. Hotel booking required via Hayya platform.' 
    },
    details: {
      duration: { ar: '3 أشهر دخول لمرة واحدة', en: '3 Months Single Entry' },
      processingTime: { ar: '2 - 4 أيام عمل', en: '2 - 4 Business Days' },
      requirements: { 
        ar: [
          'جواز سفر ساري لمدة 6 أشهر', 
          'صورة شخصية بخلفية بيضاء', 
          'صورة من الإقامة سارية المفعول', 
          'حجز فندق عبر منصة هيا',
          'سداد رسوم الخدمة (99 ريال)'
        ],
        en: [
          'Valid passport for 6 months', 
          'Personal photo with white background', 
          'Valid Iqama copy', 
          'Hotel booking via Hayya',
          'Service fee payment (99 SAR)'
        ]
      }
    }
  }
];

const HomePage = ({ lang, handleOpenModal }: { lang: Language, handleOpenModal: any }) => (
  <>
    <Hero lang={lang} />

    <ServiceSection 
      id="visas"
      title={{ ar: 'خدمات التأشيرات', en: 'Visa Services' }} 
      subtitle={{ ar: 'إنجاز سريع واحترافي لجميع وجهاتك', en: 'Fast and professional processing for all destinations' }}
      items={visaServices}
      lang={lang}
      onOpenModal={handleOpenModal}
      cols={4}
    />

    <ServiceSection 
      id="passports"
      title={{ ar: 'تجديد جوازات المقيمين', en: 'Passport Renewals' }} 
      items={passportServices}
      lang={lang}
      onOpenModal={handleOpenModal}
      cols={3}
    />

    <ServiceSection 
      id="gulf"
      title={{ ar: 'تأشيرات الخليج', en: 'Gulf Visas' }} 
      items={gulfServices}
      lang={lang}
      onOpenModal={handleOpenModal}
      cols={3}
    />

    <AdditionalServices lang={lang} onOpenModal={handleOpenModal} />
    
    <Testimonials lang={lang} />

    <ContactForm lang={lang} />
  </>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!pathname.includes('#')) {
       window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, []);

  const handleOpenModal = (item: ServiceItem) => {
    setSelectedService(item);
    setModalOpen(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white selection:bg-primary selection:text-white font-arabic">
        <ScrollToTop />
        <Navbar lang={lang} setLang={setLang} />
        
        <Routes>
          <Route path="/" element={<HomePage lang={lang} handleOpenModal={handleOpenModal} />} />
          <Route path="/about" element={<AboutPage lang={lang} />} />
        </Routes>

        <Footer lang={lang} />

        <ServiceModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
          service={selectedService} 
          lang={lang}
        />
      </div>
    </Router>
  );
}

export default App;
