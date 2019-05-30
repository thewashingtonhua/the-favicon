import React, { ReactNode } from 'react'
import './PresetList.scss'

interface PresetListProps {
  title?: string,
  children: ReactNode
}

const PresetList = (props: PresetListProps) => {
  const {
    title = '',
    children
  } = props

  return (
    <div className='preset-list__container'>
      <p className='preset-list__title'>{title}</p>
      <div className='preset-list__content'>
        {children}
      </div>
    </div>
  )
}

export default PresetList
