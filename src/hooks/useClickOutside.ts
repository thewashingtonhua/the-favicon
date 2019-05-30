import { useRef, useEffect, useCallback } from 'react'

interface onClickOutside {
  (e: MouseEvent|TouchEvent): void
}

export default function useClickOutside (container: any, onClickOutside: onClickOutside) {
  const isTouch = useRef(false)

  const handle = useCallback((e: MouseEvent|TouchEvent): void => {
    if (e.type === 'touchend') isTouch.current = true
    if (e.type === 'click' && isTouch.current) return
    const _container = (container && container.current) || container
    if (_container && !_container.contains(e.target)) {
      onClickOutside(e)
    }
  }, [container, onClickOutside])

  useEffect(() => {
    console.log('effect run')
    document.addEventListener('touchend', handle, true)
    document.addEventListener('click', handle, true)

    return () => {
      document.removeEventListener('touchend', handle, true)
      document.removeEventListener('click', handle, true)
    }
  }, [container, handle])
}
