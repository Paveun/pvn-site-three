# Repository Guidelines

## Project Structure & Module Organization
- `index.html` defines the layout, loads `main.js`, and anchors the `.webgl` canvas.
- `main.js` orchestrates the Three.js scene and GSAP timelines; break new features into helper modules imported here.
- `style.css` holds global styles; keep selector blocks grouped and reuse existing class names.
- Runtime assets live in `public/` (GLTF bundles under `public/models/<name>/`, utility scripts like `public/randomtext.js`).
- Extend the shared dev shell via `flake.nix` by adding tools to `buildInputs`.

## Build, Test, and Development Commands
- `npm install` syncs dependencies; run after editing `package.json` or `flake.lock`.
- `npm run dev` launches Vite with hot reload at http://localhost:5173.
- `npm run build` emits the production bundle in `dist/`; treat warnings as blockers.
- `npm run preview` serves the built output for a release-ready smoke test.
- `nix develop` opens the curated shell with Node.js, TypeScript tooling, and `npm-check-updates`.

## Coding Style & Naming Conventions
- Stick to 2-space indentation and semicolon-terminated ES modules, matching `main.js`.
- Prefer `const` for stable bindings; keep variable names camelCase, CSS classes kebab-case, filenames lowercase.
- Describe animations declaratively with GSAP timelines and isolate side effects inside small helper functions.
- Mirror folder names in `public/models/` when adding assets so imports stay predictable.

## Testing Guidelines
- Until automated tests exist, always run `npm run build` then `npm run preview` to confirm the scene renders without console errors.
- Capture notable console warnings or performance regressions in PR notes; attach quick GIFs for visual changes.
- When introducing tests (Vitest, Playwright, etc.), store them in `tests/` and name files `<feature>.test.js`.

## Commit & Pull Request Guidelines
- Use short imperative commit subjects, mirroring existing examples like `add ncu` or `update flake.lock`.
- Group related edits per commit; squash dependency bumps or fixups before merging.
- PRs should cover change summary, linked issues, build/test output, and UI evidence when visuals shift.
- Flag asset or environment changes explicitly so reviewers can refresh local data.

## Asset & Configuration Notes
- Preserve third-party attributions as in the `index.html` comment; keep licenses beside models (`public/models/space/license.txt`).
- Store large binaries in `public/models/` and reference via `models/<name>/scene.gltf` so Vite copies them untouched.
- Update branding assets such as `javascript.svg` alongside copy or design tweaks to prevent drift.
