# Neat Scroll

Minimal smooth scroll independent from browser smooth api with zero dependency.

Usage:
```javascript
const NeatScroll = require('neat-scroll')
const scroll = new NeatScroll(document.getElementById('divToScroll')) // A second parameter can be passed optionally to specify local configs.
scroll.scrollByDelta(200, false) // pass false for non-smooth scroll
scroll.scrollByPos(0) // back to top smoothly
```