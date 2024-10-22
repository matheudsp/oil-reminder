import React, { createContext, useState, useEffect, useContext } from 'react';

import i18n, { setAppLanguage, loadLocale } from '@/app/config/i18n';


const LanguageContext = createContext({
  language: 'en',
  changeLanguage: (lang: string) => {},
});

export const LanguageProvider = ({ children }:{children:React.ReactNode} ) => {
  const [language, setLanguage] = useState(i18n.locale);


  useEffect(() => {
    const initializeLanguage = async () => {
      await loadLocale();
      setLanguage(i18n.locale);  
    };
    initializeLanguage();
  }, []);

  
  const changeLanguage = async (lang: string) => {
    await setAppLanguage(lang);
    setLanguage(lang);  
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};


export const useLanguage = () => useContext(LanguageContext);
