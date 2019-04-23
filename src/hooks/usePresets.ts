import { useReducer } from 'react'
import { Action, PresetItem } from '../utils/interfaces'

export interface PresetReducerProps {
  extension: PresetItem[],
  size: PresetItem[],
  [index: string]: PresetItem[]
}

const initialState: PresetReducerProps = {
  extension: [
    { type: 'common', value: 'jpg', chosen: false },
    { type: 'common', value: 'png', chosen: true },
    { type: 'common', value: 'ico', chosen: true }
  ],
  size: [
    { type: 'android', value: 512, chosen: true },
    { type: 'android', value: 256, chosen: true },
    { type: 'android', value: 128, chosen: true },
    { type: 'android', value: 64, chosen: true },
    { type: 'ios', value: 256, chosen: true },
    { type: 'ios', value: 128, chosen: true },
    { type: 'ios', value: 64, chosen: true },
    { type: 'web', value: 256, chosen: true },
    { type: 'web', value: 128, chosen: true },
    { type: 'web', value: 64, chosen: true },
    { type: 'web', value: 32, chosen: true },
    { type: 'web', value: 16, chosen: true }
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
    default:
      return state
  }
}

export default function usePresets () {
  const [presets, dispatch] = useReducer(reducer, initialState)

  function addSize (size: number) {
    dispatch({ type: 'ADD_PRESET', payload: { category: 'size', type: 'custome', value: size } })
  }

  function toggleExtension (value: string | number) {
    dispatch({ type: 'TOGGLE_PRESET', payload: { category: 'extension', value } })
  }

  function toggleSize (type: string, size: number) {
    dispatch({ type: 'TOGGLE_PRESET', payload: { category: 'size', type, value: size } })
  }

  return { presets, addSize, toggleExtension, toggleSize }
}
