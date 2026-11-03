# Configuración del Feed de Redes Sociales

Este documento explica cómo configurar los feeds embebidos de Instagram y TikTok en la landing page de Nativocan.

## 📷 Instagram Feed

### Opción 1: EmbedSocial (Recomendado)

**EmbedSocial** ofrece un plan gratuito con feeds automáticos de Instagram.

1. **Registro:**
   - Ve a [embedsocial.com](https://embedsocial.com/products/embedfeed/)
   - Regístrate con tu email
   - Plan gratuito disponible: hasta 150 posts/mes

2. **Conectar Instagram:**
   - Dashboard → "Add New Source"
   - Selecciona "Instagram"
   - Conecta tu cuenta @nativocan.cl
   - Autoriza el acceso

3. **Personalizar el Widget:**
   - Layout: Grid o Carousel
   - Número de posts: 4-8 recomendado
   - Colores: Mantener branding de Nativocan
   - Mostrar: username, likes (opcional)

4. **Obtener el Código:**
   - Click en "Generate Code"
   - Copia el código JavaScript
   - Formato será similar a:
   ```html
   <script src="https://embedsocial.com/cdn/ht.js" id="EmbedSocialHashtagScript"></script>
   <div class="embedsocial-hashtag" data-ref="YOUR_UNIQUE_ID"></div>
   ```

5. **Implementar en el Sitio:**
   - Abre `src/components/SocialFeed.astro`
   - Busca el comentario `<!-- Instagram Embed Container -->`
   - Reemplaza el contenido del `div.instagram-feed-container` con el código generado
   - Elimina el contenido placeholder (grid con emojis)

### Opción 2: Elfsight

**Elfsight** es otra alternativa popular con plan gratuito.

1. Ve a [elfsight.com/instagram-feed-instashow/](https://elfsight.com/instagram-feed-instashow/)
2. Sigue pasos similares a EmbedSocial
3. Copia el código del widget
4. Pega en `SocialFeed.astro`

### Opción 3: Instagram Official Embed (Manual)

Para embeds de posts individuales:

1. Abre Instagram en navegador web
2. Ve al post que quieres embedir
3. Click en los 3 puntos (⋯) → "Embed"
4. Copia el código `<blockquote>`
5. Pega en el grid de la sección de Instagram

**Ejemplo:**
```html
<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/POST_ID/">
  ...
</blockquote>
<script async src="//www.instagram.com/embed.js"></script>
```

## 🎵 TikTok Feed

### Opción 1: TikTok Embed Generator

1. **Obtener código de perfil:**
   - Ve a [TikTok Embed](https://www.tiktok.com/embed)
   - Ingresa tu username: @nativocan.cl
   - Selecciona tipo: "Profile" o "Video"

2. **Para el perfil completo:**
   ```html
   <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@nativocan.cl" data-unique-id="nativocan.cl" data-embed-type="creator">
     <section>
       <a target="_blank" href="https://www.tiktok.com/@nativocan.cl">@nativocan.cl</a>
     </section>
   </blockquote>
   <script async src="https://www.tiktok.com/embed.js"></script>
   ```

3. **Para videos individuales:**
   - Ve al video en TikTok
   - Click en "Share" → "Embed"
   - Copia el código `<blockquote>`

4. **Implementar:**
   - Abre `src/components/SocialFeed.astro`
   - Busca `<!-- TikTok Embed Container -->`
   - Reemplaza el contenido placeholder
   - Puedes usar múltiples embeds en el grid

### Opción 2: Embedsocial para TikTok

EmbedSocial también soporta TikTok:

1. Dashboard → "Add New Source" → "TikTok"
2. Conecta la cuenta @nativocan.cl
3. Personaliza el widget
4. Copia el código e implementa

## 🎨 Personalización del Diseño

### Ajustar el Grid

En `SocialFeed.astro`, modifica las clases del grid:

**Instagram (cuadrado):**
```html
<!-- Más posts en desktop -->
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

<!-- Posts más grandes -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

**TikTok (vertical):**
```html
<!-- Más videos visibles -->
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
```

### Colores de los Tabs

Modifica en `SocialFeed.astro`:
```css
/* Tab activo */
bg-primary text-white

/* Tab inactivo */
bg-neutral-200 text-neutral-700
```

## ✅ Checklist de Implementación

### Instagram
- [ ] Registrarse en EmbedSocial o Elfsight
- [ ] Conectar cuenta @nativocan.cl
- [ ] Configurar widget (layout, número de posts)
- [ ] Generar código embed
- [ ] Reemplazar placeholder en `SocialFeed.astro`
- [ ] Eliminar instrucciones de setup (cajas azules)
- [ ] Build y verificar funcionamiento
- [ ] Commit y push

### TikTok
- [ ] Obtener código embed de TikTok
- [ ] Decidir: perfil completo o videos individuales
- [ ] Reemplazar placeholder en `SocialFeed.astro`
- [ ] Eliminar instrucciones de setup (cajas moradas)
- [ ] Build y verificar funcionamiento
- [ ] Commit y push

## 🔄 Actualización Automática

### EmbedSocial/Elfsight
Los widgets se actualizan automáticamente cuando publicas nuevo contenido en Instagram/TikTok. No requiere mantenimiento manual.

### Embeds Individuales
Si usaste embeds individuales de posts específicos, necesitas:
1. Obtener el código del nuevo post
2. Agregarlo al grid en `SocialFeed.astro`
3. Rebuild y deploy

## 📱 Testing Responsivo

Después de implementar, verifica en:
- [ ] Mobile (< 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (> 1024px)

Verifica que:
- Los tabs funcionen correctamente
- El grid se adapte al tamaño de pantalla
- Los embeds carguen correctamente
- Los links a Instagram/TikTok funcionen

## 🐛 Troubleshooting

### Instagram no carga
- Verifica que la cuenta sea pública
- Revisa la consola del navegador para errores
- Asegúrate de que el script de Instagram se cargue: `//www.instagram.com/embed.js`

### TikTok no carga
- Verifica que el username sea correcto: @nativocan.cl
- Revisa que el script de TikTok se cargue: `https://www.tiktok.com/embed.js`
- Algunos navegadores bloquean embeds por privacidad

### Los tabs no cambian
- Verifica que el JavaScript al final de `SocialFeed.astro` esté presente
- Abre la consola del navegador para ver errores
- Verifica que los atributos `data-social-tab` y `data-social-content` coincidan

## 💡 Recomendaciones

1. **Usa widgets automáticos** (EmbedSocial/Elfsight) en lugar de embeds manuales para contenido siempre actualizado
2. **Limita el número de posts** a 4-8 para Instagram y 3-4 para TikTok para mejor rendimiento
3. **Lazy loading:** Los widgets modernos ya implementan carga diferida automáticamente
4. **Monitoreo:** Revisa el feed semanalmente para asegurar que carga correctamente
5. **Analytics:** EmbedSocial/Elfsight ofrecen analytics de cuántas personas interactúan con el feed

## 📞 Soporte

Si tienes problemas:
- EmbedSocial: support@embedsocial.com
- Elfsight: support@elfsight.com
- Documentación de desarrollador de Instagram: [Instagram Developer Docs](https://developers.facebook.com/docs/instagram)
- Documentación de TikTok: [TikTok for Developers](https://developers.tiktok.com/)
