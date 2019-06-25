import { useEffect } from 'react'

function fix () {
  document.body.style.height = window.innerHeight + 'px'
}

/**
 * @description 修复 100vh 在部分设备中超出实际可见区域的问题
 */
export default function useFixedViewport () {
  useEffect(() => {
    fix()
    window.addEventListener('resize', fix)

    return () => {
      window.removeEventListener('resize', fix)
    }
  }, [])
}
