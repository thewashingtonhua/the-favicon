import React, { memo, ReactNode } from 'react'

interface NewTabLink {
  id?: string,
  className?: string,
  href?: string,
  to?: string,
  download?: string,
  children?: ReactNode
}

/**
 * @description 在新标签中打开
 */
const NewTabLink = (props: NewTabLink) => {
  const options = {
    href: props.to || props.href || '',
    ...props
  }

  return (
    <a target='_blank' rel='noopener noreferrer' {...options}>{props.children}</a>
  )
}

export default memo(NewTabLink)
