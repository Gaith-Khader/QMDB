import React from 'react'
import style from './Footer.module.css'

function Footer() {
    return (
    <div className={style.footer}>
    <div className='container'>
        <ul>
            <li><a href="/"><i className="fa-brands fa-facebook-f"></i></a></li>
            <li><a href="/"><i className="fa-brands fa-youtube"></i></a></li>
            <li><a href="/"><i className="fa-brands fa-twitter"></i></a></li>
            <li><a href="https://www.linkedin.com/in/gaith-khader-007558253/"><i className="fa-brands fa-linkedin"></i></a></li>
        </ul>
        <p>created by <a href="https://github.com/Gaith-Khader" rel='noreferrer' target="_blank">Gaith Khader</a></p>
    </div>
    </div>
    
    )
}

export default Footer