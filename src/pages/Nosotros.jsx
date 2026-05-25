// src/pages/Nosotros.jsx
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';

const Nosotros = () => {
  const { t } = useContext(LanguageContext);

  return (
    <div className="nosotros-page" style={{ backgroundColor: 'var(--nature-bg)', minHeight: '100vh' }}>
      <div className="container pt-5 pb-4 mt-5">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <h1 className="font-heading fw-bold text-nature-green display-4 mb-3">{t.about.title}</h1>
            <p className="lead text-muted font-body">{t.about.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="row g-4 justify-content-center">
          <div className="col-md-5">
            <div className="bg-white p-5 h-100 shadow-sm border-0 border-top border-4" style={{ borderColor: 'var(--nature-green) !important' }}>
              <h3 className="font-heading fw-bold text-nature-green mb-4">{t.about.visionTitle}</h3>
              <p className="text-secondary" style={{ lineHeight: '1.8' }}>{t.about.visionText}</p>
            </div>
          </div>
          <div className="col-md-5">
            <div className="bg-white p-5 h-100 shadow-sm border-0 border-top border-4" style={{ borderColor: 'var(--nature-green) !important' }}>
              <h3 className="font-heading fw-bold text-nature-green mb-4">{t.about.missionTitle}</h3>
              <p className="text-secondary" style={{ lineHeight: '1.8' }}>{t.about.missionText}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5 pb-4 border-bottom border-secondary border-opacity-25">
        <div className="row justify-content-center">
          <div className="col-lg-10 text-center">
            <h2 className="font-heading fw-bold mb-4">{t.about.focusTitle}</h2>
            <p className="text-muted fs-5 mx-auto" style={{ maxWidth: '800px', lineHeight: '1.8' }}>{t.about.focusText}</p>
          </div>
        </div>
      </div>

      <div className="container pb-5" id="equipo" style={{ scrollMarginTop: '100px' }}>        <h2 className="font-heading fw-bold text-center text-nature-green mb-5">{t.about.teamTitle}</h2>
        <div className="row justify-content-center align-items-center mb-5 g-5">
          <div className="col-lg-5">
            <div className="position-relative shadow-lg">
              <img src="/images/Familia.jpg" alt="Familia Diana Adventure" className="img-fluid w-100" style={{ height: '600px', objectFit: 'cover', objectPosition: 'center' }} />
              <div className="position-absolute bottom-0 start-0 w-100" style={{ height: '6px', backgroundColor: 'var(--nature-green)' }}></div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mb-4">
              <h4 className="font-heading fw-bold border-bottom pb-2 mb-3">{t.about.dianaTitle}</h4>
              <p className="text-secondary">{t.about.dianaText}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-heading fw-bold border-bottom pb-2 mb-3">{t.about.rodrigoTitle}</h4>
              <p className="text-secondary">{t.about.rodrigoText}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-heading fw-bold border-bottom pb-2 mb-3">{t.about.constanzaTitle}</h4>
              <p className="text-secondary">{t.about.constanzaText}</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-5 pt-4">
          <p className="fs-5 font-heading fst-italic mb-4">{t.about.ctaDesc}</p>
          <Link to="/nuestras-actividades" className="btn btn-nature rounded-0 px-5 py-3 shadow">{t.about.ctaBtn}</Link>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;