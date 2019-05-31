import React, { useContext } from 'react'
import { Button } from 'components'
import './Exporter.scss'
import { PresetContext, FileContext } from 'context'
import { ImagePresetProps, ExportItem } from 'utils/interfaces'
import JSZip from 'jszip'
import FileSaver from 'file-saver'

function generateImage (dataURL: string, options: ImagePresetProps): ExportItem | undefined {
  const body = document.querySelector('body')
  if (!body) return undefined

  const canvas = document.createElement('canvas')
  canvas.width = options.width
  canvas.height = options.height
  // body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  const img = new Image()
  img.src = dataURL
  if (!ctx) return undefined

  ctx.drawImage(img, 0, 0)

  const output = {
    filename: options.filename,
    mime: options.mime,
    data: canvas.toDataURL(options.mime)
  }

  return output
}

function download (items: ExportItem[]) {
  if (!items.length) return

  const zip = new JSZip()
  for (const item of items) {
    if (item.mime.startsWith('image')) {
      zip.file(item.filename, item.data)
    } else {
      zip.file(item.filename, item.data)
    }
  }

  zip.generateAsync({ type: 'blob' }).then(content => {
    FileSaver.saveAs(content, 'favicon.zip')
  })
}

const Exporter = () => {
  const { presets, getSelectPresets, getSelectPresetItems } = useContext(PresetContext)
  const { file } = useContext(FileContext)

  const selectedPresets = getSelectPresets(presets)
  const selectedPresetItems = getSelectPresetItems(presets)

  function _export (presetItems: ImagePresetProps[]): void {
    if (!file) {
      window.alert('请先选择文件')
      return
    }

    const filesToDownload: ExportItem[] = []

    presetItems.forEach(presetItem => {
      if (presetItem.mime.startsWith('image')) {
        const img = generateImage(file, presetItem)
        if (img) {
          filesToDownload.push(img)
        }
      }
    })

    if (selectedPresets.find(n => n.name === 'Android')) {
      // Generate manifest.json
    }

    if (selectedPresets.find(n => n.name === 'Windows')) {
      // Generate browserConfig.xml
    }

    download(filesToDownload)
  }

  return (
    <div className='exporter__container'>
      <div className='table'>
        <div className='thead'>
          <div className='tr'>
            <div className='th'>尺寸（宽 × 高）</div>
            <div className='th'>文件名</div>
            <div className='th'>下载</div>
          </div>
        </div>
        <div className='tbody'>
          { selectedPresetItems.map(preset => (
            <div className='tr' key={preset.filename}>
              <div className='td'>{preset.width} &times; {preset.height}</div>
              <div className='td'>{preset.filename}</div>
              <div className='td'>
                <Button fullWidth onClick={e => {
                  e && e.stopPropagation()
                  _export([preset])
                }}>下载</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='toolbar'>
        <Button fullWidth onClick={e => {
          e && e.stopPropagation()
          _export(selectedPresetItems)
        }}>下载全部</Button>
      </div>

    </div>
  )
}

export default Exporter
