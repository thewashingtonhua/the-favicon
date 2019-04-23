import React, { memo } from 'react'
import './Input.scss'

export interface ImageUploader {
  className?: string,
  onChange?: (file: File) => void
}

const ImageUploader = (props: ImageUploader) => {
  const {
    className
  } = props

  // 样式相关
  const classNames = [
    'img-uploader',
    className
  ].filter(Boolean)

  return (
    <div className={classNames.join(' ')}>
      <label htmlFor='input-file'>上传图片</label>
      <input type='file' name='file' id='input-file' accept='jpg,png' />
    </div>
  )
}

export default memo(ImageUploader)
