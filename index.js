class NeatScroll {
  constructor(target, {
    speed = null,
    smooth = null,
    vertical = true,
    callback = () => {}
  } = {}) {
    this.target = target
    this._speed = speed
    this._smooth = smooth
    this.callback = callback
    this.vertical = vertical

    // member name initialization
    if (vertical) {
      this.scrollLengthName = 'scrollHeight'
      this.scrollPositionName = 'scrollTop'
      this.clientLengthName = 'clientHeight'
    } else {
      this.scrollLengthName = 'scrollWidth'
      this.scrollPositionName = 'scrollLeft'
      this.clientLengthName = 'clientWidth'
    }

    // variable initialization
    this.setValues()
    target.addEventListener('scroll', (event) => {
      if (event.target !== target) return
      if (++this.scrollTimes > this.smoothTimes) {
        // external non-smooth scroll invoked
        this.setValues()
      }
    })
  }

  get speed() {
    return this._speed || NeatScroll.config.speed
  }

  set speed(value) {
    this._speed = value
  }

  get smooth() {
    return this._smooth || NeatScroll.config.smooth
  }

  set smooth(value) {
    this._smooth = value
  }

  get scrollPosition() {
    return this.target[this.scrollPositionName]
  }

  set scrollPosition(value) {
    this.target[this.scrollPositionName] = value
  }

  get clientLength() {
    return this.target[this.clientLengthName]
  }

  get scrollLength() {
    return this.target[this.scrollLengthName]
  }

  setValues() {
    this.moving = false
    this.pos = this.scrollPosition
    this.scrollTimes = 0
    this.smoothTimes = 0
    this.lastDelta = 0
  }

  update() {
    this.moving = true
    const decimalDelta = (this.pos - this.scrollPosition) / this.smooth
    const delta = Math.sign(decimalDelta) * Math.ceil(Math.abs(decimalDelta))
    ++this.smoothTimes
    if (Math.abs(decimalDelta) <= 0.1) {
      this.scrollPosition = this.pos
      this.pos = this.scrollPosition
      this.moving = false
    } else {
      this.scrollPosition += delta
      this.lastDelta = decimalDelta
      requestAnimationFrame(()=>this.update())
    }
    this.callback(this.target)
  }

  scrollByDelta(delta, smoothing = true) {
    this.scrollByPos(this.pos + delta / 100 * this.speed, smoothing)
  }

  scrollByPos(position, smoothing = true) {
    this.pos = Math.max(0, Math.min(position, this.scrollLength - this.clientLength + 1)) // limit scrolling
    if (smoothing) {
      if (this.lastDelta * (this.pos - this.scrollPosition) < 0) this.lastDelta = 0
      if (!this.moving) this.update()
    } else {
      this.scrollPosition = this.pos
    }
  }
}

NeatScroll.config = {
  speed: 100,
  smooth: 10,
}

module.exports = NeatScroll
