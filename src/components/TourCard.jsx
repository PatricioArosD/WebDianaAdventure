// src/components/TourCard.jsx
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';

const TourCard = ({ tour, categoria }) => {
  const { t } = useContext(LanguageContext);

  return (
    <div className="card border-0 rounded-0 shadow h-100 overflow-hidden tour-card-hover bg-white">
      <div className="position-relative">
        <img src={tour.thumbnail} className="tour-card-img" alt={tour.title} />
        <div className="position-absolute w-100 text-center" style={{ top: '20px' }}>
           <h4 className="text-white font-heading fw-bold" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}>{tour.title}</h4>
        </div>
      </div>
      <div className="card-body d-flex flex-column text-center p-4">
        <p className="card-text text-muted font-body flex-grow-1 mb-4" style={{ fontSize: '0.95rem' }}>{tour.shortDescription}</p>
        <Link to={`/tour/${categoria}/${tour.id}`} className="btn btn-nature rounded-0 w-100">
          {t.ui.viewDetails}
        </Link>
      </div>
    </div>
  );
};

export default TourCard;