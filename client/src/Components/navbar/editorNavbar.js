import React, {Component} from 'react';
import axios from "axios";

class EditorNavbar extends Component {
    constructor(props) {
        super(props);
        this.state={
            image:'',
            fullName: ''
        }
    }
    logoutOnClick = e => {
        localStorage.removeItem('token');
        localStorage.removeItem('userPosition');
        this.setState({
            isLoggedIn: false,
            user: ''
        })
        window.location.replace('/')
    }
    componentDidMount() {
        const token = localStorage.getItem('token');
        if (!token) {
            this.setState({
                user: null
            });
            return;
        }
        this.setState({
            token:token
        })
        axios({
            method: 'get',
            url: 'http://localhost:4002/users/',
            headers: {
                Authorization: token
            },
            data: {}
        }).then(res => {
            this.setState({
                image: res.data.user_imageUrl,
                fullName: res.data.user_name,
                isLoggedIn: true
            })
        }).catch(err => {
            console.log(err.message);
        })
        axios({
            method: 'get',
            url: 'http://localhost:4002/notify/'+"editor",
            headers: {
                Authorization: token
            },
            data: {}
        }).then(res => {
            this.setState({
                notification: res.data,
                isLoggedIn: true
            })
            console.log(this.state.notification)
        })
    }
    render() {
        return (
            <div>
                <div className="container-parent2">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="/conferenceEditorShow">Conference 2021</a>
                            <button className="navbar-toggle" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggle-icon"/>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="/conferenceEditorShow">Conferences</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/researchEditorShow">Research Events</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/addWorkshop">Workshop Event</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/notify">Show Notification</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/contactUs">Contact Us</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/aboutUs">About Us</a>
                                    </li>

                                </ul>
                                <ul className="navbar-nav mb-2 mb-lg-0">
                                    <div className="drop-nav">
                                        <div className="float-right">
                                            <div className="image">  <img src={this.state.image} alt=""/>{this.state.fullName}<i className="fa fa-angle-down"></i></div>
                                            <ul className="dropdown">
                                                <li><a href='/profile'>Profile</a></li>
                                                <li><a onClick={this.logoutOnClick}>Logout</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}

export default EditorNavbar;