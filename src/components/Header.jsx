// src/components/Header.jsx
import { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  // Extraemos las herramientas del contexto
  const { language, toggleLanguage, t } = useContext(LanguageContext);

  const navClasses = isHome 
    ? "navbar navbar-expand-lg position-absolute w-100 z-3 py-4" 
    : "navbar navbar-expand-lg sticky-top w-100 z-3 py-3 shadow";

  const navStyle = isHome 
    ? { background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)' } 
    : { backgroundColor: 'var(--nature-dark)' };

  return (
    <nav className={navClasses} style={navStyle}>
      <div className="container">
        
        <NavLink className="navbar-brand d-flex align-items-center text-white" to="/">
          <span className="fw-bold fs-3 font-heading text-uppercase text-outline-black">Diana Adventure</span>
        </NavLink>

        <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto text-uppercase fw-semibold" style={{ fontSize: '0.85rem' }}>
            <li className="nav-item">
              <NavLink className="nav-link text-white mx-2 text-outline-black" to="/">{t.nav.home}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white mx-2 text-outline-black" to="/nuestras-actividades">{t.nav.activities}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white mx-2 text-outline-black" to="/nosotros">{t.nav.about}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white mx-2 text-outline-black" to="/contacto">{t.nav.contact}</NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            {/* Botón selector de idioma */}
            <button 
              onClick={toggleLanguage} 
              className="btn btn-sm btn-outline-light rounded-0 text-outline-black fw-bold"
            >
              {language === 'ES' ? 'EN' : 'ES'}
            </button>

            <NavLink to="/contacto" state={{ openForm: true }} className="btn btn-nature rounded-0 shadow-sm">
              {t.nav.book}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;