import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart, Menu } from 'lucide-react';
import { useApp, categories } from '../context/AppContext';
import { useState, useRef, useEffect } from 'react';
import './Header.css';

const blogArticles = [
  {
    id: 1,
    title: 'Cómo fortalecer tu sistema inmunitario',
    excerpt: 'Descubre los hábitos y suplementos esenciales.',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&h=250&fit=crop',
    category: 'Salud'
  },
  {
    id: 2,
    title: 'Guía completa de protección solar',
    excerpt: 'Todo lo que necesitas saber para elegir el protector solar.',
    image: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?w=400&h=250&fit=crop',
    category: 'Cosmética'
  },
  {
    id: 3,
    title: 'Vitaminas esenciales para mujeres',
    excerpt: 'Una guía sobre los nutrientes que tu cuerpo necesita.',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=250&fit=crop',
    category: 'Nutrición'
  },
  {
    id: 4,
    title: 'Dermatitis atópica vs psoriasis',
    excerpt: 'Aprende a distinguir las principales afecciones de la piel.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=250&fit=crop',
    category: 'Salud'
  }
];

export default function Header() {
  const { getCartItemsCount } = useApp();
  const cartCount = getCartItemsCount();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tienda?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowMenu(false);
    }
  };

  return (
    <header className="df-header">
      <div className="df-promo-bar">
        <span>-11% Extra</span> en pedidos de +65€ con código: <strong>SUPER11</strong>
      </div>

      <div className="df-main-header">
        <div className="df-container df-main-header-inner">
          <button className="df-menu-btn-mobile" onClick={() => setShowMenu(!showMenu)}>
            <Menu size={24} />
          </button>

          <Link to="/" className="df-logo">
            <span className="df-logo-icon">+</span>
            <span className="df-logo-text">CR Pharma</span>
          </Link>

          <form className="df-search-bar" onSubmit={handleSearch}>
            <div className="df-search-input-wrap">
              <Search size={18} className="df-search-icon" />
              <input
                type="text"
                placeholder="Buscar marca, producto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="df-search-input"
              />
            </div>
            <button type="submit" className="df-search-btn">Buscar</button>
          </form>

          <div className="df-header-actions">
            <Link to="/perfil" className="df-action-item">
              <User size={22} />
              <span>Cuenta</span>
            </Link>
            <Link to="/favoritos" className="df-action-item">
              <Heart size={22} />
              <span>Favoritos</span>
            </Link>
            <Link to="/carrito" className="df-action-item df-cart">
              <ShoppingCart size={22} />
              <span>Carrito</span>
              {cartCount > 0 && <span className="df-cart-count">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </div>

      <nav className="df-nav">
        <div className="df-container df-nav-container">
          <button className="df-categories-btn" onClick={() => setShowMenu(!showMenu)}>
            <Menu size={18} />
            <span>Categorías</span>
          </button>

          <ul className="df-nav-links">
            <li><Link to="/tienda">Marcas</Link></li>
            <li><Link to="/tienda?sale=true" className="df-nav-highlight">Promociones</Link></li>
            <li><Link to="/retos" className="df-nav-highlight df-nav-club">CR Club</Link></li>
            <li><Link to="/mapa">Nuestra Farmacia</Link></li>
          </ul>
        </div>
      </nav>

      {showMenu && (
        <div className="df-mega-menu" ref={menuRef}>
          <div className="df-mega-menu-inner">
            <div className="df-mega-menu-left">
              <div className="df-mega-menu-cats">
                {categories.map((cat) => (
                  <Link 
                    key={cat.id}
                    to={`/tienda?cat=${cat.id}`}
                    className="df-mega-cat-item"
                    onClick={() => setShowMenu(false)}
                  >
                    <span className="df-mega-cat-icon">{cat.icon}</span>
                    <span className="df-mega-cat-name">{cat.name}</span>
                  </Link>
                ))}
              </div>

              <Link to="/retos" className="df-club-box" onClick={() => setShowMenu(false)}>
                <span className="df-club-box-icon">🎁</span>
                <div className="df-club-box-text">
                  <span className="df-club-box-label">CR Club</span>
                  <span className="df-club-box-title">Únete y gana puntos</span>
                </div>
              </Link>
            </div>

            <div className="df-mega-menu-right">
              <h3 className="df-mega-menu-title">
                <span>📰</span> Artículos más buscados
              </h3>
              <div className="df-blog-grid">
                {blogArticles.map((article) => (
                  <Link key={article.id} to="/blog" className="df-blog-card" onClick={() => setShowMenu(false)}>
                    <img src={article.image} alt={article.title} />
                    <div className="df-blog-card-content">
                      <span className="df-blog-card-cat">{article.category}</span>
                      <h4>{article.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
