// src/components/Footer.jsx
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useContext(LanguageContext);

  return (
    <footer className="footer-bg text-white pt-5 pb-3 mt-auto border-top border-4" style={{ borderColor: 'var(--nature-green) !important' }}>
      <div className="container mt-4">
        <div className="row g-4">
          <div className="col-md-4 mb-4">
            <h5 className="font-heading fw-bold mb-4 fs-4 text-outline-black">Diana Adventure</h5>
            <ul className="list-unstyled font-body">
              <li className="mb-2"><Link to="/nosotros" className="footer-link">{t.footer.aboutUs}</Link></li>
              <li className="mb-2"><Link to="/nuestras-actividades" className="footer-link">{t.footer.activities}</Link></li>
              <li className="mb-2"><Link to="/" className="footer-link">{t.footer.home}</Link></li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="font-heading fw-bold mb-4 fs-5 text-outline-black">{t.footer.practicalInfo}</h5>
            <ul className="list-unstyled font-body">
              <li className="mb-2"><Link to="#" className="footer-link">{t.footer.faq}</Link></li>
              <li className="mb-2"><Link to="#" className="footer-link">{t.footer.terms}</Link></li>
              <li className="mb-2"><Link to="#" className="footer-link">{t.footer.privacy}</Link></li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="font-heading fw-bold mb-4 fs-5 text-outline-black">{t.footer.contactUs}</h5>
            <ul className="list-unstyled font-body">
              <li className="mb-3 text-outline-black"><i className="bi bi-envelope me-2"></i> hola@dianaadventure.cl</li>
              <li className="mb-4 text-outline-black"><i className="bi bi-geo-alt me-2"></i> Los Andes, Chile</li>
            </ul>
            <div className="d-flex gap-3">
              <a href="#" className="text-white fs-4 text-outline-black"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white fs-4 text-outline-black"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white fs-4 text-outline-black"><i className="bi bi-whatsapp"></i></a>
            </div>
          </div>
        </div>
        <hr className="my-4 border-light opacity-50" />
        <div className="text-center pb-2">
          <small className="text-outline-black font-body">&copy; {new Date().getFullYear()} Diana Adventure - {t.footer.rights}</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;