const HeroCarousel = () => {
  return (
    <div id="heroCarousel" className="carousel slide carousel-fade mb-5 shadow-lg" data-bs-ride="carousel">
      
      {/* Indicadores (Puntitos) */}
      <div className="carousel-indicators mb-4 z-3">
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" aria-current="true"></button>
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
      </div>
      
      <div className="carousel-inner">
        
        {/* Slide 1 */}
        <div className="carousel-item active hero-carousel-item" data-bs-interval="5000">
          <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070" className="d-block w-100" alt="Paisaje Montaña" />
          <div className="carousel-overlay"></div>
          <div className="hero-caption">
            <h1 className="display-4 fw-bold text-white mb-3 text-uppercase" style={{ letterSpacing: '2px'}}>Descubre el mundo</h1>
            <p className="fs-5 text-light mb-4 d-none d-md-block">Experiencias reales con gente local en cada destino de la Patagonia al mundo.</p>
            <button className="btn btn-patagonia btn-lg rounded-pill px-5 shadow">Explorar Rutas</button>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="carousel-item hero-carousel-item" data-bs-interval="5000">
          <img src="https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2070" className="d-block w-100" alt="Templo Tailandia" />
          <div className="carousel-overlay"></div>
          <div className="hero-caption">
            <h1 className="display-4 fw-bold text-white mb-3 text-uppercase" style={{ letterSpacing: '2px'}}>Aventuras en Asia</h1>
            <p className="fs-5 text-light mb-4 d-none d-md-block">Sumérgete en la cultura de Tailandia, Taiwán y Japón.</p>
            <button className="btn btn-patagonia btn-lg rounded-pill px-5 shadow">Ver Destinos</button>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="carousel-item hero-carousel-item" data-bs-interval="5000">
          <img src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069" className="d-block w-100" alt="Torres del Paine" />
          <div className="carousel-overlay"></div>
          <div className="hero-caption">
            <h1 className="display-4 fw-bold text-white mb-3 text-uppercase" style={{ letterSpacing: '2px'}}>Birdwatching Valdivia</h1>
            <p className="fs-5 text-light mb-4 d-none d-md-block">Conecta con la naturaleza en su estado más puro en el Río Cutipay.</p>
            <button className="btn btn-patagonia btn-lg rounded-pill px-5 shadow">Tours Locales</button>
          </div>
        </div>

      </div>
      
      {/* Botones laterales ocultos en móvil para no ensuciar la imagen, visibles en PC */}
      <button className="carousel-control-prev d-none d-md-flex z-3" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next d-none d-md-flex z-3" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};

export default HeroCarousel;