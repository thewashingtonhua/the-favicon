import React, { memo, ReactNode, MouseEvent } from 'react'
import NewTabLink from './NewTabLink'
import './Button.scss'

interface Button {
  id?: string,
  className?: string,
  disabled?: boolean,
  isLoading?: boolean, // 是否处于加载中状态
  to?: string|any, // 选填，链接地址
  openInNewTab?: boolean, // 选填，是否新标签打开
  download?: string, // 选填，文件下载名，留空则为不需要下载
  fullWidth?: boolean, // 全屏宽度
  borderRounded?: boolean, // 左右两边是否为半圆
  children?: ReactNode,
  onClick?: (e: MouseEvent) => void,
  [index: string]: any
}

const Button = (props: Button) => {
  const {
    id,
    className,
    disabled = false,
    isLoading = false,
    onClick,
    to,
    download,
    fullWidth,
    children,
    borderRounded = false
  } = props

  const _onClick = (e: MouseEvent) => {
    e && e.stopPropagation()
    if (isLoading) return
    typeof onClick === 'function' && onClick(e)
  }

  // 样式相关
  const classNames = [
    'btn',
    disabled && 'btn--disabled',
    borderRounded && 'btn--border-rounded',
    fullWidth && 'btn--fullwidth',
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
