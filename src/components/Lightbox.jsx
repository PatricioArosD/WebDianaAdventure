// src/components/Lightbox.jsx
import { useEffect, useRef, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const Lightbox = ({ src, alt, onClose }) => {
  const { t } = useContext(LanguageContext);
  const closeRef = useRef(null);
  // En un ref para que el efecto corra solo al abrir, aunque el padre pase una función nueva en cada render
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; });

  // Esc cierra, el foco entra al visor y vuelve al elemento que lo abrió al cerrarse
  useEffect(() => {
    const opener = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onCloseRef.current();
      if (e.key === 'Tab') { e.preventDefault(); closeRef.current?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      opener?.focus?.();
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', zIndex: 9999, cursor: 'zoom-out' }}
      onClick={onClose}
    >
      <button ref={closeRef} type="button" className="btn-close btn-close-white position-absolute top-0 end-0 m-4" onClick={onClose} aria-label={t.ui.close}></button>
      <img
        src={src}
        alt={alt}
        className="img-fluid rounded shadow-lg"
        style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain', cursor: 'default' }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default Lightbox;
