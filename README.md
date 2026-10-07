# EveryWayWoman-Remake

> Cinematic remake of [everywaywoman.com](https://everywaywoman.com/) — Yolando Mitchell Brown's Every Way Woman talk show site. Same cinematic grammar as the AVIO concept, its own unique voice.

**Branch policy:** work happens on the latest *-vN / project branch. List branches before editing. Never assume the GitHub default is the working line. Working line: `everywaywoman-v6` (GitHub default is `main`).

[![Preview](https://img.shields.io/badge/Preview-Live-brightgreen)](https://inavizionmedia.github.io/EveryWayWoman-Remake/)
[![Pages](https://img.shields.io/badge/GitHub_Pages-deployed-blue)](https://inavizionmedia.github.io/EveryWayWoman-Remake/)
[![Last commit](https://img.shields.io/github/last-commit/InavizionMedia/EveryWayWoman-Remake)](https://github.com/InavizionMedia/EveryWayWoman-Remake/commits/main)
[![Repo size](https://img.shields.io/github/repo-size/InavizionMedia/EveryWayWoman-Remake)](https://github.com/InavizionMedia/EveryWayWoman-Remake)
[![Static site](https://img.shields.io/badge/site-static-lightgrey)](https://inavizionmedia.github.io/EveryWayWoman-Remake/)

**Live preview:** https://inavizionmedia.github.io/EveryWayWoman-Remake/

## Screenshots

![Hero — cinematic full-bleed studio with glass featured-episode card](media/hero.jpg?v=20261007a)
*Cinematic hero: oversized serif headline, floating glass featured-episode card, action bar overlapping the seam.*

![Episode library with topic filters](media/screenshot-episodes.jpg?v=20261007a)
*Episode library: real episode titles, topic filter pills, warm editorial cards.*

![Mobile — 390px](media/screenshot-mobile.jpg?v=20261007a)
*390px mobile: stacked hero, wrapped action bar, single-column episode cards.*

![Dark theme — espresso register](media/hero-dark.jpg?v=20261007a)
*Espresso dark theme: same layout, inverted register, persisted header toggle.*

## What's inside

- `index.html` — the remake (single-file + separate image assets)
- `docs/REMAKE-BRIEF-V1.md` — design brief: AVIO pattern harvest mapped to EWW, content inventory from the live site

## Design language

Cinematic editorial: full-bleed photographic hero with oversized serif headline, floating glass "featured episode" card, action-bar strip overlapping the hero, asymmetric story grid, episode library with filter pills. Warm ivory + deep cocoa/berry + gold. Espresso dark theme (not black) via a persisted header toggle — same layout, inverted register. Distinct from YolandoMitchellBrown-Remake's ivory/navy/red.

## Tech stack

| Layer | Choice |
|---|---|
| Markup | Single HTML file, semantic sections |
| Styling | Hand-written CSS, no framework |
| Images | Separate files (never base64 — link-preview discipline) |
| Hosting | GitHub Pages (static) |

## Project tree

```
EveryWayWoman-Remake/
├── index.html
├── style.css
├── script.js
├── assets/            # images, one file each
├── media/             # README screenshots
└── docs/
    └── REMAKE-BRIEF-V1.md
```

## Branches — not overwrites

- `main` — landing ground, deploys to Pages
- `everywaywoman-v6` — active working line (dark theme live)
- `everywaywoman-v5` — frozen restore point (pre-dark)
- `everywaywoman-v4` … `everywaywoman-v1` — frozen restore points
