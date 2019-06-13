import React, { useContext } from 'react'
import './App.scss'
import { useFixedViewport } from './hooks'
import { AppBar, Step, ImageUploader, Preset, PresetList, Exporter, SettingBlock, FormItem } from './components'
import iconAndroid from './assets/android.svg'
import iconIOS from './assets/ios.svg'
import iconWeb from './assets/web.svg'
import iconWindows from './assets/windows.svg'
import { PresetContext } from 'context'

interface IconProps {
  android: string,
  ios: string,
  web: string,
  windows: string,
  [index: string]: string
}

const ICONS: IconProps = {
  android: iconAndroid,
  ios: iconIOS,
  web: iconWeb,
  windows: iconWindows
}

const App = () => {
  useFixedViewport()

  const {
    presets,
    fillColor,
    themeColor,
    useManifest,
    appName,
    appShortName,
    togglePreset,
    setFillColor,
    setThemeColor,
    toggleUseManifest,
    setAppName,
    setAppShortName
  } = useContext(PresetContext)

  const presetKeys: {name: string, chosen: boolean}[] = []
  presets.forEach(n => {
    if (!presetKeys.find(m => m.name === n.name && m.chosen === n.chosen)) {
      presetKeys.push({ name: n.name, chosen: n.chosen })
    }
  })

  const isAndroidChosen = presetKeys.some(n => n.name === 'Android' && n.chosen)
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
                  icon={ICONS[n.name.toLowerCase()]}
                  value={n.name}
                  chosen={n.chosen}
                  onClick={() => { togglePreset(n.name) }}
                />
              )}
            </PresetList>

            <SettingBlock title='Windows 设定'>
              <FormItem
                id='fill-color'
                title='fillColor'
                type='color'
                disabled={!isWindowsChosen}
                value={fillColor}
                onChange={val => {
                  setFillColor(val)
                }}
              />
            </SettingBlock>

            <SettingBlock title='manifest.json 设定'>
              <FormItem
                id='manifest'
                title='是否生成'
                type='checkbox'
                disabled={!isAndroidChosen}
                checked={useManifest}
                onChange={() => {
                  toggleUseManifest()
                }}
              />

              <FormItem
                id='theme-color'
                title='Theme Color'
                type='color'
                disabled={!isAndroidChosen || !useManifest}
                value={themeColor}
                onChange={(val) => {
                  setThemeColor(val)
                }}
              />

              <FormItem
                id='app-name'
                title='App Name'
                type='input'
                disabled={!isAndroidChosen || !useManifest}
                value={appName}
                onChange={(val) => {
                  setAppName(val)
                }}
              />

              <FormItem
                id='app-short-name'
                title='App Short Name'
                type='input'
                disabled={!isAndroidChosen || !useManifest}
                value={appShortName}
                onChange={(val) => {
                  setAppShortName(val)
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
