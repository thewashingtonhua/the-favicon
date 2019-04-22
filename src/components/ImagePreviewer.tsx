import React, { memo } from 'react'
import './Input.scss'

export interface ImagePreviewerProps {
  className?: string
}

const ImagePreviewer = (props: ImagePreviewerProps) => {
  const {
    className
  } = props

  // 样式相关
  const classNames = [
    'img-previewer',
    className
  ].filter(Boolean)

  return (
    <div className={classNames.join(' ')} />
  )
}

export default memo(ImagePreviewer)
