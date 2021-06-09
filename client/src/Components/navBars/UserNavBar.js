import React, { Component } from 'react';

class UserNavbar extends Component {
  constructor(props) {
    super(props);
  }

  //react support only className
  render() {
    return (
      <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
              <a className="navbar-brand" href="#">User</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse"
                      data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                      aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav">
                      <li className="nav-item">
                          <a className="nav-link active" aria-current="page" href="/conferences">Conference</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" href="/keynotes">Keynote</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" href="/researchEvents">Research Paper Events</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" href="/workshopEvents">Workshop Events</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" href="/contactUs">Contact Us</a>
                      </li>
                  </ul>
              </div>
              <div className="float-right">
                  <form className="form-inline my-2 my-lg-0">
                      <button className="btn btn-outline-danger my-2 my-sm-0" type="submit">Logout</button>
                  </form>
              </div>
          </nav>
      </div>
    )
  }
}

export default UserNavbar;