6x6 gallery - 9A3WHY
=====================

A static photo gallery of square (1:1) frames, published at /gallery/.

- 55 photographs, 1800x1800 px WebP, in images/
- 55 thumbnails for the grid, in images/thumbs/ (the grid loads the thumbnails, the viewer opens the full image)
- category filter chips: All, Water, City, Sky, Landscape, Nature, Detail, Experiment, People, Animals
- viewer with previous/next buttons, arrow keys, Escape to close, and swipe on touch screens
- dark black/grey theme, desktop grid of equal square columns
- no uploads, no cookies, no browser storage, nothing loaded from other sites

Files: index.html (page and frames), gallery.css, gallery.js, favicon.svg.
When gallery.css or gallery.js change, raise the ?v=N number in index.html so browsers fetch the new file.

Try it locally (from the repository root):
  python3 -m http.server 8000
then open http://localhost:8000/gallery/

All photographs are (c) 9A3WHY, all rights reserved. Please ask before using them.
