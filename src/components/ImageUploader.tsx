import React, { useRef, MouseEvent, ChangeEvent, DragEvent, useState } from 'react'
import './Input.scss'
import ReactSVG from 'react-svg'
import iconUpload from '../assets/upload.svg'
import './ImageUploader.scss'

export interface ImageUploader {
  className?: string,
  onChange?: (file: File) => void
}

const ImageUploader = (props: ImageUploader) => {
  const {
    className,
    onChange
  } = props

  const [isHover, setIsHover] = useState(false)

  const input = useRef<HTMLInputElement>(null)

  // 样式相关
  const classNames = [
    'img-uploader__container',
    isHover && 'img-uploader--hover',
    className
  ].filter(Boolean).join(' ')

  function _onClick (e: MouseEvent) {
    e && e.stopPropagation()

    const _input = input.current
    if (_input) {
      _input.click()
    }
  }

  function getFile () {
    const _input = input.current
    if (_input && _input.files && _input.files.length) {
      const file = _input.files[0]
      onChange && onChange(file)
    }
  }

  function _onChange (e: ChangeEvent) {
    getFile()
  }

  function _onDragOver (e: DragEvent) {
    e && e.stopPropagation()
    e && e.preventDefault()

    setIsHover(true)
  }

  function _onDragLeave (e: DragEvent) {
    e && e.stopPropagation()
    e && e.preventDefault()

    setIsHover(false)
  }

  function _onDrop (e: DragEvent) {
    getFile()
  }

  return (
    <div
      className={classNames}
      onClick={_onClick}
      onDragOver={_onDragOver}
      onDragLeave={_onDragLeave}
      onDrop={_onDrop}
    >
      <ReactSVG src={iconUpload} className='img-uploader__icon' />
      <p className='img-uploader__text'>点击图标，或拖动文件到这里</p>
      <input type='file' name='file' ref={input} accept='jpg,png' onChange={_onChange} />
    </div>
  )
}

export default ImageUploader
