import React, { MouseEvent } from 'react'
import './Preset.scss'
import ReactSVG from 'react-svg'

interface PresetProps {
  icon?: string,
  value?: string,
  chosen?: boolean,
  onClick?: () => void,
  className?: string,
}

const Preset = (props: PresetProps) => {
  const {
    icon,
    value = '',
    chosen = false,
    onClick,
    className = ''
  } = props

  const classNames = [
    'preset',
    value && `preset--${value.toLowerCase()}`,
    chosen && `preset--chosen`,
    className
  ].filter(Boolean).join(' ')

  function _onClick (e: MouseEvent) {
    e && e.stopPropagation()
    typeof onClick === 'function' && onClick()
  }

  const isSVG = true

  return (
    <div className={classNames} onClick={_onClick}>
      { icon && (isSVG
        ? <ReactSVG src={icon} className='preset__icon' />
        : <img className='preset__icon' src={icon} alt={value} />
      )}
      <p className='preset__name'>{value}</p>
    </div>
  )
}

export default Preset
