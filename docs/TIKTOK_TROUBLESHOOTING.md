# TikTok Embed Troubleshooting

## Problema: "overload-protect triggered"

Este error aparece cuando el embed de TikTok no se carga correctamente. Aquí están las soluciones.

### ✅ Soluciones Rápidas

#### 1. Limpiar caché del navegador
- Chrome/Edge: `Ctrl + Shift + Delete` → Limpiar caché
- Recargar la página: `Ctrl + F5`

#### 2. Verificar Adblocker
- Desactiva temporalmente AdBlock, uBlock Origin, o extensiones similares
- Algunos adblockers bloquean scripts de TikTok

#### 3. Verificar la red
- Asegúrate de tener conexión a internet estable
- Algunos firewalls corporativos bloquean TikTok

#### 4. Probar en modo incógnito
- `Ctrl + Shift + N` (Chrome)
- Si funciona ahí, el problema es una extensión del navegador

### 🔧 Soluciones Técnicas

#### Opción A: Usar Videos Individuales (Más Confiable)

En lugar del embed de perfil, usa videos específicos:

1. **Obtener código de un video:**
   - Ve al video en TikTok
   - Click en "Share" (Compartir) → "Embed"
   - Copia el código `<blockquote>`

2. **Implementar en el sitio:**

Abre `src/components/SocialFeed.astro` y reemplaza el contenido del `tiktok-feed-container` (línea ~93-108):

```html
<!-- TikTok Embed Container -->
<div class="tiktok-feed-container">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">

    <!-- Video 1 -->
    <blockquote
      class="tiktok-embed"
      cite="https://www.tiktok.com/@nativocan.cl/video/VIDEO_ID_1"
      data-video-id="VIDEO_ID_1"
      style="max-width: 605px;min-width: 325px;">
      <section>
        <a target="_blank" href="https://www.tiktok.com/@nativocan.cl/video/VIDEO_ID_1?refer=embed">@nativocan.cl</a>
      </section>
    </blockquote>

    <!-- Video 2 -->
    <blockquote
      class="tiktok-embed"
      cite="https://www.tiktok.com/@nativocan.cl/video/VIDEO_ID_2"
      data-video-id="VIDEO_ID_2"
      style="max-width: 605px;min-width: 325px;">
      <section>
        <a target="_blank" href="https://www.tiktok.com/@nativocan.cl/video/VIDEO_ID_2?refer=embed">@nativocan.cl</a>
      </section>
    </blockquote>

    <!-- Video 3 -->
    <blockquote
      class="tiktok-embed"
      cite="https://www.tiktok.com/@nativocan.cl/video/VIDEO_ID_3"
      data-video-id="VIDEO_ID_3"
      style="max-width: 605px;min-width: 325px;">
      <section>
        <a target="_blank" href="https://www.tiktok.com/@nativocan.cl/video/VIDEO_ID_3?refer=embed">@nativocan.cl</a>
      </section>
    </blockquote>

  </div>
</div>
```

**Ventajas:**
- Más confiable que el embed de perfil
- Puedes elegir qué videos mostrar
- Menos probabilidad de error "overload-protect"

**Desventajas:**
- Tienes que actualizar manualmente los videos
- No muestra automáticamente los más recientes

#### Opción B: Cargar el Script en el Head

Si prefieres mantener el embed de perfil, intenta cargar el script de manera diferente:

1. Abre `src/layouts/Layout.astro`
2. Antes del `</head>`, agrega:

```html
<!-- TikTok Embed Script in head -->
<script async src="https://www.tiktok.com/embed.js"></script>
```

3. En `src/components/SocialFeed.astro`, **elimina** las líneas 145-170 (el script de TikTok)

4. Rebuild: `npm run build`

#### Opción C: Agregar Timeout

Modifica el script de carga en `SocialFeed.astro` (línea ~146):

```javascript
<script>
  function loadTikTokScript() {
    if (document.querySelector('script[src*="tiktok.com/embed.js"]')) {
      return;
    }

    // Wait a bit before loading
    setTimeout(() => {
      const script = document.createElement('script');
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;

      script.onload = () => {
        console.log('TikTok embed loaded successfully');
      };

      script.onerror = () => {
        console.error('Failed to load TikTok embed');
        // Show fallback
        document.querySelector('.tiktok-feed-container').innerHTML =
          '<div class="text-center p-12 bg-neutral-100 rounded-lg">' +
          '<p class="text-neutral-600 mb-4">No se pudo cargar el feed de TikTok</p>' +
          '<a href="https://www.tiktok.com/@nativocan.cl" target="_blank" ' +
          'class="text-primary hover:underline font-semibold">Ver perfil en TikTok →</a>' +
          '</div>';
      };

      document.body.appendChild(script);
    }, 1000); // Esperar 1 segundo
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadTikTokScript);
  } else {
    loadTikTokScript();
  }
</script>
```

### 🌐 Verificar en Producción

El error a veces solo ocurre en desarrollo local. Verifica en producción:

1. Deploy a Cloudflare Pages
2. Prueba el sitio en producción
3. Si funciona allá, el problema es solo local

### 🔍 Debug en Consola

Abre la consola del navegador (`F12`) y busca:

```javascript
// Verificar si el script de TikTok se cargó
console.log(document.querySelector('script[src*="tiktok.com"]'));

// Ver si hay errores
// Busca mensajes en rojo en la consola
```

### 📱 Alternativa: Iframe Manual

Si nada funciona, usa un iframe simple:

```html
<div class="tiktok-feed-container">
  <iframe
    src="https://www.tiktok.com/@nativocan.cl/embed"
    width="100%"
    height="800"
    frameborder="0"
    allow="encrypted-media;"
    allowfullscreen
    style="border-radius: 12px; max-width: 780px; margin: 0 auto; display: block;">
  </iframe>
</div>
```

**Nota:** TikTok no soporta oficialmente iframes, por lo que esta solución puede no funcionar.

### 🆘 Último Recurso: Link Simple

Si definitivamente no funciona, muestra un enlace directo:

```html
<div class="tiktok-feed-container">
  <div class="text-center p-12 bg-gradient-to-br from-cyan-50 to-purple-50 rounded-lg">
    <div class="text-6xl mb-6">🎵</div>
    <h3 class="text-2xl font-bold text-neutral-900 mb-4">Síguenos en TikTok</h3>
    <p class="text-neutral-600 mb-6">
      Descubre nuestros videos de adiestramiento, tips y momentos divertidos
    </p>
    <a
      href="https://www.tiktok.com/@nativocan.cl"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
      </svg>
      Ver Perfil en TikTok
    </a>
  </div>
</div>
```

## Recomendación Final

**Para máxima confiabilidad:** Usa **Opción A** (Videos Individuales)

Los embeds de videos específicos son mucho más estables que el embed de perfil. Puedes elegir tus 3-6 mejores videos y mostrarlos.

Actualiza los videos cada 1-2 meses con tus publicaciones más recientes.

## Soporte

Si el problema persiste:
1. Verifica en [TikTok Status](https://status.tiktok.com/) si hay problemas con la plataforma
2. Revisa la [documentación oficial de TikTok Embed](https://www.tiktok.com/embed)
3. Contacta al desarrollador con:
   - Screenshot del error
   - URL del sitio
   - Navegador y versión
   - Consola del navegador (F12)
