// src/pages/TourDetail.jsx
import { useParams, Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import toursES from '../data/tours_es.json';
import toursEN from '../data/tours_en.json';

const TourDetail = () => {
  const { categoria, id } = useParams();
  const { language, t } = useContext(LanguageContext);
  
  const toursData = language === 'ES' ? toursES : toursEN;
  const allTours = [...(toursData.grupales || []), ...(toursData.valdivia || [])];
  const tour = allTours.find(t => t.id === id);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!tour) {
    return (
      <div className="container text-center min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <h2 className="font-heading fw-bold text-muted">{t.ui.notFound}</h2>
        <Link to="/nuestras-actividades" className="btn btn-nature mt-4 rounded-0">{t.ui.backActivities}</Link>
      </div>
    );
  }

  return (
    <div className="tour-detail-page" style={{ backgroundColor: 'var(--nature-bg)', minHeight: '100vh', paddingBottom: '80px' }}>
      <div className="position-relative d-flex align-items-center justify-content-center" style={{ height: '65vh', minHeight: '400px', backgroundColor: 'var(--nature-dark)' }}>
        <img src={tour.thumbnail} alt={tour.title} className="position-absolute w-100 h-100 object-fit-cover" />
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(31, 44, 35, 0.5)' }}></div>
        <div className="position-relative z-2 text-center mt-5">
          <h1 className="display-2 font-heading fw-bold text-white text-outline-black">{tour.title}</h1>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row g-5">
          <div className="col-lg-8">
            <h3 className="font-heading fw-bold text-nature-green mb-4 border-bottom border-secondary border-opacity-25 pb-3">
              {t.ui.aboutAdventure}
            </h3>
            <p className="fs-5 text-secondary font-body mb-5" style={{ lineHeight: '1.9', whiteSpace: 'pre-line' }}>{tour.description}</p>

            {tour.gallery && tour.gallery.length > 0 && (
              <div className="mt-5">
                <h4 className="font-heading fw-bold text-nature-dark mb-4">{t.ui.postcards}</h4>
                <div className="row g-3">
                  {tour.gallery.map((imgSrc, index) => (
                    <div className="col-md-6" key={index}>
                      <div className="gallery-img-wrapper shadow-sm h-100 rounded-1">
                        <img src={imgSrc} alt="Gallery" className="img-fluid w-100 gallery-img-zoom" style={{ height: '250px', objectFit: 'cover' }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-lg rounded-0 bg-white sticky-top" style={{ top: '120px', zIndex: 1 }}>
              <div className="card-body p-4 p-lg-5">
                {tour.duration && (
                  <div className="mb-4 text-center border-bottom pb-3">
                    <i className="bi bi-clock-history fs-3 text-nature-green mb-2"></i>
                    <h6 className="fw-bold font-heading m-0">{t.ui.duration}</h6>
                    <p className="text-muted small m-0">{tour.duration}</p>
                  </div>
                )}
                {tour.includes && tour.includes.length > 0 && (
                  <div className="mb-4">
                    <h5 className="font-heading fw-bold text-nature-green mb-3"><i className="bi bi-check-circle-fill me-2"></i>{t.ui.includes}</h5>
                    <ul className="list-unstyled text-secondary small">
                      {tour.includes.map((item, index) => (
                        <li key={index} className="mb-2 d-flex align-items-start"><i className="bi bi-dot text-nature-green fs-5 me-1"></i><span>{item}</span></li>
                      ))}
                    </ul>
                  </div>
                )}
                {tour.excludes && tour.excludes.length > 0 && (
                  <div className="mb-4">
                    <h5 className="font-heading fw-bold text-danger mb-3"><i className="bi bi-x-circle-fill me-2"></i>{t.ui.excludes}</h5>
                    <ul className="list-unstyled text-secondary small">
                      {tour.excludes.map((item, index) => (
                        <li key={index} className="mb-2 d-flex align-items-start"><i className="bi bi-dot text-danger fs-5 me-1"></i><span>{item}</span></li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-5 text-center">
                  <p className="font-body fw-bold text-nature-dark mb-2">{t.ui.readyToTravel}</p>
                  <Link to="/contacto" state={{ openForm: true }} className="btn btn-nature rounded-0 w-100 py-3 shadow-sm">{t.ui.bookNow}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;