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

  // Unimos los grupales y los de Valdivia para el carrusel
  const allTours = [...(toursData.grupales || []), ...(toursData.valdivia || [])];
  
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

  const visibleTours = allTours.slice(startIndex, startIndex + 3);

  return (
    <div className="home-page">
      
      {/* 1. HERO SECTION (Fondo gigante) */}
      <div className="position-relative d-flex align-items-center" style={{ 
          height: '85vh', 
          minHeight: '600px',
          backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}></div>
        
        <div className="container position-relative z-2">
          <div className="row">
            <div className="col-lg-6 text-white">
              <h1 className="font-heading fw-bold mb-3" style={{ fontSize: '3.5rem' }}>
                {language === 'ES' ? 'Parte a la aventura con' : 'Set off on an adventure with'} <br/>Diana Adventure
              </h1>
              <p className="fs-5 mb-4 font-body">
                {language === 'ES' 
                  ? 'Vive experiencias inolvidables en plena naturaleza junto a nosotros.' 
                  : 'Live unforgettable experiences surrounded by nature with us.'}
              </p>
              <Link to="/nuestras-actividades" className="btn btn-nature rounded-0">
                {language === 'ES' ? 'Descubrir Actividades' : 'Discover Activities'}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CARRUSEL SUPERPUESTO (3 Tarjetas) */}
      <div className="container overlap-cards mb-5">
        <div className="carousel-wrapper px-2">
          
          <button onClick={prevSlide} className="btn-carousel-side btn-carousel-prev" aria-label="Anterior">
            <i className="bi bi-chevron-left fs-5"></i>
          </button>

          <div className="row g-4">
            {visibleTours.map((tour) => (
              <div className="col-md-4" key={tour.id}>
                <div className="card border-0 rounded-0 shadow h-100 overflow-hidden">
                  <div className="position-relative">
                    <img 
                      src={tour.thumbnail || "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=500"} 
                      className="tour-card-img" 
                      alt={tour.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=500";
                      }} 
                    />
                    <div className="position-absolute w-100 text-center" style={{ top: '20px' }}>
                       <h4 className="text-white font-heading fw-bold" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                          {tour.title}
                       </h4>
                    </div>
                  </div>
                  <div className="tour-card-banner">
                    {tour.shortDescription || (language === 'ES' ? "Explora paisajes asombrosos" : "Explore amazing landscapes")}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={nextSlide} className="btn-carousel-side btn-carousel-next" aria-label="Siguiente">
            <i className="bi bi-chevron-right fs-5"></i>
          </button>

        </div>
      </div>

      {/* 3. SECCIÓN: DESCUBRE LA NATURALEZA */}
      <div className="container py-5 mt-4">
        <div className="row align-items-center">
          <div className="col-lg-5 mb-4 mb-lg-0">
            <h2 className="font-heading fw-bold text-nature-green mb-4">
              {language === 'ES' ? 'Descubre la Naturaleza en su Estado Puro' : 'Discover Nature in its Purest State'}
            </h2>
            <p className="text-muted mb-4" style={{ lineHeight: '1.8' }}>
              {language === 'ES' 
                ? 'Parte a la aventura con nosotros y vive momentos intensos explorando los paisajes salvajes más hermosos de Chile y el mundo.' 
                : 'Set off on an adventure with us and live intense moments exploring the most beautiful wild landscapes in Chile and the world.'}
            </p>
            <Link to="/nuestras-actividades" className="btn btn-nature rounded-0">
              {language === 'ES' ? 'Saber Más' : 'Learn More'}
            </Link>
          </div>
          
          <div className="col-lg-6 offset-lg-1">
            <div className="row g-2">
              <div className="col-8">
                <img src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=600" className="img-fluid w-100 h-100 object-fit-cover shadow-sm" alt="Naturaleza 1" style={{ minHeight: '300px' }}/>
              </div>
              <div className="col-4 d-flex flex-column gap-2">
                <img src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=300" className="img-fluid w-100 object-fit-cover shadow-sm" alt="Naturaleza 2" style={{ height: '145px' }}/>
                <img src="https://images.unsplash.com/photo-1534008897995-27a23e859048?q=80&w=300" className="img-fluid w-100 object-fit-cover shadow-sm" alt="Ciervo" style={{ height: '145px' }}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* seccion 3.5 : NUESTRO GUÍA */}

      <div className="container-fluid py-5 my-5 position-relative" style={{
        // Reemplaza la URL por otra imagen de bosque/montaña si lo deseas
        backgroundImage: 'linear-gradient(rgba(31, 44, 35, 0.85), rgba(31, 44, 35, 0.9)), url("https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2000")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed' // Esto crea el efecto de que el fondo se queda quieto al hacer scroll
      }}>
        <div className="container py-4">
          <div className="row align-items-center">
            
            {/* Columna Izquierda: Foto del guía */}
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="position-relative shadow-lg">
                <img 
                 src="/images/guia_rodrigo.png" 
                  alt="Guía Rodrigo Diana Adventure" 
                  className="img-fluid w-100 shadow-lg" 
                  style={{ height: '450px', objectFit: 'cover', objectPosition: 'top' }}
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800"; }}
                />
                <div className="position-absolute bottom-0 start-0 w-50" style={{ height: '6px', backgroundColor: 'var(--nature-green)' }}></div>
              </div>
            </div>

            {/* Columna Derecha: Texto completo (Ahora en blanco) */}
            <div className="col-lg-6 ps-lg-5">
              <h2 className="font-heading fw-bold text-white mb-4 pb-2" style={{ borderBottom: '2px solid var(--nature-green)', display: 'inline-block' }}>
                {t.home?.guideTitle || (language === 'ES' ? 'Nuestro Guía' : 'Our Guide')}
              </h2>
              {/* Cambiamos el texto a 'text-light' con un poco de opacidad para no cansar la vista */}
              <p className="text-light opacity-75 mb-4 font-body" style={{ lineHeight: '1.8', fontSize: '1.05rem', textAlign: 'justify' }}>
                {t.home?.guideText || (language === 'ES' 
                  ? 'Guía de Turismo con más de 10 años de experiencia internacional y sólida especialización en interpretación de flora y fauna, conservación y aviturismo. Con una sólida disciplina y excelente condición física forjada a través de la práctica de múltiples deportes a lo largo de mi vida, lidero con éxito expediciones en destinos de alta exigencia como San Pedro de Atacama y Torres del Paine. Combino habilidades avanzadas de seguridad en terreno (certificación WFR) con un perfil bilingüe (inglés/portugués), enfocado en la educación ambiental.' 
                  : 'Tour Guide with over 10 years of international experience and a strong specialization in flora and fauna interpretation, conservation, and birdwatching. With solid discipline and excellent physical condition forged through multiple sports throughout my life, I successfully lead expeditions in highly demanding destinations such as San Pedro de Atacama and Torres del Paine. I combine advanced field safety skills (WFR certification) with a bilingual profile (English/Portuguese), focused on environmental education.')}
              </p>
              {/* Cambiamos el botón oscuro por el botón verde principal para que contraste con el fondo */}
              <a href="/nosotros#equipo" className="btn btn-nature rounded-0 px-4 py-2 font-heading fw-bold shadow-sm">
                {t.home?.guideBtn || (language === 'ES' ? 'Conocer al equipo' : 'Meet the team')} <i className="bi bi-arrow-right ms-2"></i>
              </a>
            </div>
            
          </div>
        </div>
      </div>
      {/* 4. SECCIÓN: TESTIMONIOS */}
      <div className="container-fluid py-5 mt-5 border-top border-bottom" style={{ backgroundColor: '#EBE8DF' }}>
        <div className="container text-center">
          <h3 className="font-heading fw-bold mb-5">
            {language === 'ES' ? 'Ellos Hablan de Nosotros' : 'What They Say About Us'}
          </h3>
          
          <div className="row justify-content-center g-4">
            <div className="col-md-5">
              <div className="bg-white p-4 shadow-sm h-100 rounded-1 position-relative">
                <i className="bi bi-quote fs-1 text-muted opacity-25 position-absolute top-0 start-0 ms-3 mt-2"></i>
                <p className="fst-italic mt-3">
                  {language === 'ES' 
                    ? '"¡Una experiencia increíble! Guías apasionados y paisajes que te quitan el aliento."' 
                    : '"An incredible experience! Passionate guides and breathtaking landscapes."'}
                </p>
                <hr className="w-25 mx-auto" />
                <p className="fw-bold font-heading mb-0 text-end">— Constanza L.</p>
              </div>
            </div>
            <div className="col-md-5">
              <div className="bg-white p-4 shadow-sm h-100 rounded-1 position-relative">
                <i className="bi bi-quote fs-1 text-muted opacity-25 position-absolute top-0 start-0 ms-3 mt-2"></i>
                <p className="fst-italic mt-3">
                  {language === 'ES' 
                    ? '"Una aventura inolvidable. El birdwatching en Valdivia superó mis expectativas, para repetir."' 
                    : '"An unforgettable adventure. Birdwatching in Valdivia exceeded my expectations, would definitely repeat."'}
                </p>
                <hr className="w-25 mx-auto" />
                <p className="fw-bold font-heading mb-0 text-end">— Rodrigo D.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-5">
            <Link to="/contacto" state={{ openForm: true }} className="btn btn-nature rounded-0 px-5">
              {language === 'ES' ? 'RESERVAR AHORA' : 'BOOK NOW'}
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;