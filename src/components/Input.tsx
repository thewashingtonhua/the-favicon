import React, { memo, useState, useRef, KeyboardEventHandler, FocusEventHandler, ChangeEvent } from 'react'
import './Input.scss'
import { isPlainObject, randomString } from '../utils/utils'
import { OptionBag } from '../utils/interfaces'

// 文本校验模式
export type InputPattern = string | [string, OptionBag] | undefined

// 文本输入类型
export enum InputType {
  Text = 'text',
  Password = 'password',
  Tel = 'tel',
  Captcha = 'captcha'
}

export interface InputProps {
  id?: string,
  className?: string,
  type?: InputType, // 文本输入框的类型（这里按照用途分类，不是 <input> 的 type）
  label?: string,
  value?: string,
  placeholder?: string,
  autoFocus?: boolean,
  autoComplete?: boolean,
  readOnly?: boolean,
  disabled?: boolean,
  onChange?: (value: string, event?: ChangeEvent<HTMLInputElement>) => void,
  onKeyDown?: KeyboardEventHandler,
  onPressEnter?: KeyboardEventHandler,
  onFocus?: FocusEventHandler,
  onBlur?: FocusEventHandler,
  pattern?: InputPattern, // 数据验证规则
  showPassword?: boolean
}

// 确保 pattern 的格式有效
function _getValidPattern (pattern: InputPattern) {
  let type = ''
  let config = {}

  // 验证 pattern 参数是否为有效格式
  if (Array.isArray(pattern)) {
    type = String(pattern[0])
    config = pattern[1]
    try {
      if (!isPlainObject(pattern[1])) {
        throw new Error(`Expect the second argument of 'pattern' to be an object`)
      }
      config = pattern[1]
    } catch (e) {
      console.error(e)
    }
  } else {
    type = String(pattern)
  }

  return [type, config]
}

// 格式化数字（支持负数、小数）
function _formatNumber (value: string, config: {
  nonNegative?: boolean,
  forceInteger?: boolean,
  precision?: number
}) {
  /* eslint-disable no-useless-escape */
  // 过滤掉非数字相关的字符
  value = value.replace(/[^0-9\.\-]/g, '')

  // 非负不得出现负号
  if (config.nonNegative) {
    value = value.replace(/\-/g, '')
  }

  // 整数不得出现小数点
  if (config.forceInteger) {
    value = value.replace(/\./g, '')
  }

  // 允许空字符串
  if (value === '') return value

  // 小数点不能在开头
  if (value === '.') return ''
  // 负号后面必须接数字
  if (value.startsWith('-.')) return '-'

  // 小数点只能出现一次
  if (value.includes('.')) {
    value = value
      .split('.')
      .slice(0, 2)
      .join('.')
  }

  // 小数部分最大位数
  if (
    value.includes('.') &&
    config.precision &&
    Number(config.precision) >= 0 &&
    Number(config.precision) < Infinity
  ) {
    const tmpArr = value.split('.')
    value = `${tmpArr[0]}.${tmpArr[1].substr(0, Number(config.precision))}`
  }
  /* eslint-enable no-useless-escape */

  return value
}

// 格式化电话号码（纯数字）
function _formatTel (value: string, config: OptionBag) {
  value = value.replace(/[^0-9]/g, '').substr(0, 11)

  return value
}

// 格式化密码（大小写英文数字）
function _formatPassword (value: string, config: OptionBag) {
  value = value.replace(/[^0-9a-zA-Z]/g, '').substr(0, 16)

  return value
}

// 格式化验证码（6位数字）
function _formatCaptcha (value: string, config: OptionBag) {
  value = value.replace(/[^0-9]/g, '').substr(0, 6)

  return value
}

// 格式化各类代码（邀请码等）
function _formatCode (value: string, config: OptionBag) {
  value = value.replace(/[^0-9a-zA-Z]/g, '')

  return value
}

// 常规的格式化
function _formatCommon (value: string, config: {
  maxLength?: number
}) {
  if (
    config.maxLength &&
    config.maxLength >= 0
  ) {
    value = value.substr(0, config.maxLength)
  }

  return value
}

// 按照给定 pattern 进行格式化
function _format (value: string, pattern: string|[string, OptionBag]) {
  /**
   * pattern 支持有两种格式
   *
   * 1）[type = '', config = {}] 数组
   * type 表示验证类型, config 为可选的配置对象
   *
   * 2）如果不需要配置对象，可以直接传一个字符串表示 type
   */
  const [type = '', config = {}] = _getValidPattern(pattern)

  // 验证
  switch (type) {
    case 'number':
      value = _formatNumber(value, config)
      break
    case 'tel':
      value = _formatTel(value, config)
      break
    case 'password':
      value = _formatPassword(value, config)
      break
    case 'captcha':
      value = _formatCaptcha(value, config)
      break
    case 'code':
      value = _formatCode(value, config)
      break
    case 'common':
      value = _formatCommon(value, config)
      break
    default:
      break
  }

  return value
}

// 根据 props.type 获取 input 的 type
function getRealType (type: InputType): string {
  switch (type) {
    case InputType.Tel:
      return 'tel'
    case InputType.Password:
      return 'password'
    default:
      return 'text'
  }
}

const Input = (props: InputProps) => {
  const {
    id,
    className,
    type = InputType.Text,
    label,
    value,
    placeholder,
    autoFocus,
    autoComplete,
    readOnly,
    disabled,
    onChange,
    onKeyDown,
    onPressEnter,
    onFocus,
    onBlur,
    pattern
  } = props

  // 聚焦样式
  const [focused, setFocused] = useState(false)

  const hasValidOnChange = typeof onChange === 'function'

  function _onChange (e: any) {
    if (!hasValidOnChange) return
    if (disabled) return

    let value = e.target.value

    let _pattern: InputPattern
    switch (type) {
      case InputType.Password:
        _pattern = ['password', { maxLength: 16 }]
        break
      case InputType.Tel:
        _pattern = 'tel'
        break
      case InputType.Captcha:
        _pattern = 'captcha'
        break
      default:
        _pattern = pattern
    }

    if (_pattern) {
      value = _format(e.target.value, _pattern)
    }

    typeof onChange === 'function' && onChange(value, e)
  }

  function _onKeyDown (e: any) {
    if (readOnly || disabled) return
    e.key === 'Enter' && typeof onPressEnter === 'function' && onPressEnter(e)
    typeof onKeyDown === 'function' && onKeyDown(e)
  }

  function _onFocus (e: any) {
    if (readOnly || disabled) return
    setFocused(true)
    typeof onFocus === 'function' && onFocus(e)
  }

  function _onBlur (e: any) {
    if (readOnly || disabled) return
    setFocused(false)
    typeof onBlur === 'function' && onBlur(e)
  }

  // 样式相关
  const classNames = [
    'caibao-input',
    focused && 'caibao-input--focused',
    className
  ].filter(Boolean)

  // 内部 ID，用于实现 label 和 input 的联动
  const _id = useRef(`caibao-input--${randomString(8)}`).current

  const _autoComplete = autoComplete
    ? 'on'
    : type === InputType.Password
      ? 'new-password'
      : 'off'

  const realType = getRealType(type)

  return (
    <div className={classNames.join(' ')} id={id}>
      <label htmlFor={_id}>{label}</label>
      <input
        id={_id}
        type={realType}
        value={value}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete={_autoComplete}
        readOnly={readOnly}
        disabled={disabled}
        onChange={_onChange}
        onKeyDown={_onKeyDown}
        onFocus={_onFocus}
        onBlur={_onBlur}
      />
    </div>
  )
}

export default memo(Input)
