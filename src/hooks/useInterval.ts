import { useEffect, useRef } from 'react'

/**
 * @description Hooks 版的 setInterval，传入有效的 delay 以启动计时器，修改 delay 以更新计时器，设置 delay 为 null 以停止计时器
 * @param callback 回调函数，同 setInterval 的第一个参数
 * @param delay 时间间隔，类似 setInterval 的第二个参数
 */
export default function useInterval (callback: VoidFunction, delay: number|null = null) {
  const savedCallback = useRef(() => {})

  // 保留上一次的 callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // 设置计时器
  useEffect(() => {
    function tick () {
      typeof savedCallback.current === 'function' && savedCallback.current()
    }
    /**
     * 传入有效的 delay 以启动计时器
     * 修改 delay 会重新初始化计时器
     * 设置 delay 为 null 以停止计时器
     */
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
