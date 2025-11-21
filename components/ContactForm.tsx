
import React, { useState } from 'react';
import { Language } from '../types';
import { Check, Loader2, Send, User, Mail, MessageSquare, FileQuestion } from 'lucide-react';

interface ContactFormProps {
  lang: Language;
}

const ContactForm: React.FC<ContactFormProps> = ({ lang }) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const t = {
    title: { ar: 'تواصل معنا', en: 'Contact Us' },
    subtitle: { ar: 'هل لديك استفسار؟ املأ النموذج أدناه وسنقوم بالرد عليك في أقرب وقت.', en: 'Have a question? Fill out the form below and we will get back to you shortly.' },
    
    // Labels
    nameLabel: { ar: 'الاسم الكامل', en: 'Full Name' },
    emailLabel: { ar: 'البريد الإلكتروني', en: 'Email Address' },
    serviceLabel: { ar: 'نوع الخدمة', en: 'Service Type' },
    messageLabel: { ar: 'تفاصيل الرسالة', en: 'Message Details' },
    
    // Placeholders
    namePlaceholder: { ar: 'الاسم الأول والأخير', en: 'John Doe' },
    emailPlaceholder: { ar: 'name@example.com', en: 'name@example.com' },
    messagePlaceholder: { ar: 'اكتب استفسارك هنا...', en: 'Type your message here...' },
    
    // Service Options
    selectService: { ar: 'اختر نوع الخدمة...', en: 'Select a service...' },
    optGeneral: { ar: 'استفسار عام', en: 'General Inquiry' },
    optSchengen: { ar: 'تأشيرات شنغن', en: 'Schengen Visas' },
    optUS: { ar: 'تأشيرة أمريكا', en: 'US Visa' },
    optGulf: { ar: 'تأشيرات الخليج', en: 'Gulf Visas' },
    optPassport: { ar: 'تجديد الجوازات', en: 'Passport Renewal' },
    optOther: { ar: 'أخرى', en: 'Other' },

    // Actions
    send: { ar: 'إرسال الرسالة', en: 'Send Message' },
    sending: { ar: 'جاري الإرسال...', en: 'Sending...' },
    
    // Success State
    thankYou: { ar: 'شكراً لك!', en: 'Thank You!' },
    received: { ar: 'تم استلام طلبك بنجاح. سيقوم فريقنا بمراجعته والتواصل معك قريباً.', en: 'We have received your submission. Our team will review it and contact you shortly.' },
    return: { ar: 'العودة للرئيسية', en: 'Return Home' },
    
    // Error State
    error: { ar: 'عذراً، حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.', en: 'Sorry, something went wrong. Please try again.' }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("https://formcarry.com/s/Wkgz7PcEKPy", {
        method: 'POST',
        headers: { 
          "Accept": "application/json"
        },
        body: formData
      });

      if (response.ok) {
        setFormStatus('success');
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  const handleReturn = () => {
    setFormStatus('idle');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact-form" className="py-24 bg-white scroll-mt-28 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-bgLight rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-50 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header - Hidden on Success */}
        {formStatus !== 'success' && (
          <div className="max-w-2xl mx-auto text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-4xl font-black text-textMain mb-4 relative inline-block">
              {t.title[lang]}
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-20" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </h2>
            <p className="text-secondary text-lg leading-relaxed">{t.subtitle[lang]}</p>
          </div>
        )}

        <div className="max-w-xl mx-auto" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          
          {/* --- SUCCESS STATE --- */}
          {formStatus === 'success' ? (
            <div className="bg-white rounded-[2rem] p-10 md:p-14 shadow-2xl border border-gray-100 text-center animate-in zoom-in duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-blue-50 opacity-50"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-8 shadow-inner ring-8 ring-white">
                  <Check className="text-primary w-10 h-10" strokeWidth={3} />
                </div>
                
                <h3 className="text-4xl font-bold text-textMain mb-4 tracking-tight">
                  {t.thankYou[lang]}
                </h3>
                
                <p className="text-secondary mb-10 text-lg font-medium leading-relaxed">
                  {t.received[lang]}
                </p>
                
                <button 
                  onClick={handleReturn}
                  className="w-full md:w-auto px-12 py-4 bg-textMain text-white rounded-xl font-bold text-lg hover:bg-primary transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 duration-200"
                >
                  {t.return[lang]}
                </button>
              </div>
            </div>
          ) : (
            /* --- FORM STATE --- */
            <div className={`bg-white rounded-[2rem] p-8 md:p-10 shadow-xl border border-gray-100 relative transition-all duration-300 ${formStatus === 'submitting' ? 'opacity-70 pointer-events-none grayscale-[0.5]' : 'opacity-100'}`}>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="flex items-center gap-2 text-sm font-bold text-textMain">
                    <User size={16} className="text-primary" />
                    {t.nameLabel[lang]}
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    placeholder={t.namePlaceholder[lang]} 
                    required 
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-blue-50/50 transition-all outline-none font-medium text-textMain placeholder:text-gray-400"
                  />
                </div>
                
                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-bold text-textMain">
                    <Mail size={16} className="text-primary" />
                    {t.emailLabel[lang]}
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder={t.emailPlaceholder[lang]} 
                    required 
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-blue-50/50 transition-all outline-none font-medium text-textMain placeholder:text-gray-400"
                  />
                </div>

                {/* Service Type Dropdown */}
                <div className="space-y-2">
                  <label htmlFor="service" className="flex items-center gap-2 text-sm font-bold text-textMain">
                    <FileQuestion size={16} className="text-primary" />
                    {t.serviceLabel[lang]}
                  </label>
                  <div className="relative">
                    <select 
                      name="service" 
                      id="service"
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-blue-50/50 transition-all outline-none font-medium text-textMain appearance-none cursor-pointer"
                    >
                      <option value="" disabled selected>{t.selectService[lang]}</option>
                      <option value="General">{t.optGeneral[lang]}</option>
                      <option value="Schengen">{t.optSchengen[lang]}</option>
                      <option value="US">{t.optUS[lang]}</option>
                      <option value="Gulf">{t.optGulf[lang]}</option>
                      <option value="Passport">{t.optPassport[lang]}</option>
                      <option value="Other">{t.optOther[lang]}</option>
                    </select>
                    <div className={`absolute top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 ${lang === 'ar' ? 'left-4' : 'right-4'}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="flex items-center gap-2 text-sm font-bold text-textMain">
                    <MessageSquare size={16} className="text-primary" />
                    {t.messageLabel[lang]}
                  </label>
                  <textarea 
                    name="message" 
                    id="message" 
                    placeholder={t.messagePlaceholder[lang]} 
                    required 
                    rows={4}
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-blue-50/50 transition-all outline-none font-medium text-textMain placeholder:text-gray-400 resize-none"
                  ></textarea>
                </div>
                
                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg shadow-lg shadow-blue-200 hover:bg-primaryDark hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      {t.sending[lang]}
                    </>
                  ) : (
                    <>
                      {t.send[lang]}
                      <Send size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
                    </>
                  )}
                </button>

                {formStatus === 'error' && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-center text-sm font-bold border border-red-100 animate-in fade-in slide-in-from-top-2">
                    {t.error[lang]}
                  </div>
                )}
              
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
