import React from "react";
import {connect} from "react-redux";
import {Signout} from "../../Actions/Authentication";
import { Redirect } from "react-router-dom";

const ReviewerPage = ({isLoggedIn,logOut}) => {

    return (
        <div>
            <div>
                <h1>Reviewer Pages</h1>
                {
                    isLoggedIn ? (

                            <div>
                                <h1>You have log in</h1>
                                <br/>

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

export default connect(mapStateToProps,{ logOut: Signout})(ReviewerPage);