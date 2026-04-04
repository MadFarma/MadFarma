import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useApp, type Product } from '../context/AppContext';
import './Favoritos.css';

export default function Favoritos() {
  const { favorites, toggleFavorite, addToCart } = useApp();

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    toggleFavorite(product);
  };

  if (favorites.length === 0) {
    return (
      <div className="page-container favoritos-page">
        <div className="favoritos-empty">
          <Heart size={64} className="empty-icon" />
          <h1>Tu lista de favoritos está vacía</h1>
          <p>Guarda tus productos favoritos para no perderlos de vista</p>
          <Link to="/tienda" className="btn-primary">
            Explorar productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container favoritos-page">
      <div className="favoritos-header">
        <h1>Mis Favoritos</h1>
        <span className="favoritos-count">{favorites.length} productos</span>
      </div>

      <div className="favoritos-grid">
        {favorites.map((product) => (
          <div key={product.id} className="favorito-card">
            <Link to={`/producto/${product.id}`} className="favorito-image">
              <img src={product.image} alt={product.name} />
            </Link>
            <div className="favorito-info">
              <span className="favorito-brand">{product.brand}</span>
              <Link to={`/producto/${product.id}`} className="favorito-name">
                {product.name}
              </Link>
              <div className="favorito-price">
                <span className="current-price">€{product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="original-price">€{product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              <div className="favorito-actions">
                <button 
                  className="btn-add-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart size={18} />
                  Añadir al carrito
                </button>
                <button 
                  className="btn-remove"
                  onClick={() => toggleFavorite(product)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
