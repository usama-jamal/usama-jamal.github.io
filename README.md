# usama-jamal.github.io

Personal academic website of **Usama Jamal**, served by GitHub Pages at
**https://usama-jamal.github.io**.

Plain HTML/CSS/JS — no build step. Any change pushed to `main` goes live
automatically within a minute or two.

## How to update things

### Replace a paper or the CV with a newer version
Overwrite the PDF file (keep the same filename), then commit and push:

| File | What it is |
|---|---|
| `files/CV.pdf` | Curriculum vitae |
| `papers/jmp.pdf` | Job market paper |
| `papers/uganda-anti-avoidance.pdf` | Uganda anti-avoidance paper |
| `papers/pakistan-vat.pdf` | Pakistan VAT threshold paper |
| `papers/gcc-swf.pdf` | GCC SWF paper |

```
git add -A
git commit -m "Update paper"
git push
```

### Add a paper / presentation / course
All content lives in `index.html`, organized into commented sections
(`<!-- ===== RESEARCH ===== -->` etc.). To add an entry, copy an existing
block and edit the text:

- **Paper**: copy a whole `<article class="paper-card">...</article>` block.
- **Presentation**: copy a `<li class="timeline-item">...</li>` line
  (add a new `<div class="timeline-year">` + `<ul class="timeline-list">` for a new year).
- **Course**: copy a `<li>` inside the relevant `teach-list`.

### Change colors / fonts
Edit the CSS variables at the top of `css/style.css` (`:root` for light
mode, `[data-theme="dark"]` for dark mode).

## Layout

```
index.html      all page content
css/style.css   design (light/dark themes via CSS variables)
js/main.js      interactions (scrollspy, animations, accordions, theme toggle)
assets/         headshot, favicon
papers/         self-hosted paper PDFs
files/          CV
404.html        not-found page
```
