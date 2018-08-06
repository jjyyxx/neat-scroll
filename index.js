class NeatScroll {
  /**
   * 平滑滚动
   * @param {Element} target 目标元素
   * @param {Number} speed 滚动速度
   * @param {Number} smooth 平滑系数
   * @param {Boolean} vertical 方向是否为竖直
   * @param {Function} callback 回调函数
   */
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
      this.scrollLength = 'scrollHeight'
      this.scrollPosition = 'scrollTop'
      this.clientLength = 'clientHeight'
    } else {
      this.scrollLength = 'scrollWidth'
      this.scrollPosition = 'scrollLeft'
      this.clientLength = 'clientWidth'
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

  get smooth() {
    return this._smooth || NeatScroll.config.smooth
  }

  get scrollPosition() {
    return this.target[this.vertical ? 'scrollTop' : 'scrollLeft']
  }

  set scrollPosition(value) {
    this.target[this.vertical ? 'scrollTop' : 'scrollLeft'] = value
  }

  get clientLength() {
    return this.target[this.vertical ? 'clientHeight' : 'clientWidth']
  }

  get scrollLength() {
    return this.target[this.vertical ? 'scrollHeight' : 'scrollWidth']
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
      requestAnimationFrame(this.update)
    }
    this.callback(this.target)
  }

  scrollByDelta(delta, smooth = true) {
    this.scrollByPos(this.pos + delta / 100 * this.speed, smooth)
  }

  scrollByPos(position, smooth = true) {
    this.pos = Math.max(0, Math.min(position, this.scrollLength - this.clientLength + 1)) // limit scrolling
    if (smooth) {
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
