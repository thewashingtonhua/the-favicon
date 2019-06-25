import React from 'react'
import ReactLoading, { LoadingProps } from 'react-loading'
import './Loading.scss'

interface Loading {
  size?: number
}

/**
 * @description 加载组件
 */
const Loading = (props: Loading) => {
  const {
    size = 64
  } = props

  const otherProps: LoadingProps = {
    width: size,
    height: size
  }

  return (
    <div className='loading'>
      <ReactLoading type='spinningBubbles' color='#999' {...otherProps} />
    </div>
  )
}

export default Loading
