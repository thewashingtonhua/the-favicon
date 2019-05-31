import React, { useState, useRef, MouseEvent, DragEvent, useContext } from 'react'
import ReactSVG from 'react-svg'
import { FileContext } from '../context'
import iconUpload from '../assets/upload.svg'
import './ImageUploader.scss'
import { Button } from './'

const ImageUploader = () => {
  const { file, setFile, resetFile } = useContext(FileContext)

  const [isHover, setIsHover] = useState(false)

  const input = useRef<HTMLInputElement>(null)

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
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = function () {
        setFile(this.result as string)
      }
    }
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

  function _onDrop () {
    getFile()
  }

  function _onChange () {
    getFile()
  }

  function reset (e: MouseEvent) {
    e && e.stopPropagation()
    resetFile()
  }

  // 样式相关
  const uploaderClassNames = [
    'img-uploader__container',
    isHover && 'img-uploader--hover'
  ].filter(Boolean).join(' ')

  const previewerClassNames = [
    'img-previewer__container'
  ].filter(Boolean).join(' ')

  return file
    ? (
      <div className={previewerClassNames}>
        <div className='img-wrapper'>
          <img src={file} alt='' />
        </div>
        <Button onClick={reset}>重新上传</Button>
      </div>
    )
    : (
      <div
        className={uploaderClassNames}
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
