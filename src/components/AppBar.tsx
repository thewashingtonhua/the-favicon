import React from 'react'
import './AppBar.scss'
import ReactSVG from 'react-svg'
import iconGithub from '../assets/github.svg'

const AppBar = () => {
  return (
    <header className='appbar'>
      <h1 className='app-title'>The · Favicon</h1>
      <div className='social-links'>
        <a href='https://github.com/tonghuashuo/the-favicon' target='_blank' rel='noopener noreferrer'>
          <ReactSVG src={iconGithub} />
        </a>
      </div>
    </header>
  )
}

export default AppBar
