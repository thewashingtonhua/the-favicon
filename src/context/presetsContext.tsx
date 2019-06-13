import React, { useReducer, createContext, ReactNode } from 'react'
import { Action, ImagePresetProps } from '../utils/interfaces'

export interface PresetContextState {
  presets: ImagePresetProps[],
  fillColor: string,
  themeColor: string,
  useManifest: boolean,
  appName: string,
  appShortName: string,
}

const initialState: PresetContextState = {
  fillColor: '#ffffff',
  themeColor: '#ffffff',
  useManifest: true,
  appName: '',
  appShortName: '',
  presets: [
    { name: 'Android', width: 36, height: 36, mime: 'image/png', filename: 'android-chrome-36x36.png', desc: 'For Android Chrome M39+ with 0.75 screen density.', chosen: true },
    { name: 'Android', width: 48, height: 48, mime: 'image/png', filename: 'android-chrome-48x48.png', desc: 'For Android Chrome M39+ with 1.0 screen density.', chosen: true },
    { name: 'Android', width: 72, height: 72, mime: 'image/png', filename: 'android-chrome-72x72.png', desc: 'For Android Chrome M39+ with 1.5 screen density.', chosen: true },
    { name: 'Android', width: 96, height: 96, mime: 'image/png', filename: 'android-chrome-96x96.png', desc: 'For Android Chrome M39+ with 2.0 screen density.', chosen: true },
    { name: 'Android', width: 144, height: 144, mime: 'image/png', filename: 'android-chrome-144x144.png', desc: 'For Android Chrome M39+ with 3.0 screen density.', chosen: true },
    { name: 'Android', width: 192, height: 192, mime: 'image/png', filename: 'android-chrome-192x192.png', desc: 'For Android Chrome M39+ with 4.0 screen density.', chosen: true },
    { name: 'Android', width: 256, height: 256, mime: 'image/png', filename: 'android-chrome-256x256.png', desc: 'For Android Chrome M47+ Splash screen with 1.5 screen density.', chosen: true },
    { name: 'Android', width: 384, height: 384, mime: 'image/png', filename: 'android-chrome-384x384.png', desc: 'For Android Chrome M47+ Splash screen with 3.0 screen density.', chosen: true },
    { name: 'Android', width: 512, height: 512, mime: 'image/png', filename: 'android-chrome-512x512.png', desc: 'For Android Chrome M47+ Splash screen with 4.0 screen density.', chosen: true },
    { name: 'iOS', width: 57, height: 57, mime: 'image/png', filename: 'apple-touch-icon-57x57.png', desc: 'iPhone and iPad users can turn web pages into icons on their home screen. Such link appears as a regular iOS native application. When this happens, the device looks for a specific picture. The 57x57 resolution is convenient for non-retina iPhone with iOS6 or prior. Learn more in Apple docs.', chosen: true },
    { name: 'iOS', width: 60, height: 60, mime: 'image/png', filename: 'apple-touch-icon-60x60.png', desc: 'For non-retina iPhone with iOS7.', chosen: true },
    { name: 'iOS', width: 72, height: 72, mime: 'image/png', filename: 'apple-touch-icon-72x72.png', desc: 'For non-retina iPad with iOS6 or prior.', chosen: true },
    { name: 'iOS', width: 76, height: 76, mime: 'image/png', filename: 'apple-touch-icon-76x76.png', desc: 'For non-retina iPad with iOS7.', chosen: true },
    { name: 'iOS', width: 114, height: 114, mime: 'image/png', filename: 'apple-touch-icon-114x114.png', desc: 'For retina iPhone with iOS6 or prior.', chosen: true },
    { name: 'iOS', width: 120, height: 120, mime: 'image/png', filename: 'apple-touch-icon-120x120.png', desc: 'For retina iPhone with iOS7.', chosen: true },
    { name: 'iOS', width: 144, height: 144, mime: 'image/png', filename: 'apple-touch-icon-144x144.png', desc: 'For retina iPad with iOS6 or prior.', chosen: true },
    { name: 'iOS', width: 152, height: 152, mime: 'image/png', filename: 'apple-touch-icon-152x152.png', desc: 'For retina iPad with iOS7.', chosen: true },
    { name: 'iOS', width: 180, height: 180, mime: 'image/png', filename: 'apple-touch-icon-180x180.png', desc: 'For iPhone 6 Plus with iOS8.', chosen: true },
    { name: 'Web', width: 16, height: 16, mime: 'image/png', filename: 'favicon-16x16.png', desc: 'The classic favicon, displayed in the tabs.', chosen: true },
    { name: 'Web', width: 32, height: 32, mime: 'image/png', filename: 'favicon-32x32.png', desc: 'For Safari on Mac OS.', chosen: true },
    { name: 'Web', width: 32, height: 32, mime: 'image/x-icon', filename: 'favicon.ico', desc: 'Used by IE, and also by some other browsers if we are not careful.', chosen: true },
    { name: 'Windows', width: 70, height: 70, mime: 'image/png', filename: 'mstile-70x70.png', desc: 'For Windows 8 / IE11.', chosen: true },
    { name: 'Windows', width: 144, height: 144, mime: 'image/png', filename: 'mstile-144x144.png', desc: 'For Windows 8 / IE10.', chosen: true },
    { name: 'Windows', width: 150, height: 150, mime: 'image/png', filename: 'mstile-150x150.png', desc: 'For Windows 8 / IE11.', chosen: true },
    { name: 'Windows', width: 310, height: 310, mime: 'image/png', filename: 'mstile-310x310.png', desc: 'For Windows 8 / IE11.', chosen: true },
    { name: 'Windows', width: 310, height: 150, mime: 'image/png', filename: 'mstile-310x150.png', desc: 'For Windows 8 / IE11.', chosen: true }
  ]
}

const reducer = (state: PresetContextState, action: Action) => {
  switch (action.type) {
    case 'RESET_PRESET':
      return initialState
    case 'TOGGLE_PRESET':
      return {
        ...state,
        presets: state.presets.map(n => n.name === action.payload ? { ...n, chosen: !n.chosen } : n)
      }
    case 'SET_FILLCOLOR':
      return {
        ...state,
        fillColor: action.payload
      }
    case 'SET_THEMECOLOR':
      return {
        ...state,
        themeColor: action.payload
      }
    case 'TOGGLE_USE_MANIFEST':
      return state.useManifest ? {
        ...state,
        useManifest: !state.useManifest
      } : {
        ...state,
        presets: state.presets.map(n => n.name === 'Android' ? { ...n, chosen: true } : n),
        useManifest: !state.useManifest
      }
    case 'SET_APP_NAME':
      return {
        ...state,
        appName: action.payload
      }
    case 'SET_APP_SHORT_NAME':
      return {
        ...state,
        appShortName: action.payload
      }
    default:
      return state
  }
}

export const PresetContext = createContext({
  presets: initialState.presets,
  fillColor: initialState.fillColor,
  themeColor: initialState.themeColor,
  useManifest: initialState.useManifest,
  appName: initialState.appName,
  appShortName: initialState.appShortName,
  getSelectPresets: getSelectPresets,
  togglePreset: (name: string) => {},
  toggleUseManifest: () => {},
  setFillColor: (color: string) => {},
  setThemeColor: (color: string) => {},
  setAppName: (name: string) => {},
  setAppShortName: (name: string) => {}
})

interface PresetContextProviderProps {
  children: ReactNode
}

function getSelectPresets (presets: ImagePresetProps[]) {
  return presets.filter(n => n.chosen)
}

export const PresetContextProvider = (props: PresetContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  function togglePreset (name: string) {
    dispatch({ type: 'TOGGLE_PRESET', payload: name })
  }

  function toggleUseManifest () {
    dispatch({ type: 'TOGGLE_USE_MANIFEST' })
  }

  function setFillColor (color: string) {
    dispatch({ type: 'SET_FILLCOLOR', payload: color })
  }

  function setThemeColor (color: string) {
    dispatch({ type: 'SET_THEMECOLOR', payload: color })
  }

  function setAppName (name: string) {
    dispatch({ type: 'SET_APP_NAME', payload: name })
  }

  function setAppShortName (name: string) {
    dispatch({ type: 'SET_APP_SHORT_NAME', payload: name })
  }

  const value = {
    ...state,
    togglePreset,
    getSelectPresets,
    toggleUseManifest,
    setFillColor,
    setThemeColor,
    setAppName,
    setAppShortName
  }

  return (
    <PresetContext.Provider value={value}>
      {props.children}
    </PresetContext.Provider>
  )
}

export const PresetContextConsumer = PresetContext.Consumer
