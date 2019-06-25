import React, { useContext } from 'react'
import './App.scss'
import { useFixedViewport } from './hooks'
import { AppBar, Step, ImageUploader, Preset, PresetList, Exporter, SettingBlock, FormItem } from './components'
import { PresetContext } from 'context'
import { OptionBag } from 'utils/interfaces'
import iconAndroid from './assets/android.svg'
import iconIOS from './assets/ios.svg'
import iconWeb from './assets/web.svg'
import iconWindows from './assets/windows.svg'

/**
 * @description 图标常量
 */
const ICONS: OptionBag = {
  ANDROID: iconAndroid,
  IOS: iconIOS,
  WEB: iconWeb,
  WINDOWS: iconWindows
}

const App = () => {
  useFixedViewport()

  const {
    presets,
    fillColor,
    togglePreset,
    setFillColor
  } = useContext(PresetContext)

  // 获取预设列表，及其勾选状态
  const presetKeys: {name: string, chosen: boolean}[] = []
  presets.forEach(preset => {
    if (!presetKeys.find(key => key.name === preset.name)) {
      presetKeys.push({ name: preset.name, chosen: preset.chosen })
    }
  })

  const isWindowsChosen = presetKeys.some(n => n.name === 'Windows' && n.chosen)

  return (
    <div id='app' className='app'>
      <AppBar />

      <main className='main'>

        <Step className='step-1' title='第 1 步：上传图片'>
          <ImageUploader />
        </Step>

        <Step className='step-2' title='第 2 步：选择预设'>
          <div className='step-2-wrapper'>
            <PresetList title='预设'>
              { presetKeys.map(n =>
                <Preset
                  key={n.name}
                  icon={ICONS[n.name.toUpperCase()]}
                  value={n.name}
                  chosen={n.chosen}
                  onClick={() => { togglePreset(n.name) }}
                />
              )}
            </PresetList>

            <SettingBlock title='Windows Tile 设定'>
              <FormItem
                id='fill-color'
                title='Fill Color'
                type='color'
                disabled={!isWindowsChosen}
                value={fillColor}
                onChange={val => {
                  setFillColor(val)
                }}
              />
            </SettingBlock>

          </div>
        </Step>

        <Step className='step-3' title='第 3 步：预览结果'>
          <Exporter />
        </Step>

      </main>
    </div>
  )
}

export default App
