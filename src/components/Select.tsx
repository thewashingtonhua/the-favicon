/* eslint-disable */
import React, { memo, useState, useRef } from 'react'
import './Select.scss'
import { useClickOutside } from '../hooks'

interface Option {
  label: string,
  value: any
}

interface Select {
  value: string|number,
  placeholder: string,
  className: string,
  readOnly: boolean,
  disabled: boolean,
  fullWidth: boolean,
  align: string, // 下拉菜单水平方向对齐方式
  options: Option[], // [ { label, value} ]
  onChange: (value: string) => void,
  render: Function, // 可选，用于自定义 option 的结构
  formatter: Function // 可选，用于格式化当前所选的显示
}

const Select = (props: Select) => {
  const {
    value,
    className,
    fullWidth,
    placeholder,
    disabled,
    readOnly,
    options,
    formatter,
    // render,
    align,
    onChange
  } = props

  const container = useRef(null)

  // 是否打开
  const [open, setOpen] = useState(false)
  // 如果输入框没有传入有效的 onChange，则使用内部 _value 让输入框依然可输入
  const [_value, setValue] = useState(value)

  const hasValidOnChange = typeof onChange === 'function'

  const handleClickOutside = () => {
    setOpen(false)
  }

  useClickOutside(container.current, handleClickOutside)

  const toggleOpen = (e: any) => {
    e && e.stopPropagation()
    if (
      disabled ||
      readOnly ||
      (options && !options.length)
    ) return
    setOpen(open => !open)
  }

  function getCurrentOptionByValue (val: any): Option  {
    return options.find(n => n.value === val) || { label: '', value: undefined }
  }

  // const _onChange = (value: any) => (e: any) => {
  //   e && e.stopPropagation()
  //   setOpen(false)
  //   hasValidOnChange ? onChange(value) : setValue(value)
  // }

  const classNames = [
    'caibao-select',
    align === 'right' ? 'caibao-select--align-right' : 'caibao-select--align-left',
    open && 'caibao-select--open',
    readOnly && 'caibao-select--readonly',
    disabled && 'caibao-select--disabled',
    className,
    fullWidth && 'caibao-select--full-width'
  ].filter(Boolean)

  const realValue = hasValidOnChange ? value : _value

  const currentOption: Option = getCurrentOptionByValue(realValue)
  const currentValue = realValue
    ? typeof formatter === 'function'
      ? formatter(currentOption)
      : currentOption.label
    : placeholder

  return (
    <div className={classNames.join(' ')} ref={container}>
      <div className='caibao-select__value' onClick={toggleOpen}>
        <span className='caibao-select__value-span'>{currentValue}</span>
      </div>
    </div>
  )
}

export default memo(Select)
