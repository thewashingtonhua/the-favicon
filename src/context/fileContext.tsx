import React, { useReducer, createContext, ReactNode } from 'react'
import { Action } from '../utils/interfaces'

export interface FileContextState {
  file: string
}

const initialState: FileContextState = {
  file: ''
}

const reducer = (state: FileContextState, action: Action) => {
  switch (action.type) {
    case 'RESET_FILE':
      return initialState
    case 'SET_FILE':
      return { file: action.payload.file }
    default:
      return state
  }
}

export const FileContext = createContext({
  file: initialState.file,
  setFile: (file: string) => {},
  resetFile: () => {}
})

interface FileContextProviderProps {
  children: ReactNode
}

export const FileContextProvider = (props: FileContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  function setFile (dataURL: string) {
    dispatch({ type: 'SET_FILE', payload: { file: dataURL } })
  }

  function resetFile () {
    dispatch({ type: 'RESET_FILE' })
  }

  const value = { file: state.file, setFile, resetFile }

  return (
    <FileContext.Provider value={value}>
      {props.children}
    </FileContext.Provider>
  )
}

export const FileContextConsumer = FileContext.Consumer
