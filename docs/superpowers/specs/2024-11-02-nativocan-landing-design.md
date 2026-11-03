# Nativocan Landing Page - Design Specification

**Project:** Nativocan Landing Page
**Date:** 2024-11-02
**Type:** New project - Static landing page
**Deploy Target:** Cloudflare Pages

## Executive Summary

Landing page estática para Nativocan, Centro de Desarrollo Canino que ofrece servicios de adiestramiento y hotel canino. El sitio será desarrollado con Astro + Tailwind CSS, optimizado para SEO profesional, y desplegado en Cloudflare Pages. Diseño inspirado en christiandogs.com con paleta de colores basada en el logo de Nativocan (naranja, azul, verde).

### Success Criteria
- Performance: Lighthouse score 95+ en todas las métricas
- SEO: Optimización profesional para ranking local
- Conversión: Múltiples CTAs y opciones de contacto (formulario, WhatsApp, teléfono, email)
- UX: Responsive perfecto, animaciones suaves, navegación intuitiva
- Mantenibilidad: Contenido centralizado en archivos de datos para fácil actualización

---

## 1. Architecture Overview

### Tech Stack
- **Framework:** Astro 4.x (Static Site Generation)
- **Styling:** Tailwind CSS 3.x
- **JavaScript:** Vanilla JS (mínimo, para interactividad específica)
- **Deploy:** Cloudflare Pages
- **Build Output:** Static HTML/CSS/JS (100% pre-rendered)

### Project Structure
```
nativocan/
├── src/
│   ├── components/              # Componentes reutilizables de Astro
│   │   ├── Header.astro         # Navegación sticky con hamburger mobile
│   │   ├── Footer.astro         # Footer con links y redes sociales
│   │   ├── Hero.astro           # Hero section con CTAs
│   │   ├── ServiceCard.astro    # Card para servicios de adiestramiento
│   │   ├── TestimonialCard.astro # Card de testimonio
│   │   ├── ContactForm.astro    # Formulario de contacto
│   │   ├── PricingCard.astro    # Card de plan de precios
│   │   ├── TeamMember.astro     # Card de miembro del equipo
│   │   ├── Modal.astro          # Modal para galería lightbox
│   │   └── BackToTop.astro      # Botón flotante para volver arriba
│   ├── layouts/
│   │   └── Layout.astro         # Layout base con head, SEO, scripts globales
│   ├── pages/
│   │   └── index.astro          # Página principal (single page)
│   ├── data/                    # Contenido centralizado
│   │   ├── site.js              # Info del negocio, contacto
│   │   ├── services.js          # Servicios de adiestramiento
│   │   ├── hotel.js             # Características del hotel
│   │   ├── testimonials.js      # Testimonios de clientes
│   │   ├── pricing.js           # Planes y precios
│   │   ├── team.js              # Equipo de entrenadores
│   │   └── faqs.js              # Preguntas frecuentes (para SEO)
│   ├── styles/
│   │   └── global.css           # Tailwind imports + custom global styles
│   └── scripts/
│       ├── main.js              # Smooth scroll, header sticky, menu toggle
│       ├── modal.js             # Lógica del lightbox
│       ├── carousel.js          # Carrusel de testimonios
│       └── scroll-reveal.js     # Intersection Observer para animaciones
├── public/
│   ├── images/                  # Imágenes optimizadas
│   │   ├── logo_nativocan.png   # Logo existente
│   │   ├── hero/                # Imágenes del hero
│   │   ├── services/            # Iconos/imágenes de servicios
│   │   ├── hotel/               # Galería del hotel
│   │   ├── team/                # Fotos del equipo
│   │   └── testimonials/        # Fotos de testimonios
│   ├── favicon.svg
│   ├── _headers                 # Cloudflare Pages headers config
│   ├── _redirects               # Redirects si necesario
│   ├── robots.txt               # SEO crawling config
│   └── sitemap.xml              # Generado por Astro
├── astro.config.mjs             # Configuración de Astro
├── tailwind.config.mjs          # Configuración de Tailwind (colores custom)
├── package.json
└── README.md                    # Documentación para actualizar contenido
```

### Why This Architecture?
- **Astro:** Máximo performance con 0 JS por defecto, perfecto para landing pages
- **Static:** No necesita servidor, deploy instantáneo, costos mínimos
- **Tailwind:** Rapid development, utility-first, fácil mantener consistencia visual
- **Vanilla JS:** Interactividad específica sin overhead de frameworks pesados
- **Cloudflare Pages:** Deploy automático desde Git, CDN global, SSL gratis

---

## 2. Page Structure and Components

### Single Page Layout (Secciones de arriba a abajo)

#### 1. Header (Sticky Navigation)
**Component:** `Header.astro`

**Funcionalidad:**
- Logo Nativocan (clickable, scroll to top)
- Navigation links: Servicios | Hotel | Testimonios | Precios | Contacto
- CTA button: "Contactar" (sticky siempre visible)
- Responsive: hamburger menu en mobile (<768px)
- Sticky con shadow al hacer scroll (threshold: 50px)

**Design:**
- Desktop: horizontal nav, logo izquierda, links centro, CTA derecha
- Mobile: hamburger derecha, logo izquierda, menu slide-in desde derecha
- Background: blanco con shadow cuando sticky
- Height: 80px desktop, 64px mobile

#### 2. Hero Section
**Component:** `Hero.astro`

**Contenido:**
- Background: imagen de perro feliz / instalaciones (con overlay oscuro 40%)
- H1: "Centro de Desarrollo Canino Nativocan"
- Subheadline: "Adiestramiento profesional y hotel de primera clase para tu mejor amigo"
- 3 CTAs:
  - Primary: "Agendar una Cita" (scroll to contact)
  - Secondary: "Ver Servicios" (scroll to services)
  - WhatsApp: "Contactar por WhatsApp" (link directo)

**Design:**
- Full viewport height (min-height: 600px)
- Texto centrado en mobile, izquierda en desktop
- CTAs en columna mobile, fila desktop
- Animación: fade-in suave al cargar

#### 3. Servicios de Adiestramiento
**Component:** Grid de `ServiceCard.astro`

**Contenido:**
- Sección title: "Nuestros Servicios de Adiestramiento"
- 6 servicios en grid (3 columnas desktop, 2 tablet, 1 mobile):
  1. Obediencia Básica
  2. Obediencia Avanzada
  3. Modificación de Conducta
  4. Socialización
  5. Adiestramiento a Domicilio
  6. Clases Grupales

**Cada ServiceCard:**
- Ícono/imagen
- Título del servicio
- Descripción corta (2-3 líneas)
- Duración/modalidad
- Hover: elevación con shadow

**Design:**
- Background: gris claro (#f5f5f5)
- Padding: py-16 md:py-24
- Cards: fondo blanco, rounded-lg, padding generoso
- Gap: gap-6 md:gap-8

#### 4. Hotel Canino
**Component:** Sección con layout alternado + galería

**Contenido:**
- Title: "Hotel Canino - Un Hogar Lejos de Casa"
- Características del hotel (layout imagen-texto alternado):
  - Instalaciones amplias y seguras
  - Atención personalizada 24/7
  - Áreas de juego supervisadas
  - Alimentación de calidad
  - Cámaras de seguridad
  - Servicio de grooming

**Galería de fotos:**
- Grid de 6-8 imágenes del hotel
- Click abre modal lightbox
- Navegación prev/next dentro del modal

**Design:**
- Background: blanco
- Alternating layout: imagen 50%, texto 50%
- Galería: grid 3 columnas desktop, 2 mobile
- Imágenes: aspect-ratio 4:3, object-cover

#### 5. Equipo de Entrenadores
**Component:** Grid de `TeamMember.astro`

**Contenido:**
- Title: "Nuestro Equipo Profesional"
- 3-4 entrenadores:
  - Foto
  - Nombre
  - Título/certificación
  - Especialidad
  - Breve bio (2-3 líneas)

**Design:**
- Background: naranja suave (tint del primary 10%)
- Grid: 3 columnas desktop, 2 tablet, 1 mobile
- Cards: foto circular, texto centrado
- Hover: slight zoom en foto

#### 6. Testimonios
**Component:** Carrusel de `TestimonialCard.astro`

**Contenido:**
- Title: "Lo Que Dicen Nuestros Clientes"
- 6-8 testimonios (3 visibles desktop, 1 mobile)
- Cada testimonio:
  - Foto del cliente/perro
  - Nombre del cliente
  - Nombre del perro
  - Rating (estrellas)
  - Texto del testimonio

**Funcionalidad:**
- Navegación: botones prev/next
- Indicadores de puntos
- Auto-play opcional (cada 5s, pausable en hover)
- Swipe en mobile

**Design:**
- Background: gris claro (#f5f5f5)
- Cards: fondo blanco, shadow, comillas decorativas
- Padding: generoso entre cards

#### 7. Precios
**Component:** Grid de `PricingCard.astro`

**Contenido:**
- Title: "Planes y Precios"
- 4-6 planes (adiestramiento + hotel):
  - Nombre del plan
  - Precio
  - Duración
  - Lista de características incluidas
  - Badge "Más Popular" en el plan destacado
  - CTA: "Elegir Plan" / "Consultar"

**Design:**
- Background: blanco
- Grid: 3 columnas desktop, 1-2 mobile
- Plan popular: elevated, border naranja, slight scale
- Cards: padding amplio, lista con checkmarks

#### 8. Sección de Contenido SEO
**Component:** Texto largo estructurado

**Contenido:**
- Title H2: "¿Por Qué Elegir Nativocan?"
- Subsecciones con H3:
  - Beneficios del adiestramiento profesional
  - Qué buscar en un hotel canino
  - Nuestra filosofía de entrenamiento
  - Compromiso con el bienestar animal
- Total: 500-800 palabras
- Keywords naturalmente integradas

**Design:**
- Background: blanco
- Max-width: prose (Tailwind)
- Typography: text-lg, line-height generoso
- Imágenes inline si aplica

#### 9. Contacto
**Component:** `ContactForm.astro` + info

**Layout:**
- 2 columnas desktop (formulario 60%, info 40%)
- Stacked en mobile

**Formulario:**
- Campos:
  - Nombre (required)
  - Email (required, type="email")
  - Teléfono (required, type="tel")
  - Servicio de interés (select: Adiestramiento / Hotel / Ambos)
  - Mensaje (textarea, required)
- Validación HTML5 + JS
- Submit button con loading state
- Mensaje de éxito/error
- Integración: Formspree o Web3Forms

**Info de contacto:**
- Teléfono (click-to-call)
- Email (mailto link)
- Dirección
- Horarios de atención
- Mapa embebido (Google Maps)
- Botones: WhatsApp, Facebook, Instagram

**Design:**
- Background: gris claro (#f5f5f5)
- Form: fondo blanco, rounded, shadow
- Inputs: border, focus state naranja
- Submit button: naranja, hover oscuro

#### 10. Footer
**Component:** `Footer.astro`

**Contenido:**
- Logo Nativocan
- Links rápidos (mismos del header)
- Redes sociales (iconos)
- Información de contacto resumida
- Copyright
- Links legales (Política de Privacidad, Términos)

**Design:**
- Background: azul oscuro (#1a1a2e)
- Texto: blanco
- 3 columnas desktop, stacked mobile
- Padding: py-12

#### 11. Back to Top Button
**Component:** `BackToTop.astro`

**Funcionalidad:**
- Botón flotante esquina inferior derecha
- Aparece después de 300px de scroll
- Click: smooth scroll al top
- Fade in/out con opacity

**Design:**
- Circular, naranja primario
- Icono flecha arriba
- Shadow, hover más oscuro
- z-index alto

---

## 3. Design System

### Color Palette (Tailwind Custom)

```js
// tailwind.config.mjs
colors: {
  primary: {
    DEFAULT: '#F89A3E',  // Naranja del logo
    light: '#FDB670',
    dark: '#E6881A'
  },
  secondary: {
    DEFAULT: '#3E5C9A',  // Azul del logo
    light: '#5A7AB8',
    dark: '#2A4176'
  },
  accent: {
    DEFAULT: '#3DB57A',  // Verde del logo
    light: '#5FC792',
    dark: '#2A9462'
  },
  neutral: {
    50: '#f5f5f5',
    100: '#e5e5e5',
    200: '#cccccc',
    300: '#b3b3b3',
    400: '#999999',
    500: '#808080',
    600: '#666666',
    700: '#4d4d4d',
    800: '#333333',
    900: '#1a1a1a'
  }
}
```

### Typography

**Font Stack:**
- Primary: 'Inter', system-ui, -apple-system, sans-serif
- Fallback: system fonts para performance

**Scale:**
- H1: text-5xl md:text-6xl (3rem - 3.75rem), font-bold
- H2: text-4xl md:text-5xl (2.25rem - 3rem), font-bold
- H3: text-2xl md:text-3xl (1.5rem - 1.875rem), font-semibold
- H4: text-xl md:text-2xl (1.25rem - 1.5rem), font-semibold
- Body: text-base md:text-lg (1rem - 1.125rem), font-normal
- Small: text-sm (0.875rem)

**Line Height:**
- Headings: leading-tight (1.25)
- Body: leading-relaxed (1.625)

### Spacing

**Container:**
- Max-width: max-w-7xl (1280px)
- Padding horizontal: px-4 md:px-6 lg:px-8

**Section Padding:**
- Vertical: py-12 md:py-16 lg:py-24
- Between elements: space-y-8 md:space-y-12

**Component Spacing:**
- Card padding: p-6 md:p-8
- Button padding: px-6 py-3 md:px-8 md:py-4
- Input padding: px-4 py-3

### Grid System

**Breakpoints:**
- Mobile: < 768px (sm)
- Tablet: 768px - 1024px (md)
- Desktop: > 1024px (lg)

**Common Grids:**
- Services: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Testimonials: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Pricing: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Team: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

**Gaps:**
- Default: gap-6 md:gap-8
- Tight: gap-4

### Components Style Guide

**Buttons:**

Primary:
```
bg-primary hover:bg-primary-dark
text-white font-semibold
px-6 py-3 md:px-8 md:py-4
rounded-full
transition-all duration-300
shadow-md hover:shadow-lg
```

Secondary (Outline):
```
border-2 border-secondary text-secondary
hover:bg-secondary hover:text-white
px-6 py-3 md:px-8 md:py-4
rounded-full
transition-all duration-300
```

WhatsApp:
```
bg-green-500 hover:bg-green-600
text-white font-semibold
px-6 py-3
rounded-full
inline-flex items-center gap-2
transition-all duration-300
```

**Cards:**
```
bg-white rounded-lg shadow-md
hover:shadow-xl hover:translate-y-[-4px]
transition-all duration-300
overflow-hidden
```

**Inputs:**
```
w-full px-4 py-3
border border-neutral-300
rounded-lg
focus:outline-none focus:ring-2 focus:ring-primary
transition-all duration-200
```

### Visual Effects

**Shadows:**
- Small: shadow-md
- Medium: shadow-lg
- Large: shadow-xl
- Hover elevation: shadow-2xl

**Rounded Corners:**
- Buttons: rounded-full
- Cards: rounded-lg (8px)
- Images: rounded-lg
- Inputs: rounded-lg

**Transitions:**
- Default: transition-all duration-300
- Quick: transition-all duration-200
- Slow: transition-all duration-500
- Easing: ease-in-out

---

## 4. Interactivity and Animations

### JavaScript Modules

#### main.js - Core Functionality

**Smooth Scroll:**
```js
// Smooth scroll para navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Close mobile menu if open
    closeMobileMenu();
  });
});
```

**Sticky Header:**
```js
// Add shadow to header on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('shadow-lg');
  } else {
    header.classList.remove('shadow-lg');
  }
});
```

**Mobile Menu Toggle:**
```js
// Hamburger menu toggle
const menuButton = document.querySelector('[data-menu-button]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const menuOverlay = document.querySelector('[data-menu-overlay]');

function toggleMobileMenu() {
  mobileMenu.classList.toggle('translate-x-full');
  menuOverlay.classList.toggle('opacity-0');
  menuOverlay.classList.toggle('pointer-events-none');
  document.body.classList.toggle('overflow-hidden');
}

menuButton.addEventListener('click', toggleMobileMenu);
menuOverlay.addEventListener('click', toggleMobileMenu);
```

#### scroll-reveal.js - Scroll Animations

**Intersection Observer:**
```js
// Fade-in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
      // Unobserve after animation
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('[data-reveal]').forEach(el => {
  observer.observe(el);
});
```

**Stagger Animation:**
```js
// Stagger cards dentro de la misma sección
document.querySelectorAll('[data-stagger-container]').forEach(container => {
  const items = container.querySelectorAll('[data-stagger-item]');
  items.forEach((item, index) => {
    item.style.transitionDelay = `${index * 100}ms`;
  });
});
```

**Lazy Load Background Images:**
```js
// Cargar backgrounds solo cuando son visibles
const bgObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bgUrl = entry.target.dataset.bgImage;
      entry.target.style.backgroundImage = `url(${bgUrl})`;
      bgObserver.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('[data-bg-image]').forEach(el => {
  bgObserver.observe(el);
});
```

#### modal.js - Lightbox Gallery

**Modal Functionality:**
```js
let currentImageIndex = 0;
let images = [];

function openModal(imageIndex) {
  currentImageIndex = imageIndex;
  const modal = document.querySelector('[data-modal]');
  const modalImage = modal.querySelector('[data-modal-image]');

  modalImage.src = images[currentImageIndex];
  modal.classList.remove('opacity-0', 'pointer-events-none');
  document.body.classList.add('overflow-hidden');
}

function closeModal() {
  const modal = document.querySelector('[data-modal]');
  modal.classList.add('opacity-0', 'pointer-events-none');
  document.body.classList.remove('overflow-hidden');
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  updateModalImage();
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  updateModalImage();
}

// Close on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Navigation arrows
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
});
```

#### carousel.js - Testimonials Carousel

**Carousel Logic:**
```js
class Carousel {
  constructor(element) {
    this.carousel = element;
    this.track = element.querySelector('[data-carousel-track]');
    this.slides = element.querySelectorAll('[data-carousel-slide]');
    this.prevButton = element.querySelector('[data-carousel-prev]');
    this.nextButton = element.querySelector('[data-carousel-next]');
    this.dots = element.querySelectorAll('[data-carousel-dot]');

    this.currentIndex = 0;
    this.autoPlayInterval = null;

    this.init();
  }

  init() {
    this.prevButton.addEventListener('click', () => this.prev());
    this.nextButton.addEventListener('click', () => this.next());
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goTo(index));
    });

    // Auto-play
    this.startAutoPlay();

    // Pause on hover
    this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.updateCarousel();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.updateCarousel();
  }

  goTo(index) {
    this.currentIndex = index;
    this.updateCarousel();
  }

  updateCarousel() {
    const offset = -this.currentIndex * 100;
    this.track.style.transform = `translateX(${offset}%)`;

    // Update dots
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => this.next(), 5000);
  }

  stopAutoPlay() {
    clearInterval(this.autoPlayInterval);
  }
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('[data-carousel]');
  if (carousel) new Carousel(carousel);
});
```

### CSS Animations (Tailwind)

**Fade In:**
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}
```

**Slide In (Mobile Menu):**
```css
.translate-x-full {
  transform: translateX(100%);
}

.transition-transform {
  transition: transform 0.3s ease-in-out;
}
```

### Hover Effects

**Cards:**
- `hover:shadow-xl` - Sombra aumenta
- `hover:translate-y-[-4px]` - Elevación sutil
- `transition-all duration-300` - Transición suave

**Buttons:**
- `hover:bg-primary-dark` - Color más oscuro
- `hover:shadow-lg` - Sombra
- `hover:scale-105` - Slight zoom

**Images:**
- `hover:scale-105` - Zoom dentro del container
- `overflow-hidden` - Crop del zoom
- `transition-transform duration-500` - Slow zoom

**Links:**
- `hover:text-primary` - Color change
- `transition-colors duration-300` - Smooth transition

### Back to Top Button

**Behavior:**
```js
const backToTop = document.querySelector('[data-back-to-top]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.remove('opacity-0', 'pointer-events-none');
  } else {
    backToTop.classList.add('opacity-0', 'pointer-events-none');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
```

---

## 5. Content Structure and Data

### Centralized Data Files

#### src/data/site.js
```js
export const siteData = {
  business: {
    name: "Nativocan",
    tagline: "Centro de Desarrollo Canino",
    description: "Servicios profesionales de adiestramiento y hotel canino en [Ciudad]",
    phone: "+56 9 XXXX XXXX",
    email: "contacto@nativocan.cl",
    address: "Dirección Completa, Ciudad, Región, Chile",
    hours: "Lunes a Viernes: 9:00 - 19:00 | Sábados: 10:00 - 14:00",
    coordinates: {
      lat: "-XX.XXXX",
      lng: "-XX.XXXX"
    }
  },
  social: {
    facebook: "https://facebook.com/nativocan",
    instagram: "https://instagram.com/nativocan",
    whatsapp: "56912345678", // Solo números
    whatsappMessage: "Hola, quiero información sobre los servicios de Nativocan"
  },
  seo: {
    title: "Nativocan - Centro de Desarrollo Canino | Adiestramiento y Hotel en [Ciudad]",
    description: "Servicios profesionales de adiestramiento canino y hotel para perros en [Ciudad]. Entrenadores certificados, instalaciones de primera clase. ¡Agenda tu cita hoy!",
    keywords: "adiestramiento canino, hotel para perros, guardería canina, entrenador de perros, [ciudad]"
  }
};
```

#### src/data/services.js
```js
export const trainingServices = [
  {
    id: "obediencia-basica",
    title: "Obediencia Básica",
    description: "Comandos esenciales como sentarse, quedarse, venir y caminar con correa. Perfecto para cachorros y perros adultos que inician su entrenamiento.",
    icon: "🎓", // Placeholder - reemplazar con SVG
    duration: "8 semanas",
    sessions: "2 sesiones semanales",
    level: "Principiante",
    highlights: [
      "Comandos fundamentales",
      "Socialización básica",
      "Control de impulsos",
      "Manual de apoyo"
    ]
  },
  {
    id: "obediencia-avanzada",
    title: "Obediencia Avanzada",
    description: "Perfecciona los comandos básicos y aprende técnicas avanzadas de control y respuesta. Para perros con entrenamiento previo.",
    icon: "🏆",
    duration: "10 semanas",
    sessions: "2 sesiones semanales",
    level: "Avanzado",
    highlights: [
      "Comandos a distancia",
      "Control sin correa",
      "Obediencia en distracciones",
      "Certificación"
    ]
  },
  {
    id: "modificacion-conducta",
    title: "Modificación de Conducta",
    description: "Corrige problemas de comportamiento como agresividad, ansiedad por separación, ladridos excesivos y miedos.",
    icon: "🔧",
    duration: "Variable",
    sessions: "Personalizado",
    level: "Todos los niveles",
    highlights: [
      "Evaluación personalizada",
      "Plan individual",
      "Seguimiento continuo",
      "Soporte post-tratamiento"
    ]
  },
  {
    id: "socializacion",
    title: "Socialización",
    description: "Ayuda a tu perro a interactuar de forma positiva con otros perros, personas y entornos diversos.",
    icon: "🐕",
    duration: "6 semanas",
    sessions: "2 sesiones semanales",
    level: "Cachorros y adultos",
    highlights: [
      "Interacción controlada",
      "Ambientes diversos",
      "Reducción de miedos",
      "Confianza social"
    ]
  },
  {
    id: "domicilio",
    title: "Adiestramiento a Domicilio",
    description: "Entrenamiento personalizado en la comodidad de tu hogar, adaptado a tu rutina y entorno específico.",
    icon: "🏠",
    duration: "Personalizado",
    sessions: "Flexible",
    level: "Todos los niveles",
    highlights: [
      "Atención 1-a-1",
      "En tu hogar",
      "Horario flexible",
      "Resultados rápidos"
    ]
  },
  {
    id: "clases-grupales",
    title: "Clases Grupales",
    description: "Aprende junto a otros dueños en un ambiente social y dinámico. Ideal para socialización y aprendizaje compartido.",
    icon: "👥",
    duration: "8 semanas",
    sessions: "1 sesión semanal",
    level: "Principiante a Intermedio",
    highlights: [
      "Grupos pequeños (max 6)",
      "Socialización incluida",
      "Precio accesible",
      "Ambiente divertido"
    ]
  }
];
```

#### src/data/hotel.js
```js
export const hotelFeatures = [
  {
    id: "instalaciones",
    title: "Instalaciones Amplias y Seguras",
    description: "Espacios diseñados especialmente para el confort y seguridad de tu perro. Áreas individuales y grupales con ventilación, iluminación natural y temperatura controlada.",
    image: "/images/hotel/instalaciones.jpg",
    icon: "🏢"
  },
  {
    id: "atencion-247",
    title: "Atención Personalizada 24/7",
    description: "Personal capacitado disponible todo el día para cuidar de tu mejor amigo. Monitoreo continuo y atención inmediata a cualquier necesidad.",
    image: "/images/hotel/atencion.jpg",
    icon: "❤️"
  },
  {
    id: "juego",
    title: "Áreas de Juego Supervisadas",
    description: "Espacios al aire libre y techados para que tu perro se ejercite y socialice bajo supervisión profesional. Juegos y actividades diarias.",
    image: "/images/hotel/juego.jpg",
    icon: "🎾"
  },
  {
    id: "alimentacion",
    title: "Alimentación de Calidad",
    description: "Respetamos la dieta de tu perro o proporcionamos alimento premium. Horarios establecidos y dietas especiales si es necesario.",
    image: "/images/hotel/alimentacion.jpg",
    icon: "🍖"
  },
  {
    id: "seguridad",
    title: "Cámaras de Seguridad",
    description: "Instalaciones monitoreadas con cámaras 24/7 para la seguridad de todos los huéspedes. Protocolos estrictos de entrada y salida.",
    image: "/images/hotel/seguridad.jpg",
    icon: "📹"
  },
  {
    id: "grooming",
    title: "Servicio de Grooming",
    description: "Baño, corte de uñas, cepillado y más. Tu perro regresa a casa limpio y feliz. Servicio opcional con cargo adicional.",
    image: "/images/hotel/grooming.jpg",
    icon: "✂️"
  }
];

export const hotelGallery = [
  {
    id: 1,
    image: "/images/hotel/gallery-1.jpg",
    alt: "Área de descanso individual",
    caption: "Espacios cómodos para descansar"
  },
  {
    id: 2,
    image: "/images/hotel/gallery-2.jpg",
    alt: "Zona de juegos exterior",
    caption: "Áreas de juego al aire libre"
  },
  {
    id: 3,
    image: "/images/hotel/gallery-3.jpg",
    alt: "Área de socialización",
    caption: "Socialización supervisada"
  },
  {
    id: 4,
    image: "/images/hotel/gallery-4.jpg",
    alt: "Habitaciones limpias y seguras",
    caption: "Instalaciones limpias"
  },
  {
    id: 5,
    image: "/images/hotel/gallery-5.jpg",
    alt: "Personal cuidando perros",
    caption: "Personal dedicado"
  },
  {
    id: 6,
    image: "/images/hotel/gallery-6.jpg",
    alt: "Zona de alimentación",
    caption: "Áreas de alimentación"
  }
];
```

#### src/data/team.js
```js
export const team = [
  {
    id: 1,
    name: "Nombre Entrenador 1",
    role: "Adiestrador Certificado",
    certification: "Certificación Internacional en Adiestramiento Canino",
    specialty: "Obediencia y modificación de conducta",
    photo: "/images/team/trainer-1.jpg",
    bio: "Con más de 10 años de experiencia trabajando con perros de todas las razas y edades. Especializado en técnicas de refuerzo positivo y resolución de problemas de comportamiento.",
    experience: "10+ años"
  },
  {
    id: 2,
    name: "Nombre Entrenador 2",
    role: "Especialista en Comportamiento Canino",
    certification: "Etólogo Certificado",
    specialty: "Ansiedad y agresividad",
    photo: "/images/team/trainer-2.jpg",
    bio: "Etóloga especializada en el comportamiento animal. Enfoque científico y compasivo para resolver problemas complejos de conducta.",
    experience: "8+ años"
  },
  {
    id: 3,
    name: "Nombre Entrenador 3",
    role: "Entrenador de Cachorros",
    certification: "Certificado en Desarrollo Temprano Canino",
    specialty: "Socialización y obediencia básica",
    photo: "/images/team/trainer-3.jpg",
    bio: "Apasionado por el trabajo con cachorros. Experto en socialización temprana y establecimiento de bases sólidas para un perro equilibrado.",
    experience: "6+ años"
  }
];
```

#### src/data/testimonials.js
```js
export const testimonials = [
  {
    id: 1,
    name: "María González",
    dogName: "Max",
    dogBreed: "Golden Retriever",
    photo: "/images/testimonials/testimonial-1.jpg",
    rating: 5,
    text: "Max era muy ansioso y destructivo cuando lo dejábamos solo. Después del programa de modificación de conducta, es un perro completamente diferente. ¡Increíble trabajo!",
    service: "Modificación de Conducta",
    date: "2024-09"
  },
  {
    id: 2,
    name: "Carlos Ramírez",
    dogName: "Luna",
    dogBreed: "Border Collie",
    photo: "/images/testimonials/testimonial-2.jpg",
    rating: 5,
    text: "Las clases de obediencia avanzada fueron excelentes. Luna ahora responde a comandos incluso a distancia y sin correa. Los entrenadores son muy profesionales.",
    service: "Obediencia Avanzada",
    date: "2024-08"
  },
  {
    id: 3,
    name: "Ana Martínez",
    dogName: "Rocky",
    dogBreed: "Pastor Alemán",
    photo: "/images/testimonials/testimonial-3.jpg",
    rating: 5,
    text: "Dejamos a Rocky en el hotel durante nuestras vacaciones. Las instalaciones son impecables y el personal muy atento. Volvimos a un perro feliz y bien cuidado.",
    service: "Hotel Canino",
    date: "2024-10"
  },
  {
    id: 4,
    name: "Pedro Silva",
    dogName: "Toby",
    dogBreed: "Beagle",
    photo: "/images/testimonials/testimonial-4.jpg",
    rating: 5,
    text: "Toby completó el programa de obediencia básica y los resultados son evidentes. Ahora camina tranquilo con correa y responde a los comandos básicos perfectamente.",
    service: "Obediencia Básica",
    date: "2024-07"
  },
  {
    id: 5,
    name: "Laura Fernández",
    dogName: "Coco",
    dogBreed: "French Bulldog",
    photo: "/images/testimonials/testimonial-5.jpg",
    rating: 5,
    text: "El servicio de adiestramiento a domicilio fue muy conveniente. El entrenador se adaptó a nuestros horarios y Coco aprendió en su propio ambiente.",
    service: "Adiestramiento a Domicilio",
    date: "2024-09"
  },
  {
    id: 6,
    name: "Jorge Torres",
    dogName: "Bella",
    dogBreed: "Labrador",
    photo: "/images/testimonials/testimonial-6.jpg",
    rating: 5,
    text: "Las clases de socialización ayudaron a Bella a superar su miedo a otros perros. Ahora disfruta de ir al parque y jugar con otros perritos. Muy recomendado.",
    service: "Socialización",
    date: "2024-10"
  }
];
```

#### src/data/pricing.js
```js
export const pricingPlans = [
  {
    id: "basico",
    name: "Obediencia Básica",
    category: "Adiestramiento",
    price: "$XXX.XXX",
    duration: "1 mes",
    sessions: "8 sesiones",
    popular: false,
    features: [
      "2 sesiones semanales de 1 hora",
      "Comandos básicos (sentarse, quieto, venir, junto)",
      "Manual de entrenamiento",
      "Seguimiento por WhatsApp",
      "Certificado de participación"
    ],
    cta: "Inscribirme"
  },
  {
    id: "avanzado",
    name: "Obediencia Avanzada",
    category: "Adiestramiento",
    price: "$XXX.XXX",
    duration: "2.5 meses",
    sessions: "10 sesiones",
    popular: true,
    features: [
      "2 sesiones semanales de 1 hora",
      "Comandos avanzados y a distancia",
      "Control sin correa",
      "Obediencia en distracciones",
      "Manual avanzado",
      "Certificado oficial"
    ],
    cta: "Inscribirme"
  },
  {
    id: "modificacion",
    name: "Modificación de Conducta",
    category: "Adiestramiento",
    price: "Desde $XXX.XXX",
    duration: "Variable",
    sessions: "Personalizado",
    popular: false,
    features: [
      "Evaluación inicial completa",
      "Plan de tratamiento personalizado",
      "Sesiones adaptadas a la necesidad",
      "Seguimiento continuo",
      "Soporte post-tratamiento (3 meses)",
      "Garantía de resultados"
    ],
    cta: "Consultar"
  },
  {
    id: "hotel-dia",
    name: "Hotel - Día",
    category: "Hotel",
    price: "$XX.XXX",
    duration: "Por día",
    sessions: null,
    popular: false,
    features: [
      "Estadía cómoda y segura",
      "Alimentación incluida",
      "Área de juego supervisada",
      "Monitoreo 24/7",
      "Reporte diario con fotos"
    ],
    cta: "Reservar"
  },
  {
    id: "hotel-semana",
    name: "Hotel - Semana",
    category: "Hotel",
    price: "$XXX.XXX",
    duration: "7 días",
    sessions: null,
    popular: true,
    features: [
      "Todos los beneficios del día",
      "Baño incluido",
      "Sesión de juego extra diaria",
      "Video llamada disponible",
      "Descuento por semana",
      "Grooming básico"
    ],
    cta: "Reservar"
  },
  {
    id: "hotel-mes",
    name: "Hotel - Mes",
    category: "Hotel",
    price: "$X.XXX.XXX",
    duration: "30 días",
    sessions: null,
    popular: false,
    features: [
      "Todos los beneficios de la semana",
      "Máximo descuento",
      "Grooming completo semanal",
      "Chequeo veterinario incluido",
      "Video llamadas ilimitadas",
      "Entrenamiento básico opcional"
    ],
    cta: "Consultar"
  }
];
```

#### src/data/faqs.js
```js
export const faqs = [
  {
    id: 1,
    question: "¿A qué edad puede empezar mi perro el adiestramiento?",
    answer: "Los cachorros pueden comenzar socialización y obediencia básica desde las 8-10 semanas de edad. Para adiestramiento más avanzado, recomendamos esperar hasta los 6 meses. Sin embargo, los perros adultos de cualquier edad pueden aprender nuevos comandos y comportamientos.",
    category: "Adiestramiento"
  },
  {
    id: 2,
    question: "¿Qué métodos de entrenamiento utilizan?",
    answer: "Utilizamos exclusivamente métodos de refuerzo positivo basados en recompensas. No empleamos técnicas aversivas, castigos físicos ni collares de shock. Nuestro enfoque se basa en la ciencia del comportamiento animal y el respeto hacia el perro.",
    category: "Adiestramiento"
  },
  {
    id: 3,
    question: "¿Necesito estar presente durante las sesiones de adiestramiento?",
    answer: "Sí, es fundamental que el dueño participe en las sesiones. El adiestramiento no solo enseña al perro, sino también al dueño a comunicarse efectivamente y mantener el entrenamiento en casa. Ofrecemos opciones flexibles si no puedes asistir a alguna sesión.",
    category: "Adiestramiento"
  },
  {
    id: 4,
    question: "¿Qué vacunas necesita mi perro para usar el hotel?",
    answer: "Requerimos que todos los perros estén al día con sus vacunas: parvovirus, moquillo, hepatitis y rabia. También solicitamos vacuna contra la tos de las perreras (Bordetella). Debes presentar el carnet de vacunación actualizado al momento del check-in.",
    category: "Hotel"
  },
  {
    id: 5,
    question: "¿Puedo traer la comida de mi perro al hotel?",
    answer: "¡Por supuesto! De hecho, lo recomendamos para mantener la dieta habitual de tu perro y evitar problemas digestivos. También proporcionamos alimento premium si lo prefieres. Solo indícanos las preferencias y restricciones alimentarias de tu perro.",
    category: "Hotel"
  },
  {
    id: 6,
    question: "¿Cómo sé que mi perro está bien mientras está en el hotel?",
    answer: "Enviamos actualizaciones diarias con fotos y videos de tu perro. También puedes llamarnos en cualquier momento para recibir un reporte. Nuestras instalaciones cuentan con monitoreo 24/7 y personal siempre presente.",
    category: "Hotel"
  },
  {
    id: 7,
    question: "¿Qué pasa si mi perro tiene necesidades especiales o toma medicamentos?",
    answer: "Podemos administrar medicamentos y cuidar perros con necesidades especiales. Solo necesitamos instrucciones claras por escrito y los medicamentos en su envase original. Hay un pequeño cargo adicional por administración de medicamentos.",
    category: "Hotel"
  },
  {
    id: 8,
    question: "¿Ofrecen garantía de resultados en el adiestramiento?",
    answer: "En nuestros programas de modificación de conducta, ofrecemos garantía de resultados siempre que sigas el plan de entrenamiento consistentemente en casa. Si no ves mejoras, continuamos trabajando sin costo adicional hasta alcanzar los objetivos acordados.",
    category: "Adiestramiento"
  }
];
```

### Content Guidelines

**Placeholders a reemplazar:**
- `[Ciudad]` → Ciudad real
- `[Región]` → Región real
- `+56 9 XXXX XXXX` → Teléfono real
- `contacto@nativocan.cl` → Email real
- `$XXX.XXX` → Precios reales
- Coordenadas GPS → Ubicación real
- URLs de redes sociales → Links reales
- Todas las imágenes `/images/*` → Fotos reales

**SEO Content:**
- Incluir ciudad/región en títulos y descripciones
- Keywords naturalmente distribuidas
- Mínimo 1500-2000 palabras total en la página
- Alt text descriptivo en todas las imágenes

---

## 6. SEO Professional Strategy

### On-Page SEO

#### Meta Tags Structure (Layout.astro)
```html
<head>
  <!-- Primary Meta Tags -->
  <title>{siteData.seo.title}</title>
  <meta name="title" content="{siteData.seo.title}">
  <meta name="description" content="{siteData.seo.description}">
  <meta name="keywords" content="{siteData.seo.keywords}">
  <meta name="robots" content="index, follow">
  <meta name="language" content="Spanish">
  <meta name="author" content="Nativocan">

  <!-- Geo Tags for Local SEO -->
  <meta name="geo.region" content="CL-[REGION_CODE]">
  <meta name="geo.placename" content="[CIUDAD]">
  <meta name="geo.position" content="[LAT];[LNG]">
  <meta name="ICBM" content="[LAT], [LNG]">

  <!-- Canonical URL -->
  <link rel="canonical" href="https://nativocan.com/">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://nativocan.com/">
  <meta property="og:title" content="{siteData.seo.title}">
  <meta property="og:description" content="{siteData.seo.description}">
  <meta property="og:image" content="https://nativocan.com/images/og-image.jpg">
  <meta property="og:locale" content="es_CL">
  <meta property="og:site_name" content="Nativocan">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="https://nativocan.com/">
  <meta name="twitter:title" content="{siteData.seo.title}">
  <meta name="twitter:description" content="{siteData.seo.description}">
  <meta name="twitter:image" content="https://nativocan.com/images/twitter-image.jpg">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

  <!-- Preconnect for Performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
```

#### Structured Data (JSON-LD)

**LocalBusiness Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://nativocan.com/#business",
  "name": "Nativocan",
  "alternateName": "Centro de Desarrollo Canino Nativocan",
  "description": "Centro profesional de adiestramiento canino y hotel para perros en [Ciudad]. Entrenadores certificados y instalaciones de primera clase.",
  "url": "https://nativocan.com",
  "logo": "https://nativocan.com/images/logo_nativocan.png",
  "image": [
    "https://nativocan.com/images/hero-image.jpg",
    "https://nativocan.com/images/hotel-exterior.jpg",
    "https://nativocan.com/images/training-session.jpg"
  ],
  "telephone": "+56912345678",
  "email": "contacto@nativocan.cl",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Dirección Completa",
    "addressLocality": "[CIUDAD]",
    "addressRegion": "[REGIÓN]",
    "postalCode": "[CÓDIGO POSTAL]",
    "addressCountry": "CL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[LAT]",
    "longitude": "[LNG]"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "14:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "47",
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": [
    "https://facebook.com/nativocan",
    "https://instagram.com/nativocan"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de Nativocan",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Adiestramiento Canino",
          "description": "Programas de obediencia básica, avanzada y modificación de conducta",
          "provider": {
            "@id": "https://nativocan.com/#business"
          }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Hotel Canino",
          "description": "Hospedaje profesional para perros con instalaciones de primera clase",
          "provider": {
            "@id": "https://nativocan.com/#business"
          }
        }
      }
    ]
  }
}
```

**FAQPage Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿A qué edad puede empezar mi perro el adiestramiento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los cachorros pueden comenzar socialización y obediencia básica desde las 8-10 semanas de edad..."
      }
    }
    // ... más FAQs
  ]
}
```

**Review Schema (por cada testimonio):**
```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "author": {
    "@type": "Person",
    "name": "María González"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "reviewBody": "Max era muy ansioso y destructivo...",
  "itemReviewed": {
    "@type": "Service",
    "name": "Modificación de Conducta",
    "provider": {
      "@id": "https://nativocan.com/#business"
    }
  }
}
```

**BreadcrumbList Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://nativocan.com/"
    }
  ]
}
```

### Keyword Strategy

**Primary Keywords (High Priority):**
- adiestramiento canino [ciudad]
- hotel para perros [ciudad]
- entrenador de perros [ciudad]
- guardería canina [ciudad]
- centro canino [ciudad]

**Secondary Keywords:**
- obediencia canina [ciudad]
- modificación conducta perros [ciudad]
- pensión para perros [ciudad]
- adiestramiento perros a domicilio [ciudad]
- hotel mascotas [ciudad]

**Long-Tail Keywords:**
- donde adiestrar mi perro en [ciudad]
- mejor hotel para perros [ciudad]
- cómo elegir entrenador canino
- problemas de comportamiento perros
- guardería canina con entrenamiento
- hotel perros con cámaras [ciudad]

**Intent-Based Keywords:**
- "mi perro tiene problemas de conducta" → Modificación
- "donde dejar mi perro en vacaciones" → Hotel
- "cachorro muerde todo" → Adiestramiento básico
- "perro agresivo con otros perros" → Modificación/Socialización

### Content Optimization

**Heading Structure:**
```
H1: Centro de Desarrollo Canino Nativocan - Adiestramiento y Hotel en [Ciudad]
  H2: Servicios de Adiestramiento Profesional
    H3: Obediencia Básica
    H3: Obediencia Avanzada
    H3: Modificación de Conducta
    ...
  H2: Hotel Canino de Primera Clase
    H3: Instalaciones Amplias y Seguras
    H3: Atención Personalizada 24/7
    ...
  H2: Nuestro Equipo de Entrenadores Certificados
  H2: Testimonios de Clientes Satisfechos
  H2: Planes y Precios Transparentes
  H2: ¿Por Qué Elegir Nativocan?
  H2: Preguntas Frecuentes
  H2: Contacto
```

**Keyword Placement:**
- H1: Primary keyword + ciudad
- Title tag: Primary keyword + ciudad + brand
- Meta description: Primary + secondary keywords + CTA
- First 100 words: Primary keyword 1-2 veces
- Throughout content: Natural distribution, 1-2% density
- Alt text: Descriptive + keyword cuando sea relevante
- URL: Clean and keyword-rich

**Content Length:**
- Total: 2000-2500 palabras
- Hero: 50-100 palabras
- Cada servicio: 100-150 palabras
- Hotel: 300-400 palabras
- Testimonios: 50-100 cada uno
- FAQ: 100-150 por pregunta
- Content section: 500-800 palabras

### Technical SEO

**Performance Optimization:**
- Lighthouse Performance: 95+
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.8s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms

**Image Optimization:**
- Format: WebP con fallback a JPG
- Compression: TinyPNG o similar (70-80% quality)
- Lazy loading: `loading="lazy"` (excepto hero)
- Responsive: `srcset` para diferentes tamaños
- Dimensions: width/height explícitas para evitar CLS
- Alt text: Descriptivo y con keywords naturales

**Code Optimization:**
- Minificación: HTML, CSS, JS (Astro automático)
- Critical CSS: Inline en `<head>`
- Defer JS: Scripts no-críticos con `defer`
- Remove unused CSS: PurgeCSS via Tailwind
- Font loading: `font-display: swap`

**Mobile Optimization:**
- Mobile-first design
- Viewport meta tag
- Touch-friendly buttons (min 44x44px)
- No horizontal scroll
- Fast mobile load time
- Google Mobile-Friendly Test: Pass

**Sitemap (astro.config.mjs):**
```js
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://nativocan.com',
  integrations: [
    sitemap()
  ]
});
```

**robots.txt (public/robots.txt):**
```
User-agent: *
Allow: /

Sitemap: https://nativocan.com/sitemap.xml
```

**Security Headers (public/_headers):**
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()

/images/*
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable
```

### Local SEO Strategy

**Google Business Profile:**
- Claim y optimizar perfil
- Categoría principal: "Dog Trainer" / "Pet Boarding Service"
- Categorías secundarias: "Pet Sitter", "Dog Day Care Center"
- Descripción completa con keywords
- Horarios actualizados
- Fotos de alta calidad (20+)
- Responder a todas las reviews
- Posts semanales
- Q&A section poblada

**NAP Consistency:**
- Mismo Name, Address, Phone en:
  - Website
  - Google Business Profile
  - Facebook
  - Instagram
  - Directorios locales
- Formato consistente

**Local Citations:**
- Directorios de negocios chilenos
- Directorios de mascotas/veterinarias
- Yelp, Páginas Amarillas, etc.
- NAP consistente en todos

**Embedded Map:**
```html
<iframe
  src="https://www.google.com/maps/embed?pb=..."
  width="100%"
  height="400"
  style="border:0;"
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  title="Ubicación de Nativocan">
</iframe>
```

**Local Content:**
- Mencionar ciudad/región naturalmente
- Referencias a landmarks locales
- Contenido relevante a la comunidad local
- Blog posts sobre eventos locales (futuro)

### Analytics and Monitoring

**Google Search Console:**
- Verificar propiedad
- Submit sitemap
- Monitor crawl errors
- Track keywords ranking
- Monitor backlinks
- Fix any issues

**Google Analytics 4:**
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Conversion Tracking:**
- Form submissions
- Phone clicks (tel: links)
- WhatsApp clicks
- Email clicks
- Button clicks (CTAs)

**Cloudflare Web Analytics:**
- Privacy-friendly alternative
- No cookies required
- Basic metrics
- Free with Cloudflare Pages

**Monthly SEO Tasks:**
- Check Search Console for errors
- Monitor keyword rankings
- Analyze traffic sources
- Review and respond to reviews
- Update content if needed
- Check backlinks
- Monitor competitors

---

## 7. Deployment and Configuration

### Cloudflare Pages Setup

**Prerequisites:**
- GitHub repository
- Cloudflare account
- Domain (opcional, se puede usar *.pages.dev)

**Build Configuration:**
```
Build command: npm run build
Output directory: dist
Root directory: /
Node version: 18 or later
Environment variables: (si se usa form service)
  - FORM_API_KEY=xxx (ejemplo)
```

**astro.config.mjs:**
```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://nativocan.com', // Update con domain real o temporal
  output: 'static',
  integrations: [
    tailwind(),
    sitemap()
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: true,
      minify: 'terser'
    }
  }
});
```

**package.json scripts:**
```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  }
}
```

### Environment Setup

**Local Development:**
```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# Server runs on http://localhost:4321

# Build for production
npm run build

# Preview production build
npm run preview
```

**Dependencies (package.json):**
```json
{
  "name": "nativocan-landing",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "astro": "^4.0.0",
    "@astrojs/tailwind": "^5.0.0",
    "@astrojs/sitemap": "^3.0.0",
    "tailwindcss": "^3.4.0"
  }
}
```

**tailwind.config.mjs:**
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F89A3E',
          light: '#FDB670',
          dark: '#E6881A',
        },
        secondary: {
          DEFAULT: '#3E5C9A',
          light: '#5A7AB8',
          dark: '#2A4176',
        },
        accent: {
          DEFAULT: '#3DB57A',
          light: '#5FC792',
          dark: '#2A9462',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### Form Integration

**Option 1: Web3Forms (Recommended - Free)**
```html
<!-- In ContactForm.astro -->
<form
  action="https://api.web3forms.com/submit"
  method="POST"
  id="contact-form"
>
  <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
  <input type="hidden" name="subject" value="Nuevo contacto desde Nativocan">
  <input type="hidden" name="from_name" value="Nativocan Website">

  <!-- Honeypot Spam Protection -->
  <input type="checkbox" name="botcheck" class="hidden" style="display: none;">

  <!-- Form fields here -->

  <button type="submit">Enviar</button>
</form>

<script>
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        // Show success message
        form.reset();
      } else {
        // Show error message
      }
    } catch (error) {
      // Show error message
    }
  });
</script>
```

**Option 2: Formspree**
```html
<form
  action="https://formspree.io/f/YOUR_FORM_ID"
  method="POST"
>
  <!-- Form fields -->
</form>
```

### Domain Configuration

**Custom Domain (Cloudflare Pages):**
1. Add custom domain in Cloudflare Pages settings
2. Update nameservers to Cloudflare
3. SSL certificate auto-provisioned
4. Force HTTPS: enabled by default

**DNS Records:**
```
Type: CNAME
Name: @ (or www)
Target: nativocan.pages.dev
Proxy: Enabled (orange cloud)
```

### Post-Deployment Checklist

**Functionality:**
- [ ] All pages load correctly
- [ ] Navigation works (smooth scroll)
- [ ] Mobile menu toggles
- [ ] Forms submit successfully
- [ ] WhatsApp link opens correctly
- [ ] Phone link works (click-to-call)
- [ ] Email link opens email client
- [ ] Map loads and is interactive
- [ ] Modal gallery opens/closes
- [ ] Carousel navigation works
- [ ] Back to top button appears/works

**Responsive:**
- [ ] Mobile (375px, 414px)
- [ ] Tablet (768px, 1024px)
- [ ] Desktop (1280px, 1920px)
- [ ] No horizontal scroll
- [ ] All text readable
- [ ] Images scale properly
- [ ] Buttons touchable (min 44x44px)

**Performance:**
- [ ] Run Lighthouse audit
- [ ] Performance score 95+
- [ ] Accessibility score 95+
- [ ] Best Practices score 95+
- [ ] SEO score 95+
- [ ] All images optimized
- [ ] No console errors

**SEO:**
- [ ] Meta tags correct
- [ ] OG image displays on social
- [ ] Sitemap accessible
- [ ] robots.txt correct
- [ ] Schema markup validates (schema.org validator)
- [ ] Submit to Google Search Console
- [ ] Submit sitemap to GSC
- [ ] Mobile-friendly test passes

**Analytics:**
- [ ] Google Analytics tracking
- [ ] Cloudflare Analytics enabled
- [ ] Form submissions tracking
- [ ] Button clicks tracking

**Content:**
- [ ] All placeholder text reviewed
- [ ] Contact info correct
- [ ] Links to social media work
- [ ] All images have alt text
- [ ] No lorem ipsum remaining
- [ ] Spelling/grammar checked

---

## 8. Maintenance and Future Updates

### Content Update Workflow

**Updating Content (No Code):**

1. **Service Information:**
   - Edit `src/data/services.js`
   - Modify title, description, duration, etc.
   - Commit and push → Auto-deploys

2. **Pricing:**
   - Edit `src/data/pricing.js`
   - Update prices, features, plan names
   - Commit and push

3. **Testimonials:**
   - Edit `src/data/testimonials.js`
   - Add new testimonials
   - Upload client photos to `public/images/testimonials/`
   - Commit and push

4. **Team Members:**
   - Edit `src/data/team.js`
   - Add/remove team members
   - Upload photos to `public/images/team/`
   - Commit and push

5. **Contact Information:**
   - Edit `src/data/site.js`
   - Update phone, email, address, hours
   - Changes reflect across entire site

**Replacing Images:**
1. Place new image in appropriate `public/images/` subdirectory
2. Name it exactly the same as placeholder OR
3. Update the path in corresponding data file
4. Optimize image (WebP format, compressed)
5. Commit and push

### Git Workflow

**For content updates:**
```bash
# Edit data files
# Replace images

git add .
git commit -m "Update: [describe change]"
git push origin main

# Cloudflare Pages auto-deploys
```

**Branching (optional for larger changes):**
```bash
git checkout -b feature/new-service
# Make changes
git add .
git commit -m "Add: New training service"
git push origin feature/new-service
# Create PR in GitHub
# Merge to main → deploys
```

### Monitoring and Optimization

**Weekly:**
- Check Google Search Console for errors
- Monitor form submissions
- Check analytics for traffic/conversions

**Monthly:**
- Review and respond to any online reviews
- Update testimonials if new ones available
- Check for broken links
- Review performance metrics
- Update content if seasonally relevant

**Quarterly:**
- Run full Lighthouse audit
- Check competitor websites for ideas
- Review and update pricing if needed
- Add new team photos if staff changed
- Update service offerings if changed

### Future Enhancements (Out of Scope)

Potential additions for future phases:
- Blog section for SEO content
- Online booking system integration
- Customer portal for hotel reservations
- Gallery page with more photos
- Video testimonials
- Live chat integration
- Email newsletter signup
- Multi-language support (English)
- Dark mode toggle

These would require architectural changes and are not part of initial launch.

---

## 9. Documentation

### README.md Structure

**Content for README:**
```markdown
# Nativocan Landing Page

Landing page estática para Nativocan Centro de Desarrollo Canino.

## Tech Stack
- Astro 4.x
- Tailwind CSS 3.x
- Vanilla JavaScript
- Cloudflare Pages

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

Todos los contenidos están centralizados en archivos JavaScript para fácil actualización:

### Información del Negocio
`src/data/site.js` - Teléfono, email, dirección, horarios, redes sociales

### Servicios
`src/data/services.js` - Servicios de adiestramiento y descripción

### Hotel
`src/data/hotel.js` - Características del hotel y galería

### Testimonios
`src/data/testimonials.js` - Reviews de clientes

### Precios
`src/data/pricing.js` - Planes y precios

### Equipo
`src/data/team.js` - Información de entrenadores

### FAQs
`src/data/faqs.js` - Preguntas frecuentes

## Replacing Images

1. Coloca la nueva imagen en `public/images/[categoria]/`
2. Optimiza la imagen (formato WebP, comprimida)
3. Actualiza el path en el archivo de datos correspondiente
4. Commit y push

## Deploy

El sitio se despliega automáticamente en Cloudflare Pages al hacer push a la rama `main`.

## Support

Para soporte técnico, contactar a [DEVELOPER_EMAIL]
```

### Code Comments

**In Data Files:**
```js
// TODO: Reemplazar con información real del negocio
export const siteData = {
  business: {
    name: "Nativocan",
    phone: "+56 9 XXXX XXXX", // TODO: Actualizar con teléfono real
    // ...
  }
};
```

**In Components:**
```astro
---
// ServiceCard.astro
// Componente reutilizable para mostrar servicios de adiestramiento
// Props: title, description, icon, duration
---
```

**In Scripts:**
```js
/**
 * Smooth scroll functionality for navigation links
 * Closes mobile menu after navigation on mobile devices
 */
```

---

## 10. Success Metrics

### Launch Goals (First Month)

**Performance:**
- Lighthouse Performance: 95+
- Lighthouse Accessibility: 95+
- Lighthouse SEO: 95+
- Page Load Time: < 2s
- Mobile Performance: 90+

**SEO:**
- Indexed by Google within 1 week
- Ranking for brand name (position 1)
- Ranking for "[brand] + [ciudad]" (top 10)
- At least 10 organic impressions/day (GSC)

**Conversions:**
- Form submission rate: 2-5%
- Click-through on CTAs: 10-15%
- Bounce rate: < 60%
- Average session duration: > 1 min

**Technical:**
- 0 critical errors in GSC
- 0 broken links
- All forms working
- Mobile-friendly test: Pass
- Schema validation: Pass

### 3-Month Goals

**SEO:**
- Ranking for 3+ primary keywords (top 10)
- Ranking for 5+ long-tail keywords (top 5)
- Organic traffic: 100+ sessions/month
- Google Business Profile: 10+ reviews

**Conversions:**
- 20+ form submissions/month
- 50+ phone clicks/month
- 30+ WhatsApp clicks/month

**Content:**
- All placeholder content replaced
- Real photos uploaded (minimum 30 images)
- All testimonials real (minimum 6)
- 10+ Google reviews

---

## Appendix: File Reference

### Critical Files Summary

| File | Purpose | Update Frequency |
|------|---------|------------------|
| `src/data/site.js` | Business info, contact, SEO | Rarely |
| `src/data/services.js` | Training services | Occasionally |
| `src/data/hotel.js` | Hotel features, gallery | Occasionally |
| `src/data/testimonials.js` | Client reviews | Monthly |
| `src/data/pricing.js` | Plans and pricing | Quarterly |
| `src/data/team.js` | Staff information | As needed |
| `src/data/faqs.js` | FAQ content | As needed |
| `astro.config.mjs` | Astro configuration | Rarely |
| `tailwind.config.mjs` | Design tokens | Rarely |
| `package.json` | Dependencies | On updates |

### Component Hierarchy

```
Layout.astro (base)
└── index.astro (home page)
    ├── Header.astro
    ├── Hero.astro
    ├── ServiceCard.astro (×6)
    ├── Hotel section
    │   └── Modal.astro
    ├── TeamMember.astro (×3-4)
    ├── Carousel
    │   └── TestimonialCard.astro (×6-8)
    ├── PricingCard.astro (×6)
    ├── ContactForm.astro
    ├── Footer.astro
    └── BackToTop.astro
```

---

## End of Specification

**Next Steps:**
1. Review this specification
2. Approve or request changes
3. Proceed to implementation planning (writing-plans skill)
4. Execute implementation plan
5. Deploy to Cloudflare Pages
6. Post-launch optimization

**Estimated Timeline:**
- Setup & scaffolding: 2-3 hours
- Component development: 8-10 hours
- Content population: 2-3 hours
- Testing & optimization: 2-3 hours
- Total: 14-19 hours

**Total Deliverables:**
- Fully functional static landing page
- Responsive design (mobile, tablet, desktop)
- SEO-optimized with structured data
- Contact form integration
- Deployed on Cloudflare Pages
- Documentation for content updates
