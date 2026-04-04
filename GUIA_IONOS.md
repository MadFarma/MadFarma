# Guía de Configuración - Botica Online en IONOS

## Requisitos Previos

- Cuenta en IONOS contratada
- Acceso al panel de IONOS
- Acceso SSH al servidor (putty en Windows, terminal en Mac/Linux)

---

## Paso 1: Contratar VPS en IONOS

1. Inicia sesión en **IONOS**
2. Ve a **Cloud Server** → **Crear servidor**
3. Configura:
   - **Imagen**: Ubuntu 22.04 LTS (o 24.04)
   - **Tamaño**: 2 vCPU / 4GB RAM (suficiente para inicio)
   - **Red**: IPv4 pública
4. Guarda la IP del servidor (ej: `92.23.45.67`)
5. Establece contraseña root o genera clave SSH

---

## Paso 2: Conectar al Servidor

### Desde Mac/Linux:
```bash
ssh root@TU_IP_SERVIDOR
# Ejemplo: ssh root@92.23.45.67
```

### Desde Windows:
- Descarga **PuTTY**
- Conecta usando la IP y puerto 22

---

## Paso 3: Instalar Software Base

Copia y ejecuta este comando completo:

```bash
# Actualizar sistema
apt update && apt upgrade -y

# Instalar Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Instalar PM2 (gestor de procesos)
npm install -g pm2

# Instalar Nginx
apt install -y nginx

# Instalar herramientas útiles
apt install -y curl wget git unzip zip
```

---

## Paso 4: Subir el Proyecto al Servidor

### Opción A: Git (recomendado)
```bash
# En tu máquina local, crea un repositorio git
cd /Users/davidchueca/Proyecto/Botica\ Online
git init
git add .
git commit -m "Initial commit"

# En el servidor, clona el repositorio
cd /var/www
git clone TU_REPOSITORIO.git botica-online
```

### Opción B: FTP/SFTP
- Usa FileZilla o Cyberduck
- Conecta a `sftp://TU_IP`
- Sube la carpeta `Botica Online` a `/var/www/`

---

## Paso 5: Configurar Variables de Entorno

```bash
cd /var/www/botica-online/api

# Crear archivo .env
nano .env
```

Copia este contenido:
```env
# Supabase
SUPABASE_URL=https://vstowegzydekibweuqbt.supabase.co
SUPABASE_ANON_KEY=tu_anon_key_de_supabase

# Stripe
STRIPE_SECRET_KEY=sk_test_tu_key
STRIPE_PUBLIC_KEY=pk_test_tu_key
```

Guarda: `Ctrl + O`, Enter, `Ctrl + X`

---

## Paso 6: Instalar Dependencias

```bash
# Frontend
cd /var/www/botica-online
npm install
npm run build

# API
cd /var/www/botica-online/api
npm install
```

---

## Paso 7: Configurar PM2 para la API

```bash
cd /var/www/botica-online/api
pm2 start src/index.js --name botica-api

# Guardar configuración para reinicio automático
pm2 save
pm2 startup
```

---

## Paso 8: Configurar Nginx

```bash
nano /etc/nginx/sites-available/botica-online
```

Copia esta configuración:

```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;

    # Frontend (Static)
    location / {
        root /var/www/botica-online/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # API (Proxy)
    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activar el sitio:

```bash
ln -s /etc/nginx/sites-available/botica-online /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

---

## Paso 9: SSL Gratis con Let's Encrypt

```bash
# Instalar Certbot
apt install -y certbot python3-certbot-nginx

# Obtener certificado
certbot --nginx -d tudominio.com -d www.tudominio.com

# Follow the prompts
# Choose "Redirect" when asked
```

---

## Paso 10: Configurar Dominio en IONOS

1. Ve a **Domains** en IONOS
2. Añade tu dominio
3. Configura los **registros DNS**:
   - **A Record**: @ → TU_IP_SERVIDOR
   - **CNAME**: www → @

---

## Comandos Útiles

```bash
# Ver logs de la API
pm2 logs botica-api

# Reiniciar la API
pm2 restart botica-api

# Ver estado
pm2 status

# Reiniciar Nginx
systemctl restart nginx

# Verificar SSL
certbot renew --dry-run
```

---

## URL Final

Después de completar todos los pasos:
- **Tu tienda**: `https://tudominio.com`
- **API**: `https://tudominio.com/api`

---

## Notas Importantes

1. **Contrata el dominio** en IONOS o移到 otro proveedor
2. **Haz backup** de tu código regularmente
3. **Actualiza** el software del servidor periódicamente
4. **Monitorea** el uso de recursos con `htop`

---

## ¿Necesitas ayuda?

Si tienes problemas en algún paso, pregunta y te ayudo a resolverlo.