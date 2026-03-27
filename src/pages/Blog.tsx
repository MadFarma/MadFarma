import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';
import './Blog.css';

const blogPosts = [
  {
    id: 1,
    title: 'Cómo fortalecer tu sistema inmunitario antes del invierno',
    excerpt: 'Descubre los hábitos y suplementos esenciales para preparar tu organismo ante los meses más fríos del año.',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&h=400&fit=crop',
    category: 'Salud',
    date: '15 Octubre 2024',
    author: 'Dra. María García'
  },
  {
    id: 2,
    title: 'Guía completa de protección solar: FPS, tipos de piel y errores frecuentes',
    excerpt: 'Todo lo que necesitas saber para elegir el protector solar adecuado y mantener tu piel sana todo el año.',
    image: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?w=600&h=400&fit=crop',
    category: 'Cosmética',
    date: '12 Octubre 2024',
    author: 'Dra. Elena Rodríguez'
  },
  {
    id: 3,
    title: 'Vitaminas y minerales esenciales para mujeres de 30 a 50 años',
    excerpt: 'Una guía profesional sobre los nutrientes que tu cuerpo necesita en cada etapa de la vida adulta.',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=400&fit=crop',
    category: 'Nutrición',
    date: '10 Octubre 2024',
    author: 'Dr. Carlos Martín'
  },
  {
    id: 4,
    title: 'Diferencias entre dermatitis atópica, psoriasis y eccema: cómo identificarlos',
    excerpt: 'Aprende a distinguir las principales afecciones de la piel y cuándo acudir al farmacéutico o dermatólogo.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=400&fit=crop',
    category: 'Salud',
    date: '8 Octubre 2024',
    author: 'Dra. Ana López'
  },
  {
    id: 5,
    title: 'Todo sobre probióticos: beneficios y cómo elegirlos',
    excerpt: 'Los probióticos son aliados fundamentales para tu salud intestinal. Descubre cuáles son los mejores para ti.',
    image: 'https://images.unsplash.com/photo-1559563362-c667ba5f5480?w=600&h=400&fit=crop',
    category: 'Nutrición',
    date: '5 Octubre 2024',
    author: 'Dr. Pedro Sánchez'
  },
  {
    id: 6,
    title: 'Cuidados del bebé: guía completa para padres primerizos',
    excerpt: 'Todo lo que necesitas saber para cuidar de tu bebé desde el primer día: alimentación, higiene y salud.',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&h=400&fit=crop',
    category: 'Bebé y Mamá',
    date: '3 Octubre 2024',
    author: 'Dra. Laura Fernández'
  }
];

const categories = ['Todos', 'Salud', 'Cosmética', 'Nutrición', 'Bebé y Mamá'];

export default function Blog() {
  return (
    <div className="page-container blog-page">
      <div className="blog-header">
        <h1>Blog de Salud y Bienestar</h1>
        <p>Consejos de nuestros farmacéuticos y expertos en salud</p>
      </div>

      <div className="blog-categories">
        {categories.map(cat => (
          <button key={cat} className={`blog-cat-btn ${cat === 'Todos' ? 'active' : ''}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="blog-grid">
        {blogPosts.map(post => (
          <article key={post.id} className="blog-card">
            <div className="blog-card-image">
              <img src={post.image} alt={post.title} />
              <span className="blog-card-category">{post.category}</span>
            </div>
            <div className="blog-card-content">
              <div className="blog-card-meta">
                <span><Calendar size={14} /> {post.date}</span>
                <span><User size={14} /> {post.author}</span>
              </div>
              <h2 className="blog-card-title">{post.title}</h2>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <Link to={`/blog/${post.id}`} className="blog-card-link">
                Leer más <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="blog-newsletter">
        <h2>Suscríbete a nuestro newsletter</h2>
        <p>Recibe consejos de salud y ofertas exclusivas en tu email</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Tu email" />
          <button type="submit">Suscribirse</button>
        </form>
      </div>
    </div>
  );
}
