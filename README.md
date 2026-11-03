# Nativocan Landing Page

Landing page estática para Nativocan Centro de Desarrollo Canino. Sitio optimizado para SEO, responsive y con todas las secciones necesarias para mostrar servicios de adiestramiento y hotel canino.

## Tech Stack

- **Astro 4.x** - Static Site Generator
- **Tailwind CSS 3.x** - Utility-first CSS framework
- **Vanilla JavaScript** - Interactividad mínima y eficiente
- **Cloudflare Pages** - Hosting y CDN

## Development

### Install Dependencies
```bash
npm install
```

### Run Dev Server
```bash
npm run dev
```
Abre http://localhost:4321

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Updating Content

Todos los contenidos están centralizados en archivos JavaScript en `src/data/` para fácil actualización sin tocar código.

### Información del Negocio
**Archivo:** `src/data/site.js`

Actualiza:
- Teléfono, email, dirección
- Horarios de atención
- Redes sociales (Facebook, Instagram, WhatsApp)
- SEO metadata (título, descripción, keywords)

### Servicios de Adiestramiento
**Archivo:** `src/data/services.js`

Modifica o añade servicios con:
- Título y descripción
- Duración y sesiones
- Destacados (highlights)
- Ícono emoji

### Hotel Canino
**Archivo:** `src/data/hotel.js`

Actualiza:
- Características del hotel (`hotelFeatures`)
- Galería de fotos (`hotelGallery`)

### Testimonios
**Archivo:** `src/data/testimonials.js`

Añade o modifica testimonios con:
- Nombre del cliente y del perro
- Rating (1-5 estrellas)
- Texto del testimonio
- Servicio usado
- Foto (en `public/images/testimonials/`)

### Precios
**Archivo:** `src/data/pricing.js`

Actualiza planes y precios:
- Precio y duración
- Features incluidas
- Marca plan como "popular"
- CTA text

### Equipo
**Archivo:** `src/data/team.js`

Modifica información de entrenadores:
- Nombre, rol, especialidad
- Certificaciones
- Bio y experiencia
- Foto (en `public/images/team/`)

### Preguntas Frecuentes
**Archivo:** `src/data/faqs.js`

Añade o modifica FAQs para mejor SEO.

## Replacing Images

1. Coloca la nueva imagen en el directorio apropiado dentro de `public/images/`:
   - `/hero/` - Imágenes del hero
   - `/services/` - Iconos de servicios
   - `/hotel/` - Galería del hotel
   - `/team/` - Fotos del equipo
   - `/testimonials/` - Fotos de clientes

2. Optimiza la imagen:
   - Formato WebP recomendado (con fallback JPG)
   - Comprime usando TinyPNG o similar
   - Dimensiones apropiadas para web

3. Actualiza el path en el archivo de datos correspondiente

4. Commit y push - se despliega automáticamente

## Form Integration

El formulario de contacto usa **Web3Forms** (gratuito). Para activarlo:

1. Regístrate en [https://web3forms.com](https://web3forms.com)
2. Obtén tu Access Key
3. Actualiza en `src/components/ContactForm.astro`:
   ```html
   <input type="hidden" name="access_key" value="TU_ACCESS_KEY_AQUI" />
   ```
4. Commit y push

## Deploy to Cloudflare Pages

1. Crea un repositorio en GitHub
2. Push el código:
   ```bash
   git remote add origin <tu-repo-url>
   git push -u origin master
   ```

3. Ve a [Cloudflare Pages](https://pages.cloudflare.com/)
4. Click "Create a project" → Connect Git repository
5. Configuración de build:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/`
6. Deploy

### Custom Domain (Opcional)

1. En Cloudflare Pages, ve a "Custom domains"
2. Añade tu dominio
3. Sigue las instrucciones para configurar DNS
4. Actualiza `astro.config.mjs`:
   ```js
   site: 'https://tu-dominio.com'
   ```

## Post-Deployment Tasks

### Obligatorios
- [ ] Reemplazar `YOUR_ACCESS_KEY` en ContactForm con key real de Web3Forms
- [ ] Actualizar todos los placeholders TODO en `src/data/site.js`
- [ ] Reemplazar todas las imágenes placeholder con fotos reales
- [ ] Actualizar geo tags en `src/layouts/Layout.astro` (región, ciudad)
- [ ] Añadir Google Maps iframe en sección de contacto
- [ ] Configurar feeds de Instagram y TikTok (ver `docs/SOCIAL_FEED_SETUP.md`)

### SEO
- [ ] Submit sitemap a Google Search Console: `https://tu-sitio.com/sitemap.xml`
- [ ] Verificar sitio en Google Search Console
- [ ] Configurar Google Business Profile
- [ ] Validar structured data en [Schema.org Validator](https://validator.schema.org/)

### Recomendados
- [ ] Configurar Google Analytics (añadir script en Layout.astro)
- [ ] Reemplazar og-image.jpg con imagen real (1200x630px)
- [ ] Revisar y responder a reviews en Google Business Profile
- [ ] Configurar alertas para menciones de marca

## Structure Overview

```
nativocan/
├── src/
│   ├── components/       # Componentes reutilizables
│   ├── layouts/         # Layout base con SEO
│   ├── pages/           # index.astro (página principal)
│   ├── data/            # Contenido centralizado (EDITAR AQUÍ)
│   ├── scripts/         # JavaScript para interactividad
│   └── styles/          # Estilos globales
├── public/
│   ├── images/          # Imágenes estáticas
│   ├── favicon.svg
│   ├── robots.txt
│   ├── _headers         # Cloudflare Pages headers
│   └── og-image.jpg
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Performance

Target Lighthouse scores (todas 95+):
- ✅ Performance
- ✅ Accessibility
- ✅ Best Practices
- ✅ SEO

## Support

Para soporte técnico o preguntas sobre actualización de contenido, contactar al desarrollador.

## License

Proprietary - © 2024 Nativocan
