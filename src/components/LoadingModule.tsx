import React from 'react'
import ReactLoading, { LoadingProps } from 'react-loading'
import './LoadingModule.scss'

interface LoadingModule {
  size?: number
}

const LoadingModule = (props: LoadingModule) => {
  const {
    size = 64
  } = props

  const otherProps: LoadingProps = {
    width: size,
    height: size
  }

  return (
    <div className='loading-module'>
      <ReactLoading type='spinningBubbles' color='#999' {...otherProps} />
    </div>
  )
}

export default LoadingModule
