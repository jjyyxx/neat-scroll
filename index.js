const EventEmitter = require('events')

class NeatScroll extends EventEmitter {
  /**
   * 平滑滚动
   * @param {Element} target 目标元素
   * @param {Number} speed 滚动速度
   * @param {Number} smooth 平滑系数
   * @param {Boolean} vertical 方向是否为竖直
   */
  constructor(target, {
    speed = null,
    smooth = null,
    vertical = true,
  } = {}) {

    super()
    this.target = target
    this._speed = speed
    this._smooth = smooth
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
      if (++ this.scrollTimes > this.smoothTimes) {
        // external non-smooth scroll invoked
        this.setValues()
      }
    })

    this.emitEvent('create')
  }

  get speed() {
    return typeof this._speed === 'number' && this._speed > 0 
      ? this._speed
      : NeatScroll.config.speed
  }

  set speed(value) {
    this._speed = value
  }

  get smooth() {
    return typeof this._smooth === 'number' && this._smooth > 0 
      ? this._smooth
      : NeatScroll.config.smooth
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

  emitEvent(eventName) {
    this.emit(eventName, {
      target: this.target,
      clientLength: this.clientLength,
      scrollLength: this.scrollLength,
      scrollPosition: this.scrollPosition,
    })
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
      this.emitEvent('update')
      this.emitEvent('scroll-end')
    } else {
      this.scrollPosition += delta
      this.lastDelta = decimalDelta
      this.emitEvent('update')
      requestAnimationFrame(() => this.update())
    }
  }

  scrollByDelta(delta, smoothing = true) {
    this.scrollByPos(this.pos + delta / 100 * this.speed, smoothing)
  }

  scrollByPos(position, smoothing = true) {
    this.emitEvent('scroll-start')
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
