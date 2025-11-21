
import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Language } from '../types';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Handle Scroll State
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleLang = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const handleNavClick = (targetId: string) => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(targetId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const t = {
    home: { ar: 'الرئيسية', en: 'Home' },
    ourServices: { ar: 'خدماتنا', en: 'Our Services' },
    about: { ar: 'من نحن', en: 'About Us' },
    contact: { ar: 'تواصل معنا', en: 'Contact Us' },
    visa: { ar: 'خدمات التأشيرات', en: 'Visa Services' },
    passport: { ar: 'تجديد الجوازات', en: 'Passport Renewal' },
    gulf: { ar: 'تأشيرات الخليج', en: 'Gulf Visas' },
    additional: { ar: 'خدمات إضافية', en: 'Additional Services' },
    logoSubtitle: { ar: 'بوابتك للسفر', en: 'Travel Portal' }
  };

  const serviceLinks = [
    { id: 'visas', label: t.visa },
    { id: 'passports', label: t.passport },
    { id: 'gulf', label: t.gulf },
    { id: 'additional', label: t.additional },
  ];

  // Logic to determine text color
  // Dark text if: Menu is Open OR Scrolled Down OR Not on Home Page
  const isDarkText = isMenuOpen || isScrolled || location.pathname !== '/';
  
  const textColorClass = isDarkText ? 'text-textMain' : 'text-white';
  const logoSubtitleClass = isDarkText ? 'text-secondary' : 'text-blue-100';
  const navBackgroundClass = (isScrolled || location.pathname !== '/') 
    ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
    : 'bg-transparent py-6';

  return (
    <>
      <nav 
        dir="ltr" 
        className={`fixed top-0 left-0 w-full z-[999] transition-all duration-300 ${navBackgroundClass}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center relative z-[1000]">
          
          {/* Logo */}
          <Link 
            to="/"
            className="flex flex-col cursor-pointer items-start group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="flex items-center gap-2">
              <span className={`text-2xl md:text-3xl font-black tracking-tight ${isDarkText ? 'text-primary' : 'text-white'} drop-shadow-sm transition-colors`}>
                INTRAVVEL
              </span>
            </div>
            <span className={`text-[10px] md:text-xs font-medium ${logoSubtitleClass} transition-colors`}>
              {t.logoSubtitle[lang]}
            </span>
          </Link>

          {/* Desktop Menu (Hidden on Mobile) */}
          <div className={`hidden md:flex items-center gap-8 font-medium ${textColorClass} ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary transition-colors py-2">{t.home[lang]}</Link>
            
            <div className="relative group py-2">
              <button className="flex items-center gap-1 hover:text-primary transition-colors focus:outline-none">
                {t.ourServices[lang]}
                <ChevronDown size={16} className="mt-0.5 transition-transform group-hover:-rotate-180" />
              </button>
              <div className={`absolute top-full ${lang === 'ar' ? 'right-0' : 'left-0'} pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300`}>
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden w-64 py-2">
                  {serviceLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className={`block w-full px-6 py-3 hover:bg-blue-50 hover:text-primary transition-colors text-sm font-bold text-textMain ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                    >
                      {link.label[lang]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/about" className="hover:text-primary transition-colors py-2">{t.about[lang]}</Link>
            <button onClick={() => handleNavClick('contact-form')} className="hover:text-primary transition-colors py-2">{t.contact[lang]}</button>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            
            {/* Desktop Language Switcher (HIDDEN ON MOBILE via 'hidden md:flex') */}
            <button 
              onClick={toggleLang}
              className={`hidden md:flex items-center justify-center gap-2 px-4 py-2 rounded-full border transition-all w-[130px] ${
                isDarkText
                  ? 'border-gray-200 text-textMain hover:bg-gray-50 hover:border-primary/30' 
                  : 'border-white/30 text-white hover:bg-white/10'
              }`}
            >
              <Globe size={16} />
              <span className="uppercase font-bold text-sm">{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* Mobile Toggle Button (Visible only on Mobile) */}
            <button 
              onClick={toggleMenu} 
              className={`md:hidden p-2 rounded-lg transition-colors z-[1001] ${textColorClass}`}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-white z-[998] flex flex-col pt-28 px-6 transition-all duration-300 md:hidden h-screen ${
            isMenuOpen ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-full rtl:-translate-x-full'
          }`}
          style={{ top: 0 }}
        >
          <div className="flex flex-col w-full h-full pb-10 overflow-y-auto">
            
            <div className="flex flex-col gap-2 text-center" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)} 
                className="text-2xl font-bold text-textMain py-5 border-b border-gray-50 hover:text-primary"
              >
                {t.home[lang]}
              </Link>

              <Link 
                to="/about" 
                onClick={() => setIsMenuOpen(false)} 
                className="text-2xl font-bold text-textMain py-5 border-b border-gray-50 hover:text-primary"
              >
                {t.about[lang]}
              </Link>

              {/* Mobile Services Accordion */}
              <div className="py-5 border-b border-gray-50">
                <button 
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="text-2xl font-bold text-textMain hover:text-primary flex items-center justify-center gap-2 w-full"
                >
                  {t.ourServices[lang]}
                  <ChevronDown size={24} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`mt-2 flex flex-col gap-2 bg-gray-50 rounded-2xl overflow-hidden transition-all duration-300 ${isServicesOpen ? 'max-h-[500px] py-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                  {serviceLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className="text-lg font-medium text-secondary hover:text-primary py-3 block w-full text-center active:bg-gray-200"
                    >
                      {link.label[lang]}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => handleNavClick('contact-form')} 
                className="text-2xl font-bold text-primary py-5"
              >
                {t.contact[lang]}
              </button>
            </div>

            {/* Mobile Language Switcher (Only place it appears on mobile) */}
            <div className="mt-auto pt-8 pb-8">
              <button 
                onClick={() => { toggleLang(); toggleMenu(); }}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-textMain text-white font-bold shadow-lg active:scale-95 transition-transform"
              >
                <Globe size={20} />
                <span>{lang === 'ar' ? 'Switch to English' : 'تغيير للعربية'}</span>
              </button>
            </div>

          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
