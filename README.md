# EveryWayWoman-Remake

> Cinematic remake of [everywaywoman.com](https://everywaywoman.com/) — Yolando Mitchell Brown's Every Way Woman talk show site. Same cinematic grammar as the AVIO concept, its own unique voice.

**Branch policy:** work happens on the latest *-vN / project branch. List branches before editing. Never assume the GitHub default is the working line. Working line: `everywaywoman-v1` (GitHub default is `main`).

[![Preview](https://img.shields.io/badge/Preview-Live-brightgreen)](https://inavizionmedia.github.io/EveryWayWoman-Remake/)
[![Pages](https://img.shields.io/badge/GitHub_Pages-deployed-blue)](https://inavizionmedia.github.io/EveryWayWoman-Remake/)
[![Last commit](https://img.shields.io/github/last-commit/InavizionMedia/EveryWayWoman-Remake)](https://github.com/InavizionMedia/EveryWayWoman-Remake/commits/main)
[![Repo size](https://img.shields.io/github/repo-size/InavizionMedia/EveryWayWoman-Remake)](https://github.com/InavizionMedia/EveryWayWoman-Remake)
[![Static site](https://img.shields.io/badge/site-static-lightgrey)](https://inavizionmedia.github.io/EveryWayWoman-Remake/)

**Live preview:** https://inavizionmedia.github.io/EveryWayWoman-Remake/

## Screenshots

*Build screenshots land here on the first build pass.*

## What's inside

- `index.html` — the remake (single-file + separate image assets)
- `docs/REMAKE-BRIEF-V1.md` — design brief: AVIO pattern harvest mapped to EWW, content inventory from the live site

## Design language

Cinematic editorial: full-bleed photographic hero with oversized serif headline, floating glass "featured episode" card, action-bar strip overlapping the hero, asymmetric story grid, episode library with filter pills. Warm ivory + deep cocoa/berry + gold (proposed — Jon/Yolando to lock). Distinct from YolandoMitchellBrown-Remake's ivory/navy/red.

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
- `everywaywoman-v1` — active working line; frozen as restore point when v2 cuts
