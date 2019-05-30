import React from 'react'
import './App.scss'
import { useFixedViewport, usePresets, useFile } from './hooks'
import { Button, AppBar, Step, ImageUploader, ImagePreviewer, Preset, PresetList } from './components'
import iconAndroid from './assets/android.svg'
import iconIOS from './assets/ios.svg'
import iconWeb from './assets/web.svg'
import iconImg from './assets/img.svg'

interface IconProps {
  android: string,
  ios: string,
  web: string,
  img: string,
  [index: string]: string
}

const ICONS: IconProps = {
  android: iconAndroid,
  ios: iconIOS,
  web: iconWeb,
  img: iconImg
}

const App = () => {
  useFixedViewport()

  const { presets, toggleSize, toggleExtension } = usePresets()
  const { file, setFile } = useFile()

  return (
    <div id='app' className='app'>
      <AppBar />

      <main className='main'>

        <Step className='step-1' title='第 1 步：上传图片'>
          { file
            ? <ImagePreviewer file={file} />
            : <ImageUploader onChange={file => setFile(file)} />
          }
        </Step>

        <Step className='step-2' title='第 2 步：选择格式、尺寸'>
          {/* <AddPreset onSubmit={size => addPreset('size', size)} /> */}

          <PresetList title='输出尺寸（宽 × 高）'>
            { presets.size.map(n =>
              <Preset
                key={n.value}
                icon={ICONS[n.value.toLowerCase()]}
                value={n.value}
                chosen={n.chosen}
                onClick={() => { toggleSize(n.value) }}
              />
            )}
          </PresetList>

          <PresetList title='输出格式'>
            { presets.extension.map(n =>
              <Preset
                key={n.value}
                icon={ICONS.img}
                value={n.value.toUpperCase()}
                chosen={n.chosen}
                onClick={() => { toggleExtension(n.value) }}
              />
            )}
          </PresetList>

        </Step>

        <Step className='step-3' title='第 3 步：预览结果'>
          <table>
            <thead>
              <tr>
                <th>尺寸（宽 × 高）</th>
                <th>预览图</th>
                <th>下载</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>512 × 512</td>
                <td>预览图</td>
                <td><Button>下载</Button></td>
              </tr>
              <tr>
                <td>256 × 256</td>
                <td>预览图</td>
                <td><Button>下载</Button></td>
              </tr>
              <tr>
                <td>128 × 128</td>
                <td>预览图</td>
                <td><Button>下载</Button></td>
              </tr>
              <tr>
                <td>64 × 64</td>
                <td>预览图</td>
                <td><Button>下载</Button></td>
              </tr>
              <tr>
                <td>32 × 32</td>
                <td>预览图</td>
                <td><Button>下载</Button></td>
              </tr>
            </tbody>
          </table>
          <Button>导出</Button>
        </Step>

      </main>
    </div>
  )
}

export default App
