import { useState } from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import SEO from '../components/SEO';
import './Blog.css';

const blogPosts = [
  {
    id: 1,
    title: 'Este es el factor de protección solar recomendado para reducir el riesgo de cáncer de piel, según la ciencia',
    excerpt: 'El mayor factor de riesgo del cáncer de piel es la exposición directa al sol. Descubre qué FPS necesitas según tu tipo de piel y cómo aplicarlo correctamente.',
    image: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?w=800&h=400&fit=crop',
    category: 'Protección Solar',
    date: '24 Mayo 2024',
    author: 'C. Amanda Osuna',
    source: 'Infobae',
    sourceUrl: 'https://www.infobae.com/espana/2024/05/24/este-es-el-factor-de-proteccion-recomendado-que-debe-tener-la-crema-solar-para-reducir-el-riesgo-de-cancer-de-piel-segun-la-ciencia/',
    content: `El cáncer de piel es uno de los tipos de cáncer más comunes en España. La principal causa es la exposición prolongada a la radiación ultravioleta sin protección adecuada.

Según estudios científicos, se recomienda utilizar un protector solar con un mínimo de FPS 30 para una protección adecuada. Sin embargo, para personas con piel clara o historial familiar de cáncer de piel, los dermatólogos suelen recomendar FPS 50+.

Es importante aplicarse el protector solar cada 2 horas, especialmente si sudas mucho o te has bañado. También debes reaplicarlo después de towel dry.

El error más común es no aplicar suficiente cantidad. Se recomienda usar aproximadamente una cantidad del tamaño de una pelota de golf para cubrir todo el cuerpo.`
  },
  {
    id: 2,
    title: 'Cómo elegir el mejor protector solar para tu tipo de piel',
    excerpt: 'Los dermatólogos explican qué factores considerar al seleccionar un protector solar según tu tipo de piel.',
    image: 'https://images.unsplash.com/photo-1556228852-80b6e5eeff06?w=800&h=400&fit=crop',
    category: 'Cosmética',
    date: '5 Agosto 2024',
    author: 'Dra. Leonor Revelles Peñas',
    source: 'Doctoralia',
    sourceUrl: 'https://www.doctoralia.es/blog/como-elegir-mejor-protector-solar-piel',
    content: `Elegir el protector solar adecuado es fundamental para proteger tu piel. Los dermatólogos recomiendan considerar tu tipo de piel:

- Piel seca: Busca protectores con ingredientes hidratantes como ácido hialurónico o glicerina
- Piel grasa: Opta por formatos gel o fluidos no comedogénicos
- Piel sensible: Elige productos sin perfume y con ingredientes calmantes como aloe vera
- Piel con tendencia acneica: BuscaOil-free y no comedogénico

Además del FPS, es importante verificar que el protector solar ofrezca protecciónbroad spectrum contra UVA y UVB.`
  },
  {
    id: 3,
    title: 'Consejos profesionales de farmacia para cuidar tu hígado',
    excerpt: 'Descubre cómo mantener la salud de tu hígado con consejos prácticos de profesionales farmacéuticos.',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&h=400&fit=crop',
    category: 'Salud',
    date: '21 Julio 2024',
    author: 'Sara González Ruiz',
    source: 'Farmacia Ortopedia Cepeda',
    sourceUrl: 'https://farmaciaortopediacepeda.es/consejos-profesionales-de-la-farmacia-para-el-higado/',
    content: `El hígado es uno de los órganos más importantes de nuestro cuerpo. Desde la farmacia, ofrecemos estos consejos para mantenerlo saludable:

1. Mantén una alimentación equilibrada, rica en verduras y frutas
2. Evita el consumo excesivo de alcohol
3. No abuses de medicamentos sin supervisión médica
4. Realiza ejercicio físico regularmente
5. Vacúnate contra la hepatitis A y B

Existen suplementos como el cardo mariano que pueden ayudar a proteger la función hepática, pero siempre es recomendable consultar con un profesional antes de iniciar cualquier suplementación.`
  },
  {
    id: 4,
    title: 'Consejos esenciales de farmacia para aliviar las alergias',
    excerpt: 'Las alergias afectan a millones de personas. Descubre los mejores consejos farmacéuticos para aliviar los síntomas.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=400&fit=crop',
    category: 'Salud',
    date: '25 Octubre 2024',
    author: 'Sara González Ruiz',
    source: 'Farmacia Ortopedia Cepeda',
    sourceUrl: 'https://farmaciaortopediacepeda.es/consejos-esenciales-de-farmacia-para-aliviar-alergias/',
    content: `Las alergias son una reacción del sistema inmunitario a sustancias que normalmente son inofensivas. Desde la farmacia, te recomendamos:

Antihistamínicos: Los hay de primera generación (que pueden causar somnolencia) y de segunda generación (más seguros para conducir).

Lavados nasales: El suero fisiológico o el agua de mar ayuda a eliminar alérgenos de las fosas nasales.

Colirios: Para alergias oculares, existen lágrimas artificiales y colirios específicos.

Prevención: Mantén ventanas cerradas en época de polen, usa filtros HEPA en casa y lava frecuentemente la ropa de cama.

Si los síntomas persisten, consulta con tu médico o алергологo.`
  },
  {
    id: 5,
    title: '10 consejos para un año más saludable',
    excerpt: 'Comienza el año con buenos hábitos que mejorarán tu salud física y mental.',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&h=400&fit=crop',
    category: 'Bienestar',
    date: '14 Diciembre 2023',
    author: 'Farmacias Roma',
    source: 'Farmacias Roma',
    sourceUrl: 'https://farmaciasroma.com/10-consejos-que-te-ayudaran-a-tener-un-2024-mas-saludable/',
    content: `Comenzar el año con hábitos saludables es más fácil de lo que parece. Aquí tienes 10 consejos:

1. Bebe al menos 2 litros de agua al día
2. Come 5 porciones de frutas y verduras diarias
3. Realiza 30 minutos de ejercicio moderado
4. Duerme entre 7-8 horas
5. Limita el consumo de azúcar y sal
6. No te automediques
7. Vacúnate según las recomendaciones
8. Realiza chequeos médicos regulares
9. Practica mindfulness o meditación
10. Mantén conexiones sociales saludables

Pequeños cambios pueden marcar una gran diferencia en tu salud a largo plazo.`
  },
  {
    id: 6,
    title: 'Guía para utilizar protocolos de consejo en la farmacia',
    excerpt: 'El farmacéutico está cada vez más preparado para asistir a personas con dolencias leves.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=400&fit=crop',
    category: 'Farmacia',
    date: '2 Noviembre 2023',
    author: 'Silvia Gomez',
    source: 'Liceo de Farmacia',
    sourceUrl: 'https://liceodefarmacia.com/blog/guia-para-utilizar-protocolos-de-consejo-en-la-farmacia-en-2024/',
    content: `La actividad farmacéutica ha evolucionado hacia un rol más activo en el cuidado de la salud. Los protocolos de consejo farmacéutico son herramientas que permiten:

Evaluación de síntomas: El farmacéutico puede ayudarte a identificar si puedes tratar tu dolencia con medicamentos de prescripción o si necesitas acudir al médico.

Educación sanitaria: Explicar cómo tomar correctamente los medicamentos y sus efectos secundarios.

Seguimiento: En dolencias crónicas, el farmacéutico puede hacer seguimiento del tratamiento.

Derivación: Saber cuándo derivar al paciente al médico o especialista.

El objetivo es mejorar la salud pública ofreciendo una atención más personalizada y de calidad.`
  }
];

const categories = ['Todos', 'Protección Solar', 'Cosmética', 'Salud', 'Bienestar', 'Farmacia'];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  const filteredPosts = selectedCategory === 'Todos' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  if (selectedPost) {
    return (
      <div className="page-container blog-page">
        <SEO title={`${selectedPost.title} | Blog MadFarma`} description={selectedPost.excerpt} />
        <div className="blog-article">
          <button className="back-btn" onClick={() => setSelectedPost(null)}>
            ← Volver al blog
          </button>
          
          <div className="blog-article-header">
            <span className="blog-card-category">{selectedPost.category}</span>
            <h1>{selectedPost.title}</h1>
            <div className="blog-card-meta">
              <span><Calendar size={14} /> {selectedPost.date}</span>
              <span><User size={14} /> {selectedPost.author}</span>
            </div>
          </div>

          <img src={selectedPost.image} alt={selectedPost.title} className="blog-article-image" />

          <div className="blog-article-content">
            <p className="lead">{selectedPost.excerpt}</p>
            <div className="article-body">
              {selectedPost.content.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
        <button className="back-btn back-btn-bottom" onClick={() => setSelectedPost(null)}>
          ← Volver al blog
        </button>
      </div>
    );
  }

  return (
    <div className="page-container blog-page">
      <SEO title="Blog de Salud y Bienestar | MadFarma" description="Consejos de nuestros farmacéuticos y expertos en salud en Madrid" />
      
      <div className="blog-header">
        <h1>Blog de Salud y Bienestar</h1>
        <p>Consejos de nuestros farmacéuticos y expertos en salud</p>
      </div>

      <div className="blog-categories">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`blog-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="blog-grid">
        {filteredPosts.map(post => (
          <article key={post.id} className="blog-card" onClick={() => setSelectedPost(post)}>
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
              <span className="blog-card-link">
                Leer más <ArrowRight size={16} />
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="blog-newsletter">
        <h2>Suscríbete a nuestro newsletter</h2>
        <p>Recibe consejos de salud y ofertas exclusivas en tu email</p>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Tu email" />
          <button type="submit">Suscribirse</button>
        </form>
      </div>
    </div>
  );
}
