# Configuración del Feed de Redes Sociales

Este documento explica cómo configurar los feeds embebidos de Instagram y TikTok en la landing page de Nativocan.

## 🎵 TikTok Feed (✅ CONFIGURADO)

El feed de TikTok ya está configurado y funcionando. Muestra el perfil completo de @nativocan.cl con los videos más recientes.

No requiere configuración adicional - se actualiza automáticamente cuando publicas nuevos videos.

---

## 📷 Instagram Feed (100% Gratis)

### Opción 1: Instafeed.js + Instagram Basic Display API (Recomendado - GRATIS)

**100% Gratis usando Instafeed.js** - Ya está integrado en el sitio, solo necesitas configurar el Access Token.

**✅ Ventajas:**
- Completamente gratis, sin costos mensuales
- Sin límites de posts o visualizaciones
- Open source y mantenido activamente
- Se actualiza automáticamente cuando publicas

**📋 Pasos:**

1. **Lee la guía completa:** `docs/INSTAGRAM_SETUP.md`

2. **Resumen rápido:**
   - Crear App en Facebook Developers (5 min)
   - Obtener Access Token de Instagram (5 min)
   - Pegar token en `src/components/SocialFeed.astro` (1 min)
   - Build y deploy

3. **El token dura 60 días** y se puede renovar con una URL simple.

**👉 Ver instrucciones detalladas en:** `docs/INSTAGRAM_SETUP.md`

### Opción 2: EmbedSocial o Elfsight (De pago, más fácil)

Si prefieres pagar por un servicio más simple:

- **EmbedSocial:** [embedsocial.com](https://embedsocial.com) - Plan desde $9/mes
- **Elfsight:** [elfsight.com](https://elfsight.com/instagram-feed-instashow/) - Plan desde $7/mes

Ambos tienen trials gratuitos de 7 días.

### Opción 3: Instagram Official Embed (Manual - No recomendado)

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

## ✅ Estado de Configuración

### TikTok
- ✅ **CONFIGURADO Y FUNCIONANDO**
- Embed oficial de TikTok
- Muestra perfil de @nativocan.cl
- Actualización automática
- Sin mantenimiento requerido

### Instagram
- ⚙️ **LISTO PARA CONFIGURAR**
- Instafeed.js integrado
- Requiere Access Token (gratis)
- 15 minutos de configuración
- Ver: `docs/INSTAGRAM_SETUP.md`

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
