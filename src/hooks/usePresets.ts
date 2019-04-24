import { useReducer } from 'react'
import { Action, PresetItem } from '../utils/interfaces'

type Category = 'extension' | 'size'

export interface PresetReducerProps {
  extension: PresetItem[],
  size: PresetItem[],
  [index: string]: PresetItem[]
}

const initialState: PresetReducerProps = {
  extension: [
    { type: 'extension-common', value: 'jpg', chosen: false },
    { type: 'extension-common', value: 'png', chosen: true },
    { type: 'extension-common', value: 'ico', chosen: true }
  ],
  size: [
    { type: 'size-android', value: 512, chosen: true },
    { type: 'size-android', value: 256, chosen: true },
    { type: 'size-android', value: 128, chosen: true },
    { type: 'size-android', value: 64, chosen: true },
    { type: 'size-ios', value: 256, chosen: true },
    { type: 'size-ios', value: 128, chosen: true },
    { type: 'size-ios', value: 64, chosen: true },
    { type: 'size-web', value: 256, chosen: true },
    { type: 'size-web', value: 128, chosen: true },
    { type: 'size-web', value: 64, chosen: true },
    { type: 'size-web', value: 32, chosen: true },
    { type: 'size-web', value: 16, chosen: true }
  ]
}

const reducer = (state: PresetReducerProps, action: Action) => {
  switch (action.type) {
    case 'RESET_PRESET':
      return initialState
    case 'ADD_PRESET':
      state[action.payload.category] = [
        ...state[action.payload.category],
        {
          type: 'custome',
          value: action.payload.value,
          chosen: true
        }
      ]
      return state
    case 'TOGGLE_PRESET':
      state[action.payload.category] = state[action.payload.category]
        .map(n =>
          n.type === action.payload.type &&
          n.value === action.payload.value
            ? { ...n, chosen: !n.chosen }
            : n
        )
      return state
    case 'TOGGLE_PRESET_ALL':
      const relatedPresets = state[action.payload.category].filter(n => n.type === action.payload.type)
      const selectedAll = relatedPresets.filter(n => n.chosen).length === relatedPresets.length
      state[action.payload.category] = state[action.payload.category]
        .map(n => n.type === action.payload.type
          ? { ...n, chosen: !selectedAll }
          : n
        )
      return state
    default:
      return state
  }
}

export default function usePresets () {
  const [presets, dispatch] = useReducer(reducer, initialState)

  function addPreset (category: Category, type: string, value: string | number) {
    dispatch({ type: 'ADD_PRESET', payload: { category, type, value } })
  }

  function togglePreset (category: Category, type: string, value: string | number) {
    dispatch({ type: 'TOGGLE_PRESET', payload: { category, type, value } })
  }

  function togglePresetAll (category: Category, type: string) {
    dispatch({ type: 'TOGGLE_PRESET_ALL', payload: { category, type } })
  }

  function addSize (size: number) {
    addPreset('size', 'custome', size)
  }

  function toggleExtension (type: string, extension: string) {
    togglePreset('extension', type, extension)
  }

  function toggleSize (type: string, size: number) {
    togglePreset('size', type, size)
  }

  function toggleExtensionAll (type: string) {
    togglePresetAll('extension', type)
  }

  function toggleSizeAll (type: string) {
    togglePresetAll('size', type)
  }

  return { presets, addSize, toggleExtension, toggleSize, toggleExtensionAll, toggleSizeAll }
}
