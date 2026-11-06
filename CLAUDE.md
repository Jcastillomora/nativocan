# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Nativocan** is a static landing page for a dog training center and canine hotel. Built with Astro 4.x, Tailwind CSS, and vanilla JavaScript, it's optimized for SEO, fully responsive, and deployed on Cloudflare Pages.

The architecture follows a **data-driven approach** where all content is centralized in `/src/data/*.js` files, making it easy for non-technical users to update content without touching component code.

## Common Development Commands

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Note:** The sitemap integration is temporarily disabled in `astro.config.mjs` due to a build error. Re-enable when resolved.

## Architecture & Structure

### Content Management System (Data-Driven)

All editable content lives in `/src/data/` as JavaScript exports:

- **`site.js`** - Business info, contact details, social media, SEO metadata
- **`services.js`** - Training service offerings
- **`hotel.js`** - Hotel features and gallery placeholders
- **`team.js`** - Team member profiles
- **`testimonials.js`** - Customer reviews with structured data
- **`pricing.js`** - Pricing plans and packages
- **`faqs.js`** - FAQ section for SEO

**Important:** When updating content, ALWAYS edit these data files rather than hardcoding values in components.

### Component Architecture

Components are in `/src/components/` and are designed to be **presentational only** - they receive all data via props from `index.astro`.

Key components:
- **`ContactForm.astro`** - Web3Forms integration (requires access key replacement)
- **`SocialFeed.astro`** - Instagram/TikTok embeds with tabbed interface
- **`Modal.astro`**, **`ServiceCard.astro`**, **`TestimonialCard.astro`** - Reusable UI components

### JavaScript Modules

Client-side scripts in `/src/scripts/`:
- **`main.js`** - Navigation, smooth scrolling
- **`modal.js`** - Modal functionality
- **`carousel.js`** - Testimonials carousel
- **`scroll-reveal.js`** - Scroll animations

All scripts are imported in `Layout.astro` and run on every page.

### Styling System

**Tailwind CSS** with custom theme in `tailwind.config.mjs`:
- Primary color: `#F89A3E` (orange)
- Secondary color: `#3E5C9A` (blue)
- Accent color: `#3DB57A` (green)

Global styles in `/src/styles/global.css` are minimal - Tailwind utility classes are preferred.

### SEO & Structured Data

`index.astro` generates JSON-LD structured data for:
- LocalBusiness schema
- FAQPage schema
- Review schemas (one per testimonial)

Metadata is managed in `Layout.astro` with Open Graph and Twitter cards. All TODO placeholders in geo tags and structured data must be replaced before production.

## Key Implementation Details

### Social Media Embeds

**Instagram:** Uses official Instagram embed API. To add/update posts:
1. Open Instagram post in browser (not mobile app)
2. Click "..." → "Embed"
3. Copy embed code
4. Replace EXAMPLE posts in `SocialFeed.astro` lines 88-118
5. Rebuild

**TikTok:** Uses creator feed embed. Already configured for @nativocan.cl. No API key required.

### Form Integration

Contact form uses **Web3Forms** (free service). Current placeholder: `YOUR_ACCESS_KEY` at `ContactForm.astro:13`.

**To activate:**
1. Register at web3forms.com
2. Replace access key in `ContactForm.astro`
3. Form submissions will be emailed automatically

### Deployment

Configured for **Cloudflare Pages**:
- Build command: `npm run build`
- Output directory: `dist`
- Site URL: `https://nativocan.pages.dev` (set in `astro.config.mjs`)

Headers are configured in `public/_headers` for optimal caching.

## Production Readiness Checklist

Before going live, these TODO items must be addressed:

1. **`src/data/site.js`** - Replace ALL TODO placeholders:
   - Phone number, email, address
   - Business hours
   - GPS coordinates
   - City/region names in SEO fields

2. **`src/layouts/Layout.astro`** - Update geo tags (lines 24-25):
   - `geo.region` (currently `CL-TODO`)
   - `geo.placename` (currently `TODO_CIUDAD`)

3. **`src/pages/index.astro`** - Update structured data (lines 37-40):
   - `addressLocality`, `addressRegion`, `postalCode`

4. **`src/components/ContactForm.astro`** - Replace Web3Forms access key (line 13)

5. **Social embeds** - Replace Instagram EXAMPLE posts (3 remaining) in `SocialFeed.astro`

6. **Images** - Replace all placeholder images in `/public/images/`

7. **Google Maps** - Add iframe embed at `index.astro:385-390`

## Development Workflow

When implementing new features:

1. **Content changes:** Edit data files in `/src/data/`
2. **Visual changes:** Use Tailwind utilities in components
3. **New components:** Follow existing patterns - keep them presentational
4. **New features:** Add JavaScript modules to `/src/scripts/`

Always run `npm run dev` to test changes locally before building.

## Important Notes

- **No test suite** - Manual testing required
- **No linting configured** - Follow existing code style
- **Git workflow** - Currently on `master` branch (no main branch detected)
- **Spanish content** - All user-facing text is in Spanish (`lang="es"`)
- **No backend** - Fully static site, no server-side processing

## Performance Targets

Target Lighthouse scores: 95+ across all metrics (Performance, Accessibility, Best Practices, SEO).

Keep bundle size minimal - avoid adding heavy dependencies.
