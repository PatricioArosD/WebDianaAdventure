// src/pages/Home.jsx
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';

// Importamos ambas bases de datos
import toursES from '../data/tours_es.json';
import toursEN from '../data/tours_en.json';

const Home = () => {
  // 1. Obtenemos el idioma actual desde el contexto
  const { language, t } = useContext(LanguageContext);
  // 2. Elegimos el JSON correcto dependiendo del idioma
  const toursData = language === 'ES' ? toursES : toursEN;

  // Valdivia primero: los grupales están en "Próximamente" y no conviene abrir con algo no reservable
  const allTours = [
    ...(toursData.valdivia || []).map(tour => ({ ...tour, categoria: 'valdivia' })),
    ...(toursData.grupales || []).map(tour => ({ ...tour, categoria: 'grupales' })),
  ];
  
  // Estado para el carrusel de tarjetas
  const [startIndex, setStartIndex] = useState(0);

  // Funciones para rotar (mostrando siempre 3)
  const nextSlide = () => {
    if (startIndex + 3 >= allTours.length) {
      setStartIndex(0);
    } else {
      setStartIndex(startIndex + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex === 0) {
      setStartIndex(Math.max(0, allTours.length - 3));
    } else {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="home-page">
      
      {/* 1. HERO SECTION (Fondo gigante) */}
      <div className="position-relative d-flex align-items-center" style={{ 
          height: '85vh', 
          minHeight: '600px',
          backgroundImage: 'url("/images/montana_toribio_1.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}></div>
        
        <div className="container position-relative z-2">
          <div className="row">
            <div className="col-lg-6 text-white">
              <h1 className="hero-title font-heading fw-bold mb-3">
                {t.home.heroTitleLead} <br/>Diana Adventure
              </h1>
              <p className="fs-5 mb-4 font-body">
                {t.home.heroText}
              </p>
              <Link to="/nuestras-actividades" className="btn btn-nature rounded-0">
                {t.home.heroBtn}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CARRUSEL SUPERPUESTO (3 Tarjetas) */}
      <div className="container overlap-cards mb-5">
        <div className="carousel-wrapper px-2">
          <h2 className="visually-hidden">{t.nav.activities}</h2>

          <button onClick={prevSlide} className="btn-carousel-side btn-carousel-prev" aria-label={t.ui.prev}>
            <i className="bi bi-chevron-left fs-5"></i>
          </button>

          {/* En móvil se muestran todos en una franja deslizable; en escritorio, solo los 3 de la ventana actual */}
          <div className="row g-4 carousel-track">
            {allTours.map((tour, index) => (
              <div className={`col-md-4 ${index >= startIndex && index < startIndex + 3 ? '' : 'd-md-none'}`} key={tour.id}>
                <Link to={`/tour/${tour.categoria}/${tour.id}`} className="card border-0 rounded-0 shadow h-100 overflow-hidden text-decoration-none">
                  <div className="position-relative">
                    <img 
                      src={tour.thumbnail} 
                      className="tour-card-img" 
                      alt={tour.title}
                    />
                    <div className="position-absolute w-100 text-center" style={{ top: '20px' }}>
                       <h3 className="h4 text-white font-heading fw-bold" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                          {tour.title}
                       </h3>
                    </div>
                  </div>
                  <div className="tour-card-banner">
                    {tour.shortDescription}
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <button onClick={nextSlide} className="btn-carousel-side btn-carousel-next" aria-label={t.ui.next}>
            <i className="bi bi-chevron-right fs-5"></i>
          </button>

        </div>
      </div>

      {/* 3. SECCIÓN: DESCUBRE LA NATURALEZA */}
      <div className="container py-5 mt-4">
        <div className="row align-items-center">
          <div className="col-lg-5 mb-4 mb-lg-0">
            <h2 className="font-heading fw-bold text-nature-green mb-4">
              {t.home.discoverTitle}
            </h2>
            <p className="text-muted mb-4" style={{ lineHeight: '1.8' }}>
              {t.home.discoverText}
            </p>
            <Link to="/nuestras-actividades" className="btn btn-nature rounded-0">
              {t.home.discoverBtn}
            </Link>
          </div>
          
          <div className="col-lg-6 offset-lg-1">
            <div className="row g-2">
              <div className="col-8">
                <img src="/images/oncol_1.jpg" className="img-fluid w-100 h-100 object-fit-cover shadow-sm" alt={t.home.collageAlts[0]} loading="lazy" style={{ minHeight: '300px' }}/>
              </div>
              <div className="col-4 d-flex flex-column gap-2">
                <img src="/images/birdwatching_7.jpg" className="img-fluid w-100 object-fit-cover shadow-sm" alt={t.home.collageAlts[1]} loading="lazy" style={{ height: '145px' }}/>
                <img src="/images/parque_alerce_2.jpg" className="img-fluid w-100 object-fit-cover shadow-sm" alt={t.home.collageAlts[2]} loading="lazy" style={{ height: '145px' }}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* seccion 3.5 : NUESTRO GUÍA */}

      <div className="container-fluid py-5 my-5 position-relative bg-parallax" style={{
        backgroundImage: 'linear-gradient(rgba(31, 44, 35, 0.85), rgba(31, 44, 35, 0.9)), url("/images/oncol_3.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="container py-4">
          <div className="row align-items-center">
            
            {/* Columna Izquierda: Foto del guía */}
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="position-relative shadow-lg">

<img 
  src="/images/guia_rodrigo.jpg" 
  alt="Guía Rodrigo Diana Adventure" 
  loading="lazy"
  className="img-cover-full shadow-lg" // <- Reemplazamos 'img-fluid' por nuestra nueva clase.
/>
                <div className="position-absolute bottom-0 start-0 w-50" style={{ height: '6px', backgroundColor: 'var(--nature-green)' }}></div>
              </div>
            </div>

            {/* Columna Derecha: Texto completo (Ahora en blanco) */}
            <div className="col-lg-6 ps-lg-5">
              <h2 className="font-heading fw-bold text-white mb-4 pb-2" style={{ borderBottom: '2px solid var(--nature-green)', display: 'inline-block' }}>
                {t.home.guideTitle}
              </h2>
              {/* Cambiamos el texto a 'text-light' con un poco de opacidad para no cansar la vista */}
              <p className="text-light opacity-75 mb-4 font-body" style={{ lineHeight: '1.8', fontSize: '1.05rem', }}>
                {t.home.guideText}
              </p>
              {/* Cambiamos el botón oscuro por el botón verde principal para que contraste con el fondo */}
              <Link to="/nosotros#equipo" className="btn btn-nature rounded-0 px-4 py-2 font-heading fw-bold shadow-sm">
                {t.home.guideBtn} <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
            
          </div>
        </div>
      </div>
      {/* 4. FRANJA DE RESERVA */}
      <div className="container-fluid py-5 mt-5 border-top border-bottom" style={{ backgroundColor: '#EBE8DF' }}>
        <div className="container text-center py-3" style={{ maxWidth: '720px' }}>
          <h2 className="h3 font-heading fw-bold mb-3">{t.home.ctaTitle}</h2>
          <p className="font-body mb-4" style={{ lineHeight: '1.8' }}>{t.home.ctaText}</p>
          <Link to="/contacto" className="btn btn-nature rounded-0 px-5">{t.ui.bookNow}</Link>
        </div>
      </div>

    </div>
  );
};

export default Home;