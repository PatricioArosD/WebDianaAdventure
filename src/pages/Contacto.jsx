// src/pages/Contacto.jsx
import { useState, useEffect, useContext, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import toursES from '../data/tours_es.json';
import toursEN from '../data/tours_en.json';

const MESSAGE_MAX = 1000;
const WHATSAPP_NUMBER = '56984799231';

// La fecha mínima es hoy en hora local; toISOString() daría la fecha UTC y en la noche chilena ya sería mañana
const todayLocal = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const Contacto = () => {
  const location = useLocation();
  const { t, language } = useContext(LanguageContext);
  const formRef = useRef(null);

  const toursData = language === 'ES' ? toursES : toursEN;
  // El valor enviado es siempre el título en español: el correo lo lee la agencia
  const valdiviaTours = (toursData.valdivia || []).map((tour) => ({
    label: tour.title,
    value: toursES.valdivia.find((x) => x.id === tour.id)?.title || tour.title,
    id: tour.id,
  }));
  const preselected = valdiviaTours.find((x) => x.id === location.state?.tourId)?.value || '';

  const [service, setService] = useState(preselected);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/hola@dianaadventure.cl', {
        method: 'POST', body: new FormData(e.target), headers: { Accept: 'application/json' }
      });
      if (response.ok) setIsSuccess(true);
      else setError(t.contact.errorServer);
    } catch {
      setError(t.contact.errorNetwork);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const data = new FormData(formRef.current);
    const date = data.get('Fecha');
    const formattedDate = date
      ? new Intl.DateTimeFormat(language === 'ES' ? 'es-CL' : 'en-US', { dateStyle: 'long' })
          .format(new Date(...date.split('-').map((n, i) => (i === 1 ? n - 1 : +n))))
      : '';
    const tourLabel = valdiviaTours.find((x) => x.value === data.get('Servicio'))?.label || data.get('Servicio');
    const lines = [
      t.contact.waIntro,
      tourLabel && `${t.contact.serviceLabel}: ${tourLabel}`,
      formattedDate && `${t.contact.dateLabel}: ${formattedDate}`,
      data.get('Personas') && `${t.contact.peopleLabel}: ${data.get('Personas')}`,
      data.get('Nombre') && `${t.contact.waName}: ${data.get('Nombre')}`,
    ].filter(Boolean);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
  };

  const icons = ['bi-compass', 'bi-tree', 'bi-shield-check'];
  const labelClass = 'form-label text-white opacity-75 font-body small text-uppercase';

  return (
    <div className="contacto-page" style={{ backgroundColor: 'var(--nature-bg)', minHeight: '100vh', paddingBottom: '80px', paddingTop: '120px' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="text-nature-green fw-bold display-5 font-heading">{t.contact.title}</h1>
          <p className="lead text-secondary font-body mx-auto col-lg-8">{t.contact.subtitle}</p>
        </div>

        <div className="row justify-content-center mb-5 pb-4">
          <div className="col-lg-8">
            <div className="card bg-nature-dark text-white border-0 shadow-lg rounded-1 overflow-hidden">
              <div className="card-body p-4 p-md-5">
                {isSuccess ? (
                  <div className="text-center py-4" role="status">
                    <div className="display-1 mb-3 text-success"><i className="bi bi-check-circle" aria-hidden="true"></i></div>
                    <h2 className="h3 fw-bold font-heading mb-3">{t.contact.successTitle}</h2>
                    <p className="lead font-body text-light opacity-75 mb-4">{t.contact.successDesc}</p>
                    <div className="d-flex flex-wrap gap-3 justify-content-center">
                      <Link to="/nuestras-actividades" className="btn btn-nature rounded-0 px-4">{t.contact.successActivities}</Link>
                      <Link to="/" className="btn btn-outline-light rounded-0 px-4">{t.contact.successHome}</Link>
                    </div>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="form-dark">
                    <h2 className="h3 fw-bold font-heading mb-4 text-center">{t.contact.formTitle}</h2>
                    <input type="hidden" name="_subject" value="¡Nueva solicitud de aventura en Diana Adventure!" />
                    <input type="hidden" name="_captcha" value="false" />

                    <div className="mb-3">
                      <label htmlFor="contact-service" className={labelClass}>{t.contact.serviceLabel}</label>
                      <select id="contact-service" name="Servicio" className="form-select bg-transparent text-white border-secondary rounded-0" value={service} onChange={(e) => setService(e.target.value)} required>
                        <option value="" className="text-dark">{t.contact.services.placeholder}</option>
                        <optgroup label={t.contact.services.valdiviaGroup} className="text-dark">
                          {valdiviaTours.map((tour) => (
                            <option key={tour.id} value={tour.value} className="text-dark">{tour.label}</option>
                          ))}
                        </optgroup>
                        <optgroup label={t.contact.services.groupTrips} className="text-dark">
                          <option value="Torres del Paine" className="text-muted" disabled>{t.contact.services.opt2} · {t.contact.comingSoon}</option>
                          <option value="Internacional" className="text-muted" disabled>{t.contact.services.opt3} · {t.contact.comingSoon}</option>
                        </optgroup>
                        <option value="Otros" className="text-dark">{t.contact.services.opt4}</option>
                      </select>
                    </div>

                    <div className="row">
                      <div className="col-sm-7 mb-3">
                        <label htmlFor="contact-date" className={labelClass}>{t.contact.dateLabel} <span className="text-lowercase">{t.contact.optional}</span></label>
                        <input id="contact-date" type="date" name="Fecha" min={todayLocal()} className="form-control bg-transparent text-white border-secondary rounded-0" />
                      </div>
                      <div className="col-sm-5 mb-3">
                        <label htmlFor="contact-people" className={labelClass}>{t.contact.peopleLabel}</label>
                        <input id="contact-people" type="number" name="Personas" min="1" max="30" inputMode="numeric" className="form-control bg-transparent text-white border-secondary rounded-0" required />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="contact-name" className={labelClass}>{t.contact.nameLabel}</label>
                        <input id="contact-name" type="text" name="Nombre" autoComplete="name" maxLength="100" className="form-control bg-transparent text-white border-secondary rounded-0" required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="contact-email" className={labelClass}>{t.contact.emailLabel}</label>
                        <input id="contact-email" type="email" name="Email" autoComplete="email" maxLength="150" className="form-control bg-transparent text-white border-secondary rounded-0" required />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="contact-phone" className={labelClass}>{t.contact.phoneLabel} <span className="text-lowercase">{t.contact.optional}</span></label>
                      <input id="contact-phone" type="tel" name="Telefono" autoComplete="tel" maxLength="30" placeholder="+56 9 1234 5678" className="form-control bg-transparent text-white border-secondary rounded-0" />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="contact-message" className={`${labelClass} d-flex justify-content-between`}>
                        <span>{t.contact.mindLabel} <span className="text-lowercase">{t.contact.optional}</span></span>
                        <span className={message.length >= MESSAGE_MAX ? 'text-warning' : ''} aria-live="polite">{message.length}/{MESSAGE_MAX}</span>
                      </label>
                      {/* maxLength recorta lo pegado en vez de descartarlo entero */}
                      <textarea id="contact-message" name="Mensaje" className="form-control bg-transparent text-white border-secondary rounded-0" rows="4" maxLength={MESSAGE_MAX} value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t.contact.mindPlaceholder}></textarea>
                    </div>

                    <div className="mb-4 form-check">
                      <input type="checkbox" className="form-check-input bg-transparent border-secondary" id="termsCheck" required />
                      <label className="form-check-label text-white opacity-75 font-body small" htmlFor="termsCheck">
                        {t.contact.termsPrefix}<Link to="/terminos" className="text-white text-decoration-underline fw-semibold" target="_blank">{t.contact.termsLink}</Link>.
                      </label>
                    </div>

                    {error && (
                      <div className="form-error d-flex gap-2 align-items-start p-3 mb-4 small font-body" role="alert">
                        <i className="bi bi-exclamation-triangle-fill flex-shrink-0" aria-hidden="true"></i>
                        <span>{error}</span>
                      </div>
                    )}

                    <button type="submit" className="btn btn-nature rounded-0 w-100 py-3" disabled={isSubmitting}>
                      {isSubmitting ? t.contact.btnSending : t.contact.btnSend}
                    </button>

                    <p className="text-center mt-4 mb-0 font-body small">
                      <span className="opacity-75">{t.contact.whatsappPrompt} </span>
                      <button type="button" onClick={openWhatsApp} className="btn btn-link p-0 align-baseline text-white fw-semibold small">
                        <i className="bi bi-whatsapp me-1" aria-hidden="true"></i>{t.contact.whatsappBtn}
                      </button>
                    </p>
                  </form>
                )}
              </div>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-4 mt-4 font-body small">
              <span><i className="bi bi-geo-alt me-1 text-nature-green" aria-hidden="true"></i>{t.contact.baseTitle}: {t.contact.baseLocation}</span>
              <span><i className="bi bi-envelope me-1 text-nature-green" aria-hidden="true"></i>{t.contact.writeUs}: <a href="mailto:hola@dianaadventure.cl" className="text-reset">hola@dianaadventure.cl</a></span>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {t.contact.features.map((item, idx) => (
            <div className="col-md-4" key={idx}>
              <div className="card h-100 border-0 shadow-sm text-center p-4 bg-white" style={{ borderTop: '4px solid var(--nature-green)' }}>
                <div className="mb-3"><i className={`bi ${icons[idx]} text-nature-green`} style={{ fontSize: '3rem' }} aria-hidden="true"></i></div>
                <h3 className="h4 font-heading fw-bold mb-3 text-nature-dark">{item.title}</h3>
                <p className="text-muted font-body mb-0">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contacto;
