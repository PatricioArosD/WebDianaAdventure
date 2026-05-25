// src/router/AppRouter.jsx
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Actividades from '../pages/Actividades'; // Nueva página unificada
import TourDetail from '../pages/TourDetail';
import Nosotros from '../pages/Nosotros';
import Contacto from '../pages/Contacto';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nuestras-actividades" element={<Actividades />} />
      <Route path="/tour/:categoria/:id" element={<TourDetail />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/contacto" element={<Contacto />} />
    </Routes>
  );
};