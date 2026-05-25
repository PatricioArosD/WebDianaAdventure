// src/pages/Terminos.jsx
import { useEffect, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const Terminos = () => {
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terminos-page" style={{ backgroundColor: 'var(--nature-bg)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="container bg-white p-4 p-md-5 shadow-sm rounded-1 border-top border-4" style={{ borderColor: 'var(--nature-green) !important', maxWidth: '900px' }}>
        
        <h1 className="font-heading fw-bold text-nature-dark mb-3 text-center">Términos, Condiciones y Políticas de Servicio</h1>
        <p className="text-center text-muted font-body mb-5">Excursiones y Viajes Grupales – Región de Los Ríos, Chile</p>

        <div className="text-secondary font-body" style={{ lineHeight: '1.8' }}>
          <p className="mb-4">
            El presente documento constituye un contrato vinculante entre el cliente y la agencia de turismo. Al realizar una reserva y su posterior pago, el cliente declara conocer, entender y aceptar explícitamente todas las condiciones detalladas a continuación.
          </p>

          <h4 className="font-heading fw-bold text-nature-green mt-5 mb-3">1. PROCESO DE RESERVA Y PAGO ANTICIPADO</h4>
          <ul className="mb-4">
            <li className="mb-2"><strong>Gestión de reservas:</strong> Toda solicitud de cupos se gestionará exclusivamente por escrito a través de correo electrónico.</li>
            <li className="mb-2"><strong>Plazo de pago:</strong> Para garantizar y confirmar los cupos, el cliente debe realizar el pago del 100% del valor total de la excursión con un plazo máximo de 24 horas de anticipación a la hora de inicio de la actividad.</li>
            <li className="mb-2"><strong>Cancelación por impago:</strong> Si el pago y su comprobante no son acreditados dentro del plazo de 24 horas antes indicado, la solicitud de reserva quedará automáticamente anulada sin derecho a reclamo de cupos.</li>
            <li className="mb-2"><strong>Derecho de Retracto:</strong> De conformidad con el Artículo 3 bis letra b) de la Ley N° 19.496 (Chile), se informa que no operará el derecho de retracto comercial (arrepentimiento unilateral de compra) una vez confirmado el pago de la excursión.</li>
          </ul>

          <h4 className="font-heading fw-bold text-nature-green mt-5 mb-3">2. RESTRICCIONES DE EDAD, SALUD Y SEGURIDAD</h4>
          <ul className="mb-4">
            <li className="mb-2"><strong>Límites de edad:</strong> Por estrictas razones de seguridad y logística, nuestras excursiones de senderismo y kayak tienen un límite de edad exclusivo. No se aceptarán reservas para menores de 5 años ni para personas mayores de 75 años. Todo menor de edad (5 a 17 años) debe asistir acompañado por un adulto responsable.</li>
            <li className="mb-2"><strong>Estado de salud obligatorio:</strong> Es condición indispensable contar con un buen estado de salud general, compatible con la actividad física al aire libre (caminatas sobre terreno irregular y remado en kayak).</li>
            <li className="mb-2"><strong>Obligación de declarar:</strong> El cliente debe informar por escrito, antes de pagar, cualquier condición médica preexistente, cirugías recientes, alergias agudas, embarazo o lesiones. La empresa se reserva el derecho de admisión en terreno si el guía evalúa que el estado de salud real del pasajero pone en riesgo su integridad o la del grupo.</li>
            <li className="mb-2"><strong>Seguridad en ruta:</strong> El cliente se obliga a seguir estrictamente las instrucciones del guía y a utilizar obligatoriamente el equipo de seguridad entregado (chaleco salvavidas, bastones, etc.). La empresa no se responsabiliza por accidentes derivados de imprudencias, desacatos o información de salud omitida. Se sugiere a los turistas extranjeros contar con un seguro de viaje internacional con cobertura para actividades al aire libre.</li>
          </ul>

          <h4 className="font-heading fw-bold text-nature-green mt-5 mb-3">3. POLÍTICAS DE ANULACIÓN Y REEMBOLSO POR EL CLIENTE</h4>
          <p className="mb-3">Las solicitudes de anulación por parte del cliente deben enviarse formalmente por correo electrónico y se regirán por la siguiente tabla de retornos:</p>
          <ul className="mb-4">
            <li className="mb-2"><strong>Más de 48 horas de anticipación:</strong> Se realizará la devolución del 50% del total de la reserva.</li>
            <li className="mb-2"><strong>Entre 48 y 24 horas de anticipación:</strong> Se realizará la devolución del 20% del total de la reserva.</li>
            <li className="mb-2"><strong>Menos de 24 horas de anticipación o No Show:</strong> El cliente perderá el 100% de la reserva sin derecho a reembolso o reprogramación.</li>
            <li className="mb-2"><strong>Tolerancia de espera:</strong> El tiempo de espera máximo en el punto de encuentro será de 15 minutos. Pasado este tiempo se declarará No Show.</li>
          </ul>

          <h4 className="font-heading fw-bold text-nature-green mt-5 mb-3">4. MODIFICACIONES Y CANCELACIONES POR CONDICIONES CLIMÁTICAS</h4>
          <ul className="mb-4">
            <li className="mb-2"><strong>Cambio de itinerario:</strong> Al operar en la Región de Los Ríos, las actividades están expuestas a variaciones meteorológicas. Ante condiciones climáticas inestables, la agencia se reserva el derecho de modificar la ruta original, ofreciendo una actividad alternativa de igual duración que resguarde la seguridad del grupo.</li>
            <li className="mb-2"><strong>Cancelación por fuerza mayor:</strong> Si las condiciones climáticas son completamente desfavorables o peligrosas para la realización de la excursión (fuerza mayor, cierres de puertos por la Armada, etc.) y no es posible aplicar una alternativa, la agencia suspenderá la actividad y realizará la devolución del 100% del dinero al cliente.</li>
          </ul>

          <h4 className="font-heading fw-bold text-nature-green mt-5 mb-3">5. DERECHO DE ADMISIÓN, EXPULSIÓN Y CONDUCTA</h4>
          <ul className="mb-4">
            <li className="mb-2"><strong>Sustancias prohibidas:</strong> Se prohíbe estrictamente la participación de personas en estado de ebriedad o bajo los efectos de drogas. La agencia ejercerá el derecho de admisión de inmediato en el punto de encuentro, cobrando el 100% de la reserva por incumplimiento contractual.</li>
            <li className="mb-2"><strong>Conductas de riesgo o falta de respeto:</strong> La agencia se reserva el derecho de cancelar o dar por terminada una excursión en pleno desarrollo si un cliente incurre en conductas que atenten contra la seguridad, el respeto o el bienestar del staff de guías o del grupo. El infractor será apartado de la actividad, no tendrá derecho a reembolso y se aplicará el cobro del 100% de la reserva.</li>
          </ul>

          <h4 className="font-heading fw-bold text-nature-green mt-5 mb-3">6. PRIVACIDAD Y PROTECCIÓN DE DATOS</h4>
          <ul className="mb-4">
            <li className="mb-2"><strong>Uso confidencial:</strong> En cumplimiento con la Ley N° 19.628 sobre Protección de la Vida Privada (Chile), todos los datos personales, de contacto y antecedentes médicos entregados por el cliente serán de uso exclusivo para la logística, seguridad y correcta realización de las excursiones. La agencia garantiza que no transferirá, comercializará ni divulgará esta información a terceros ajenos a la operación del servicio.</li>
            <li className="mb-2"><strong>Legislación aplicable:</strong> Cualquier controversia legal derivada de estos servicios se resolverá bajo las leyes de la República de Chile y ante los tribunales competentes de la ciudad de Valdivia, Chile.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Terminos;