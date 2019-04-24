import React, { memo } from 'react'
import { Checkbox } from './'
import './Preset.scss'
import { PresetItem } from '../utils/interfaces'

interface PresetProps {
  type?: string,
  title?: string,
  data: PresetItem[],
  onToggleItem?: (type: string, value: string | number, checked?: boolean) => void,
  onToggleAll?: (type: string) => void,
  className?: string,
  formatter?: (value: string | number) => string
}

const Preset = (props: PresetProps) => {
  const {
    type = '',
    title = '',
    data = [],
    onToggleItem,
    onToggleAll,
    className = '',
    formatter
  } = props

  const classNames = [
    'preset',
    type && `preset--${type}`,
    className
  ].filter(Boolean).join(' ')

  function _onToggleItem (type: string, value: string | number, checked: boolean) {
    typeof onToggleItem === 'function' && onToggleItem(type, value, checked)
  }

  function _onToggleAll (type: string) {
    typeof onToggleAll === 'function' && onToggleAll(type)
  }

  const _selectdALl = data.length > 0 && data.filter(n => n.chosen).length === data.length

  return (
    <div className={classNames}>
      { title &&
        <Checkbox
          className='preset-title'
          value={title}
          defaultChecked={_selectdALl}
          onChange={() => _onToggleAll(type)}
        />
      }
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
                onChange={(checked) => _onToggleItem(type, item.value, checked)}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default memo(Preset)
