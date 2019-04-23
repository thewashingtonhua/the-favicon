import React, { memo, useState, ChangeEvent } from 'react'
import './Checkbox.scss'
import { randomString } from '../utils/utils'

interface CheckboxProps {
  name?: string,
  value?: string | number,
  defaultChecked?: boolean,
  onChange?: (checked: boolean) => void,
  className?: string
}

const Checkbox = (props: CheckboxProps) => {
  const {
    name = '',
    value = '',
    defaultChecked = false,
    onChange,
    className = ''
  } = props

  const [ checked, setChecked ] = useState(defaultChecked)

  function _onChange (e: ChangeEvent<HTMLInputElement>) {
    const newChecked = e.target.checked
    setChecked(newChecked)
    typeof onChange === 'function' && onChange(newChecked)
  }

  const wrapperClassName = [
    'checkbox-wrapper',
    className
  ].filter(Boolean).join(' ')

  const checkboxClassName = [
    'checkbox',
    checked && 'checkbox--checked'
  ].filter(Boolean).join(' ')

  const _id = `checkbox--${randomString()}`

  return (
    <span className={wrapperClassName}>
      <span className={checkboxClassName}>
        <input
          id={_id}
          type='checkbox'
          name={name}
          checked={checked}
          // readOnly
          onChange={_onChange}
        />
        <span className='checkbox__inner' />
      </span>
      { value && <label htmlFor={_id} className='checkbox__text'>{value}</label> }
    </span>
  )
}

export default memo(Checkbox)
