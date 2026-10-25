// src/components/Header.jsx
import { useContext, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // El collapse de Bootstrap no se entera de la navegación de React Router
  useEffect(() => {
    document.getElementById('navbarNav')?.classList.remove('show');
  }, [location.pathname]);
  
  // Extraemos las herramientas del contexto
  const { language, toggleLanguage, t } = useContext(LanguageContext);

  // xl y no lg: entre 992 y 1200px el logo, los 4 enlaces y los 2 botones no caben en una fila
  const navClasses = isHome
    ? "navbar navbar-expand-xl position-absolute w-100 z-3 py-4"
    : "navbar navbar-expand-xl sticky-top w-100 z-3 py-3 shadow";

  const navStyle = isHome 
    ? { background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)' } 
    : { backgroundColor: 'var(--nature-dark)' };

  return (
    <nav className={navClasses} style={navStyle} data-bs-theme="dark">
      <div className="container">
        
        <NavLink className="navbar-brand d-flex align-items-center text-white gap-2" to="/">
          <img 
            src="/images/logo-gato.png" 
            alt="Diana Adventure Logo"
            className="brand-logo"
          />
          <span className="brand-name fw-bold font-heading text-uppercase text-outline-black">Diana Adventure Chile</span>
        </NavLink>

        <button className="navbar-toggler border-light border-opacity-50 py-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-label={t.ui.openMenu}>
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

          <div className="d-flex align-items-center gap-3 mt-3 mt-xl-0">
            {/* Botón selector de idioma */}
            <button 
              onClick={toggleLanguage} 
              className="btn btn-sm btn-outline-light rounded-0 text-outline-black fw-bold"
            >
              {language === 'ES' ? 'EN' : 'ES'}
            </button>

            <NavLink to="/contacto" className="btn btn-nature rounded-0 shadow-sm">
              {t.nav.book}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;