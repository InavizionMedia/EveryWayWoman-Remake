# EveryWayWoman-Remake — Build Brief V1

**Source:** https://everywaywoman.com/ (live WordPress site, fetched 2026-10-06)
**Design north star:** AVIO luxury car rental concept (screenshot 2026-10-06) — cinematic, editorial, warm.
**Working line:** `everywaywoman-v1` · **Live:** main via GitHub Pages
**Rule:** keep EWW its own unique thing — not a clone of YolandoMitchellBrown-Remake (ivory/navy/red) and not a clone of AVIO (forest/dark). Same cinematic *grammar*, own *voice*.

## Content inventory (from the live site)
- **Nav:** Home · Open Dialogue · Every Way Woman · Full Shows
- **Themes:** "Different Women / Different Stories / Great Conversations" · "Created For Women / By Women" · "Open Dialogue"
- **Title tag:** "Every Way Woman Talk Show | Your Destination for Daytime TV: News, Talk, Entertainment, and More!"
- **YouTube:** @everywaywoman · featured video `WuWBiNvv050`
- **Real episode titles (use these, not lorem):** "I Want A Career That I Care About" · "My EX Controlled My Thoughts" · "I Miss Being A Stay At Home Mom" · "Does The Man Rule The House" · "My Fear To Leave and Move On" · "Fake Social Media Lives" · "Young Girls Making Risky Choices" · "I'm Ready To Get Married" · "Dating Was Confusing To Me" · "Thank Goodness You Dumped His Ass"

## Design harvest — AVIO patterns mapped to EWW
1. **Cinematic full-bleed hero.** Full-viewport photographic hero (studio/stage still, warm light). Huge high-contrast serif headline bottom-left, e.g. "REAL TALK. / EVERY WAY." Small pill badge top-left ("New episodes weekly"). Floating glass info card top-right: "Featured this week — 01 of 10" + episode title + topic pills + Watch button. *Pattern-library pull: real glass refraction (SVG feTurbulence/feDisplacementMap) over plain backdrop-blur.*
2. **Action-bar strip.** White rounded bar overlapping the hero's bottom edge with segmented fields + red CTA — AVIO's booking bar translated: Watch latest · Browse episodes · Topics · Newsletter + "Start watching" button.
3. **Editorial story section.** Asymmetric 3-column grid: text card ("A talk show, not a lecture." + Yolando's story + label/value spec table: On air since / Episodes / Topics / Host) · tall studio image · stacked images + dark quote card (Yolando pull-quote + pill CTA).
4. **Episode library + filter pills.** "The episodes" — serif title, count line ("10+ conversations and counting"), pill filters (All · Relationships · Career · Family · Self-Worth), 3-up cards with thumbnails + the real episode titles above.
5. **Typography.** Big serif display (high-contrast, like the AVIO headline), small-caps kickers, pill badges everywhere, generous whitespace.
6. **Palette (proposed, not locked).** Warm cinematic: ivory + deep cocoa/berry + gold. Distinct from the personal site's navy/red and AVIO's forest/black. Jon/Yolando to lock.

## Build rules (standing)
- 390px mobile-first; lean HTML, images as separate files (iMessage-preview discipline).
- Scroll-spy nav, animated mobile menu, video lightbox w/ click-to-load facade, back-to-top — same interaction grammar as YolandoMitchellBrown-Remake.
- Reduced-motion respected everywhere. No console errors.
- Screenshot refresh rule: README hero/gallery + og-image retaken on every image change.
- Cache-busting `?v=` stamps on assets via the ymb-push.py pattern.
