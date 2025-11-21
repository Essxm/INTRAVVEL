
import React from 'react';
import { Instagram, Phone, Mail, Clock } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = {
    desc: { ar: 'بوابتك الموثوقة لخدمات التأشيرات والسفر. نقدم حلولاً سريعة ومضمونة لجميع احتياجات سفرك.', en: 'Your trusted gateway for visa and travel services. We provide fast and guaranteed solutions for all your travel needs.' },
    quickLinks: { ar: 'روابط سريعة', en: 'Quick Links' },
    contact: { ar: 'تواصل معنا', en: 'Contact Us' },
    location: { ar: 'الموقع', en: 'Location' },
    rights: { ar: 'جميع الحقوق محفوظة', en: 'All rights reserved' }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-textMain text-white pt-20 pb-10 scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & About ID */}
          <div id="about" className="scroll-mt-32">
            <div className="text-3xl font-black tracking-tight mb-6 text-white">INTRAVVEL</div>
            <p className="text-gray-400 mb-8 leading-relaxed">
              {t.desc[lang]}
            </p>
            <div className="flex gap-4 flex-wrap">
              {/* WhatsApp */}
              <a 
                href="https://wa.me/966500000000" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] transition-colors text-white"
                aria-label="WhatsApp"
              >
                 <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                 </svg>
              </a>
              
              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E1306C] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              
              {/* X (Twitter) */}
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-black hover:border hover:border-white/20 transition-colors text-white"
                aria-label="X"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>
              
              {/* Snapchat */}
              <a 
                href="https://snapchat.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFFC00] hover:text-black transition-colors text-white"
                aria-label="Snapchat"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12.005 2c-4.206 0-6.965 2.308-6.965 5.523 0 .828.363 1.978.917 2.973.145.257.103.457-.062.633-.253.278-.589.438-.977.465-.668.047-1.033.35-1.043.885-.01.535.334.877.988 1.08 1.188.37 1.359.879 1.002 2.407-.396 1.68-1.168 2.406-1.94 2.406-.276 0-.424-.09-.424-.386 0-.375-.205-.582-.543-.582-.436 0-.859.447-.859 1.178 0 .549.26.894.746.986 2.203.406 2.461.656 2.793 1.91.18.678.65 1.104 1.412 1.299.432.109 1.021.125 1.613-.021.613-.152 1.215-.607 1.934-1.439.576-.668 1.236-.955 1.889-.955.662 0 1.326.293 1.898.967.713.82 1.309 1.264 1.906 1.416.609.156 1.213.145 1.648.033.756-.195 1.223-.621 1.398-1.299.328-1.244.586-1.49 2.787-1.896.484-.092.742-.438.742-.986 0-.734-.422-1.182-.863-1.182-.332 0-.537.207-.537.582 0 .297-.148.387-.422.387-.77 0-1.543-.727-1.941-2.406-.355-1.527-.186-2.037 1.002-2.406.652-.203.998-.545.988-1.08-.01-.535-.375-.838-1.043-.885-.389-.027-.725-.188-.979-.465-.164-.176-.207-.375-.061-.633.553-.994.916-2.145.916-2.973C18.97 4.309 16.212 2 12.005 2z" />
                </svg>
              </a>

              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1877F2] transition-colors text-white"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-primary">{t.quickLinks[lang]}</h3>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><a href="#hero" onClick={(e) => scrollToSection(e, 'hero')} className="hover:text-white transition-colors">{lang === 'ar' ? 'الرئيسية' : 'Home'}</a></li>
              <li><a href="#visas" onClick={(e) => scrollToSection(e, 'visas')} className="hover:text-white transition-colors">{lang === 'ar' ? 'خدمات التأشيرات' : 'Visa Services'}</a></li>
              <li><a href="#passports" onClick={(e) => scrollToSection(e, 'passports')} className="hover:text-white transition-colors">{lang === 'ar' ? 'تجديد الجوازات' : 'Passport Renewal'}</a></li>
              <li><a href="#gulf" onClick={(e) => scrollToSection(e, 'gulf')} className="hover:text-white transition-colors">{lang === 'ar' ? 'تأشيرات الخليج' : 'Gulf Visas'}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-primary">{t.contact[lang]}</h3>
            <ul className="space-y-6 text-gray-400">
              <li className="flex items-start gap-4">
                <Phone size={20} className="text-primary mt-1" />
                <div>
                  <span className="block text-white font-bold">+966 50 000 0000</span>
                  <span className="text-sm">Sat - Thu, 9am - 10pm</span>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={20} className="text-primary" />
                <span>info@intravvel.com</span>
              </li>
              <li className="flex items-start gap-4">
                <Clock size={20} className="text-primary mt-1" />
                <span>
                  {lang === 'ar' ? 'نعمل على مدار الساعة عبر واتساب' : '24/7 Support via WhatsApp'}
                </span>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-primary">{t.location[lang]}</h3>
            <div className="rounded-2xl overflow-hidden h-48 bg-gray-800 border border-gray-700">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.6!2d46.6!3d24.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzAwLjAiTiA0NsKwMzYnMDAuMCJF!5e0!3m2!1sen!2ssa!4v1620000000000!5m2!1sen!2ssa" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen 
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm font-medium">
          <p>&copy; 2025 INTRAVVEL. {t.rights[lang]}.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
