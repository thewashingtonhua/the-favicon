import { useReducer } from 'react'
import { Action, ExtensionProps, SizeProps } from '../utils/interfaces'

export interface PresetReducerProps {
  extension: ExtensionProps[],
  size: SizeProps[]
}

const initialState: PresetReducerProps = {
  extension: [
    { value: 'jpg', chosen: false },
    { value: 'png', chosen: true },
    { value: 'ico', chosen: true }
  ],
  size: [
    { value: 'Android', data: [512, 256, 128, 64], chosen: true },
    { value: 'iOS', data: [256, 128, 64], chosen: true },
    { value: 'Web', data: [256, 128, 64, 32, 16], chosen: true }
  ]
}

const reducer = (state: PresetReducerProps, action: Action) => {
  const { value } = action.payload

  switch (action.type) {
    case 'RESET_PRESET':
      return initialState
    case 'TOGGLE_EXTENSION':
      return {
        ...state,
        extension: state.extension.map(n => n.value === value ? { ...n, chosen: !n.chosen } : n)
      }
    case 'TOGGLE_SIZE':
      return {
        ...state,
        size: state.size.map(n => n.value === value ? { ...n, chosen: !n.chosen } : n)
      }
    default:
      return state
  }
}

export default function usePresets () {
  const [presets, dispatch] = useReducer(reducer, initialState)

  function toggleExtension (value: string) {
    dispatch({ type: 'TOGGLE_EXTENSION', payload: { value } })
  }

  function toggleSize (value: string) {
    dispatch({ type: 'TOGGLE_SIZE', payload: { value } })
  }

  return { presets, toggleExtension, toggleSize }
}
