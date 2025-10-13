# pvn-site-three

Minimal landing page powered by Vite, Three.js, and GSAP. Use this README for quick setup, verification, and deployment context when returning to the project after a break.

## Prerequisites
- Node.js 20+ (provided automatically via `nix develop` if you use the flake).
- npm (bundled with Node). Run `npm install` once per machine or when dependencies change.

## Local Development
```bash
npm install
npm run dev
```
This starts the Vite dev server at http://localhost:5173 with hot module reload. Keep the terminal open while you iterate on `main.js`, `style.css`, or assets under `public/`.

## Build & Preview
```bash
npm run build
npm run preview
```
`npm run build` outputs the optimized bundle to `dist/`. `npm run preview` serves the built files locally—use this workflow before merging to ensure there are no console errors or missing assets.

## Optional: Nix Shell
```bash
nix develop
```
Drops you into the shared dev shell defined in `flake.nix`, preloading Node.js, TypeScript tooling, and `npm-check-updates` so all contributors share the same toolchain.

## Testing Notes
No automated tests are in place yet. Manually verify the loading animation, model interaction, and navigation links after each change. Record any console warnings in your PR description for future follow-up.

## Deployment
The main branch is wired to Cloudflare Pages for automatic deployments. Merges to `main` trigger a new build; check Cloudflare’s dashboard for progress and purge the cache if assets change.
