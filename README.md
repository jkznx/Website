# Jukrachai Plongmai - Resume Website

A responsive, static Next.js resume site for Jukrachai Plongmai, focused on systems engineering, network infrastructure, cybersecurity, and university projects.

## Run locally

```bash
npm install
npm run dev
```

## Documents

The website provides downloadable copies of the résumé and academic transcript from the hero and proof sections. Replace the source files in `public/` only when you have an updated document ready to publish:

- `public/Jukrachai_Plongmai_Resume.pdf`
- `public/Jukrachai_Plongmai_Transcript.pdf`

Open [http://localhost:3000](http://localhost:3000).

## Explore the site

- On first load, a black-cat 3D preloader plays for 2.6 seconds. Choose **Skip intro** to enter immediately; it is automatically skipped when the visitor prefers reduced motion.
- Use **Experience** to scan professional and leadership history.
- Use the **Projects** navigation link for the animated project gallery.
- Open a project card to visit its public GitHub source. The **View all repositories** link opens the complete GitHub profile.
- Use **Download résumé** in the hero, or the **Full résumé** link later on the page, to save the included PDF.

## Project links

The site currently presents these projects:

- TGAT / TPAT Course Website - online admissions-preparation course site
- CoE Lotto - Kubernetes-deployed cloud lottery web application
- Pick and Pay - cashierless minimart embedded-systems prototype
- URL Malware Predictive Classification - malicious-URL classification model
- Network Infrastructure - enterprise network with Wazuh and Suricata
- TOEIC Flashcard Python App - B1-C2 vocabulary practice tool
- AI Ecosystem Workspace - time-series and non-time-series model workspace

The TOEIC project currently uses the profile link as a safe fallback; update its URL in `app/page.tsx` once its dedicated repository is public.

## Quality checks

```bash
npm run lint
npm run build
npm audit --omit=dev
```

The site has no environment variables, database, analytics, forms, or third-party media. Security response headers are defined in `next.config.ts`; external profile links use `rel="noreferrer"`.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Leave the framework as **Next.js** and build command as `next build`.
4. Deploy - no environment variables are needed.

Vercel will serve the site as a static, pre-rendered route.
