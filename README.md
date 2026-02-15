# JankaWeb

Minimal notes for running and maintaining the site.

## Requirements

- Node.js + npm (version used by your Angular CLI)

## Development

Start the dev server:

```bash
npm start
```

## Build

Build for production:

```bash
npm run build
```

This runs a small SEO asset generator before the build to keep `robots.txt` and `sitemap.xml` in sync with `environment.seo.baseUrl`.

## SEO assets generator

The script lives in `src/scripts/generate_seo_assets.js`.

- Default: uses `src/environments/environment.prod.ts`
- Dev mode: pass `--env=dev` to use `src/environments/environment.ts`

Manual run examples:

```bash
node src/scripts/generate_seo_assets.js --env=prod
node src/scripts/generate_seo_assets.js --env=dev
```

Note: `src/index.html` contains fallback OG/canonical tags. If you change `environment.seo.baseUrl`, update those tags manually for now (or automate them in the generator later).

## Images pipeline

- Before running `src/scripts/prepare_images.bat`, convert new images to `.webp` by hand, folder by folder with convert_images.bat script (not part of the repository).
- Then run the script (it wraps `prepare_images.ps1`) to regenerate image metadata.

Example:

```bat
src\scripts\prepare_images.bat src\assets\images
```

## Deploy

```bash
ng deploy --base-href=/JankaWeb/
```

Current public URL:

- https://ankhtepot.github.io/JankaWeb/about-me
