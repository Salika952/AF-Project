import React, {Component} from 'react';
import axios from "axios";

class AdminNavBar extends Component {
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
    }
    render() {
        return (
            <div>
                <div className="container-parent2">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="/admin">Conference 2021</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="/conferenceAdminShow">Conferences</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/researchAdminShow">Research Events</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/adminWorkshop">Workshops Events</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/editorPaper">Research Papers</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/userProposal">Workshop Proposal</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/get_all_users">Users All</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/admin_register">Create User</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/notification">Create Notification</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/allNotification">All Notification</a>
                                    </li>
                                </ul>
                                <ul className="navbar-nav mb-2 mb-lg-0">
                                      <div className="drop-nav">
                                        <div className="float-right">
                                            <div className="image"><img src={this.state.image} alt=""/>{this.state.fullName}<i className="fa fa-angle-down"></i></div>
                                            <ul className="dropdown">
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

export default AdminNavBar;