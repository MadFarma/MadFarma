import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowLeft, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Auth.css';

export default function Auth() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!isLogin) {
      if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
      if (!formData.phone.trim()) newErrors.phone = 'El teléfono es obligatorio';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }
    
    if (!isLogin && !formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      login(formData.email, formData.password);
      navigate('/perfil');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="page-container auth-page">
      <button onClick={() => navigate(-1)} className="back-btn">
        <ArrowLeft size={24} />
      </button>

      <div className="auth-container">
        <div className="auth-header">
          <h1 className="headline-lg">{isLogin ? '¡Bienvenido de nuevo!' : 'Crear cuenta'}</h1>
          <p className="body-lg text-outline">
            {isLogin 
              ? 'Inicia sesión para continuar comprando' 
              : 'Regístrate y acumula puntos en cada compra'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              <div className="form-group">
                <label className="label-md">Nombre completo</label>
                <div className="input-wrapper">
                  <User size={20} className="input-icon text-outline" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                  />
                </div>
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="label-md">Teléfono</label>
                <div className="input-wrapper">
                  <Phone size={20} className="input-icon text-outline" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+51 987 654 321"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                  />
                </div>
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
            </>
          )}

          <div className="form-group">
            <label className="label-md">Email</label>
            <div className="input-wrapper">
              <Mail size={20} className="input-icon text-outline" />
              <input
                type="email"
                name="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
              />
            </div>
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="label-md">Contraseña</label>
            <div className="input-wrapper">
              <Lock size={20} className="input-icon text-outline" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          {!isLogin && (
            <div className="form-group">
              <label className="label-md">Confirmar contraseña</label>
              <div className="input-wrapper">
                <Lock size={20} className="input-icon text-outline" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                />
              </div>
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>
          )}

          {isLogin && (
            <div className="forgot-password">
              <Link to="/auth" className="text-primary">¿Olvidaste tu contraseña?</Link>
            </div>
          )}

          {!isLogin && (
            <div className="terms-checkbox">
              <input
                type="checkbox"
                name="acceptTerms"
                id="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
              />
              <label htmlFor="acceptTerms">
                Acepto los <a href="#terms" className="text-primary">Términos y Condiciones</a> y la <a href="#privacy" className="text-primary">Política de Privacidad</a>
              </label>
            </div>
          )}
          {errors.acceptTerms && <span className="error-text">{errors.acceptTerms}</span>}

          <button type="submit" className="btn-primary auth-submit">
            {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>
        </form>

        <div className="auth-divider">
          <span>o continúa con</span>
        </div>

        <div className="social-auth">
          <button className="social-btn google">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button className="social-btn apple">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.26 3.76-.69 1.05.46 1.84 1.5 2.14 2.26-3.47 1.72-2.88 6.7.57 7.85-.45 1.22-1.09 2.45-1.55 2.81zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Apple
          </button>
        </div>

        <div className="auth-switch">
          {isLogin ? (
            <>
              ¿No tienes cuenta?{' '}
              <button onClick={() => { setIsLogin(false); setErrors({}); }} className="text-primary">
                Regístrate gratis
              </button>
            </>
          ) : (
            <>
              ¿Ya tienes cuenta?{' '}
              <button onClick={() => { setIsLogin(true); setErrors({}); }} className="text-primary">
                Inicia sesión
              </button>
            </>
          )}
        </div>

        <div className="benefits-preview">
          <h3 className="title-sm">Beneficios de registrarte</h3>
          <ul className="benefits-list">
            <li><Check size={16} className="text-success" /> Acumula puntos en cada compra</li>
            <li><Check size={16} className="text-success" /> Acceso a ofertas exclusivas</li>
            <li><Check size={16} className="text-success" /> Historial de pedidos</li>
            <li><Check size={16} className="text-success" /> Seguimiento de entrega en tiempo real</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
