type VerticalKeys = 'scrollTop' | 'scrollHeight' | 'clientHeight'
type HorizontalKeys = 'scrollLeft' | 'scrollWidth' | 'clientWidth'

type ElementLike = (Pick<Element, VerticalKeys> | Pick<Element, HorizontalKeys>) & {
  addEventListener(type: 'scroll', listener: (ev: Event) => any): void
}

interface NeatScrollGlobalConfig {
  /** 滚动速度 */
  speed: number
  /** 平滑系数 */
  smooth: number
}

interface NeatScrollLocalConfig {
  /** 方向是否为竖直 */
  vertical: boolean
  /** 回调函数 */
  callback: (target: HTMLElement) => void
}

type NeatScrollConfig = Partial<NeatScrollGlobalConfig & NeatScrollLocalConfig>

declare class NeatScroll {
  /**
   * 全局配置。其中`smooth`默认为`10`，`speed`默认为`100`。
   */
  static config: NeatScrollGlobalConfig

  /**
   * @param target 目标元素，或者符合接口的自定义对象
   * @param config 局部配置
   */
  constructor(target: ElementLike, config?: NeatScrollConfig)

  scrollByDelta(delta: number, smoothing: boolean)
  scrollByPos(position: number, smoothing: boolean)
}

export = NeatScroll
