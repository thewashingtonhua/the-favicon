import React from 'react'
import './App.scss'
import { useFixedViewport, usePresets } from './hooks'
import { Button, ImageUploader, Preset, AddPreset } from './components'

const App = () => {
  useFixedViewport()

  const { presets, addSize, toggleExtension, toggleSize, toggleExtensionAll, toggleSizeAll } = usePresets()

  return (
    <div id='app' className='app'>
      <header className='toolbar__top'>
        <h1>Icon Generator</h1>
      </header>

      <main className='main'>

        <section className='step step-1'>
          <header className='step-header'>
            <h2 className='step-title'>第 1 步：上传图片</h2>
          </header>
          <section className='step-body'>
            <ImageUploader />
          </section>
        </section>

        <section className='step step-2'>
          <header className='step-header'>
            <h2 className='step-title'>第 2 步：选择格式、尺寸</h2>
          </header>

          <section className='step-body'>
            <AddPreset onSubmit={size => addSize(size)} />

            <div className='preset-list-container'>
              <p className='preset-list-label'>输出尺寸（宽 × 高）</p>
              <div className='preset-list'>
                <Preset
                  type='size-android'
                  title='Android'
                  data={presets.size.filter(n => n.type === 'size-android')}
                  formatter={val => `${val} × ${val}`}
                  onToggleItem={(type, value) => { toggleSize(type, value as number) }}
                  onToggleAll={(type) => { toggleSizeAll(type) }}
                />
                <Preset
                  type='size-ios'
                  title='iOS'
                  data={presets.size.filter(n => n.type === 'size-ios')}
                  formatter={val => `${val} × ${val}`}
                  onToggleItem={(type, value) => { toggleSize(type, value as number) }}
                  onToggleAll={(type) => { toggleSizeAll(type) }}
                />
                <Preset
                  type='size-web'
                  title='Web'
                  data={presets.size.filter(n => n.type === 'size-web')}
                  formatter={val => `${val} × ${val}`}
                  onToggleItem={(type, value) => { toggleSize(type, value as number) }}
                  onToggleAll={(type) => { toggleSizeAll(type) }}
                />
                <Preset
                  type='size-custome'
                  title='自定义'
                  data={presets.size.filter(n => n.type === 'size-custome')}
                  formatter={val => `${val} × ${val}`}
                  onToggleItem={(type, value) => { toggleSize(type, value as number) }}
                  onToggleAll={(type) => { toggleSizeAll(type) }}
                />
              </div>
            </div>

            <div className='preset-list-container'>
              <p className='preset-list-label'>输出格式</p>
              <div className='preset-list'>
                <Preset
                  type='extension-common'
                  data={presets.extension}
                  onToggleItem={(type, value) => { toggleExtension(type, value as string) }}
                  onToggleAll={(type) => { toggleExtensionAll(type) }}
                />
              </div>
            </div>

          </section>
        </section>

        <section className='step step-3'>
          <header className='step-header'>
            <h2 className='step-title'>第 3 步：预览结果</h2>
          </header>

          <section className='step-body'>
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
          </section>
        </section>

      </main>

      <footer className='toolbar__bottom'>
        <Button>导出</Button>
      </footer>
    </div>
  )
}

export default App
