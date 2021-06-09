import React, { Component } from 'react';

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                    <a className="navbar-brand" href="#">
                         Guest</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Courses</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/conferences">Conferences</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/researchEvents">Research Events</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/workshopEvents">Workshop Events</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/keynotes">Keynotes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/other">Other</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/contactUs">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                    <div className="float-right">
                        <form className="form-inline my-2 my-lg-0">
                            <button className="btn btn-outline-success my-2 my-sm-1" type="submit">Sign Up</button>
                            <button className="btn btn-outline-success my-2 my-sm-1" type="submit">Log In</button>
                        </form>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;

