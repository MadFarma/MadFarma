import { NavLink } from 'react-router-dom';
import { Home, ShoppingBag, Map, User, Target, ShoppingCart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './BottomNav.css';

const navItems = [
  { path: '/', label: 'Inicio', icon: Home },
  { path: '/tienda', label: 'Tienda', icon: ShoppingBag },
  { path: '/mapa', label: 'Farmacia', icon: Map },
  { path: '/retos', label: 'Retos', icon: Target },
  { path: '/perfil', label: 'Perfil', icon: User },
];

export default function BottomNav() {
  const { getCartItemsCount } = useApp();
  const cartCount = getCartItemsCount();

  return (
    <nav className="bottom-nav glass-nav">
      <ul className="nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.path} className="nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end={item.path === '/'}
              >
                <Icon className="nav-icon" size={24} />
                <span className="nav-label label-md">{item.label}</span>
              </NavLink>
            </li>
          );
        })}
        <li className="nav-item">
          <NavLink to="/carrito" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <div className="cart-icon-wrapper">
              <ShoppingCart className="nav-icon" size={24} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>
            <span className="nav-label label-md">Carrito</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
