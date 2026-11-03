# Guía de Instagram Official Embed (Método Simple)

Esta es la forma **MÁS SIMPLE** de agregar posts de Instagram a tu sitio. No requiere API, tokens, ni configuración compleja.

## ✅ Ventajas

- **100% Gratis** - Sin costos, sin límites
- **Sin API** - No necesitas crear apps en Facebook Developers
- **Sin Tokens** - No hay access tokens que renovar cada 60 días
- **Actualización manual** - Tú decides qué posts mostrar
- **Muy confiable** - Embed oficial de Instagram
- **Configuración inmediata** - 2 minutos por post

## ❌ Desventajas

- **No automático** - Tienes que actualizar manualmente cada 1-2 semanas
- **Solo posts individuales** - No puedes mostrar el feed completo automáticamente
- **Requiere rebuild** - Cada cambio necesita `npm run build` y deploy

---

## 📋 Cómo Obtener el Código de un Post

### Paso 1: Abre Instagram en Navegador Web

🚨 **IMPORTANTE:** Debes usar Instagram en un **navegador web** (Chrome, Firefox, Safari, Edge), **NO en la app móvil**.

1. Ve a [instagram.com](https://instagram.com)
2. Inicia sesión con tu cuenta
3. Ve a tu perfil: `instagram.com/nativocan.cl`

### Paso 2: Selecciona el Post

1. Click en el post que quieres embeber
2. Se abrirá el post en grande

### Paso 3: Obtener el Código Embed

1. **Click en los 3 puntos (⋯)** en la esquina superior derecha del post
2. **Click en "Embed"** (Insertar)
3. Se abrirá una ventana con el código
4. **Click en "Copy Embed Code"** (Copiar código de inserción)

El código se verá similar a esto:

```html
<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/ABC123XYZ/" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/ABC123XYZ/" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> ... </a></div></blockquote> <script async src="//www.instagram.com/embed.js"></script>
```

---

## 🔧 Cómo Agregarlo al Sitio

### Paso 1: Abre el Archivo del Componente

Abre `src/components/SocialFeed.astro` en tu editor de código.

### Paso 2: Encuentra los Posts de Ejemplo

Busca la sección de Instagram (aproximadamente línea 52-120). Verás posts con URLs como:

```html
<blockquote
  class="instagram-media"
  data-instgrm-permalink="https://www.instagram.com/p/EXAMPLE1/"
  ...
```

### Paso 3: Reemplaza la URL

**Solo necesitas cambiar la URL del `data-instgrm-permalink`.**

**Antes:**
```html
<blockquote
  class="instagram-media"
  data-instgrm-captioned
  data-instgrm-permalink="https://www.instagram.com/p/EXAMPLE1/"
  data-instgrm-version="14"
  style="background:#FFF; border:0; border-radius:12px; box-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1); margin: 1px; max-width:100%; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">
</blockquote>
```

**Después (con tu post real):**
```html
<blockquote
  class="instagram-media"
  data-instgrm-captioned
  data-instgrm-permalink="https://www.instagram.com/p/ABC123XYZ/"
  data-instgrm-version="14"
  style="background:#FFF; border:0; border-radius:12px; box-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1); margin: 1px; max-width:100%; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">
</blockquote>
```

### Paso 4: Repite para Todos los Posts

El sitio tiene 6 slots de posts (EXAMPLE1 a EXAMPLE6). Reemplaza cada uno con tus posts reales.

### Paso 5: Build y Deploy

```bash
npm run build
git add src/components/SocialFeed.astro
git commit -m "feat: add Instagram posts"
git push
```

---

## 💡 Tips y Mejores Prácticas

### ¿Cuántos Posts Mostrar?

- **Recomendado:** 6 posts
- **Mínimo:** 3 posts
- **Máximo:** 9 posts

Si quieres menos de 6 posts, simplemente elimina los `<div class="instagram-post-wrapper">` que no necesites.

### ¿Qué Posts Elegir?

✅ **Buenos para mostrar:**
- Posts con muchos likes/comentarios
- Fotos de alta calidad de tus servicios
- Videos cortos de perros siendo entrenados
- Testimonios de clientes (fotos de perros felices)
- Before/After de adiestramiento

❌ **Evitar:**
- Posts muy antiguos (> 2 meses)
- Posts con poca interacción
- Fotos borrosas o de baja calidad
- Contenido no relacionado con el negocio

### ¿Con Qué Frecuencia Actualizar?

**Recomendación:** Cada **1-2 semanas**

1. Publica contenido nuevo en Instagram
2. Espera 1-2 días para ver la interacción
3. Reemplaza los posts con menos likes por los nuevos exitosos

### Grid Layout

**Actual:** 1 columna (mobile), 2 columnas (tablet), 3 columnas (desktop)

Para cambiar el grid, modifica la línea 52:

```html
<!-- Más posts en desktop (4 columnas) -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

<!-- Posts más grandes (2 columnas máximo) -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-8">

<!-- Solo 1 columna siempre (lista vertical) -->
<div class="grid grid-cols-1 gap-6">
```

---

## 🔍 Verificar que Funciona

### En Desarrollo:

```bash
npm run dev
```

Abre http://localhost:4321 y ve a la sección de redes sociales. Los posts deberían cargar.

### En Producción:

Después de hacer deploy a Cloudflare Pages, verifica que los posts carguen correctamente.

---

## 🐛 Troubleshooting

### Los posts no aparecen / muestran error

**Solución 1: Verifica la URL**
- Asegúrate de que la URL del post sea correcta
- Debe ser pública (no de cuenta privada)
- Formato: `https://www.instagram.com/p/CODIGO_DEL_POST/`

**Solución 2: Limpia caché**
- `Ctrl + Shift + Delete` → Limpiar caché
- Recarga la página: `Ctrl + F5`

**Solución 3: Verifica Adblocker**
- Algunos adblockers bloquean Instagram
- Desactívalo temporalmente para probar

**Solución 4: Revisa la consola**
- Abre DevTools: `F12`
- Ve a la pestaña Console
- Busca errores relacionados con Instagram

### Solo aparece el enlace, no el post embebido

El script de Instagram no se cargó. Verifica que en `SocialFeed.astro` esté esta línea:

```html
<!-- Instagram Embed Script -->
<script async src="//www.instagram.com/embed.js"></script>
```

### El post se ve cortado o muy pequeño

Los estilos inline del `<blockquote>` controlan el tamaño. No los elimines.

---

## 🆚 Comparación con Otras Opciones

### Instagram Official Embed (Esta opción) ✅

**Pros:**
- ✅ Gratis
- ✅ Sin configuración compleja
- ✅ Muy confiable
- ✅ Control total sobre qué mostrar

**Contras:**
- ❌ Actualización manual
- ❌ Requiere rebuild y deploy

### Instafeed.js (Automático pero complejo)

**Pros:**
- ✅ Feed automático
- ✅ Gratis

**Contras:**
- ❌ Requiere Access Token de Instagram API
- ❌ Token expira cada 60 días
- ❌ Configuración compleja (15+ minutos)
- ❌ Puede romper si Instagram cambia la API

**Ver:** `docs/INSTAGRAM_SETUP.md`

### Servicios de Pago (EmbedSocial, Elfsight)

**Pros:**
- ✅ Feed automático
- ✅ Fácil setup
- ✅ Analytics

**Contras:**
- ❌ $7-15/mes
- ❌ Dependes de un servicio externo

---

## 📝 Ejemplo Completo

Aquí hay un ejemplo de cómo se vería un post real reemplazado:

```html
<!-- Post de un cliente feliz con su perro -->
<div class="instagram-post-wrapper">
  <blockquote
    class="instagram-media"
    data-instgrm-captioned
    data-instgrm-permalink="https://www.instagram.com/p/C1A2B3C4D5E/"
    data-instgrm-version="14"
    style="background:#FFF; border:0; border-radius:12px; box-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1); margin: 1px; max-width:100%; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">
  </blockquote>
</div>
```

El código `C1A2B3C4D5E` viene de la URL de tu post de Instagram.

---

## 🎯 Resumen

1. **Abre Instagram en navegador web**
2. **Ve a tu post → 3 puntos (⋯) → Embed**
3. **Copia solo la URL** del post
4. **Pega en `data-instgrm-permalink`** en `SocialFeed.astro`
5. **Rebuild:** `npm run build`
6. **Commit y push**

¡Listo! Tus posts de Instagram ahora se muestran en el sitio. 🎉

---

## 📞 Soporte

Si tienes problemas:
- Verifica que la cuenta de Instagram sea pública
- Revisa la consola del navegador (F12) para errores
- Asegúrate de que el script de Instagram se cargue: `//www.instagram.com/embed.js`
