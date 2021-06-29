import React ,{Component} from "react";
import {connect} from "react-redux";
import {Signout} from "../../Actions/Authentication";
import { Redirect } from "react-router-dom";
import NavBar from "../../Components/navbar/UserNavBar";

class User extends Component {
    render() {
        return (
            <div>
                <NavBar/>
            </div>
        );
    }
}

export default User;