import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { categories } from '../context/AppContext';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section footer-about">
          <div className="footer-logo">
            <div className="mf-monogram mf-footer">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 32V8L16 24L26 8V32" stroke="#a71e2c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M26 12H34M26 20H32" stroke="#a71e2c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className="footer-title">MadFarma</h3>
              <p className="footer-tagline">Tu farmacia online de confianza</p>
            </div>
          </div>
          <p className="footer-description">
            Tu farmacia y parafarmacia online de confianza en Madrid. Encuentra los mejores productos de cuidado personal, belleza y salud con envío rápido a toda España.
          </p>
          <div className="footer-contact-info">
            <div className="contact-item">
              <MapPin size={16} />
              <span>Calle Gran Vía 25, Madrid</span>
            </div>
            <div className="contact-item">
              <Phone size={16} />
              <span>91 234 56 78</span>
            </div>
            <div className="contact-item">
              <a href="https://wa.me/34666123456" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={16} />
                <span>666 123 456</span>
              </a>
            </div>
            <div className="contact-item">
              <Mail size={16} />
              <span>info@madfarma.es</span>
            </div>
          </div>
          <div className="footer-social">
            <a href="https://facebook.com/madfarma" className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <Facebook size={18} />
            </a>
            <a href="https://instagram.com/madfarma" className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <Instagram size={18} />
            </a>
            <a href="https://wa.me/34666123456" className="social-link" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Categorías</h4>
          <ul className="footer-links">
            {categories.slice(0, 8).map((cat) => (
              <li key={cat.id}>
                <Link to={`/tienda?cat=${cat.id}`}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Más Categorías</h4>
          <ul className="footer-links">
            {categories.slice(8).map((cat) => (
              <li key={cat.id}>
                <Link to={`/tienda?cat=${cat.id}`}>{cat.name}</Link>
              </li>
            ))}
            <li><Link to="/marcas">Marcas</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Información</h4>
          <ul className="footer-links">
            <li><Link to="/perfil">Mi Cuenta</Link></li>
            <li><Link to="/perfil">Mis Pedidos</Link></li>
            <li><a href="#">Política de Envíos</a></li>
            <li><a href="#">Política de Devoluciones</a></li>
            <li><Link to="/privacidad">Política de Privacidad</Link></li>
            <li><Link to="/terminos">Términos y Condiciones</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Horario</h4>
          <div className="footer-schedule">
            <div className="schedule-item">
              <Clock size={16} />
              <div>
                <strong>Lunes - Sábado</strong>
                <span>9:00 a 21:00</span>
              </div>
            </div>
            <div className="schedule-item">
              <Clock size={16} />
              <div>
                <strong>Domingo</strong>
                <span>10:00 a 14:00</span>
              </div>
            </div>
          </div>
          <Link to="/mapa" className="btn-secondary btn-sm">
            <MapPin size={14} /> Ver Farmacia
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 MadFarma S.L. Todos los derechos reservados.</p>
        <div className="footer-payments">
          <span>Pagos seguros:</span>
          <span className="payment-methods">Visa · Mastercard · PayPal · Bizum</span>
        </div>
      </div>
    </footer>
  );
}
