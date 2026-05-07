import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ArrowRight, MessageCircle, Truck, Shield, Store, Package } from 'lucide-react';
import { useApp, type Product } from '../context/AppContext';
import { api } from '../utils/api';
import SEO from '../components/SEO';
import './AppHome.css';

const quickSearchChips = [
  'Bebe', 'Energia', 'Cosmetica', 'Inmunidad', 'Perdida de peso', 'Dermatologia', 'Suplementos', 'Higiene'
];

const featuredProducts = [
  { id: 1, brand: 'Aptamil', name: 'Aptamil Profutura 2', price: 26.90, image: 'https://via.placeholder.com/280x280/f3f4f6/14B8A6?text=Aptamil', rating: 4.9, reviews: 234 },
  { id: 2, brand: 'La Roche-Posay', name: 'Cicaplast Baume B5', price: 14.95, image: 'https://via.placeholder.com/280x280/f3f4f6/14B8A6?text=LRP', rating: 4.8, reviews: 187 },
  { id: 3, brand: 'ISDIN', name: 'Fusion Water SPF50', price: 18.90, image: 'https://via.placeholder.com/280x280/f3f4f6/14B8A6?text=ISDIN', rating: 5.0, reviews: 312 },
  { id: 4, brand: 'Vitamin D3', name: 'Vitamina D3 4000IU', price: 12.90, image: 'https://via.placeholder.com/280x280/f3f4f6/14B8A6?text=Vit+D', rating: 4.9, reviews: 156 },
];

export default function AppHome() {
  const { categories, addToCart } = useApp();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await api.products.getAll({ limit: '20' });
        if (productsData.data) {
          setProducts(productsData.data);
        }
      } catch {
        console.log('Using local data');
      }
    };
    fetchData();
  }, []);

  const bestsellers = products.length > 0 ? products.slice(0, 8) : featuredProducts;

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
  };

  return (
    <>
      <SEO 
        title="MadFarma - Tu Farmacia en Madrid | Envio 24-48h"
        description="Tu farmacia online de confianza en Madrid. Encuentra los mejores productos de cuidado personal, belleza, salud, bebe y mama con envio rapido a toda Espana."
      />
      
      <main className="home-main">
        
        {/* HERO SECTION - Gradiente Verde */}
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <div className="hero-badge">
                Asesoramiento Farmaceutico 24h
              </div>
              
              <h1 className="hero-title">
                Tu Farmacia en Madrid<br />
                con Asesoramiento<br />
                Farmaceutico Real 24h
              </h1>
              
              <p className="hero-subtitle">
                Productos de parafarmacia de calidad + consejo profesional real. Envio rapido 24-48h.
              </p>
              
              <div className="hero-buttons">
                <Link to="/tienda" className="hero-btn-primary">
                  Ver Ofertas
                </Link>
                <button className="hero-btn-secondary" onClick={() => window.open('https://wa.me/34666123456?text=Hola', '_blank')}>
                  Hablar con Farmaceutico
                </button>
              </div>
            </div>
            
            <div className="hero-image-container">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5e9952c318c9?w=800&h=600&fit=crop" 
                alt="Farmaceutica MadFarma" 
                className="hero-image"
              />
            </div>
          </div>
        </section>

        {/* CHIPS - QUE NECESITAS HOY? */}
        <section className="chips-section">
          <div className="chips-container">
            <h2 className="chips-title">Que necesitas hoy?</h2>
            <div className="chips-wrapper">
              {quickSearchChips.map((chip) => (
                <button 
                  key={chip}
                  className="chip-button"
                  onClick={() => navigate(`/tienda?search=${chip}`)}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTOS DESTACADOS */}
        <section id="productos" className="products-section">
          <div className="products-container">
            <div className="products-header">
              <h2 className="products-title">Productos Recomendados</h2>
              <Link to="/tienda" className="products-link">
                Ver todos <ArrowRight size={18} />
              </Link>
            </div>
            
            <div className="products-grid">
              {bestsellers.slice(0, 4).map((product: any) => (
                <div key={product.id} className="product-card">
                  <div className="product-image-wrap">
                    <img 
                      src={product.image || `https://via.placeholder.com/280x280/f3f4f6/14B8A6?text=${product.brand}`} 
                      alt={product.name} 
                      className="product-image"
                    />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-brand">{product.brand}</p>
                    <div className="product-rating">
                      <Star className="star-icon" size={16} />
                      <span>{product.rating} ({product.reviews})</span>
                    </div>
                    <div className="product-bottom">
                      <span className="product-price">{product.price.toFixed(2)}EUR</span>
                      <button className="product-btn" onClick={() => handleAddToCart(product)}>
                        Anadir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICIOS / CONFIANZA */}
        <section className="services-section">
          <div className="services-container">
            <div className="service-item">
              <div className="service-icon"><Truck size={28} /></div>
              <h3>Envio 24-48h</h3>
              <p>Gratis desde 49 EUR</p>
            </div>
            <div className="service-item">
              <div className="service-icon"><Shield size={28} /></div>
              <h3>Pago Seguro</h3>
              <p>Tarjeta, PayPal, Bizum</p>
            </div>
            <div className="service-item">
              <div className="service-icon"><Store size={28} /></div>
              <h3>Recogida en Farmacia</h3>
              <p>Sin gastos de envio</p>
            </div>
            <div className="service-item">
              <div className="service-icon"><Package size={28} /></div>
              <h3>Productos Originales</h3>
              <p>Garantizados 100%</p>
            </div>
          </div>
        </section>

        {/* MAS PRODUCTOS */}
        <section className="more-products-section">
          <div className="products-container">
            <div className="products-header">
              <h2 className="products-title">Los Mas Vendidos</h2>
              <Link to="/tienda?sale=true" className="products-link">
                Ver ofertas <ArrowRight size={18} />
              </Link>
            </div>
            
            <div className="products-grid">
              {bestsellers.slice(4, 8).map((product: any) => (
                <div key={product.id} className="product-card">
                  <div className="product-image-wrap">
                    {product.badge === 'sale' && <span className="product-badge">Oferta</span>}
                    <img 
                      src={product.image || `https://via.placeholder.com/280x280/f3f4f6/14B8A6?text=${product.brand}`} 
                      alt={product.name} 
                      className="product-image"
                    />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-brand">{product.brand}</p>
                    <div className="product-rating">
                      <Star className="star-icon" size={16} />
                      <span>{product.rating} ({product.reviews})</span>
                    </div>
                    <div className="product-bottom">
                      <span className="product-price">{product.price.toFixed(2)}EUR</span>
                      <button className="product-btn" onClick={() => handleAddToCart(product)}>
                        Anadir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ASESORAMIENTO */}
        <section className="asesoramiento-section">
          <div className="asesoramiento-content">
            <h2>Asesoramiento Personalizado</h2>
            <p>Nuestro equipo de farmaceuticos te ayuda en tiempo real. Pregunta cualquier duda sobre productos, dosis o recomendaciones.</p>
            <button className="asesoramiento-btn" onClick={() => window.open('https://wa.me/34666123456?text=Hola', '_blank')}>
              <MessageCircle size={22} />
              Hablar ahora con un Farmaceutico
            </button>
          </div>
        </section>

        {/* CATEGORIAS */}
        <section className="categories-section">
          <div className="categories-container">
            <h2 className="categories-title">Categorias Populares</h2>
            <div className="categories-grid">
              {categories.slice(0, 6).map((cat) => (
                <Link key={cat.id} to={`/tienda?cat=${cat.id}`} className="category-card">
                  <div className="category-icon" style={{ backgroundColor: cat.color + '20' }}>
                    <span style={{ color: cat.color }}>{cat.name[0]}</span>
                  </div>
                  <span className="category-name">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}