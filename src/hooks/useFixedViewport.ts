import { useEffect } from 'react'

/**
 * @description 修复 100vh 超出实际可见区域的问题
 */
export default function useFixedViewport () {
  useEffect(() => {
    function fix () {
      // const elem = document.querySelector('#app-root') as HTMLElement || document.body
      const elem = document.body
      elem.style.height = window.innerHeight + 'px'
    }

    window.addEventListener('resize', fix)
    fix()

    return () => {
      window.removeEventListener('resize', fix)
    }
  }, [])
}
