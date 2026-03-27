import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart, ChevronRight, ChevronDown } from 'lucide-react';
import { useApp, categories } from '../context/AppContext';
import { useState, useRef, useEffect } from 'react';
import './Header.css';

interface PromoCard {
  id: number;
  badge: string;
  brand: string;
  image: string;
  catId: string;
}

const promoCards: PromoCard[] = [
  {
    id: 1,
    badge: '30% dto. en 2ª ud.',
    brand: 'En Mitosyl',
    image: 'https://images.unsplash.com/photo-1555252333-978fe3c7e824?w=300&h=200&fit=crop',
    catId: 'bebe-mama',
  },
  {
    id: 2,
    badge: '2x1 en selección',
    brand: 'En Trofolastin',
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=300&h=200&fit=crop',
    catId: 'bebe-mama',
  },
  {
    id: 3,
    badge: '-20% primera compra',
    brand: 'En La Roche-Posay',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=200&fit=crop',
    catId: 'cosmetica-belleza',
  },
  {
    id: 4,
    badge: '3x2 en vitaminas',
    brand: 'En Redoxon',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&h=200&fit=crop',
    catId: 'dietetica-nutricion',
  },
  {
    id: 5,
    badge: '-15% hoy',
    brand: 'En Colgate',
    image: 'https://images.unsplash.com/photo-1559594861-c66710ae4c3c?w=300&h=200&fit=crop',
    catId: 'higiene',
  },
  {
    id: 6,
    badge: '30% dto. en 2ª ud.',
    brand: 'En Paracetamol',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop',
    catId: 'medicamentos',
  },
  {
    id: 7,
    badge: 'Oferta especial',
    brand: 'En Evra',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop',
    catId: 'salud-sexual',
  },
];

export default function Header() {
  const { getCartItemsCount, user } = useApp();
  const cartCount = getCartItemsCount();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredCat, setHoveredCat] = useState(categories[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setShowMenu(true);
  };

  const handleMenuLeave = () => {
    closeTimer.current = setTimeout(() => setShowMenu(false), 150);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tienda?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowMenu(false);
    }
  };

  const activeCat = categories.find(c => c.id === hoveredCat) || categories[0];
  const activePromos = promoCards.filter(p => p.catId === hoveredCat).slice(0, 2);
  const fallbackPromos = promoCards.slice(0, 2);
  const displayPromos = activePromos.length > 0 ? activePromos : fallbackPromos;

  return (
    <header className="df-header">
      <div className="df-promo-bar">
        <span>-11% Extra</span> en pedidos de +65€ con código: <strong>SUPER11</strong>
      </div>

      <div className="df-main-header">
        <div className="df-container df-main-header-inner">
          <Link to="/" className="df-logo">
            <span className="df-logo-icon">+</span>
            <span className="df-logo-text">CR Pharma</span>
          </Link>

          <form className="df-search-bar" onSubmit={handleSearch}>
            <div className="df-search-input-wrap">
              <Search size={18} className="df-search-icon" />
              <input
                type="text"
                placeholder="¿Qué estás buscando?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="df-search-input"
              />
            </div>
          </form>

          <div className="df-header-actions">
            {!user.isLoggedIn ? (
              <Link to="/auth?mode=login" className="df-action-item">
                <User size={22} />
                <span>Cuenta</span>
              </Link>
            ) : (
              <Link to="/perfil" className="df-action-item">
                <User size={22} />
                <span>{user.name.split(' ')[0]}</span>
              </Link>
            )}
            <Link to="/favoritos" className="df-action-item">
              <Heart size={22} />
            </Link>
            <Link to="/carrito" className="df-action-item df-cart">
              <ShoppingCart size={22} />
              {cartCount > 0 && <span className="df-cart-count">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </div>

      <nav className="df-nav" ref={menuRef}>
        <div className="df-container df-nav-container">
          {/* Categorías trigger */}
          <div
            className={`df-categories-btn ${showMenu ? 'active' : ''}`}
            onMouseEnter={handleMenuEnter}
            onMouseLeave={handleMenuLeave}
          >
            <span>Categorías</span>
            <ChevronDown size={16} className={`df-chevron ${showMenu ? 'open' : ''}`} />
          </div>

          <ul className="df-nav-links">
            <li><Link to="/tienda">Marcas</Link></li>
            <li><Link to="/tienda?sale=true" className="df-nav-highlight">Promociones</Link></li>
            <li><Link to="/tienda">Packs Ahorro</Link></li>
            <li><Link to="/tienda?badge=new">Novedades</Link></li>
            <li><Link to="/tienda?cat=cosmetica-belleza" className="df-nav-solar">Solares</Link></li>
          </ul>

          <div className="df-nav-right">
            <Link to="/retos" className="df-club-btn">Club CR Pharma</Link>
            <Link to="/blog" className="df-blog-link">Blog</Link>
          </div>
        </div>

        {/* DosFarma-style 3-column mega-menu */}
        {showMenu && (
          <div
            className="df-mega-menu"
            onMouseEnter={handleMenuEnter}
            onMouseLeave={handleMenuLeave}
          >
            <div className="df-mega-inner df-container">
              {/* Column 1: Category list */}
              <div className="df-mega-col df-mega-cats">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className={`df-mega-cat-row ${hoveredCat === cat.id ? 'active' : ''}`}
                    onMouseEnter={() => setHoveredCat(cat.id)}
                  >
                    <span className="df-mega-cat-label">{cat.name}</span>
                    <ChevronRight size={14} className="df-mega-cat-arrow" />
                  </div>
                ))}
              </div>

              {/* Column 2: Subcategories */}
              <div className="df-mega-col df-mega-subs">
                <p className="df-mega-sub-title">Categorías</p>
                <ul className="df-mega-sub-list">
                  {activeCat.subcategories.map((sub) => (
                    <li key={sub.id}>
                      <Link
                        to={`/tienda?cat=${activeCat.id}&sub=${sub.id}`}
                        className="df-mega-sub-link"
                        onClick={() => setShowMenu(false)}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Promo cards */}
              <div className="df-mega-col df-mega-promos">
                {displayPromos.map((promo) => (
                  <Link
                    key={promo.id}
                    to={`/tienda?cat=${promo.catId}`}
                    className="df-promo-card"
                    onClick={() => setShowMenu(false)}
                  >
                    <div className="df-promo-card-info">
                      <span className="df-promo-badge">{promo.badge}</span>
                      <span className="df-promo-brand">{promo.brand}</span>
                      <button className="df-promo-btn">Comprar</button>
                    </div>
                    <img src={promo.image} alt={promo.brand} className="df-promo-img" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
