import React, { MouseEvent } from 'react'
import './Preset.scss'
import ReactSVG from 'react-svg'

/**
 * @description 预设组件
 */
interface PresetProps {
  /**
   * @description 预设的图标
   */
  icon?: string,
  /**
   * @description 预设的名称
   */
  value?: string,
  /**
   * @description 预设是否被选中
   */
  chosen?: boolean,
  /**
   * @description 点击预设的回调
   */
  onClick?: () => void,
  /**
   * @description 支持额外的样式
   */
  className?: string,
}

/**
 * @description 预设组件
 */
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

  return (
    <div className={classNames} onClick={_onClick}>
      { icon && <ReactSVG src={icon} className='preset__icon' /> }
      <p className='preset__name'>{value}</p>
    </div>
  )
}

export default Preset
