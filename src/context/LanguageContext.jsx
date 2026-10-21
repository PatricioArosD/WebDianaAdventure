// src/context/LanguageContext.jsx
import { createContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

// eslint-disable-next-line react-refresh/only-export-components -- contexto y provider juntos a propósito
export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Leemos el idioma guardado en el navegador, por defecto 'ES'
  // Cualquier valor distinto de 'EN' (corrupto o editado a mano) cae en 'ES' para no romper translations[language]
  const [language, setLanguage] = useState(localStorage.getItem('lang') === 'EN' ? 'EN' : 'ES');

  // Cada vez que cambia el idioma, lo guardamos en el navegador
  useEffect(() => {
    localStorage.setItem('lang', language);
    document.documentElement.lang = language.toLowerCase();
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