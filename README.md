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

## Tagline Source Toggle
The tagline under the title can be served from the local pun list or fetched from https://icanhazdadjoke.com.
```js
// src/main.js
const USE_REMOTE_TAGLINES = true; // flip to false to use the bundled list
const REMOTE_FORMAT = 'json';     // or 'text' to request plain text
```
When `USE_REMOTE_TAGLINES` is enabled the app issues a fetch request with the matching `Accept` header. If the network call fails, we fall back to the local collection automatically.

## Deployment
The main branch is wired to Cloudflare Pages for automatic deployments. Merges to `main` trigger a new build; check Cloudflare’s dashboard for progress and purge the cache if assets change.
