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

  if (options.filename.startsWith('mstile') && options.fillColor) {
    ctx.fillStyle = options.fillColor
    ctx.rect(0, 0, canvas.width, canvas.height)
  }

  const minSize = Math.min(options.width, options.height)
  const x = options.width / 2 - minSize / 2
  const y = options.height / 2 - minSize / 2

  ctx.drawImage(img, x, y, minSize, minSize)
  const data = canvas.toDataURL(options.mime)

  const output = {
    filename: options.filename,
    mime: options.mime,
    // data: data
    /* eslint-disable no-useless-escape */
    data: data.replace(/^data:image\/(png|x\-icon);base64,/, '')
    /* eslint-enable no-useless-escape */
  }

  return output
}

function download (items: ExportItem[]) {
  if (!items.length) return

  if (items.length === 1) {
    FileSaver.saveAs(items[0].data, items[0].filename)
    return
  }

  const zip = new JSZip()
  for (const item of items) {
    if (item.mime.startsWith('image')) {
      zip.file(item.filename, item.data, { base64: true, binary: true })
    } else {
      zip.file(item.filename, item.data)
    }
  }

  zip.generateAsync({ type: 'blob' }).then(content => {
    FileSaver.saveAs(content, 'favicon.zip')
  })
}

function generateManifest (appName: string, appShortName: string, fillColor: string) {}

function generateBrowserConfig (fillColor: string) {}

const Exporter = () => {
  const {
    presets,
    fillColor,
    useManifest,
    appName,
    appShortName,
    getSelectPresets
  } = useContext(PresetContext)
  const { file } = useContext(FileContext)

  const selectedPresets = getSelectPresets(presets)

  function _export (presetItems: ImagePresetProps[]): void {
    if (!file) {
      window.alert('请先选择文件')
      return
    }

    const filesToDownload: ExportItem[] = []

    presetItems.forEach(presetItem => {
      if (presetItem.mime.startsWith('image')) {
        const options = { ...presetItem }
        if (presetItem.name === 'Windows') {
          options.fillColor = fillColor
        }
        const img = generateImage(file, options)
        if (img) {
          filesToDownload.push(img)
        }
      }
    })

    if (useManifest) {
      // Generate manifest.json
      generateManifest(appName, appShortName, fillColor)
    }

    if (selectedPresets.find(n => n.name === 'Windows')) {
      // Generate browserConfig.xml
      generateBrowserConfig(fillColor)
    }

    console.log(filesToDownload)

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
          { selectedPresets.map(preset => (
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
          _export(selectedPresets)
        }}>下载全部</Button>
      </div>

    </div>
  )
}

export default Exporter
