"use client"
import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaPhone, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

function Contact() {
  const t = useTranslations('contactinfo');  // Load the translations for 'contactinfo'
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    // Wait until mounted in the browser
    setIsClient(true);
  }, []);

  return (
    <section className="pb-16 text-white">
      <div className="container px-6 mx-auto">
        <div className="">
          <h2 className="text-black text-xl lg:text-[25px] leading-tight text-center mb-10 font-semibold">
            {t('contacts')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="bg-[#052C46] p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <FaMapMarkerAlt className="text-2xl mr-4 text-white" />
                <span className="text-[13px] lg:text-[20px] leading-relaxed text-white">
                  {t("address").split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
                </span>
              </div>

              <div className="flex items-center mb-4">
                <FaPhone className="text-2xl mr-4 text-white" />
                <span className="text-[13px] lg:text-[20px] leading-relaxed text-white">
                  {t('batumi')}: <br /> +995557394374, <br /> +995568613022 <br />
                  {t('tbilisi')}: <br /> +995557226880
                </span>
              </div>

              <div className="flex items-center mb-4">
                <FaEnvelope className="text-2xl mr-4 text-white" />
                <a href="mailto:kipianistore@gmail.com" className="text-[16px] lg:text-[20px] leading-relaxed text-white">
                  kipianistore@gmail.com
                </a>
              </div>

              <div className="flex items-center mb-4">
                <FaClock className="text-2xl mr-4 text-white" />
                <div className="text-[13px] lg:text-[20px] leading-relaxed text-white">
                  <p>{t('mondayToFriday')}</p>
                  <p>09:00 - 18:00</p>
                  <p>{t('saturday')} 10:00 - 14:00</p>
                  <p>{t('sunday')}</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-lg overflow-hidden">
            {isClient && (
        <iframe
          width="100%"
          height="100%"
          className="border-0 w-full h-full"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.203682968321!2d41.6285049!3d41.6399867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40678700245cd783%3A0xa1c772006499c03c!2sSleep%26Bed%20Georgia!5e0!3m2!1sen!2s!4v1712549012345"
        ></iframe>
      )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
