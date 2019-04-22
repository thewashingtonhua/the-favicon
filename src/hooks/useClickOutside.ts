import { useRef, useEffect } from 'react'

interface onClickOutside {
  (e: MouseEvent|TouchEvent): void
}

export default function useClickOutside (container: any, onClickOutside: onClickOutside) {
  const isTouch = useRef(false)

  function handle (e: MouseEvent|TouchEvent): void {
    if (e.type === 'touchend') isTouch.current = true
    if (e.type === 'click' && isTouch.current) return
    const _container = (container && container.current) || container
    if (_container && !_container.contains(e.target)) {
      onClickOutside(e)
    }
  }

  useEffect(() => {
    document.addEventListener('touchend', handle, true)
    document.addEventListener('click', handle, true)

    return () => {
      document.removeEventListener('touchend', handle, true)
      document.removeEventListener('click', handle, true)
    }
  }, [container])
}
