import React from 'react'
import { Link } from 'react-router-dom'
import style from './BreakPoint.module.css'

function BreakPoint() {
    return (
    <>
    <div className="container my-5">
        <div className={`${style.main} row`}>
            <div className={`${style.left} col-md-6`}>
                <div className='d-flex flex-column justify-content-center align-items-center h-100'>
                    <h2 className='pb-3'>TV-Shows</h2>
                    <Link to='/shows' className={`${style.button}`}>Check More <i className="fa-solid fa-arrow-right"></i></Link>
                </div>
            </div>
            <div className={`${style.right} col-md-6`}>
                <div className='d-flex flex-column justify-content-center align-items-center h-100'>
                    <h2 className='pb-3'>Movies</h2>
                    <Link to='/movies' className={`${style.button}`}>Check More <i className="fa-solid fa-arrow-right"></i></Link>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default BreakPoint