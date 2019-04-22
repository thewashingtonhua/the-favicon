import { useEffect, useRef } from 'react'

export default function useInterval (callback: VoidFunction, delay: number|null = null) {
  const savedCallback = useRef(() => {})

  // Remember the latest callback.
  useEffect(
    () => {
      savedCallback.current = callback
    },
    [callback]
  )

  // Set up the interval.
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
