import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';

const TourCard = ({ tour, categoria }) => {
  // Extraemos language también para saber qué idioma mostrar en la etiqueta
  const { t, language } = useContext(LanguageContext); 
  
  // Nuevo estado para controlar la visibilidad del modal de la imagen
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="card border-0 rounded-0 shadow h-100 overflow-hidden tour-card-hover bg-white position-relative">
        
        {/* Etiqueta de Próximamente solo para grupales */}
        {categoria === 'grupales' && (
          <div className="position-absolute top-0 start-0 m-3 z-2">
            <span className="badge bg-dark text-white rounded-0 px-3 py-2 font-body shadow-sm" style={{ letterSpacing: '2px' }}>
              {language === 'ES' ? 'PRÓXIMAMENTE' : 'COMING SOON'}
            </span>
          </div>
        )}

        <div className="position-relative">
          {/* Imagen ahora con onClick y cursor de lupa */}
          <img 
            src={tour.thumbnail} 
            className="tour-card-img" 
            alt={tour.title} 
            loading="lazy"
            onClick={() => setShowModal(true)}
            style={{ cursor: 'zoom-in' }} 
          />
          {/* Añadido pointerEvents: 'none' para que el clic pase a través del texto hacia la imagen */}
          <div className="position-absolute w-100 text-center" style={{ top: '20px', pointerEvents: 'none' }}>
             <h4 className="text-white font-heading fw-bold" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}>
               {tour.title}
             </h4>
          </div>
        </div>
        
        <div className="card-body d-flex flex-column text-center p-4">
          <p className="card-text text-muted font-body flex-grow-1 mb-4" style={{ fontSize: '0.95rem' }}>{tour.shortDescription}</p>
          <Link to={`/tour/${categoria}/${tour.id}`} className="btn btn-nature rounded-0 w-100">
            {t.ui.viewDetails}
          </Link>
        </div>
      </div>

      {/* MODAL DEL VISOR DE IMÁGENES */}
      {showModal && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', zIndex: 9999, cursor: 'zoom-out' }}
          onClick={() => setShowModal(false)}
        >
          <button 
            className="btn-close btn-close-white position-absolute top-0 end-0 m-4" 
            onClick={() => setShowModal(false)}
            aria-label="Cerrar"
          ></button>
          
          <img 
            src={tour.thumbnail} 
            alt={tour.title} 
            className="img-fluid rounded shadow-lg" 
            style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain', cursor: 'default' }}
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </>
  );
};

export default TourCard;