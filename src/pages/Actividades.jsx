// src/pages/Actividades.jsx
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
// Importamos ambos JSON
import toursES from '../data/tours_es.json';
import toursEN from '../data/tours_en.json';
import TourCard from '../components/TourCard';

const Actividades = () => {
  const { language, t } = useContext(LanguageContext);

  // Elegimos el JSON correcto basado en el idioma actual
  const toursData = language === 'ES' ? toursES : toursEN;

  const grupales = toursData.grupales || [];
  const valdivia = toursData.valdivia || [];

  return (
    <div className="actividades-page" style={{ backgroundColor: 'var(--nature-bg)', minHeight: '100vh', paddingTop: '120px' }}>
      <div className="container mb-5 pb-5">
        
        {/* Cabecera traducida desde tu diccionario (translations.js) */}
        <div className="text-center mb-5">
          <h1 className="font-heading fw-bold text-nature-green mb-3">
            {language === 'ES' ? 'Nuestras Actividades' : 'Our Activities'}
          </h1>
          <p className="text-muted font-body mx-auto" style={{ maxWidth: '700px', fontSize: '1.1rem' }}>
            {language === 'ES' 
              ? 'Descubre el mundo con nuestras expediciones internacionales o sumérgete en la naturaleza con nuestras experiencias locales.' 
              : 'Discover the world with our international expeditions or immerse yourself in nature with our local experiences.'}
          </p>
        </div>

        {/* SECCIÓN 1 */}
        <div className="mb-5">
          <h2 className="font-heading fw-bold text-nature-dark mb-4 border-bottom border-2 pb-2" style={{ borderColor: 'var(--nature-green) !important' }}>
            {language === 'ES' ? 'Viajes Grupales y Expediciones' : 'Group Trips and Expeditions'}
          </h2>
          <div className="row g-4">
            {grupales.map((tour) => (
              <div className="col-md-4" key={tour.id}>
                <TourCard tour={tour} categoria="grupales" />
              </div>
            ))}
          </div>
        </div>

        {/* SECCIÓN 2 */}
        <div className="mb-5">
          <h2 className="font-heading fw-bold text-nature-dark mb-4 border-bottom border-2 pb-2" style={{ borderColor: 'var(--nature-green) !important' }}>
             {language === 'ES' ? 'Experiencias en Valdivia' : 'Experiences in Valdivia'}
          </h2>
          <div className="row g-4">
            {valdivia.map((tour) => (
              <div className="col-md-4" key={tour.id}>
                <TourCard tour={tour} categoria="valdivia" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Actividades;