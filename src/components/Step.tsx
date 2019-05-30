import React from 'react'
import './Step.scss'
import { ReactCommon } from 'utils/interfaces'

interface StepProps extends ReactCommon {
  title?: string
}

const Step = (props: StepProps) => {
  const {
    className,
    children,
    title
  } = props

  const rootClassNames = [
    'step',
    className
  ].filter(Boolean).join(' ')

  return (
    <section className={rootClassNames}>
      <header className='step-header'>
        <h2 className='step-title'>{title}</h2>
      </header>
      <section className='step-body'>
        {children}
      </section>
    </section>
  )
}

export default Step
