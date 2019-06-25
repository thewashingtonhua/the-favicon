import React, { ChangeEvent } from 'react'
import './FormItem.scss'
import { randomString } from 'utils/utils'
import ReactToggle from 'react-toggle'
import 'react-toggle/style.css'

/**
 * @description 表单项
 */
interface FormItemProps {
  /**
   * @description 指定表单项的 id，用于关联 label。不指定则自动生成随机字符串作为 id
   */
  id?: string,
  /**
   * @description 表单项的 title
   */
  title?: string,
  /**
   * @description input 的类型
   */
  type?: string,
  /**
   * @description 是否禁用
   */
  disabled?: boolean,
  /**
   * @description 是否勾选（仅用于 CheckBox）
   */
  checked?: boolean,
  /**
   * @description input 的取值
   */
  value?: string,
  /**
   * @description input 内容变更时触发
   */
  onChange?: (value: string) => void,
  /**
   * @description 支持添加额外的样式
   */
  className?: string,
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

  // 若未指定 id，则自动生成一串随机字符串作为 id
  const _id = id || randomString()

  function getInput () {
    switch (type) {
      case 'checkbox':
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
