import React from 'react'

function Header() {
    return (
        <div className="container-parent2">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Conference 2021</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page"
                                   href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Keynotes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Conferences</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/contactUs">Contact Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/aboutUs">About Us</a>
                            </li>

                        </ul>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
