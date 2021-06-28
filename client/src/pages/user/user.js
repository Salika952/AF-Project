import React from "react";
import {connect} from "react-redux";
import {Signout} from "../../Actions/Authentication";
import { Redirect } from "react-router-dom";
import UserNavbar from "../../Components/navbar/UserNavBar";

const UserPage = ({isLoggedIn,logOut}) => {

    return (
        <div>
            <div>
                <UserNavbar/>
                <h1>Customer Pages</h1>
                {
                    isLoggedIn ? (

                            <div>
                                <h1>You have log in</h1>
                                <br/>
                                <button><a href="/profile">
                                    Profile
                                </a>
                                </button>
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

export default connect(mapStateToProps,{ logOut: Signout})(UserPage);