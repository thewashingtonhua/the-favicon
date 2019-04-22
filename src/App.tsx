import React from 'react'
import './App.scss'
import { useFixedViewport } from './hooks'
import { Button } from './components'

const App = () => {
  useFixedViewport()

  return (
    <div id='app' className='app'>
      <header className='toolbar__top'>ToolBar</header>

      <main className='main'>

        <aside className='presets'>
          <ul>
            <li>*.jpg</li>
            <li>*.png</li>
            <li>*.ico</li>
          </ul>
          <ul>
            <li>512 × 512</li>
            <li>256 × 256</li>
            <li>128 × 128</li>
            <li>64 × 64</li>
            <li>32 × 32</li>
          </ul>
        </aside>

        <section className='previewer'>
          <table>
            <thead>
              <tr>
                <th>尺寸</th>
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
