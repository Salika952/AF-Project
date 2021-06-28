import React from "react";
import {connect} from "react-redux";
import {Signout} from "../../Actions/Authentication";
import { Redirect } from "react-router-dom";
import AdminNavBar from "../../Component/navbar/adminNavBar";
const AdminPage = ({isLoggedIn,logOut}) => {

    return (
        <div>
            <div>
                <AdminNavBar/>
                <h1>Admin Pages</h1>
                {
                    isLoggedIn ? (

                            <div>
                                <h1>You have log in</h1>
                                <br/>
                                <button><a href="/notification">
                                    Notification
                                </a></button>
                                <button><a href="/admin_register">
                                    Register
                                </a></button>
                                <button><a href="/get_all">
                                    Get All
                                </a></button>
                                <button onClick={() => logOut()}>
                                    Log out
                                </button>
                            </div>
                        ) :
                        (
                            <div>
                                <Redirect to="/"></Redirect>
                            </div>
                        )
                }
            </div>
        </div>
    );
}


const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
});

export default connect(mapStateToProps,{ logOut: Signout})(AdminPage);