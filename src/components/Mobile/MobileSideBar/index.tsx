import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import s from './style.module.scss'

const MobileSideBar = () => {
  const location = useLocation()

  const page = location.pathname

  console.log(page);
  

  return (
    <div className={s.container}>
      <div className={s.iconsList}>
        <Link to="/menu">
          <div className={`${s.icon} ${page === '/menu' && s.selected}`}><FontAwesomeIcon size='2x' icon="bars" /></div>
        </Link>
        <Link to="/list">
          <div className={`${s.icon} ${page === '/list' && s.selected}`}><FontAwesomeIcon size='2x' icon="list" /></div>
        </Link>
        <Link to="/">
          <div className={`${s.icon} ${page === '/' && s.selected}`}><FontAwesomeIcon size='2x' icon="house" /></div>
        </Link>
        <Link to="/create-note">
          <div className={`${s.icon} ${page === '/create-note' && s.selected}`}><FontAwesomeIcon size='2x' icon="circle-plus" /></div>
        </Link>
      </div>
    </div>
  )
}

export default MobileSideBar