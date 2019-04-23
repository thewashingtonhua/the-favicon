import React from 'react'
import './App.scss'
import { useFixedViewport, usePresets } from './hooks'
import { Button, ImageUploader, Preset, AddPreset } from './components'

const App = () => {
  useFixedViewport()

  const { presets, addSize, toggleExtension, toggleSize } = usePresets()

  return (
    <div id='app' className='app'>
      <header className='toolbar__top'>
        <h1>Icon Generator</h1>
      </header>

      <main className='main'>

        <section className='step step-01'>
          <ImageUploader />
        </section>

        <section className='step step-02'>

          <AddPreset onSubmit={size => addSize(size)} />

          <div className='preset-list-container'>
            <p className='preset-list-label'>输出尺寸（宽 × 高）</p>
            <div className='preset-list'>
              <Preset
                type='android'
                title='Android'
                data={presets.size.filter(n => n.type === 'android')}
                formatter={val => `${val} × ${val}`}
                onToggle={({ type, value }) => {
                  toggleSize(type, value as number)
                }}
              />
              <Preset
                type='ios'
                title='iOS'
                data={presets.size.filter(n => n.type === 'ios')}
                formatter={val => `${val} × ${val}`}
                onToggle={({ type, value, checked }) => {
                  toggleSize(type, value as number)
                }}
              />
              <Preset
                type='web'
                title='Web'
                data={presets.size.filter(n => n.type === 'web')}
                formatter={val => `${val} × ${val}`}
                onToggle={({ type, value }) => {
                  toggleSize(type, value as number)
                }}
              />
              <Preset
                type='custome'
                title='自定义'
                data={presets.size.filter(n => n.type === 'custome')}
                formatter={val => `${val} × ${val}`}
                onToggle={({ type, value }) => {
                  toggleSize(type, value as number)
                }}
              />
            </div>
          </div>

          <div className='preset-list-container'>
            <p className='preset-list-label'>输出格式</p>
            <div className='preset-list'>
              <Preset
                type='format'
                data={presets.extension}
                onToggle={({ type, value }) => { toggleExtension(value) }}
              />
            </div>
          </div>
        </section>

        <section className='step step-03'>
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

      </main>

      <footer className='toolbar__bottom'>
        <Button>导出</Button>
      </footer>
    </div>
  )
}

export default App
