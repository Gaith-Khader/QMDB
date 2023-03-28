import React from 'react'
import { Link } from 'react-router-dom'
import style from './NotFound.module.css'

function NotFound() {
  return (
    <div className={style.notBody}>
      <h2 className={style.notErr}>404</h2>
      <h2 className={style.notTitle}>Page Not Found</h2>
      <Link to='/home' className={style.notBtn}>Back to Home</Link>
    </div>
  )
}

export default NotFound