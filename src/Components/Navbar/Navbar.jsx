import { Link } from 'react-router-dom'
import style from './Navbar.module.css'
import logo from './LOGO.jpg'


function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixedNAV">
            <div className="container">
                <a className="navbar-brand" href="/"><img className={style.logo} src={logo} alt="logo" width="90" height="34" /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/movies">Movies</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/shows">TV-Series</Link>
                        </li>
                    </ul>
                    {
                        props.userData ?
                            <div>
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/account">Account</Link>
                                    </li>
                                    <li className="nav-item">
                                        <span className="nav-link span-btn" onClick={props.logout}>Log out</span>
                                    </li>
                                </ul>
                            </div>
                            :
                            <div>
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/signup">Sign Up</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Log in</Link>
                                    </li>
                                </ul>
                            </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar