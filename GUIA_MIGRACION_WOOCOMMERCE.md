# Guía de Migración a WooCommerce

## ¿Por qué WooCommerce?

WooCommerce es la mejor opción para crear una tienda como Dosfarma o Atida porque:

| Aspecto | Tu proyecto actual | WooCommerce |
|---------|-------------------|-------------|
| **Productos** | 19 (manual) | Ilimitados + importación CSV |
| **Gestión** | Manual | Dashboard completo |
| **Catálogos** | Básico | Múltiples catálogos |
| **Buscar/Filtros** | Básico | Avanzado integrado |
| **SEO** | Manual | Plugins SEO |
| **Pagos** | Stripe manual | Stripe, Bizum, PayPal |
| **Envíos** | Básico | SEUR, Correos, envío gratis rules |
| **Mantenimiento** | Alto | Bajo |

---

## Paso 1: Contratar Hosting

### Opción recomendada: IONOS WordPress Hosting
- **Precio**: ~12-24€/mes
- **Incluye**: WordPress preinstalado, SSL, dominio gratis 1er año
- **Plus**: Soporte WordPress incluido

### Alternativa: VPS (más control)
- IONOS Cloud Server 2 vCPU / 4GB RAM
- Instalar WordPress manualmente
- Coste: ~8-15€/mes

---

## Paso 2: Instalar WooCommerce

1. Accede a tu WordPress
2. Ve a **Plugins → Añadir nuevo**
3. Busca "WooCommerce"
4. Instala y activa
5. Ejecuta el asistente de configuración

---

## Paso 3: Elegir Tema

### Recomendado: Flatsome (Premium - 69€)
El mejor tema para tiendas типа Dosfarma:
- Header builder integrado
- Mega menús
- Quick view de productos
- Filtros avanzados
- Mobile optimizado

### Alternativas Gratuitas:
- **Botiga** - theme gratuito bueno
- **Storefront** - oficial de WooCommerce

---

## Paso 4: Plugins Esenciales

### Funcionalidad:
| Plugin | Función |
|--------|---------|
| WooCommerce | Core |
| WooCommerce Spanish | Español |
| Stripe for WooCommerce | Pagos con tarjeta |
| Bizum para WooCommerce | Bizum |
| SEUR / Correos | Envíos España |
| WP Rocket | Velocidad (importante!) |
| Loco Translate | Traducciones |

### SEO:
| Plugin | Función |
|--------|---------|
| Yoast SEO | SEO básico |
| Rank Math | SEO avanzado (recomendado) |

### Marketing:
| Plugin | Función |
|--------|---------|
| Mailchimp | Newsletters |
| WhatsApp Button | Chat flotante |

---

## Paso 5: Migrar Productos

### Desde tu proyecto actual:
1. Exportar productos a CSV desde Supabase
2. Importar a WooCommerce

### Formato CSV para WooCommerce:
```csv
ID,SKU,Name,Description,Regular price,Sale price,Categories,Tags,Stock,Weight,Images
1,LRP-001,"La Roche-Posay Effaclar Gel","Gel limpiador...",14.90,18.90,"Cosmética|Belleza","faciales",25,0.2,https://imagen.jpg
```

### Plugins de importación:
- **Product Import Suite** (Premium)
- **WP All Import** (Premium)

---

## Paso 6: Configurar Tipos de Producto

WooCommerce soporta:
- **Productos simples** - единый producto
- **Productos variables** - tallas, colores
- **Productos agrupados** - packs
- **Productos virtuales** - servicios

---

## Paso 7: Configurar Envíos

### Zonas de envío:
1. España peninsular
2. España insular
3. Portugal
4. Europa

### Métodos:
- Envío gratis > 35€
- Tarifa plana: 7.90€
- Recogida en tienda

### Plugins recomendados:
- **WooCommerce Shipping** (gratis)
- **Correos WooCommerce**
- **SEUR para WooCommerce**

---

## Paso 8: Pagos

### Stripe (recomendado):
- Tarifa: 1.4% + 0.25€ (España)
- Sin mensualidad

### Bizum:
- Necesitas cuenta Stripe + Bizum

### PayPal:
- 2.99% + 0.35€

---

## Paso 9: Legal

### Páginas obligatorias:
1. **Aviso legal** - identitas
2. **Política de privacidad** - RGPD
3. **Términos y condiciones**
4. **Política de envíos**
5. **Política de devoluciones**
6. **Cookies** - Cookiebot o GDPR Cookie Compliance

### Plugins:
- **RGPD Cookie Compliance**
- **Cookiebot**

---

## Paso 10: SEO y Velocidad

### Velocidad (Core Web Vitals):
- Usar WP Rocket
- Optimizar imágenes (Smush)
- CDN (Cloudflare gratis)

### SEO:
- URL amigables: `/tienda/nombre-producto/`
- Schema markup (Rank Math)
- Sitemap XML

---

## Coste Estimado

| Concepto | Precio |
|---------|--------|
| Hosting IONOS (año) | 144-288€ |
| Tema Flatsome | 69€ |
| Plugins premium | 100-200€/año |
| Dominio (año) | 0-15€ |
| **Total año 1** | **313-572€** |

---

## Ventajas vs Dosfarma/Atida

Con WooCommerce puedes:
- ✅ Tener los mismos productos
- ✅ Mismo sistema de pagos
- ✅ Programa de puntos
- ✅ Blog integrado
- ✅ 完全 control
- ✅ Sin comisión por venta (solo tasas Stripe)

---

## Tiempo Estimado

| Fase | Tiempo |
|------|--------|
| Setup hosting + WordPress | 1 día |
| Configuración WooCommerce | 1 día |
| Importar productos | 1-2 días |
| Configurar pagos + envíos | 1 día |
| Diseño y branding | 2-5 días |
| Legal + SEO | 1-2 días |
| **Total** | **7-12 días** |

---

## Checklist de Migración

- [ ] Contratar hosting con WordPress
- [ ] Instalar WooCommerce
- [ ] Configurar moneda (EUR) y ubicación (España)
- [ ] Elegir e instalar tema
- [ ] Instalar plugins esenciales
- [ ] Crear páginas legales
- [ ] Importar productos
- [ ] Configurar categorías
- [ ] Configurar impuestos (IVA 21%)
- [ ] Configurar métodos de envío
- [ ] Configurar pagos (Stripe)
- [ ] Configurar emails transactionales
- [ ] Instalar SSL (si no viene)
- [ ] Configurar SEO
- [ ] Testing completo
- [ ] Lanzamiento

---

## Nota Importante

Tu proyecto React actual puede mantenerse como:
1. **Headless WooCommerce** - conectar React a WooCommerce via API
2. **Mantenerse en Vercel** como landing + blog
3. **Redireccionar** todo a la nueva web WooCommerce

**Recomendación**: Migra todo a WooCommerce para simplificar mantenimiento.

---

*Última actualización: Abril 2026*