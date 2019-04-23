import React, { memo, useState, MouseEvent } from 'react'
import './AddPreset.scss'
import { Button } from './'
import { ButtonSize } from './Button'

interface AddPresetProps {
  onSubmit?: (size: any) => void
}

const AddPreset = (props: AddPresetProps) => {
  const { onSubmit } = props

  const [size, setSize] = useState('')

  function reset () {
    setSize('')
  }

  function submit (e?: MouseEvent) {
    if (typeof onSubmit === 'function') {
      onSubmit(Number(size))
      reset()
    }
  }

  return (
    <div className='add-preset'>
      <p className='add-preset-title'>添加自定义尺寸</p>
      <div className='add-preset-form'>
        <input
          type='tel'
          value={size}
          onChange={e => { setSize(e.target.value.replace(/[^0-9]/g, '')) }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              submit()
            }
          }}
        />
        <Button size={ButtonSize.Small} onClick={submit}>添加</Button>
      </div>
    </div>
  )
}

export default memo(AddPreset)
