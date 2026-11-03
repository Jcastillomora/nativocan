# Configuración Gratuita del Feed de Instagram

Esta guía te enseña cómo configurar el feed de Instagram usando **Instafeed.js** y la **Instagram Basic Display API** de forma **100% gratuita**.

## ¿Por qué esta solución?

✅ **Completamente gratis** - Sin costos mensuales
✅ **Sin límites** - Actualización automática
✅ **Open source** - Instafeed.js es código abierto
✅ **Fácil de mantener** - El token dura 60 días y se puede renovar

## Prerequisitos

- Cuenta de Instagram (debe ser pública o de creador/empresa)
- Cuenta de Facebook (para crear la App)
- 15-20 minutos para la configuración inicial

---

## Paso 1: Convertir tu Instagram a Cuenta Profesional

Si tu cuenta de Instagram no es profesional, conviértela:

1. Abre la app de Instagram en tu móvil
2. Ve a tu perfil → Menú (☰) → **Configuración**
3. **Cuenta** → **Cambiar tipo de cuenta**
4. Selecciona **Cuenta profesional**
5. Elige **Creador** o **Empresa** (cualquiera funciona)
6. Completa el proceso

---

## Paso 2: Crear una App en Facebook Developers

### 2.1 Acceder a Facebook Developers

1. Ve a [developers.facebook.com](https://developers.facebook.com)
2. Inicia sesión con tu cuenta de Facebook
3. Click en **Mis Apps** (esquina superior derecha)
4. Click en **Crear App**

### 2.2 Configurar la App

1. **Tipo de App:** Selecciona **Consumidor**
2. Click **Siguiente**
3. **Nombre de la app:** `Nativocan Feed` (o el que prefieras)
4. **Correo de contacto:** Tu email
5. Click **Crear app**
6. Completa la verificación de seguridad si aparece

### 2.3 Agregar Instagram Basic Display

1. En el Dashboard de tu app, busca **Instagram Basic Display**
2. Click en **Configurar**
3. Click en **Crear nueva app** (dentro de Instagram Basic Display)
4. Acepta los términos
5. Se creará automáticamente

---

## Paso 3: Configurar Instagram Basic Display

### 3.1 Configuración Básica

En la sección **Basic Display**, ve a **Settings**:

1. **Valid OAuth Redirect URIs:**
   ```
   https://nativocan.pages.dev/
   https://localhost:4321/
   ```

2. **Deauthorize Callback URL:**
   ```
   https://nativocan.pages.dev/
   ```

3. **Data Deletion Request URL:**
   ```
   https://nativocan.pages.dev/
   ```

4. Click **Guardar cambios** (abajo)

### 3.2 Agregar Usuario de Prueba (Instagram Tester)

1. En la misma página, scroll hasta **User Token Generator**
2. Click en **Add Instagram Test User**
3. Ingresa tu username de Instagram: `nativocan.cl`
4. Click **Submit**

### 3.3 Aceptar Invitación en Instagram

1. Abre Instagram en tu navegador (no app móvil)
2. Ve a **Configuración** → **Apps y sitios web** → **Invitaciones de desarrolladores**
3. Acepta la invitación de tu App

---

## Paso 4: Generar Access Token

### 4.1 Obtener Token de Corta Duración

1. Vuelve al Dashboard de Facebook Developers
2. En **Instagram Basic Display** → **User Token Generator**
3. Click en **Generate Token** junto a tu usuario de Instagram
4. Autoriza el acceso en la ventana que se abre
5. **Copia el Access Token** que aparece (empieza con `IGQV...`)
   - Este token dura **1 hora**, lo convertiremos a uno de larga duración

### 4.2 Obtener Token de Larga Duración (60 días)

Usaremos la Graph API para intercambiar el token:

1. **Obtén tu App ID y App Secret:**
   - En el Dashboard, ve a **Configuración** → **Básica**
   - Copia **ID de la app**
   - Click en **Mostrar** en **Clave secreta de la app** y cópiala

2. **Ejecuta esta URL en tu navegador** (reemplaza los valores):

```
https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=TU_APP_SECRET&access_token=TU_TOKEN_DE_CORTA_DURACION
```

**Ejemplo:**
```
https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=abc123xyz789&access_token=IGQVJ...
```

3. **Respuesta JSON:**
```json
{
  "access_token": "IGQVJ...",
  "token_type": "bearer",
  "expires_in": 5183944
}
```

4. **Copia el nuevo `access_token`** - Este dura 60 días

---

## Paso 5: Agregar Token al Sitio Web

### 5.1 Actualizar el Componente

1. Abre `src/components/SocialFeed.astro`
2. Encuentra esta línea (aproximadamente línea 157):
   ```javascript
   const INSTAGRAM_ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN'; // Replace this!
   ```

3. Reemplaza `YOUR_ACCESS_TOKEN` con tu token de larga duración:
   ```javascript
   const INSTAGRAM_ACCESS_TOKEN = 'IGQVJ...tu_token_aqui...';
   ```

### 5.2 Build y Deploy

```bash
npm run build
git add src/components/SocialFeed.astro
git commit -m "feat: add Instagram access token"
git push
```

El feed de Instagram ahora se mostrará automáticamente! 🎉

---

## Paso 6: Renovar el Token (Cada 60 días)

Los tokens de larga duración expiran cada 60 días. Para renovarlos:

### Opción A: Renovación Automática (Recomendado)

Antes de que expire (día 50-55), ejecuta esta URL:

```
https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=TU_TOKEN_ACTUAL
```

Respuesta:
```json
{
  "access_token": "NUEVO_TOKEN",
  "token_type": "bearer",
  "expires_in": 5183944
}
```

Actualiza el token en `SocialFeed.astro` con el nuevo.

### Opción B: Generar Nuevo Token

Repite los pasos 4.1 y 4.2 para generar un token completamente nuevo.

---

## Personalización del Feed

### Cambiar Número de Posts

En `SocialFeed.astro`, línea ~161:

```javascript
limit: 8, // Cambia a 4, 6, 12, etc.
```

### Cambiar Grid Layout

En `SocialFeed.astro`, línea 52:

```html
<!-- Más columnas en desktop -->
<div id="instafeed" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"></div>

<!-- Posts más grandes -->
<div id="instafeed" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
```

### Cambiar Template del Post

En `SocialFeed.astro`, línea ~162:

```javascript
template: '<a href="{{link}}" target="_blank" class="...">
  <img src="{{image}}" alt="{{caption}}" class="w-full h-full object-cover rounded-lg" />
  <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70">
    <p class="text-white text-sm">❤️ {{likes}} 💬 {{comments}}</p>
  </div>
</a>',
```

Variables disponibles:
- `{{image}}` - URL de la imagen
- `{{link}}` - Link al post de Instagram
- `{{caption}}` - Texto del post
- `{{likes}}` - Número de likes
- `{{comments}}` - Número de comentarios
- `{{timestamp}}` - Fecha de publicación

---

## Troubleshooting

### El feed no aparece

1. **Verifica el token:**
   - Abre la consola del navegador (F12)
   - Busca errores de Instagram API
   - Si dice "Invalid token", regenera el token

2. **Verifica que la cuenta sea pública:**
   - Instagram debe ser público o profesional
   - Ve a Configuración → Privacidad → Cuenta privada (debe estar OFF)

3. **Verifica permisos:**
   - En Facebook Developers → Instagram Basic Display
   - Asegúrate de que el Test User esté activo

### Error: "OAuthException"

- Tu token expiró → Genera uno nuevo (Paso 4)
- Permisos insuficientes → Re-acepta la invitación en Instagram

### Feed muestra posts viejos

Instafeed.js cachea las imágenes. Para limpiar:

```javascript
// Agrega un timestamp para evitar cache
template: '<a href="{{link}}"><img src="{{image}}?{{timestamp}}" /></a>',
```

### Token expira muy rápido

- Asegúrate de haber intercambiado el token de corta duración (1h) por uno de larga duración (60d) usando el paso 4.2

---

## Resumen

✅ **Gratis para siempre** - Sin costos de servicios externos
✅ **Fácil actualización** - Los posts nuevos aparecen automáticamente
✅ **Renovación simple** - Una URL cada 60 días
✅ **Control total** - Puedes personalizar todo

## Recursos

- [Instafeed.js Docs](https://instafeedjs.com/)
- [Instagram Basic Display API](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Facebook for Developers](https://developers.facebook.com)

---

## Próximos Pasos

Una vez configurado:

1. ✅ El feed se actualiza automáticamente cuando publicas en Instagram
2. ✅ Configurar renovación de token en calendario (cada 60 días)
3. ✅ Opcional: Configurar un webhook para renovación automática

Para preguntas o problemas, revisa la [documentación de Instafeed.js](https://instafeedjs.com/).
