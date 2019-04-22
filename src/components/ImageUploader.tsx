import React, { memo } from 'react'
import './Input.scss'

export interface ImageUploader {
  className?: string
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
      <label htmlFor='input-file'>上传文件</label>
      <input type='file' name='file' id='input-file'/>
    </div>
  )
}

export default memo(ImageUploader)
