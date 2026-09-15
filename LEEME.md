# Funnel Webinar — Hernán Elejalde Amin (Astro)

Versión lista para **GitHub + Vercel**. Dominio en **Namecheap** (solo DNS → Vercel).

## Desarrollo local

```bash
cp .env.example .env   # opcional: rellena lo que ya tengas
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Rutas

| URL | Página |
|-----|--------|
| `/` | Captura |
| `/gracias/` | Confirmación + WhatsApp |
| `/webinar/` | Clase en vivo |
| `/webinar/?mode=replay` | Repetición |
| `/captura/` | Redirect → `/` |

## Configuración

1. Copia `.env.example` → `.env` (local) o variables en Vercel.
2. Ver `src/config/site.ts` (lee `PUBLIC_*`).
3. No subir `.env` al repositorio.

## Deployment (Vercel)

1. Sube el repo a GitHub.
2. Importa el proyecto en Vercel (framework Astro; `vercel.json` ya está).
3. Define `PUBLIC_SITE_URL` = `https://tu-dominio.com` (y el resto de `PUBLIC_*`).
4. En Namecheap, apunta el dominio a Vercel (DNS que indique Vercel). No uses GoDaddy como hosting.

Detalle de variables: `.env.example`.
