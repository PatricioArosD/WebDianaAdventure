// src/pages/Actividades.jsx
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import toursES from '../data/tours_es.json';
import toursEN from '../data/tours_en.json';
import TourCard from '../components/TourCard';

const Actividades = () => {
  const { language, t } = useContext(LanguageContext);
  const toursData = language === 'ES' ? toursES : toursEN;

  const grupales = toursData.grupales || [];
  const valdivia = toursData.valdivia || [];

  return (
    <div className="actividades-page" style={{ backgroundColor: 'var(--nature-bg)', minHeight: '100vh', paddingTop: '120px' }}>
      <div className="container mb-5 pb-5">

        <div className="text-center mb-5">
          <h1 className="font-heading fw-bold text-nature-green mb-3">{t.activities.title}</h1>
          <p className="text-muted font-body mx-auto" style={{ maxWidth: '640px', fontSize: '1.1rem' }}>{t.activities.intro}</p>
        </div>

        <section className="mb-5 pb-4">
          <h2 className="font-heading fw-bold text-nature-dark mb-4 border-bottom border-2 pb-2" style={{ '--bs-border-color': 'var(--nature-green)' }}>
            {t.activities.valdiviaTitle}
          </h2>
          <div className="row g-4">
            {valdivia.map((tour) => (
              <div className="col-md-6" key={tour.id}>
                <TourCard tour={tour} categoria="valdivia" />
              </div>
            ))}
          </div>
        </section>

        {/* Lo no reservable va al final y en formato compacto: informa sin competir con lo que sí se vende */}
        <section aria-labelledby="group-trips-title">
          <div className="d-flex flex-wrap align-items-baseline gap-2 mb-1">
            <h2 id="group-trips-title" className="h4 font-heading fw-bold text-nature-dark mb-0">{t.activities.groupTitle}</h2>
            <span className="badge bg-dark rounded-0 font-body fw-semibold" style={{ letterSpacing: '1px' }}>{t.contact.comingSoon.toUpperCase()}</span>
          </div>
          <p className="text-muted font-body small mb-3">{t.activities.groupNote}</p>
          <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-5 g-3">
            {grupales.map((tour) => (
              <div className="col" key={tour.id}>
                <Link to={`/tour/grupales/${tour.id}`} className="coming-soon-item d-block text-decoration-none">
                  <div className="overflow-hidden mb-2">
                    <img src={tour.thumbnail} alt="" loading="lazy" className="w-100 object-fit-cover" style={{ height: '110px' }} />
                  </div>
                  <span className="font-heading fw-semibold">{tour.title}</span>
                </Link>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Actividades;
