import React, { ReactNode } from 'react'
import './SettingBlock.scss'

interface SettingBlockProps {
  title?: string,
  children: ReactNode
}

/**
 * @description 设置面板，用于容纳设置项
 */
const SettingBlock = (props: SettingBlockProps) => {
  const {
    title = '',
    children
  } = props

  return (
    <div className='setting-block__container'>
      <p className='setting-block__title'>{title}</p>
      <div className='setting-block__content'>
        {children}
      </div>
    </div>
  )
}

export default SettingBlock
