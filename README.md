# Neat Scroll

Minimal smooth scroll independent from browser smooth api with zero dependency.

Usage:
```js
const NeatScroll = require('neat-scroll')

const scroll = new NeatScroll(document.getElementById('divToScroll'))
// A second parameter can be passed optionally to specify local configs.

scroll.scrollByDelta(200, false) // pass false for non-smooth scroll
scroll.scrollByPos(0) // back to top smoothly
```

## API

### NeatScroll.config

Global configurations for NeatScroll. When local configuration is absent, a global one will be used.

- config.speed: scroll speed (default value is `100`).
- config.smooth: smoothing parameter (default value is `10`).

### new NeatScroll(target: Element, config: Object)

Generates a NeatScroll instance.

- config.speed: scroll speed.
- config.smooth: smoothing parameter.
- config.vertical: whether to scroll vertically (default value is `true`).

### neatScroll.scrollByPos(position: number, smoothing: boolean)

- position: the destination position of target.
- smoothing: whether a smooth scroll is used.

### neatScroll.scrollByDelta(delta: number, smoothing: boolean)

- delta: the delta position of target.
- smoothing: whether a smooth scroll is used.

### events

- create: emit after a NeatScroll instance is created
- update: emit when the scroll position is updated
- scroll-start: emit when a scroll behavior is started
- scroll-end: emit when a scroll behavior is finished

