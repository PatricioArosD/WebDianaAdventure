// src/pages/Contacto.jsx
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';

const Contacto = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useContext(LanguageContext);
  
  const [showForm, setShowForm] = useState(location.state?.openForm || false);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleMessageChange = (e) => {
    if (e.target.value.length <= 300) setMessage(e.target.value);
  };
  const charCount = message.length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);

    try {
      const response = await fetch("https://formsubmit.co/ajax/hola@dianaadventure.cl", {
        method: "POST", body: formData, headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => { navigate('/'); }, 3500);
      } else {
        alert('Error');
        setIsSubmitting(false);
      }
    } catch (error) {
      alert('Error de red.');
      setIsSubmitting(false);
    }
  };

  const icons = ["bi-compass", "bi-tree", "bi-shield-check"];

  return (
    <div className="contacto-page" style={{ backgroundColor: 'var(--nature-bg)', minHeight: '100vh', paddingBottom: '80px', paddingTop: '120px' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="text-nature-green fw-bold display-5 font-heading">{t.contact.title}</h1>
          <p className="lead text-secondary font-body mx-auto col-lg-8">{t.contact.subtitle}</p>
        </div>

        <div className="row g-4 mb-5 pb-4">
           {t.contact.features.map((item, idx) => (
             <div className="col-md-4" key={idx}>
               <div className="card h-100 border-0 shadow-sm text-center p-4 bg-white" style={{ borderTop: '4px solid var(--nature-green)' }}>
                  <div className="mb-3"><i className={`bi ${icons[idx]} text-nature-green`} style={{ fontSize: '3rem' }}></i></div>
                  <h4 className="font-heading fw-bold mb-3 text-nature-dark">{item.title}</h4>
                  <p className="text-muted font-body mb-0">{item.desc}</p>
               </div>
             </div>
           ))}
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card bg-nature-dark text-white border-0 shadow-lg rounded-1 overflow-hidden" style={{ minHeight: '450px' }}>
              <div className="card-body p-5 d-flex align-items-center justify-content-center">
                {isSuccess ? (
                  <div className="text-center py-4">
                    <div className="display-1 mb-3 text-success"><i className="bi bi-check-circle"></i></div>
                    <h3 className="fw-bold font-heading mb-3">{t.contact.successTitle}</h3>
                    <p className="lead font-body text-light opacity-75 mb-0">{t.contact.successDesc}</p>
                  </div>
                ) : showForm ? (
                  <div className="text-start w-100">
                    <h3 className="fw-bold font-heading mb-4 text-center">{t.contact.formTitle}</h3>
                    <form onSubmit={handleSubmit}>
                      <input type="hidden" name="_subject" value="¡Nueva solicitud de aventura en Diana Adventure!" />
                      <input type="hidden" name="_captcha" value="false" />
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label text-white opacity-75 font-body small text-uppercase tracking-widest">{t.contact.nameLabel}</label>
                          <input type="text" name="Nombre" className="form-control bg-transparent text-white border-secondary rounded-0" required />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label text-white opacity-75 font-body small text-uppercase tracking-widest">{t.contact.emailLabel}</label>
                          <input type="email" name="Email" className="form-control bg-transparent text-white border-secondary rounded-0" required />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-white opacity-75 font-body small text-uppercase tracking-widest">{t.contact.serviceLabel}</label>
                        <select name="Servicio" className="form-select bg-transparent text-white border-secondary rounded-0" style={{ cursor: 'pointer' }} required>
                          <option value="" className="text-dark">{t.contact.services.placeholder}</option>
                          <option value="Valdivia" className="text-dark">{t.contact.services.opt1}</option>
                          <option value="Torres del Paine" className="text-dark">{t.contact.services.opt2}</option>
                          <option value="Internacional" className="text-dark">{t.contact.services.opt3}</option>
                          <option value="Otros" className="text-dark">{t.contact.services.opt4}</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="form-label text-white opacity-75 font-body small text-uppercase tracking-widest d-flex justify-content-between">
                          <span>{t.contact.mindLabel}</span>
                          <span className={`${charCount >= 300 ? 'text-danger' : 'text-light'} fw-bold`}>{charCount}/300</span>
                        </label>
                        <textarea name="Mensaje" className="form-control bg-transparent text-white border-secondary rounded-0" rows="3" value={message} onChange={handleMessageChange} placeholder={t.contact.mindPlaceholder} required></textarea>
                      </div>
                      <div className="d-flex gap-3">
                        <button type="submit" className="btn btn-nature rounded-0 flex-grow-1 py-3" disabled={isSubmitting}>
                          {isSubmitting ? t.contact.btnSending : t.contact.btnSend}
                        </button>
                        <button type="button" onClick={() => setShowForm(false)} className="btn btn-outline-light rounded-0 px-4" disabled={isSubmitting}>
                          {t.contact.btnCancel}
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="text-center w-100">
                    <h3 className="fw-bold font-heading mb-4 display-6">{t.contact.boxTitle}</h3>
                    <p className="mb-5 font-body text-light opacity-75">{t.contact.boxDesc}</p>
                    <div className="row mb-5 justify-content-center">
                       <div className="col-md-5 mb-4 mb-md-0 border-end border-secondary border-opacity-50">
                          <i className="bi bi-geo-alt display-4 text-nature-green mb-3 d-block"></i>
                          <h5 className="font-heading fw-bold mb-1">{t.contact.baseTitle}</h5>
                          <span className="font-body opacity-75 text-light">{t.contact.baseLocation}</span>
                       </div>
                       <div className="col-md-5">
                          <i className="bi bi-envelope-paper display-4 text-nature-green mb-3 d-block"></i>
                          <h5 className="font-heading fw-bold mb-1">{t.contact.writeUs}</h5>
                          <a href="mailto:hola@dianaadventure.cl" className="text-white text-decoration-none opacity-75 font-body">hola@dianaadventure.cl</a>
                       </div>
                    </div>
                    <button onClick={() => setShowForm(true)} className="btn btn-nature btn-lg rounded-0 px-5 py-3 shadow">{t.contact.btnContactNow}</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;