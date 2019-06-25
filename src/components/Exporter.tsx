import React, { useContext } from 'react'
import { Button } from 'components'
import './Exporter.scss'
import { PresetContext, FileContext } from 'context'
import { ImagePresetProps, ExportItem } from 'utils/interfaces'
import JSZip from 'jszip'
import FileSaver from 'file-saver'

/**
 * @description 通过 canvas 创建各尺寸的图片文件
 * @param dataURL 图片文件的 dataURL
 * @param options 目标图片的配置信息（尺寸、颜色、扩展名、文件名等）
 */
function generateImage (file: string, options: ImagePresetProps): ExportItem | undefined {
  const canvas = document.createElement('canvas')
  canvas.width = options.width
  canvas.height = options.height

  const ctx = canvas.getContext('2d')
  if (!ctx) return undefined

  const img = new Image()
  img.src = file

  // 图片不一定都是正方形
  // 这里确保目标图片能完整显示在指定区域内
  const minSize = Math.min(options.width, options.height)
  let x = 0
  let y = 0
  let w = minSize
  let h = minSize

  if (options.filename.startsWith('mstile') && options.fillColor) {
    // Windows Tile 需要填充背景色
    ctx.fillStyle = options.fillColor
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fill()

    // 并将图标缩放为 2 / 3
    x = options.width / 2 - minSize / 3
    y = options.height / 2 - minSize / 3
    w = minSize * 2 / 3
    h = minSize * 2 / 3
  } else {
    // 其他图片则填满，不缩放
    x = options.width / 2 - minSize / 2
    y = options.height / 2 - minSize / 2
  }

  ctx.drawImage(img, x, y, w, h)

  const output = {
    filename: options.filename,
    mime: options.mime,
    // JSZip 要求 base64 编码的图片不带前缀，因此这里要去掉
    /* eslint-disable no-useless-escape */
    data: canvas.toDataURL(options.mime).replace(/^data:image\/(png|x\-icon);base64,/, '')
    /* eslint-enable no-useless-escape */
  }

  return output
}

/**
 * @description 生成应用了选中图标的 HTML 模板
 * @param presetItems 被选中的预设项
 * @param fillColor 填充色
 */
function generateBaseHTML (presetItems: ImagePresetProps[], fillColor: string): ExportItem {
  const metas: string[] = []

  presetItems.forEach(item => {
    switch (item.name) {
      case 'iOS':
        metas.push(`<link rel='apple-touch-icon' size='${item.width}x${item.height}' href='${item.filename}' />`)
        break
      case 'Android':
      case 'Web':
        metas.push(`<link rel='icon' type='${item.mime}' size='${item.width}x${item.height}' href='${item.filename}' />`)
        break
      default:
        break
    }
  })
  // fallback
  metas.push(`<link rel='shortcut icon' href='favicon.ico' />`)

  if (presetItems.some(n => n.name === 'Android')) {
    metas.push(`<link rel='manifest' href='manifest.json' />`)
    metas.push(`<meta name='theme-color' content='${fillColor}' />`)
  }
  if (presetItems.some(n => n.name === 'Windows')) {
    metas.push(`<meta name='msapplication-TileImage' content='mstile-144x144.png' />`)
    metas.push(`<meta name='msapplication-TileColor' content='${fillColor}' />`)
  }

  // 格式化需要，以确保生成文件的缩进和换行
  const data = [
    `<html>`,
    `  <head>`,
    ...metas.map(n => `    ` + n),
    `  </head>`,
    `  <body>`,
    `  </body>`,
    `</html>`
  ].join('\n')

  const output = {
    filename: 'index.html',
    mime: 'text/html',
    data
  }

  return output
}

/**
 * @description 生成 Google 推荐的 Web Manifest 文件
 */
function generateWebManifest (): ExportItem {
  const content = {
    short_name: 'My App',
    name: 'My App',
    icons: [
      {
        src: 'android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }

  const data = JSON.stringify(content, null, 2)

  const output = {
    filename: 'manifest.json',
    mime: 'application/json',
    data
  }

  return output
}

/**
 * @description 生成 Windows Tile 所需的 browserconfig.xml 文件
 * @param fillColor 填充色
 */
function generateBrowserConfig (fillColor: string): ExportItem {
  const data = [
    `<?xml version="1.0" encoding="utf-8"?>`,
    `<browserconfig>`,
    `  <msapplication>`,
    `    <tile>`,
    `      <square70x70logo src="/mstile-70x70.png"/>`,
    `      <square150x150logo src="/mstile-150x150.png"/>`,
    `      <wide310x150logo src="/mstile-310x150.png"/>`,
    `      <square310x310logo src="/mstile-310x310.png"/>`,
    `      <TileColor>${fillColor}</TileColor>`,
    `    </tile>`,
    `  </msapplication>`,
    `</browserconfig>`
  ].join('\n')

  const output = {
    filename: 'browserconfig.xml',
    mime: 'application/xml',
    data
  }

  return output
}

/**
 * @description 下载文件
 * @param items 下载项列表
 */
function download (items: ExportItem[]) {
  if (!items.length) return

  // 单个文件直接打包
  if (items.length === 1) {
    FileSaver.saveAs(items[0].data, items[0].filename)
    return
  }

  // 多文件打包下载
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

const Exporter = () => {
  const {
    presets,
    fillColor,
    getSelectPresets
  } = useContext(PresetContext)
  const { file } = useContext(FileContext)

  const selectedPresets = getSelectPresets(presets)

  // 触发导出
  function makeExport (presetItems: ImagePresetProps[]): void {
    if (!file) {
      window.alert('请先选择文件')
      return
    }

    if (!presetItems.length) {
      window.alert('请选择至少一个预设')
      return
    }

    // 待下载文件列表
    const filesToDownload: ExportItem[] = []

    // 生成 HTML 模板
    filesToDownload.push(generateBaseHTML(presetItems, fillColor))

    // 生成 Web Manifest
    if (selectedPresets.some(n => n.name === 'Android')) {
      filesToDownload.push(generateWebManifest())
    }

    // 生成 browserconfig.xml
    if (selectedPresets.some(n => n.name === 'Windows')) {
      filesToDownload.push(generateBrowserConfig(fillColor))
    }

    // 生成图片
    presetItems.forEach(presetItem => {
      const options = { ...presetItem }
      if (presetItem.name === 'Windows') {
        options.fillColor = fillColor
      }
      const img = generateImage(file, options)
      if (img) {
        filesToDownload.push(img)
      }
    })

    download(filesToDownload)
  }

  return (
    <div className='exporter__container'>

      {/* 预览所选预设对应的图片文件 */}
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

                {/* 下载单张图片 */}
                <Button fullWidth onClick={e => {
                  e && e.stopPropagation()
                  makeExport([preset])
                }}>下载</Button>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 下载全部 */}
      <div className='toolbar'>
        <Button fullWidth onClick={e => {
          e && e.stopPropagation()
          makeExport(selectedPresets)
        }}>下载全部</Button>
      </div>

    </div>
  )
}

export default Exporter
