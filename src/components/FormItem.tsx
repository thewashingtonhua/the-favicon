import React, { ChangeEvent } from 'react'
import './FormItem.scss'
import { randomString } from 'utils/utils'
import ReactToggle from 'react-toggle'
import 'react-toggle/style.css'

interface FormItemProps {
  id?: string,
  title?: string,
  type?: string,
  disabled?: boolean,
  checked?: boolean,
  value?: string,
  onChange?: (value: string) => void,
  className?: string,
}

function getRandomID () {
  return randomString()
}

const FormItem = (props: FormItemProps) => {
  const {
    id,
    title = '',
    type = 'text',
    disabled = false,
    checked = false,
    value,
    onChange,
    className = ''
  } = props

  const _className = [
    'form-item',
    disabled && 'form-item--disabled',
    className
  ].filter(Boolean).join(' ')

  function _onChange (e: ChangeEvent<HTMLInputElement>) {
    if (disabled) return

    onChange && onChange(e.target.value)
  }

  const _id = id || getRandomID()

  function getInput () {
    switch (type) {
      case 'checkbox':
        // return <input type='checkbox'  checked={checked} onChange={_onChange} />
        return <ReactToggle checked={checked} disabled={disabled} onChange={_onChange} />
      case 'color':
        return <div className='color-picker'>
          <input type='text' id={_id} disabled={disabled} value={value} onChange={_onChange} />
          <input type='color' disabled={disabled} value={value} onChange={_onChange} />
        </div>
      default:
        return <input type='text' id={_id} disabled={disabled} value={value} onChange={_onChange} />
    }
  }

  return (
    <div className={_className}>
      <label className='form-item__label' htmlFor={_id}>{title} :</label>
      <div className='form-item__input'>
        { getInput() }
      </div>
    </div>
  )
}

export default FormItem
