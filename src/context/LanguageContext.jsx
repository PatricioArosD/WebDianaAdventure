// src/context/LanguageContext.jsx
import { createContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Leemos el idioma guardado en el navegador, por defecto 'ES'
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'ES');

  // Cada vez que cambia el idioma, lo guardamos en el navegador
  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  // Esta variable 't' tendrá todo el diccionario del idioma actual
  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'ES' ? 'EN' : 'ES'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};