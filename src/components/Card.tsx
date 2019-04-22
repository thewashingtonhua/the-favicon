import React, { memo, ReactNode } from 'react'
import './Card.scss'

interface CardProps {
  id?: string,
  className?: string,
  children?: ReactNode
}

const Card = (props: CardProps) => {
  const { id, className, children } = props
  const classNames = [
    'caibao-card',
    className
  ].filter(Boolean)

  const _props: CardProps = {
    className: classNames.join(' ')
  }
  if (id) {
    _props.id = id
  }

  return (
    <div {..._props}>
      { children }
    </div>
  )
}

export default memo(Card)
