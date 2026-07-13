---
name: verify
description: Verify the static portfolio site renders correctly using headless Chrome screenshots
---

# Verifying this site

Static site, no build step. Surface = browser rendering of `index.html`.

## Screenshot recipe (headless Chrome, no Playwright needed)

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu \
  --hide-scrollbars --virtual-time-budget=10000 --window-size=1280,1100 \
  --screenshot=OUT.png "file:///C:/Users/helpdesk/Desktop/portfolio/index.html"
```

## Gotchas learned the hard way

- **Headless clamps window width to 500px minimum.** A `--window-size=375,...` capture renders a 500px viewport cropped to 375 — content looks shifted/cut off and the hamburger (top-right) falls outside the crop. Use 500 wide for "mobile"; the ≤720px media query still applies.
- **Anchor-hash URLs (`#contact`) + `scroll-behavior: smooth` produce blank/mid-scroll captures** under `--virtual-time-budget`. Don't screenshot hash URLs. Instead copy the site to the scratchpad, append `#hero{min-height:900px !important}` to the CSS copy, and take one tall full-page shot (`--window-size=1280,4600`).
- **To test the mobile menu open state:** sed-inject `<script>window.addEventListener("load",()=>document.getElementById("navToggle").click())</script>` before `</body>` in the scratch copy, screenshot at 500x900.
- **To confirm JS ran:** `--dump-dom` and grep for `navbar scrolled` / `reveal visible`.

## What to check

Hero (avatar ring, buttons), 10 project cards with images, About chips, 4 contact cards, footer icons, hamburger open/close, scroll-spy underline on nav links.
