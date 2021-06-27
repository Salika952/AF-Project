import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import EditProposal from "../forms/Proposals/EditProposal";
import UserProposal from "../forms/views/UserProposal";
import CreateProposal from "../forms/Proposals/CreateProposal";
import ReviewerProposal from "../forms/views/ReviewerProposal";
import CreateWorkshopEditor from "../forms/Workshops/CreateWorkshopEditor";
import AdminWorkshop from "../forms/views/AdminWorkshop";
import UserWorkshop from "../forms/views/UserWorkShop";
import EditWorkShopEditor from "../forms/Workshops/EditWorkShopEditor";

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
                          <a className="nav-link" href="/userProposal">UserProposal</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" href="/reviewerProposal">ReviewerProposal</a>
                      </li>

                      <li className="nav-item">
                          <a className="nav-link" href="/editorWorkshop">EditorEditWorkShop</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" href="/addWorkshop">EditorCreateWorkshop</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" href="/adminWorkshop">AdminWorkShopApprove</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" href="/userWorkshop">UserWorkShop</a>
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



