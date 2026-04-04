# Proyecto MadFarma - David Chueca
Este proyecto ha sido renombrado a MadFarma (Madrid + Farmacia).

## Resumen del Proyecto

Desarrollo de una tienda online de parafarmacia similar a atida.com o dosfarma.com.

### Stack técnico:
- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Express.js
- **Base de datos**: Supabase
- **Pagos**: Stripe
- **Despliegue**: Vercel

---

## Historial de la conversación

### 1. Revisión inicial del proyecto
- Se revisó la estructura del proyecto
- Frontend completo con React Router
- Backend Express con datos mock
- Contexto React para estado global

### 2. Megamenu
- Se implementó un megamenu similar a la captura de pantalla proporcionada
- 3 columnas: categorías | subcategorías | productos
- Grid de productos con badges de descuento

### 3. Integración con Supabase
- Se configuró el cliente Supabase
- Se crearon credenciales del proyecto:
  - URL: https://vstowegzydekibweuqbt.supabase.co
  - ANON_KEY: proporcionada por el usuario

### 4. Base de datos
- Se creó script SQL completo en `api/scripts/setup-complete.sql`
- Tablas: users, products, categories, brands, orders, coupons, challenges, etc.
- El usuario ejecutó el SQL en Supabase SQL Editor

### 5. Stripe
- Se configuraron las API keys de Stripe:
  - Secret Key: sk_test_...
  - Public Key: pk_test_...
- Se implementó checkout con Stripe Checkout Sessions

### 6. Despliegue a Vercel
- Se desplegó el frontend a: https://botica-online.vercel.app
- Problema: La API (Express) no funciona correctamente en Vercel
-原因是 Vercel solo permite un proyecto y la API compite con el frontend

---

## Estado actual

### Funcional:
- ✅ Frontend React desplegado
- ✅ Base de datos Supabase con datos
- ✅ Stripe configurado
- ⚠️ API Express no funciona en producción

### Pendiente:
- [ ] Separar API a proyecto independiente
- [ ] Conectar frontend con la nueva API
- [ ] Testing completo

---

## Archivos importantes

### Frontend
- `src/App.tsx` - Router principal
- `src/context/AppContext.tsx` - Estado global (productos, cart, usuario)
- `src/components/Header.tsx` - Header con megamenu
- `src/pages/Tienda.tsx` - Catálogo de productos
- `src/pages/Carrito.tsx` - Checkout con Stripe
- `src/utils/api.ts` - Cliente API

### Backend (API)
- `api/src/index.js` - Servidor Express
- `api/src/routes/products.js` - Endpoints de productos
- `api/src/routes/checkout.js` - Stripe checkout
- `api/src/supabase.js` - Cliente Supabase

### Configuración
- `.env` - Variables de entorno locales
- `vercel.json` - Configuración de despliegue
- `api/scripts/setup-complete.sql` - Schema de base de datos

---

## Variables de entorno necesarias

### Supabase
```
SUPABASE_URL=https://vstowegzydekibweuqbt.supabase.co
SUPABASE_ANON_KEY=<key_del_usuario>
```

### Stripe
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
```

---

## Comandos útiles

```bash
# Desarrollo local
npm run dev          # Frontend
cd api && npm run dev  # API

# Build
npm run build        # Frontend

# Despliegue
npx vercel --prod
```

---

## Próximos pasos

1. Crear proyecto Vercel separado para la API
2. Configurar variables de entorno en el nuevo proyecto
3. Actualizar frontend para usar la nueva URL de API
4. Testing de todos los endpoints
5. Configurar webhooks de Stripe para producción