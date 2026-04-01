import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight, Star, Package, Gift, MapPin, CreditCard } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Perfil.css';

const levelColors: Record<string, string> = {
  Bronce: '#cd7f32',
  Plata: '#c0c0c0',
  Oro: '#ffd700',
  Platino: '#e5e4e2',
  Diamante: '#b9f2ff',
};

export default function Perfil() {
  const { user, orders, favorites, logout } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLoggedIn && user.id === 'guest') {
      navigate('/auth?mode=login');
    }
  }, [user.isLoggedIn, user.id, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const menuItems = [
    { icon: <Package size={20} />, label: 'Mis Pedidos', path: '/perfil', color: 'text-primary' },
    { icon: <Gift size={20} />, label: 'Mis Puntos', path: '/retos', color: 'text-tertiary' },
    { icon: <MapPin size={20} />, label: 'Mis Direcciones', path: '/mapa', color: 'text-primary' },
    { icon: <CreditCard size={20} />, label: 'Métodos de Pago', path: '/perfil', color: 'text-primary' },
    { icon: <Bell size={20} />, label: 'Notificaciones', path: '/perfil', color: 'text-primary' },
    { icon: <Shield size={20} />, label: 'Privacidad y Seguridad', path: '/perfil', color: 'text-primary' },
    { icon: <Settings size={20} />, label: 'Ajustes de cuenta', path: '/perfil', color: 'text-primary' },
    { icon: <HelpCircle size={20} />, label: 'Centro de Ayuda', path: '/perfil', color: 'text-primary' },
  ];

  return (
    <div className="page-container perfil-page">
      <header className="perfil-header">
        <h1 className="headline-lg">Mi Perfil</h1>
      </header>

      <section className="user-info-card surface-lowest soft-lift" style={{ '--level-color': levelColors[user.level] } as React.CSSProperties}>
        <div className="avatar-wrapper">
          <img src={user.avatar} alt={user.name} className="avatar-image" />
        </div>
        <div className="user-details">
          <h2 className="title-md">{user.name}</h2>
          <p className="body-lg text-outline">{user.email}</p>
          <div className="user-level-container">
            <div className="user-level" style={{ '--level-color': levelColors[user.level] } as React.CSSProperties}>
              <Star size={16} fill="var(--level-color)" color="var(--level-color)" />
              <span className="label-md">Nivel {user.level}</span>
            </div>
            <div className="points-progress-wrap">
              <div className="points-text">
                <span className="label-sm">{user.points} / {user.points + user.pointsToNextLevel} puntos</span>
              </div>
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${(user.points / (user.points + user.pointsToNextLevel)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <button className="edit-profile-btn btn-secondary">Editar</button>
      </section>

      <section className="stats-row">
        <div className="stat-card surface-low soft-lift">
          <p className="headline-lg text-primary">{user.totalPoints.toLocaleString()}</p>
          <p className="label-md text-outline">Puntos</p>
        </div>
        <div className="stat-card surface-low soft-lift">
          <p className="headline-lg text-primary">{orders.length}</p>
          <p className="label-md text-outline">Pedidos</p>
        </div>
        <div className="stat-card surface-low soft-lift">
          <p className="headline-lg text-primary">{favorites.length}</p>
          <p className="label-md text-outline">Favoritos</p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="section-header">
          <h2 className="title-md">Mis Pedidos</h2>
          <Link to="/perfil" className="label-md text-primary">Ver todos</Link>
        </div>
        <div className="orders-summary">
          {orders.slice(0, 3).map(order => (
            <div key={order.id} className="order-item surface-low">
              <Package size={20} className="text-primary" />
              <div className="order-item-info">
                <p className="title-sm">{order.id}</p>
                <p className="label-md text-outline">
                  {order.status === 'pending' && 'Pendiente'}
                  {order.status === 'processing' && 'Procesando'}
                  {order.status === 'shipped' && 'En camino'}
                  {order.status === 'delivered' && 'Entregado'}
                  {' • '}€{order.total.toFixed(2)}
                </p>
              </div>
              <span className={`status-dot ${order.status}`}></span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-spacing">
        <div className="menu-list ghost-border surface-lowest soft-lift">
          {menuItems.slice(0, 4).map((item, index) => (
            <Link to={item.path} key={index} className="menu-item">
              <div className={`menu-icon-wrapper ${item.color}`}>
                {item.icon}
              </div>
              <span className="body-lg menu-label">{item.label}</span>
              <ChevronRight size={18} className="text-outline" />
            </Link>
          ))}
        </div>
      </section>

      <section className="section-spacing">
        <div className="menu-list ghost-border surface-lowest soft-lift">
          {menuItems.slice(4).map((item, index) => (
            <Link to={item.path} key={index} className="menu-item">
              <div className={`menu-icon-wrapper ${item.color}`}>
                {item.icon}
              </div>
              <span className="body-lg menu-label">{item.label}</span>
              <ChevronRight size={18} className="text-outline" />
            </Link>
          ))}
        </div>
      </section>

      <section className="section-spacing logout-section">
        <button onClick={handleLogout} className="logout-btn surface-low soft-lift">
          <LogOut size={20} className="text-error" />
          <span className="body-lg text-error">Cerrar Sesión</span>
        </button>
      </section>
    </div>
  );
}
