import React, { memo, ReactNode, MouseEventHandler } from 'react'
import NewTabLink from './NewTabLink'
import './Button.scss'

export enum ButtonSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small'
}

interface Button {
  id?: string,
  className?: string,
  size?: ButtonSize,
  disabled?: boolean,
  isLoading?: boolean, // 是否处于加载中状态
  to?: string|any, // 选填，链接地址
  openInNewTab?: boolean, // 选填，是否新标签打开
  download?: string, // 选填，文件下载名，留空则为不需要下载
  fullWidth?: boolean, // 全屏宽度
  borderRounded?: boolean, // 左右两边是否为半圆
  children?: ReactNode,
  onClick?: MouseEventHandler,
  [index: string]: any
}

const Button = (props: Button) => {
  const {
    id,
    className,
    size = ButtonSize.Large,
    disabled = false,
    isLoading = false,
    onClick,
    to,
    download,
    children,
    borderRounded = true
  } = props

  const _onClick = (e: any) => {
    e && e.stopPropagation()
    if (isLoading) return
    typeof onClick === 'function' && onClick(e)
  }

  // 样式相关
  const classNames = [
    'btn',
    `btn--${size}`,
    disabled && 'btn--disabled',
    borderRounded && 'btn--border-rounded',
    className
  ].filter(Boolean)

  const btnIcon = isLoading
    ? <i className='btn__loading' />
    : null

  const _children = (
    <div className='btn__content'>
      {btnIcon}
      {children}
    </div>
  )

  const _props: any = {
    className: classNames.join(' ')
  }
  if (id) { _props.id = id }
  if (to) {
    _props.to = to
    if (download) { _props.download = download }
  } else {
    _props.onClick = _onClick
  }

  return to
    ? <NewTabLink {..._props}>{_children}</NewTabLink>
    : <div {..._props} >{_children}</div>
}

export default memo(Button)
