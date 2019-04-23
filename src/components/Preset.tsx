import React, { memo } from 'react'
import { Checkbox } from './'
import './Preset.scss'
import { PresetItem } from '../utils/interfaces'

interface PresetProps {
  type?: string,
  title?: string,
  data: PresetItem[],
  onToggle?: (data: { type: string, value: string | number, checked: boolean }) => void,
  className?: string,
  formatter?: (value: string | number) => string
}

const Preset = (props: PresetProps) => {
  const {
    type = '',
    title = '',
    data = [],
    onToggle,
    className = '',
    formatter
  } = props

  const classNames = [
    'preset',
    type && `preset--${type}`,
    className
  ].filter(Boolean).join(' ')

  function _onChange (type: string, value: string | number, checked: boolean) {
    typeof onToggle === 'function' && onToggle({ type, value, checked })
  }

  return (
    <div className={classNames}>
      { title && <p className='preset-title'>{title}</p> }
      <ul className='preset-list preset-list'>
        { data.map((item) => {
          const checked = item.chosen
          const _value = formatter
            ? formatter(item.value)
            : item.value

          return (
            <li key={item.value}>
              <Checkbox
                name={type}
                value={_value}
                defaultChecked={checked}
                onChange={(checked) => _onChange(type, item.value, checked)}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default memo(Preset)
