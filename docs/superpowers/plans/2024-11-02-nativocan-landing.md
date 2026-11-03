# Nativocan Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a professional, SEO-optimized landing page for Nativocan Centro de Desarrollo Canino with services showcase, hotel information, testimonials, pricing, and multiple contact options.

**Architecture:** Static site generated with Astro, styled with Tailwind CSS, minimal vanilla JavaScript for interactivity (smooth scroll, mobile menu, modal gallery, carousel). All content centralized in data files for easy updates. Deploy to Cloudflare Pages.

**Tech Stack:** Astro 4.x, Tailwind CSS 3.x, Vanilla JavaScript, Cloudflare Pages

**Spec:** `docs/superpowers/specs/2024-11-02-nativocan-landing-design.md`

## Global Constraints

- Node version: 18 or later
- Astro version: ^4.0.0
- Tailwind version: ^3.4.0
- Output: 100% static (no SSR)
- Color palette: Primary #F89A3E (orange), Secondary #3E5C9A (blue), Accent #3DB57A (green) from logo
- Font: Inter or system-ui fallback
- Lighthouse target: 95+ all metrics
- Mobile-first responsive design
- No external JavaScript frameworks (React, Vue, etc.)
- All placeholder content marked with TODO comments

## Review Focus

1. **Mobile menu state management:** When clicking a navigation link on mobile, menu must close and body overflow must restore - test by opening menu, clicking link, verifying menu slides out and page scrolls
2. **Form validation feedback:** Invalid inputs must show visual feedback before submit attempt - test by focusing and blurring empty required field without form submission
3. **Modal keyboard navigation:** ESC key must close modal and restore body scroll - test by opening gallery modal, pressing ESC, verifying modal closes and page scrolling works
4. **Lazy-loaded images:** Hero image must load immediately, below-fold images must lazy-load - test by throttling network, verifying hero loads first and other images load as they enter viewport
5. **Structured data validation:** All schema.org JSON-LD must validate without errors - test by copying each schema block to schema.org validator before commit

---

## File Structure Overview

**Configuration & Setup:**
- `package.json` - Dependencies and scripts
- `astro.config.mjs` - Astro configuration with sitemap
- `tailwind.config.mjs` - Custom colors and theme
- `tsconfig.json` - TypeScript config (Astro default)
- `.gitignore` - Ignore node_modules, dist, .env

**Layouts:**
- `src/layouts/Layout.astro` - Base layout with SEO, meta tags, global scripts

**Components:**
- `src/components/Header.astro` - Sticky navigation with mobile menu
- `src/components/Footer.astro` - Footer with links and social
- `src/components/Hero.astro` - Hero section with CTAs
- `src/components/ServiceCard.astro` - Reusable service card
- `src/components/TeamMember.astro` - Team member card
- `src/components/TestimonialCard.astro` - Testimonial card
- `src/components/PricingCard.astro` - Pricing plan card
- `src/components/ContactForm.astro` - Contact form with validation
- `src/components/Modal.astro` - Lightbox modal for gallery
- `src/components/BackToTop.astro` - Back to top button

**Data:**
- `src/data/site.js` - Business info, contact, SEO metadata
- `src/data/services.js` - Training services array
- `src/data/hotel.js` - Hotel features and gallery
- `src/data/team.js` - Team members array
- `src/data/testimonials.js` - Testimonials array
- `src/data/pricing.js` - Pricing plans array
- `src/data/faqs.js` - FAQs array

**Scripts:**
- `src/scripts/main.js` - Smooth scroll, sticky header, mobile menu
- `src/scripts/modal.js` - Modal open/close/navigation
- `src/scripts/carousel.js` - Testimonials carousel
- `src/scripts/scroll-reveal.js` - Intersection Observer animations

**Styles:**
- `src/styles/global.css` - Tailwind imports, custom animations

**Pages:**
- `src/pages/index.astro` - Main landing page (single page)

**Public Assets:**
- `public/images/logo_nativocan.png` - Existing logo
- `public/images/hero/` - Hero images (placeholder)
- `public/images/services/` - Service icons (placeholder)
- `public/images/hotel/` - Hotel gallery (placeholder)
- `public/images/team/` - Team photos (placeholder)
- `public/images/testimonials/` - Testimonial photos (placeholder)
- `public/favicon.svg` - Favicon
- `public/robots.txt` - SEO crawling config
- `public/_headers` - Cloudflare headers config
- `public/og-image.jpg` - Open Graph image

**Documentation:**
- `README.md` - Project documentation and content update guide

---

## Tasks

### Task 1: Project Scaffolding and Configuration

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `README.md`

**Interfaces:**
- Consumes: None (initial setup)
- Produces: Working Astro + Tailwind project that runs `npm run dev`

- [ ] **Step 1: Initialize npm project and install dependencies**

```bash
npm create astro@latest . -- --template minimal --no-install --no-git --typescript strictest
npm install
npm install -D tailwindcss @astrojs/tailwind @astrojs/sitemap
npx astro add tailwind --yes
npx astro add sitemap --yes
```

- [ ] **Step 2: Verify dev server starts**

Run: `npm run dev`
Expected: Server starts on http://localhost:4321, no errors

- [ ] **Step 3: Configure astro.config.mjs with site URL and integrations**

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://nativocan.pages.dev',
  output: 'static',
  integrations: [tailwind(), sitemap()],
  build: {
    inlineStylesheets: 'auto',
  }
});
```

- [ ] **Step 4: Configure tailwind.config.mjs with custom colors from spec**

Colors from spec: Primary #F89A3E, Secondary #3E5C9A, Accent #3DB57A

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

- [ ] **Step 5: Create .gitignore**

```
node_modules/
dist/
.env
.astro/
```

- [ ] **Step 6: Create basic README.md with development instructions**

Include: npm install, npm run dev, npm run build commands

- [ ] **Step 7: Verify build works**

Run: `npm run build`
Expected: Build completes successfully, dist/ folder created

- [ ] **Step 8: Commit**

```bash
git init
git add .
git commit -m "chore: initial Astro + Tailwind setup"
```

---

### Task 2: Global Styles and Base Layout

**Files:**
- Create: `src/styles/global.css`
- Create: `src/layouts/Layout.astro`

**Interfaces:**
- Consumes: Tailwind config from Task 1
- Produces: `Layout.astro` component accepting props: `title: string`, `description: string`

- [ ] **Step 1: Create global.css with Tailwind imports and custom animations**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
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
}
```

- [ ] **Step 2: Create Layout.astro with SEO meta tags structure**

File: `src/layouts/Layout.astro`

Props interface:
```typescript
interface Props {
  title: string;
  description: string;
}
```

Include in `<head>`:
- Basic meta tags (charset, viewport)
- Title and description
- Canonical URL
- Open Graph tags (type, url, title, description, image)
- Twitter Card tags
- Favicon links
- Preconnect for fonts
- Import global.css

HTML structure:
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <!-- meta tags here -->
</head>
<body>
  <slot />
</body>
</html>
```

- [ ] **Step 3: Test Layout renders correctly**

Create temporary `src/pages/index.astro`:
```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="Test" description="Test page">
  <h1>Test</h1>
</Layout>
```

Run: `npm run dev` and visit http://localhost:4321
Expected: Page loads with "Test" heading, no console errors

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css src/layouts/Layout.astro src/pages/index.astro
git commit -m "feat: add global styles and base layout"
```

---

### Task 3: Data Structure Files

**Files:**
- Create: `src/data/site.js`
- Create: `src/data/services.js`
- Create: `src/data/hotel.js`
- Create: `src/data/team.js`
- Create: `src/data/testimonials.js`
- Create: `src/data/pricing.js`
- Create: `src/data/faqs.js`

**Interfaces:**
- Consumes: None
- Produces:
  - `siteData` object with business, social, seo properties
  - `trainingServices` array of service objects
  - `hotelFeatures` and `hotelGallery` arrays
  - `team` array
  - `testimonials` array
  - `pricingPlans` array
  - `faqs` array

- [ ] **Step 1: Create site.js with business info structure from spec**

File: `src/data/site.js`

Export `siteData` with structure from spec section 5, include TODO comments for placeholders:
```js
export const siteData = {
  business: {
    name: "Nativocan",
    tagline: "Centro de Desarrollo Canino",
    phone: "+56 9 XXXX XXXX", // TODO: Update with real phone
    // ... rest from spec
  },
  social: {
    // ... from spec
  },
  seo: {
    // ... from spec
  }
};
```

- [ ] **Step 2: Create services.js with 6 training services from spec**

File: `src/data/services.js`

Export `trainingServices` array with exact services from spec section 5:
- Obediencia Básica
- Obediencia Avanzada
- Modificación de Conducta
- Socialización
- Adiestramiento a Domicilio
- Clases Grupales

Each with: id, title, description, icon, duration, sessions, level, highlights array

- [ ] **Step 3: Create hotel.js with features and gallery from spec**

File: `src/data/hotel.js`

Export `hotelFeatures` (6 features) and `hotelGallery` (6 images) arrays from spec section 5

- [ ] **Step 4: Create team.js with 3 team members from spec**

File: `src/data/team.js`

Export `team` array with structure from spec section 5

- [ ] **Step 5: Create testimonials.js with 6 testimonials from spec**

File: `src/data/testimonials.js`

Export `testimonials` array with structure from spec section 5

- [ ] **Step 6: Create pricing.js with 6 pricing plans from spec**

File: `src/data/pricing.js`

Export `pricingPlans` array (3 training + 3 hotel) from spec section 5

- [ ] **Step 7: Create faqs.js with 8 FAQs from spec**

File: `src/data/faqs.js`

Export `faqs` array with structure from spec section 5

- [ ] **Step 8: Test data imports work**

In `src/pages/index.astro`, import and console.log one data file:
```astro
---
import { siteData } from '../data/site.js';
console.log(siteData.business.name);
---
```

Run: `npm run dev`
Expected: Console shows "Nativocan", no import errors

- [ ] **Step 9: Commit**

```bash
git add src/data/
git commit -m "feat: add centralized data structure files"
```

---

### Task 4: Header and Navigation Component

**Files:**
- Create: `src/components/Header.astro`

**Interfaces:**
- Consumes: `siteData` from `src/data/site.js`
- Produces: `Header.astro` component (no props, uses global data)

- [ ] **Step 1: Create Header.astro with desktop navigation structure**

File: `src/components/Header.astro`

Import `siteData`, render:
- Logo (text for now, TODO: replace with image)
- Nav links: Servicios, Hotel, Testimonios, Precios, Contacto (href="#servicios", etc.)
- CTA button "Contactar" (href="#contacto")
- Tailwind classes: sticky top-0, bg-white, shadow (added via JS), z-50

- [ ] **Step 2: Add mobile hamburger menu structure**

Add hamburger button (visible md:hidden)
Add mobile menu overlay (hidden by default)
Add mobile nav links (same as desktop)
Data attributes: `data-menu-button`, `data-mobile-menu`, `data-menu-overlay`

Mobile menu starts with `translate-x-full` (off-screen right)

- [ ] **Step 3: Add Header to index.astro and test rendering**

In `src/pages/index.astro`:
```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
---
<Layout title="Test" description="Test">
  <Header />
  <div style="height: 200vh;">Scroll test</div>
</Layout>
```

Run: `npm run dev`
Expected: Header visible, sticky on scroll, mobile menu button shows on small screen

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.astro src/pages/index.astro
git commit -m "feat: add header with navigation"
```

---

### Task 5: Hero Section Component

**Files:**
- Create: `src/components/Hero.astro`
- Create: `public/images/hero/hero-bg.jpg` (placeholder)

**Interfaces:**
- Consumes: `siteData` from `src/data/site.js`
- Produces: `Hero.astro` component (no props)

- [ ] **Step 1: Create placeholder hero background image**

Download a free dog/training image from Unsplash or use a solid color placeholder
Save to `public/images/hero/hero-bg.jpg`
Add TODO comment in code to replace with real image

- [ ] **Step 2: Create Hero.astro with background and content structure**

File: `src/components/Hero.astro`

Structure:
- Section with background image (data-bg-image attribute for lazy load)
- Dark overlay (bg-black/40)
- H1: "Centro de Desarrollo Canino Nativocan"
- Subheadline from siteData
- 3 CTA buttons:
  - Primary: "Agendar una Cita" (href="#contacto")
  - Secondary: "Ver Servicios" (href="#servicios")
  - WhatsApp: Link to `https://wa.me/${siteData.social.whatsapp}?text=${siteData.social.whatsappMessage}`

Tailwind: min-h-screen, flex items-center, text-center md:text-left

- [ ] **Step 3: Add Hero to index.astro and test**

Add `<Hero />` below Header in index.astro

Run: `npm run dev`
Expected: Hero section full viewport height, text visible, buttons clickable

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro public/images/hero/ src/pages/index.astro
git commit -m "feat: add hero section"
```

---

### Task 6: Services Section with ServiceCard Component

**Files:**
- Create: `src/components/ServiceCard.astro`

**Interfaces:**
- Consumes: `trainingServices` from `src/data/services.js`
- Produces: `ServiceCard.astro` component accepting props: `title: string`, `description: string`, `icon: string`, `duration: string`, `highlights: string[]`

- [ ] **Step 1: Create ServiceCard.astro component**

File: `src/components/ServiceCard.astro`

Props interface:
```typescript
interface Props {
  title: string;
  description: string;
  icon: string;
  duration: string;
  highlights: string[];
}
```

Structure:
- Card container: bg-white, rounded-lg, shadow-md, hover:shadow-xl, hover:-translate-y-1, transition-all
- Icon (text emoji for now)
- Title (h3)
- Description
- Duration badge
- Highlights list with checkmarks

- [ ] **Step 2: Add services section to index.astro**

In `src/pages/index.astro`, after Hero:
```astro
<section id="servicios" class="py-16 md:py-24 bg-neutral-50">
  <div class="container mx-auto px-4 max-w-7xl">
    <h2 class="text-4xl md:text-5xl font-bold text-center mb-12">
      Nuestros Servicios de Adiestramiento
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {trainingServices.map(service => (
        <ServiceCard {...service} />
      ))}
    </div>
  </div>
</section>
```

Import trainingServices and ServiceCard

- [ ] **Step 3: Test services render correctly**

Run: `npm run dev`
Expected: 6 service cards in grid, responsive (1 col mobile, 3 desktop), hover effects work

- [ ] **Step 4: Commit**

```bash
git add src/components/ServiceCard.astro src/pages/index.astro
git commit -m "feat: add services section with cards"
```

---

### Task 7: Hotel Section with Gallery Modal

**Files:**
- Create: `src/components/Modal.astro`
- Create: `public/images/hotel/` (6 placeholder images)

**Interfaces:**
- Consumes: `hotelFeatures`, `hotelGallery` from `src/data/hotel.js`
- Produces: `Modal.astro` component (no props, controlled by JS)

- [ ] **Step 1: Create placeholder hotel images**

Download 6 free dog hotel/facility images or create placeholders
Save to `public/images/hotel/gallery-1.jpg` through `gallery-6.jpg`
Add TODO comments to replace with real images

- [ ] **Step 2: Create Modal.astro lightbox component**

File: `src/components/Modal.astro`

Structure:
- Outer container: fixed inset-0, bg-black/90, z-50, opacity-0, pointer-events-none (hidden by default)
- Close button (X icon, top-right)
- Image container (centered)
- Prev/Next buttons
- Data attributes: `data-modal`, `data-modal-image`, `data-modal-close`, `data-modal-prev`, `data-modal-next`

Transitions: opacity and scale

- [ ] **Step 3: Add hotel section to index.astro**

After services section:
```astro
<section id="hotel" class="py-16 md:py-24">
  <div class="container mx-auto px-4 max-w-7xl">
    <h2 class="text-4xl md:text-5xl font-bold text-center mb-12">
      Hotel Canino - Un Hogar Lejos de Casa
    </h2>

    <!-- Features alternating layout -->
    {hotelFeatures.map((feature, index) => (
      <div class={`flex flex-col md:flex-row gap-8 mb-12 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
        <div class="md:w-1/2">
          <img src={feature.image} alt={feature.title} class="rounded-lg" loading="lazy" />
        </div>
        <div class="md:w-1/2">
          <h3 class="text-2xl font-semibold mb-4">{feature.title}</h3>
          <p class="text-lg">{feature.description}</p>
        </div>
      </div>
    ))}

    <!-- Gallery grid -->
    <h3 class="text-3xl font-bold text-center mb-8 mt-16">Galería de Instalaciones</h3>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      {hotelGallery.map((img, index) => (
        <img
          src={img.image}
          alt={img.alt}
          class="rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
          loading="lazy"
          data-gallery-image
          data-image-index={index}
        />
      ))}
    </div>
  </div>
</section>

<Modal />
```

Import hotelFeatures, hotelGallery, Modal

- [ ] **Step 4: Test hotel section renders**

Run: `npm run dev`
Expected: Hotel features in alternating layout, gallery grid shows, modal structure exists (hidden)

- [ ] **Step 5: Commit**

```bash
git add src/components/Modal.astro public/images/hotel/ src/pages/index.astro
git commit -m "feat: add hotel section with gallery modal"
```

---

### Task 8: Team Section with TeamMember Component

**Files:**
- Create: `src/components/TeamMember.astro`
- Create: `public/images/team/` (3 placeholder images)

**Interfaces:**
- Consumes: `team` from `src/data/team.js`
- Produces: `TeamMember.astro` component accepting props: `name: string`, `role: string`, `specialty: string`, `photo: string`, `bio: string`, `experience: string`

- [ ] **Step 1: Create placeholder team photos**

Create 3 placeholder avatar images or download from Unsplash
Save to `public/images/team/trainer-1.jpg`, `trainer-2.jpg`, `trainer-3.jpg`
Add TODO comments

- [ ] **Step 2: Create TeamMember.astro component**

File: `src/components/TeamMember.astro`

Props interface:
```typescript
interface Props {
  name: string;
  role: string;
  specialty: string;
  photo: string;
  bio: string;
  experience: string;
}
```

Structure:
- Card: bg-white, rounded-lg, shadow-md, text-center
- Photo: circular (rounded-full), aspect-square, object-cover, hover:scale-105
- Name (h3)
- Role (text-primary)
- Specialty
- Bio
- Experience badge

- [ ] **Step 3: Add team section to index.astro**

After hotel section:
```astro
<section id="equipo" class="py-16 md:py-24 bg-primary/10">
  <div class="container mx-auto px-4 max-w-7xl">
    <h2 class="text-4xl md:text-5xl font-bold text-center mb-12">
      Nuestro Equipo Profesional
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {team.map(member => (
        <TeamMember {...member} />
      ))}
    </div>
  </div>
</section>
```

Import team and TeamMember

- [ ] **Step 4: Test team section renders**

Run: `npm run dev`
Expected: 3 team members in grid, photos circular, hover effect works

- [ ] **Step 5: Commit**

```bash
git add src/components/TeamMember.astro public/images/team/ src/pages/index.astro
git commit -m "feat: add team section with member cards"
```

---

### Task 9: Testimonials Carousel

**Files:**
- Create: `src/components/TestimonialCard.astro`
- Create: `public/images/testimonials/` (6 placeholder images)

**Interfaces:**
- Consumes: `testimonials` from `src/data/testimonials.js`
- Produces: `TestimonialCard.astro` accepting props: `name: string`, `dogName: string`, `photo: string`, `rating: number`, `text: string`, `service: string`

- [ ] **Step 1: Create placeholder testimonial photos**

Create 6 placeholder images (clients with dogs) or download from Unsplash
Save to `public/images/testimonials/testimonial-1.jpg` through `testimonial-6.jpg`
Add TODO comments

- [ ] **Step 2: Create TestimonialCard.astro component**

File: `src/components/TestimonialCard.astro`

Props interface:
```typescript
interface Props {
  name: string;
  dogName: string;
  photo: string;
  rating: number;
  text: string;
  service: string;
}
```

Structure:
- Card: bg-white, rounded-lg, shadow-md, p-6
- Photo: small circular image
- Rating: stars (repeat ★ `rating` times in text-primary)
- Text: testimonial with quote styling
- Name and dog name
- Service badge

- [ ] **Step 3: Add testimonials section to index.astro with carousel structure**

After team section:
```astro
<section id="testimonios" class="py-16 md:py-24 bg-neutral-50">
  <div class="container mx-auto px-4 max-w-7xl">
    <h2 class="text-4xl md:text-5xl font-bold text-center mb-12">
      Lo Que Dicen Nuestros Clientes
    </h2>

    <div class="relative" data-carousel>
      <!-- Carousel track -->
      <div class="overflow-hidden">
        <div class="flex transition-transform duration-500" data-carousel-track>
          {testimonials.map(testimonial => (
            <div class="min-w-full md:min-w-[33.333%] px-4" data-carousel-slide>
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>

      <!-- Navigation buttons -->
      <button
        class="absolute top-1/2 -translate-y-1/2 left-0 bg-white rounded-full p-3 shadow-lg"
        data-carousel-prev
        aria-label="Anterior"
      >←</button>
      <button
        class="absolute top-1/2 -translate-y-1/2 right-0 bg-white rounded-full p-3 shadow-lg"
        data-carousel-next
        aria-label="Siguiente"
      >→</button>

      <!-- Dots -->
      <div class="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            class="w-3 h-3 rounded-full bg-neutral-300 transition-colors"
            data-carousel-dot
            data-dot-index={index}
            aria-label={`Ir a testimonio ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  </div>
</section>
```

Import testimonials and TestimonialCard

- [ ] **Step 4: Test testimonials section renders**

Run: `npm run dev`
Expected: Testimonials visible, carousel structure present (navigation buttons and dots visible)

- [ ] **Step 5: Commit**

```bash
git add src/components/TestimonialCard.astro public/images/testimonials/ src/pages/index.astro
git commit -m "feat: add testimonials carousel section"
```

---

### Task 10: Pricing Section with PricingCard Component

**Files:**
- Create: `src/components/PricingCard.astro`

**Interfaces:**
- Consumes: `pricingPlans` from `src/data/pricing.js`
- Produces: `PricingCard.astro` accepting props: `name: string`, `category: string`, `price: string`, `duration: string`, `features: string[]`, `popular: boolean`, `cta: string`

- [ ] **Step 1: Create PricingCard.astro component**

File: `src/components/PricingCard.astro`

Props interface:
```typescript
interface Props {
  name: string;
  category: string;
  price: string;
  duration: string;
  features: string[];
  popular: boolean;
  cta: string;
}
```

Structure:
- Card: bg-white, rounded-lg, shadow-md, p-6
- If popular: border-2 border-primary, scale-105, "Más Popular" badge
- Category tag
- Name (h3)
- Price (large text)
- Duration
- Features list with checkmarks
- CTA button (links to #contacto)

- [ ] **Step 2: Add pricing section to index.astro**

After testimonials section:
```astro
<section id="precios" class="py-16 md:py-24">
  <div class="container mx-auto px-4 max-w-7xl">
    <h2 class="text-4xl md:text-5xl font-bold text-center mb-12">
      Planes y Precios
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {pricingPlans.map(plan => (
        <PricingCard {...plan} />
      ))}
    </div>
  </div>
</section>
```

Import pricingPlans and PricingCard

- [ ] **Step 3: Test pricing section renders**

Run: `npm run dev`
Expected: 6 pricing cards in grid, popular plan highlighted with border and scale

- [ ] **Step 4: Commit**

```bash
git add src/components/PricingCard.astro src/pages/index.astro
git commit -m "feat: add pricing section with cards"
```

---

### Task 11: SEO Content Section

**Files:**
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `faqs` from `src/data/faqs.js`
- Produces: Content section with 500-800 words, FAQ section

- [ ] **Step 1: Add "¿Por Qué Elegir Nativocan?" content section to index.astro**

After pricing section:
```astro
<section class="py-16 md:py-24 bg-neutral-50">
  <div class="container mx-auto px-4 max-w-4xl">
    <h2 class="text-4xl md:text-5xl font-bold text-center mb-12">
      ¿Por Qué Elegir Nativocan?
    </h2>

    <div class="prose prose-lg max-w-none">
      <h3>Beneficios del Adiestramiento Profesional</h3>
      <p>
        <!-- TODO: 150-200 words about professional training benefits, include keywords naturally -->
      </p>

      <h3>Qué Buscar en un Hotel Canino</h3>
      <p>
        <!-- TODO: 150-200 words about choosing a dog hotel, include keywords -->
      </p>

      <h3>Nuestra Filosofía de Entrenamiento</h3>
      <p>
        <!-- TODO: 150-200 words about positive reinforcement approach -->
      </p>

      <h3>Compromiso con el Bienestar Animal</h3>
      <p>
        <!-- TODO: 150-200 words about animal welfare commitment -->
      </p>
    </div>
  </div>
</section>
```

Add placeholder text (500-800 words total) with TODO comments to replace

- [ ] **Step 2: Add FAQ section**

After content section:
```astro
<section class="py-16 md:py-24">
  <div class="container mx-auto px-4 max-w-4xl">
    <h2 class="text-4xl md:text-5xl font-bold text-center mb-12">
      Preguntas Frecuentes
    </h2>

    <div class="space-y-6">
      {faqs.map(faq => (
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold mb-3">{faq.question}</h3>
          <p class="text-neutral-700">{faq.answer}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

Import faqs

- [ ] **Step 3: Test content and FAQ sections render**

Run: `npm run dev`
Expected: Content section with headings visible, 8 FAQ items displayed

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add SEO content and FAQ sections"
```

---

### Task 12: Contact Form and Map Section

**Files:**
- Create: `src/components/ContactForm.astro`

**Interfaces:**
- Consumes: `siteData` from `src/data/site.js`
- Produces: `ContactForm.astro` component (no props)

- [ ] **Step 1: Create ContactForm.astro with Web3Forms integration**

File: `src/components/ContactForm.astro`

Structure:
- Form: action="https://api.web3forms.com/submit", method="POST"
- Hidden inputs: access_key (placeholder "YOUR_ACCESS_KEY"), subject, from_name
- Honeypot: hidden checkbox name="botcheck"
- Inputs:
  - Nombre (required, text)
  - Email (required, email)
  - Teléfono (required, tel)
  - Servicio (required, select with options: Adiestramiento, Hotel, Ambos)
  - Mensaje (required, textarea)
- Submit button with loading state data attribute
- Success/error message containers (hidden by default)

Tailwind: form inputs with focus:ring-primary, rounded-lg, proper spacing

- [ ] **Step 2: Add contact section to index.astro**

After FAQ section:
```astro
<section id="contacto" class="py-16 md:py-24 bg-neutral-50">
  <div class="container mx-auto px-4 max-w-7xl">
    <h2 class="text-4xl md:text-5xl font-bold text-center mb-12">
      Contáctanos
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
      <!-- Form - 3 columns -->
      <div class="md:col-span-3">
        <ContactForm />
      </div>

      <!-- Contact Info - 2 columns -->
      <div class="md:col-span-2 space-y-6">
        <div>
          <h3 class="text-xl font-semibold mb-3">Información de Contacto</h3>
          <div class="space-y-3">
            <p>
              <strong>Teléfono:</strong><br />
              <a href={`tel:${siteData.business.phone}`} class="text-primary hover:underline">
                {siteData.business.phone}
              </a>
            </p>
            <p>
              <strong>Email:</strong><br />
              <a href={`mailto:${siteData.business.email}`} class="text-primary hover:underline">
                {siteData.business.email}
              </a>
            </p>
            <p>
              <strong>Dirección:</strong><br />
              {siteData.business.address}
            </p>
            <p>
              <strong>Horarios:</strong><br />
              {siteData.business.hours}
            </p>
          </div>
        </div>

        <!-- Social buttons -->
        <div class="flex gap-4">
          <a
            href={`https://wa.me/${siteData.social.whatsapp}?text=${encodeURIComponent(siteData.social.whatsappMessage)}`}
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <a
            href={siteData.social.facebook}
            class="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-full transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href={siteData.social.instagram}
            class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>

        <!-- Map placeholder -->
        <div class="bg-neutral-200 rounded-lg h-64 flex items-center justify-center">
          <p class="text-neutral-600">
            <!-- TODO: Embed Google Maps iframe -->
            Mapa
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
```

Import siteData and ContactForm

- [ ] **Step 3: Test contact section renders**

Run: `npm run dev`
Expected: Form displays with all fields, contact info shows, social buttons visible

- [ ] **Step 4: Commit**

```bash
git add src/components/ContactForm.astro src/pages/index.astro
git commit -m "feat: add contact form and info section"
```

---

### Task 13: Footer and BackToTop Components

**Files:**
- Create: `src/components/Footer.astro`
- Create: `src/components/BackToTop.astro`

**Interfaces:**
- Consumes: `siteData` from `src/data/site.js`
- Produces: `Footer.astro` and `BackToTop.astro` components (no props)

- [ ] **Step 1: Create Footer.astro component**

File: `src/components/Footer.astro`

Import siteData

Structure:
- BG: bg-secondary-dark, text-white
- 3 columns on desktop, stacked on mobile:
  1. Logo + tagline
  2. Quick links (same as header nav)
  3. Contact info (phone, email) + social icons
- Bottom: Copyright © 2024 Nativocan, Privacy Policy, Terms links (placeholder #)

- [ ] **Step 2: Create BackToTop.astro component**

File: `src/components/BackToTop.astro`

Structure:
- Fixed bottom-8 right-8, z-40
- Circular button: bg-primary, text-white, rounded-full, p-4
- Arrow up icon (↑)
- Hidden by default: opacity-0, pointer-events-none
- Data attribute: data-back-to-top
- Smooth scroll to top on click (handled by JS later)

- [ ] **Step 3: Add Footer and BackToTop to index.astro**

At the end of index.astro, after all sections:
```astro
<Footer />
<BackToTop />
```

Import both components

- [ ] **Step 4: Test footer and button render**

Run: `npm run dev`
Expected: Footer at bottom with all content, BackToTop button visible (even though hidden by default styles)

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.astro src/components/BackToTop.astro src/pages/index.astro
git commit -m "feat: add footer and back-to-top button"
```

---

### Task 14: JavaScript Interactivity

**Files:**
- Create: `src/scripts/main.js`
- Create: `src/scripts/modal.js`
- Create: `src/scripts/carousel.js`
- Create: `src/scripts/scroll-reveal.js`
- Modify: `src/layouts/Layout.astro`

**Interfaces:**
- Consumes: DOM elements with data attributes from components
- Produces: Interactive features (smooth scroll, mobile menu, modal, carousel, animations)

- [ ] **Step 1: Create main.js with smooth scroll and mobile menu**

File: `src/scripts/main.js`

Implement:
1. Smooth scroll for all `a[href^="#"]` links
2. Close mobile menu after clicking nav link
3. Sticky header shadow on scroll (add shadow-lg class after 50px)
4. Mobile menu toggle (hamburger button, overlay)
5. Back to top button show/hide on scroll (threshold 300px)
6. Back to top click handler

Test Review Focus #1: Mobile menu closes and body overflow restores when clicking nav link

- [ ] **Step 2: Create modal.js for gallery lightbox**

File: `src/scripts/modal.js`

Implement:
1. Click on `[data-gallery-image]` opens modal
2. Set modal image src from clicked image
3. Close modal on `[data-modal-close]` click
4. Close on overlay click
5. Close on ESC key (test Review Focus #3)
6. Prev/Next navigation through gallery images
7. Arrow key navigation (left/right)
8. Body overflow hidden when modal open

- [ ] **Step 3: Create carousel.js for testimonials**

File: `src/scripts/carousel.js`

Implement Carousel class:
1. Constructor takes element `[data-carousel]`
2. Track current index
3. Prev/next button handlers
4. Dot click handlers
5. `updateCarousel()` translates track, updates active dot
6. Auto-play every 5 seconds
7. Pause auto-play on hover

- [ ] **Step 4: Create scroll-reveal.js with Intersection Observer**

File: `src/scripts/scroll-reveal.js`

Implement:
1. Intersection Observer with threshold 0.1, rootMargin -50px
2. Observe all `[data-reveal]` elements
3. Add `animate-fade-in` class when intersecting
4. Unobserve after animating
5. Stagger animation for `[data-stagger-item]` elements (100ms delay each)

Test Review Focus #4: Below-fold images lazy load as they enter viewport

- [ ] **Step 5: Add data attributes to components that need JS**

Update components:
- Header.astro: Add `data-reveal` to sections
- ServiceCard grid: Add `data-stagger-container` to grid, `data-stagger-item` to each card
- Hotel gallery images: Already have `data-gallery-image`
- Testimonials: Already have carousel data attributes
- All major sections: Add `data-reveal`

- [ ] **Step 6: Import scripts in Layout.astro**

In `src/layouts/Layout.astro`, before closing `</body>`:
```astro
<script>
  import '../scripts/main.js';
  import '../scripts/modal.js';
  import '../scripts/carousel.js';
  import '../scripts/scroll-reveal.js';
</script>
```

- [ ] **Step 7: Test all JavaScript functionality**

Run: `npm run dev`

Test checklist:
- [ ] Clicking nav links smooth scrolls to section
- [ ] Mobile menu opens/closes, body scroll locks/unlocks (Review Focus #1)
- [ ] Header gains shadow on scroll
- [ ] Gallery images open modal on click
- [ ] Modal closes on X, overlay, ESC key (Review Focus #3)
- [ ] Modal prev/next navigation works
- [ ] Carousel prev/next buttons work
- [ ] Carousel dots work
- [ ] Carousel auto-plays
- [ ] Sections fade in on scroll
- [ ] Service cards stagger animate
- [ ] Back to top button appears after scrolling, returns to top

Expected: All interactions work, no console errors

- [ ] **Step 8: Test form validation (Review Focus #2)**

Focus on required email field, blur without entering anything
Expected: Browser shows validation message "Please fill out this field"

- [ ] **Step 9: Commit**

```bash
git add src/scripts/ src/layouts/Layout.astro src/components/
git commit -m "feat: add JavaScript interactivity (scroll, menu, modal, carousel, animations)"
```

---

### Task 15: SEO Optimization and Structured Data

**Files:**
- Modify: `src/layouts/Layout.astro`
- Create: `public/robots.txt`
- Create: `public/_headers`
- Create: `public/favicon.svg`
- Create: `public/og-image.jpg`

**Interfaces:**
- Consumes: `siteData` from `src/data/site.js`, `faqs` from `src/data/faqs.js`, `testimonials` from `src/data/testimonials.js`
- Produces: Complete SEO meta tags, structured data, config files

- [ ] **Step 1: Create robots.txt**

File: `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://nativocan.pages.dev/sitemap.xml
```

- [ ] **Step 2: Create _headers for Cloudflare Pages**

File: `public/_headers`

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/images/*
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable
```

- [ ] **Step 3: Create placeholder favicon and OG image**

Create simple favicon.svg (text "N" or logo icon)
Create og-image.jpg (1200x630, logo + tagline) or placeholder
Save to `public/favicon.svg` and `public/og-image.jpg`
Add TODO comments to replace

- [ ] **Step 4: Update Layout.astro with complete SEO meta tags**

In `src/layouts/Layout.astro` `<head>`, add:

```astro
<!-- Geo tags -->
<meta name="geo.region" content="CL-TODO" />
<meta name="geo.placename" content="TODO_CIUDAD" />

<!-- OG Image -->
<meta property="og:image" content={new URL('/og-image.jpg', Astro.site)} />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content={new URL('/og-image.jpg', Astro.site)} />

<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

Update existing title, description, og:url with proper values from props

- [ ] **Step 5: Add LocalBusiness structured data to index.astro**

In `src/pages/index.astro`, in frontmatter:
```astro
---
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${Astro.site}#business`,
  "name": siteData.business.name,
  "alternateName": `${siteData.business.name} - ${siteData.business.tagline}`,
  "description": siteData.seo.description,
  "url": Astro.site,
  "telephone": siteData.business.phone,
  "email": siteData.business.email,
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "TODO",
    "addressLocality": "TODO_CIUDAD",
    "addressRegion": "TODO_REGION",
    "postalCode": "TODO",
    "addressCountry": "CL"
  },
  // Add rest from spec section 6
};
---

<!-- In <head> -->
<script type="application/ld+json" set:html={JSON.stringify(localBusinessSchema)} />
```

- [ ] **Step 6: Add FAQPage structured data**

Create faqSchema from faqs array, add to `<head>`:
```astro
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};
```

Add script tag: `<script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />`

- [ ] **Step 7: Add Review structured data for testimonials**

Create array of review schemas from testimonials:
```astro
const reviewSchemas = testimonials.map(t => ({
  "@context": "https://schema.org",
  "@type": "Review",
  "author": {
    "@type": "Person",
    "name": t.name
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": t.rating,
    "bestRating": "5"
  },
  "reviewBody": t.text,
  "itemReviewed": {
    "@type": "Service",
    "name": t.service,
    "provider": {
      "@id": `${Astro.site}#business`
    }
  }
}));
```

Add each as separate script tag or combined array

- [ ] **Step 8: Validate all structured data (Review Focus #5)**

Copy each schema.org JSON-LD block
Paste into https://validator.schema.org/
Expected: All schemas validate without errors

If errors found, fix and re-validate before committing

- [ ] **Step 9: Update index.astro with proper title and description**

Pass proper values to Layout:
```astro
<Layout
  title={siteData.seo.title}
  description={siteData.seo.description}
>
```

- [ ] **Step 10: Test SEO tags render correctly**

Run: `npm run dev`
View page source, verify:
- Title tag correct
- Meta description present
- OG tags present with correct content
- Structured data scripts present
- Canonical URL correct

- [ ] **Step 11: Commit**

```bash
git add src/layouts/Layout.astro src/pages/index.astro public/robots.txt public/_headers public/favicon.svg public/og-image.jpg
git commit -m "feat: add complete SEO optimization and structured data"
```

---

### Task 16: Final Testing, Documentation, and Deployment

**Files:**
- Modify: `README.md`
- Create: `.env.example` (optional)

**Interfaces:**
- Consumes: Complete site from all previous tasks
- Produces: Production-ready site deployed to Cloudflare Pages

- [ ] **Step 1: Update README.md with complete documentation**

File: `README.md`

Include sections from spec section 9:
- Project description
- Tech stack
- Development commands (install, dev, build, preview)
- Content update guide (which data files to edit)
- Image replacement guide
- Deploy instructions
- Support contact

- [ ] **Step 2: Run production build and fix any errors**

Run: `npm run build`
Expected: Build completes successfully with no errors or warnings

If errors occur, fix them and rebuild until clean

- [ ] **Step 3: Preview production build locally**

Run: `npm run preview`
Expected: Site runs on preview server, all functionality works

- [ ] **Step 4: Run comprehensive functionality test**

Test all items from spec section 7 "Post-Deployment Checklist":

Functionality:
- [ ] All pages load correctly
- [ ] Navigation smooth scrolls
- [ ] Mobile menu toggles
- [ ] Form fields validate
- [ ] WhatsApp link opens correctly
- [ ] Phone link works
- [ ] Email link opens email client
- [ ] Modal gallery opens/closes
- [ ] Carousel navigation works
- [ ] Back to top appears and works

Responsive (test in browser DevTools):
- [ ] Mobile 375px
- [ ] Mobile 414px
- [ ] Tablet 768px
- [ ] Desktop 1280px
- [ ] No horizontal scroll at any size
- [ ] All text readable
- [ ] Images scale properly
- [ ] Buttons min 44x44px on touch devices

- [ ] **Step 5: Run Lighthouse audit**

In Chrome DevTools, run Lighthouse on production build preview

Target scores:
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

If any score below target, review recommendations and fix issues

- [ ] **Step 6: Fix any accessibility issues**

Check:
- All images have alt text
- Form labels properly associated
- Color contrast meets WCAG AA (4.5:1 for normal text)
- Keyboard navigation works (tab through all interactive elements)
- Focus states visible

- [ ] **Step 7: Create .env.example if using form service**

If using Web3Forms or similar:
```
# Web3Forms Access Key
# Get your key at https://web3forms.com
FORM_ACCESS_KEY=your_access_key_here
```

- [ ] **Step 8: Commit final changes**

```bash
git add README.md .env.example
git commit -m "docs: update README and add deployment documentation"
```

- [ ] **Step 9: Push to GitHub and deploy to Cloudflare Pages**

Instructions for user:
1. Create GitHub repository
2. Push code: `git remote add origin <repo-url>` && `git push -u origin main`
3. Go to Cloudflare Pages dashboard
4. "Create a project" → Connect Git repository
5. Build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Root directory: `/`
6. Add environment variables if using form service
7. Deploy

- [ ] **Step 10: Verify deployment works**

After Cloudflare Pages deploys:
- Visit deployed URL
- Test all functionality again on live site
- Submit test form to verify it works
- Check that sitemap is accessible: `site.com/sitemap.xml`
- Verify robots.txt accessible: `site.com/robots.txt`

- [ ] **Step 11: Post-deployment SEO tasks**

Tasks for user (document in README):
1. Submit sitemap to Google Search Console
2. Set up Google Analytics (add GA4 script to Layout.astro if desired)
3. Verify site in Google Search Console
4. Set up Web3Forms account and add real access key
5. Replace all TODO placeholder content with real data
6. Replace all placeholder images with real photos
7. Update contact information with real phone, email, address
8. Add real Google Maps embed to contact section
9. Update domain in astro.config.mjs if using custom domain

- [ ] **Step 12: Final commit**

```bash
git add .
git commit -m "chore: production ready - ready for content updates"
git push origin main
```

---

## Implementation Complete

All tasks completed. The landing page is now:
- ✅ Fully functional with all sections and components
- ✅ Responsive (mobile, tablet, desktop)
- ✅ Interactive (smooth scroll, modals, carousel, animations)
- ✅ SEO-optimized with structured data
- ✅ Deployed to Cloudflare Pages
- ✅ Ready for content updates via centralized data files

**Next Steps for User:**
1. Replace placeholder content with real data (data files in `src/data/`)
2. Replace placeholder images with real photos (`public/images/`)
3. Update contact information
4. Add real Web3Forms access key
5. Submit sitemap to Google Search Console
6. Set up analytics if desired

**Estimated Implementation Time:** 14-19 hours total across all tasks
