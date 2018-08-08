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

export class NeatScroll {
  /**
   * 全局配置。其中`smooth`默认为`10`，`speed`默认为`100`。
   */
  static config: NeatScrollGlobalConfig

  /**
   * @param target 目标元素
   * @param config 局部配置
   */
  constructor(target: HTMLElement, config?: NeatScrollConfig)

  scrollByDelta(delta: number, smooth = true)
  scrollByPos(position: number, smooth = true)
}

export = NeatScroll
