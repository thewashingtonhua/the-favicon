import { useReducer } from 'react'
import { Action } from '../utils/interfaces'

export interface FileReducerProps {
  file?: File
}

const initialState: FileReducerProps = {
  file: undefined
}

const reducer = (state: FileReducerProps, action: Action) => {
  const { file } = action.payload

  switch (action.type) {
    case 'RESET_FILE':
      return initialState
    case 'SET_FILE':
      return {
        file: file
      }
    default:
      return state
  }
}

export default function useFile () {
  const [file, dispatch] = useReducer(reducer, initialState)

  function setFile (file: File) {
    dispatch({ type: 'SET_FILE', payload: { file } })
  }

  return { file, setFile }
}
