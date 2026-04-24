import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Check, X } from 'lucide-react';

export default function CartNotification() {
  const { showCartNotification, hideCartNotification, cart } = useApp();
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (showCartNotification.show) {
      setKey(prev => prev + 1);
      const timer = setTimeout(() => {
        hideCartNotification();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [showCartNotification.show, hideCartNotification]);

  if (!showCartNotification.show) return null;

  return (
    <div className="cart-notification" key={key} onClick={hideCartNotification}>
      <div className="cart-notification-inner">
        <div className="cart-notification-icon">
          <Check size={14} />
        </div>
        
        <div className="cart-notification-text">
          <span className="cart-notification-title">Producto añadido al carrito</span>
          <span className="cart-notification-product">{showCartNotification.productName}</span>
        </div>

        <div className="cart-notification-actions">
          <Link 
            to="/carrito" 
            className="cart-notification-view-cart"
            onClick={(e) => e.stopPropagation()}
          >
            Ver carrito ({cart.length})
          </Link>
        </div>

        <button 
          className="cart-notification-close"
          onClick={(e) => {
            e.stopPropagation();
            hideCartNotification();
          }}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}