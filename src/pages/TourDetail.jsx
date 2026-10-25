// src/pages/TourDetail.jsx
import { useParams, Link } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import toursES from '../data/tours_es.json';
import toursEN from '../data/tours_en.json';
import Lightbox from '../components/Lightbox';

const TourDetail = () => {
  const { categoria, id } = useParams();
  const { language, t } = useContext(LanguageContext);
  
  // Estado para controlar la imagen seleccionada para el popup
  const [selectedImage, setSelectedImage] = useState(null);
  
  const toursData = language === 'ES' ? toursES : toursEN;
  const tour = (toursData[categoria] || []).find(x => x.id === id);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // La barra fija tapa el final del footer: reservamos ese espacio en el body mientras está visible
  const hasBookBar = Boolean(tour) && categoria !== 'grupales';
  useEffect(() => {
    if (!hasBookBar) return;
    document.body.classList.add('has-book-bar');
    return () => document.body.classList.remove('has-book-bar');
  }, [hasBookBar]);

  if (!tour) {
    return (
      <div className="container text-center min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <h2 className="font-heading fw-bold text-muted">{t.ui.notFound}</h2>
        <Link to="/nuestras-actividades" className="btn btn-nature mt-4 rounded-0">{t.ui.backActivities}</Link>
      </div>
    );
  }

  return (
    <>
      <div className="tour-detail-page" style={{ backgroundColor: 'var(--nature-bg)', minHeight: '100vh', paddingBottom: '80px' }}>
        <div className="position-relative d-flex align-items-center justify-content-center" style={{ height: '65vh', minHeight: '400px', backgroundColor: 'var(--nature-dark)' }}>
          <img src={tour.thumbnail} alt={tour.title} className="position-absolute w-100 h-100 object-fit-cover" fetchPriority="high" />
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(31, 44, 35, 0.5)' }}></div>
          <div className="position-relative z-2 text-center mt-5">
            <h1 className="display-2 font-heading fw-bold text-white text-outline-black">{tour.title}</h1>
          </div>
        </div>

        {categoria === 'grupales' && (
          <div className="bg-nature-dark">
            <div className="container py-3 d-flex flex-wrap align-items-center justify-content-between gap-3 font-body">
              <div>
                <p className="fw-bold mb-1"><i className="bi bi-hourglass-split me-2" aria-hidden="true"></i>{t.ui.comingSoonTitle}</p>
                <p className="mb-0 small opacity-75">{t.ui.comingSoonText}</p>
              </div>
              <Link to="/nuestras-actividades" className="btn btn-outline-light rounded-0 flex-shrink-0">{t.ui.comingSoonLink}</Link>
            </div>
          </div>
        )}

        <div className="container mt-5">
          <div className="row g-4 g-lg-5">
            <div className="col-lg-8">
              <h2 className="h3 font-heading fw-bold text-nature-green mb-4 border-bottom border-secondary border-opacity-25 pb-3">
                {t.ui.aboutAdventure}
              </h2>
              <p className="fs-5 text-secondary font-body mb-5" style={{ lineHeight: '1.9', whiteSpace: 'pre-line' }}>{tour.description}</p>

              {tour.gallery && tour.gallery.length > 0 && (
                <div className="mt-5">
                  <h3 className="h4 font-heading fw-bold text-nature-dark mb-4">{t.ui.postcards}</h3>
                  <div className="row g-3 gallery-track">
                    {tour.gallery.map((imgSrc, index) => (
                      <div className="col-md-6" key={index}>
                        <div className="gallery-img-wrapper shadow-sm h-100 rounded-1">
                          <button type="button" className="gallery-open p-0 border-0 bg-transparent w-100 d-block" onClick={() => setSelectedImage({ src: imgSrc, alt: `${tour.title} – ${t.ui.photo} ${index + 1}` })} aria-label={`${t.ui.enlarge}: ${tour.title} – ${t.ui.photo} ${index + 1}`}>
                            <img
                              src={imgSrc}
                              alt={`${tour.title} – ${t.ui.photo} ${index + 1}`}
                              loading="lazy"
                              className="img-fluid w-100 gallery-img-zoom"
                              style={{ height: '250px', objectFit: 'cover', cursor: 'zoom-in' }}
                            />
                          </button>
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
                      <h3 className="h6 fw-bold font-heading m-0">{t.ui.duration}</h3>
                      <p className="text-muted small m-0">{tour.duration}</p>
                      {tour.difficulty && <p className="text-muted small m-0 mt-1">{t.ui.difficulty}: <strong>{tour.difficulty}</strong></p>}
                    </div>
                  )}
                  {tour.includes && tour.includes.length > 0 && (
                    <div className="mb-4">
                      <h3 className="h5 font-heading fw-bold text-nature-green mb-3"><i className="bi bi-check-circle-fill me-2"></i>{t.ui.includes}</h3>
                      <ul className="list-unstyled text-secondary small">
                        {tour.includes.map((item, index) => (
                          <li key={index} className="mb-2 d-flex align-items-start"><i className="bi bi-dot text-nature-green fs-5 me-1"></i><span>{item}</span></li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {tour.excludes && tour.excludes.length > 0 && (
                    <div className="mb-4">
                      <h3 className="h5 font-heading fw-bold text-danger mb-3"><i className="bi bi-x-circle-fill me-2"></i>{t.ui.excludes}</h3>
                      <ul className="list-unstyled text-secondary small">
                        {tour.excludes.map((item, index) => (
                          <li key={index} className="mb-2 d-flex align-items-start"><i className="bi bi-dot text-danger fs-5 me-1"></i><span>{item}</span></li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="mt-5 text-center">
                    <p className="font-body fw-bold text-nature-dark mb-2">{t.ui.readyToTravel}</p>
                    {categoria !== 'grupales' && <p className="font-body small text-body-secondary mb-3">{t.ui.priceNote}</p>}

                    {/* Bloqueo del botón para viajes grupales */}
                    {categoria === 'grupales' ? (
                      <>
                        <button className="btn btn-secondary rounded-0 w-100 py-3 shadow-sm" disabled style={{ cursor: 'not-allowed' }}>
                          {t.contact.comingSoon.toUpperCase()}
                        </button>
                        <Link to="/nuestras-actividades" className="d-inline-block mt-3 small text-nature-green fw-semibold">{t.ui.comingSoonLink}</Link>
                      </>
                    ) : (
                      <Link to="/contacto" state={{ tourId: tour.id }} className="btn btn-nature rounded-0 w-100 py-3 shadow-sm">
                        {t.ui.bookNow}
                      </Link>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {categoria !== 'grupales' && (
        <div className="mobile-book-bar d-lg-none position-fixed bottom-0 start-0 end-0 bg-white px-3 pt-3 d-flex align-items-center gap-3" style={{ zIndex: 1030 }}>
          <div className="flex-grow-1 font-body small lh-sm" style={{ minWidth: 0 }}>
            <span className="d-block fw-bold text-truncate">{tour.title}</span>
            <span className="text-body-secondary">{tour.duration?.split(' (')[0]}</span>
          </div>
          <Link to="/contacto" state={{ tourId: tour.id }} className="btn btn-nature rounded-0 flex-shrink-0">{t.ui.bookNow}</Link>
        </div>
      )}

      {selectedImage && (
        <Lightbox src={selectedImage.src} alt={selectedImage.alt} onClose={() => setSelectedImage(null)} />
      )}
    </>
  );
};

export default TourDetail;