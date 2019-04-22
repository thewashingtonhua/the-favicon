import React, { memo } from 'react'
import './NoData.scss'

const NoData = () => {
  return (
    <div className='no-data'>
      <p>暂无数据</p>
    </div>
  )
}

export default memo(NoData)
