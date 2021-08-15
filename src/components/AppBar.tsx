import React from 'react'
import './AppBar.scss'
import ReactSVG from 'react-svg'
import iconGithub from '../assets/github.svg'

const AppBar = () => {
  return (
    <header className='appbar'>
      <div className='brand'>
        <h1 className='app-title'>The · Favicon</h1>
        <p className='app-intro'>一键生成各种 Favicon</p>
      </div>
      <div className='social-links'>
        <a href='https://github.com/thewashingtonhua/the-favicon' target='_blank' rel='noopener noreferrer'>
          <ReactSVG src={iconGithub} />
        </a>
      </div>
    </header>
  )
}

export default AppBar
