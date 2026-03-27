import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, Gift, CreditCard, ArrowLeft, Check, Tag, MapPin, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Carrito.css';

export default function Carrito() {
  const { cart, updateQuantity, removeFromCart, getCartDiscount, getCartPoints, placeOrder, user, appliedCoupon, applyCoupon, removeCoupon } = useApp();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(user.addresses?.[0]?.id || '');
  const [paymentMethod, setPaymentMethod] = useState('tarjeta');

  const handleApplyCoupon = () => {
    const success = applyCoupon(couponCode);
    if (!success) {
      setCouponError('Cupón inválido o no aplicable');
    } else {
      setCouponError('');
    }
  };

  const handlePlaceOrder = () => {
    const address = user.addresses?.find(a => a.id === selectedAddress) || user.addresses![0];
    placeOrder(address, paymentMethod);
    setShowCheckout(false);
    setOrderPlaced(true);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = getCartDiscount();
  const shipping = subtotal >= 35 ? 0 : 7.90;
  const total = subtotal - discount + shipping;

  if (orderPlaced) {
    return (
      <div className="page-container carrito">
        <div className="success-screen">
          <div className="success-icon">
            <Check size={48} />
          </div>
          <h1 className="headline-lg">¡Pedido Confirmado!</h1>
          <p className="body-lg text-outline">Gracias por tu compra</p>
          <div className="success-rewards">
            <Gift size={24} className="text-tertiary" />
            <p className="title-md">Has ganado <span className="text-tertiary">{getCartPoints()} puntos</span></p>
          </div>
          <p className="body-lg text-outline">Recibirás un email de confirmación pronto</p>
          <Link to="/" className="btn-primary">Seguir Comprando</Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="page-container carrito">
        <header className="carrito-header">
          <h1 className="headline-lg">Mi Carrito</h1>
        </header>
        <div className="empty-cart">
          <ShoppingCart size={64} className="text-outline" />
          <h2 className="title-md">Tu carrito está vacío</h2>
          <p className="body-lg text-outline">¡Explora nuestra tienda y encuentra lo que necesitas!</p>
          <Link to="/tienda" className="btn-primary">Ver Productos</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container carrito">
      <header className="carrito-header">
        <Link to="/" className="back-btn">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="headline-lg">Mi Carrito</h1>
        <span className="item-count">{cart.length}</span>
      </header>

      <div className="free-shipping-banner">
        <Truck size={20} />
        {subtotal >= 35 ? (
          <span>¡Tienes envío gratis!</span>
        ) : (
          <span>¡Solo te faltan €{(35 - subtotal).toFixed(2)} para envío gratis!</span>
        )}
      </div>

      <div className="carrito-content">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item surface-low soft-lift">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <span className="label-md text-outline">{item.brand}</span>
                <h3 className="title-md">{item.name}</h3>
                <p className="body-lg text-primary">€{item.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="qty-btn">
                    <Minus size={16} />
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="qty-btn">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <div className="cart-item-actions">
                <p className="item-total">€{(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary surface-lowest soft-lift">
          <h2 className="title-md">Resumen del pedido</h2>
          
          {!showCheckout && (
            <div className="coupon-section">
              <div className="coupon-input-wrapper">
                <Tag size={18} className="text-outline" />
                <input 
                  type="text" 
                  placeholder="Código de cupón" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="coupon-input"
                />
                <button onClick={handleApplyCoupon} className="btn-secondary btn-sm">Aplicar</button>
              </div>
              {couponError && <p className="coupon-error">{couponError}</p>}
              {appliedCoupon && (
                <div className="applied-coupon">
                  <span className="text-success">{appliedCoupon.code}</span>
                  <span className="text-success">-{appliedCoupon.type === 'percent' ? `${appliedCoupon.discount}%` : `€${appliedCoupon.discount}`}</span>
                  <button onClick={removeCoupon} className="remove-coupon">×</button>
                </div>
              )}
            </div>
          )}
          
          <div className="summary-row">
            <span className="body-lg text-outline">Subtotal</span>
            <span className="body-lg">€{subtotal.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="summary-row discount">
              <span className="body-lg text-success">Descuento</span>
              <span className="body-lg text-success">-€{discount.toFixed(2)}</span>
            </div>
          )}
          
          <div className="summary-row">
            <span className="body-lg text-outline">Envío</span>
            <span className="body-lg text-success">{shipping === 0 ? 'Gratis' : `€${shipping.toFixed(2)}`}</span>
          </div>
          
          <div className="summary-row total-row">
            <span className="body-lg">Total</span>
            <span className="headline-md">€{total.toFixed(2)}</span>
          </div>

          <div className="points-earned-summary">
            <Gift size={20} className="text-tertiary" />
            <span className="body-lg">Ganarás <strong>{getCartPoints()} puntos</strong></span>
          </div>

          <div className="delivery-estimate">
            <Truck size={16} />
            <span>Entrega estimada: <strong>24-48 horas</strong> en tu distrito</span>
          </div>

          {!showCheckout ? (
            <button onClick={() => setShowCheckout(true)} className="checkout-btn btn-primary">
              <CreditCard size={20} />
              Proceder al Pago
            </button>
          ) : (
            <div className="checkout-form">
              <div className="delivery-section">
                <h3 className="title-sm"><MapPin size={18} /> Dirección de entrega</h3>
                {user.addresses?.map(address => (
                  <div 
                    key={address.id} 
                    className={`delivery-option surface-low ${selectedAddress === address.id ? 'selected' : ''}`}
                    onClick={() => setSelectedAddress(address.id)}
                  >
                    <input type="radio" id={address.id} name="address" checked={selectedAddress === address.id} onChange={() => setSelectedAddress(address.id)} />
                    <label htmlFor={address.id}>
                      <strong>{address.name}</strong>
                      <span className="label-md text-outline">{address.street}, {address.district}</span>
                    </label>
                  </div>
                ))}
              </div>

              <div className="payment-section">
                <h3 className="title-sm"><CreditCard size={18} /> Método de pago</h3>
                <div className="payment-options">
                  <div 
                    className={`payment-option surface-low ${paymentMethod === 'tarjeta' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('tarjeta')}
                  >
                    <input type="radio" id="tarjeta" name="payment" checked={paymentMethod === 'tarjeta'} onChange={() => setPaymentMethod('tarjeta')} />
                    <label htmlFor="tarjeta">Tarjeta de crédito/débito</label>
                  </div>
                  <div 
                    className={`payment-option surface-low ${paymentMethod === 'yape' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('yape')}
                  >
                    <input type="radio" id="yape" name="payment" checked={paymentMethod === 'yape'} onChange={() => setPaymentMethod('yape')} />
                    <label htmlFor="yape">Yape/Plin</label>
                  </div>
                  <div 
                    className={`payment-option surface-low ${paymentMethod === 'efectivo' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('efectivo')}
                  >
                    <input type="radio" id="efectivo" name="payment" checked={paymentMethod === 'efectivo'} onChange={() => setPaymentMethod('efectivo')} />
                    <label htmlFor="efectivo">Efectivo contra entrega</label>
                  </div>
                </div>
              </div>

              <button onClick={handlePlaceOrder} className="checkout-btn btn-primary">
                Confirmar Pedido - €{total.toFixed(2)}
              </button>
              <button onClick={() => setShowCheckout(false)} className="cancel-btn">
                Volver al carrito
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
