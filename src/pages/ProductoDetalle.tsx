import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Minus, Plus, ChevronRight, Package, Truck, Shield, Check, ChevronDown } from 'lucide-react';
import { useApp, products } from '../context/AppContext';
import SEO from '../components/SEO';
import './ProductoDetalle.css';

export default function ProductoDetalle() {
  const { id } = useParams();
  const { addToCart, favorites, toggleFavorite } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [openTabs, setOpenTabs] = useState<Record<string, boolean>>({
    descripcion: true,
    composicion: false,
    modo: false
  });

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="df-product-page">
        <div className="df-container">
          <div className="df-not-found">
            <h1>Producto no encontrado</h1>
            <p>El producto que buscas no existe</p>
            <Link to="/tienda" className="df-btn df-btn-primary">Volver a la tienda</Link>
          </div>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.some(f => f.id === product.id);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const savings = product.originalPrice ? (product.originalPrice - product.price).toFixed(2).replace('.', ',') : '0,00';

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const toggleTab = (tab: string) => {
    setOpenTabs(prev => ({ ...prev, [tab]: !prev[tab] }));
  };

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="df-product-page">
      <SEO 
        title={`${product.name} - ${product.brand} | MadFarma`}
        description={product.description}
      />

      <div className="df-breadcrumbs">
        <div className="df-container">
          <nav className="breadcrumb-list">
            <span className="breadcrumb-item">
              <Link to="/">Inicio</Link>
            </span>
            <span className="separator"><ChevronRight size={14} /></span>
            <span className="breadcrumb-item">
              <Link to="/tienda">Productos</Link>
            </span>
            <span className="separator"><ChevronRight size={14} /></span>
            <span className="breadcrumb-item">
              <Link to={`/tienda?cat=${product.category}`}>{product.brand}</Link>
            </span>
            <span className="separator"><ChevronRight size={14} /></span>
            <span className="breadcrumb-item">
              <span>{product.name}</span>
            </span>
          </nav>
        </div>
      </div>

      <main className="page-main">
        <div className="df-container">
          <div className="columns">
            <div className="column-main">
              <p className="product-brand">{product.brand}</p>
              <h1 className="h1">{product.name}</h1>

              <div className="product-image-gallery">
                <div className="gallery-main">
                  {discount > 0 && (
                    <span className="product-label">-{discount}%</span>
                  )}
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="product-image active" 
                  />
                  <button className="fullscreen-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
                <div className="gallery-thumbnails">
                  <button className="thumbnail-item active">
                    <img src={product.image} alt={product.name} className="thumbnail-image" />
                  </button>
                </div>
              </div>
            </div>

            <div className="product-info-main">
              <div className="add-to-wishlist">
                <button className={`wish-btn ${isFavorite ? 'active' : ''}`} onClick={() => toggleFavorite(product)}>
                  <Heart size={24} fill={isFavorite ? '#E3596C' : 'none'} color={isFavorite ? '#E3596C' : '#6B7580'} />
                </button>
              </div>

              <div className="price-box">
                <div className="price-container-wrapper">
                  <div className="price-container">
                    {product.originalPrice && (
                      <span className="old-price">
                        <span className="price-wrapper">{product.originalPrice.toFixed(2).replace('.', ',')} €</span>
                      </span>
                    )}
                    <span className="final-price">
                      <span className="price-container price-final_price">
                        <span className="price-label">Precio especial</span>
                        <span className="price-wrapper">{product.price.toFixed(2).replace('.', ',')} €</span>
                      </span>
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="additional-price-container">
                      ahorras {savings} €
                    </div>
                  )}
                </div>
              </div>

              <div className="stock">
                <Package size={16} />
                <span>En stock</span>
              </div>

              <div className="addtocart-container">
                <div className="qty-selector">
                  <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus size={16} />
                  </button>
                  <input type="text" className="qty-input" value={quantity} readOnly />
                  <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>
                    <Plus size={16} />
                  </button>
                </div>
                <button className="btn-primary" onClick={handleAddToCart}>
                  <svg className="add-to-cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Añadir al carrito</span>
                </button>
              </div>

              <div className="shipping-info">
                <div className="shipping-list">
                  <div className="shipping-item">
                    <Truck size={24} />
                    <div className="shipping-text">
                      <strong>Envío 24-48h</strong>
                      <span>Gratis a partir de 35€</span>
                    </div>
                  </div>
                  <div className="shipping-item">
                    <Shield size={24} />
                    <div className="shipping-text">
                      <strong>Compra 100% segura</strong>
                      <span>Pago seguro SSL</span>
                    </div>
                  </div>
                  <div className="shipping-item">
                    <Check size={24} />
                    <div className="shipping-text">
                      <strong>Devolución 30 días</strong>
                      <span>Sin preguntas</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="savings-card">
                <div className="savings-card-header">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span>Ahorra con Club MadFarma</span>
                </div>
                <p className="savings-amount">Ahorra un 5% en tu próximo pedido al acumular puntos</p>
              </div>
            </div>
          </div>

          <div className="product-details-tabs">
            <div className="tabs__heading">
              <ul>
                <li className="tabs__item">
                  <button className="tabs__title" onClick={() => toggleTab('descripcion')}>
                    <h3>Descripción</h3>
                    <ChevronDown size={20} className={`tabs__icon ${openTabs.descripcion ? 'rotate-180' : ''}`} />
                  </button>
                  {openTabs.descripcion && (
                    <div className="tabs__content">
                      <div className="description">
                        <p>{product.description}</p>
                        {product.features && product.features.length > 0 && (
                          <ul className="details-grid">
                            {product.features.map((feature, idx) => (
                              <li key={idx}>
                                <span className="label">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}
                </li>
                <li className="tabs__item">
                  <button className="tabs__title" onClick={() => toggleTab('composicion')}>
                    <h3>Composición</h3>
                    <ChevronDown size={20} className={`tabs__icon ${openTabs.composicion ? 'rotate-180' : ''}`} />
                  </button>
                  {openTabs.composicion && (
                    <div className="tabs__content">
                      <div className="description">
                        <p>{product.composition || 'Información sobre composición no disponible.'}</p>
                      </div>
                    </div>
                  )}
                </li>
                <li className="tabs__item">
                  <button className="tabs__title" onClick={() => toggleTab('modo')}>
                    <h3>Modo de empleo</h3>
                    <ChevronDown size={20} className={`tabs__icon ${openTabs.modo ? 'rotate-180' : ''}`} />
                  </button>
                  {openTabs.modo && (
                    <div className="tabs__content">
                      <div className="description">
                        <p>{product.howToUse || 'Siga las instrucciones del fabricante.'}</p>
                      </div>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="related-products">
              <h2 className="related-products-title">Productos relacionados</h2>
              <div className="product-grid">
                {relatedProducts.map(relProduct => (
                  <div key={relProduct.id} className="product-item">
                    <Link to={`/producto/${relProduct.id}`}>
                      <img 
                        src={relProduct.image} 
                        alt={relProduct.name} 
                        className="product-item-image" 
                      />
                    </Link>
                    <div className="product-item-name">
                      <Link to={`/producto/${relProduct.id}`}>{relProduct.name}</Link>
                    </div>
                    <span className="product-item-price">
                      {relProduct.price.toFixed(2).replace('.', ',')} €
                    </span>
                    <button className="btn df-btn-add-rel" onClick={() => addToCart(relProduct, 1)}>
                      Añadir
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}