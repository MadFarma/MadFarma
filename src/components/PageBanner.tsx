import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './PageBanner.css';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  breadcrumbs?: Breadcrumb[];
  backgroundColor?: string;
}

const colorGradients: Record<string, { from: string; to: string }> = {
  default: { from: '#5D8A82', to: '#4A7A73' },
  'bebe-mama': { from: '#E8B4BC', to: '#D4A0AB' },
  'cosmetica-belleza': { from: '#D4A5A5', to: '#C08F8F' },
  'higiene-bucal': { from: '#A8D8EA', to: '#8FC8DA' },
  'nutricion-vitaminas': { from: '#B5D89A', to: '#A5C88A' },
  'salud-sexual': { from: '#E6A4B4', to: '#D68FA0' },
  'medicamentos': { from: '#B8C5D6', to: '#A3B5C6' },
  marcas: { from: '#8B5CF6', to: '#7C3AED' },
  favoritos: { from: '#EF4444', to: '#DC2626' },
  carrito: { from: '#F59E0B', to: '#D97706' },
  blog: { from: '#10B981', to: '#059669' },
  perfil: { from: '#1A1D32', to: '#0F1219' },
  legal: { from: '#374151', to: '#1F2937' },
  farmacias: { from: '#059669', to: '#047857' },
};

export default function PageBanner({ title, breadcrumbs = [], backgroundColor = '#5D8A82' }: PageBannerProps) {
  const gradient = colorGradients[backgroundColor.replace('#', '')] || colorGradients['default'];

  return (
    <div 
      className="page-banner" 
      style={{
        '--banner-color': gradient.from,
        '--banner-color-end': gradient.to,
      } as React.CSSProperties}
    >
      <div className="page-banner-container">
        <div className="page-banner-content">
          <nav className="page-banner-breadcrumbs">
            <Link to="/">Inicio</Link>
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className="page-banner-breadcrumb-item">
                <ChevronRight size={14} />
                {crumb.href ? (
                  <Link to={crumb.href}>{crumb.label}</Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
          <h1 className="page-banner-title">{title}</h1>
        </div>
      </div>
    </div>
  );
}