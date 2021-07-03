import React, {useState} from 'react';
import {LoadUser, LoadUserOther, LoginUser} from "../../Actions/Authentication";
import {Redirect, Link } from "react-router-dom";
import {connect} from 'react-redux';
import swat from "sweetalert2";
import '../login/login.css'
import Header from "../../Components/navbar/guestHeader";
import {isLength,isEmpty,isEmail} from '../../utils/validation'

const Login = ({loginUser, isLoggedIn}) => {

    let [data, setData] = useState({
        user_email: '',
        user_password: ''
    });

    let [user, setUser] = useState({
        position: '',
        userId:''
    });

    let {user_email, user_password} = data;

    if (isLoggedIn) {
        LoadUserOther().then((res) => {
            setUser({
                position: res.data.user_position,
                userId: res.data._id
            })
            if (!localStorage.getItem('userPosition')) {
                localStorage.setItem('userPosition', res.data.user_position);
            }
        });

        switch (user.position) {
            case 'admin':
                return <Redirect to="/admin"/>
            case 'editor':
                return <Redirect to="/conferenceEditorShow"/>
            case 'reviewer':
                return <Redirect to="/reviewer"/>
            case 'user':
                return <Redirect to="/conferenceUserShowLanding"/>
        }
    }

    const fieldmissAlart = (res)=>{
        swat.fire({
            icon: 'error',
            title: 'OOps! something missing',
            text: res
        })
    }


    const onChange = e => {
        setData({...data, [e.target.name]: e.target.value})
    };

    const submitData = (event) => {

        event.preventDefault();

        if (isEmpty(user_email) || isEmpty(user_password)) {
            let message="Fields are Empty"
            fieldmissAlart(message);
        }
        else if (isLength(user_password)) {
            let message="At least 3 Characters"
            fieldmissAlart(message);
        }
        else if (!isEmail(user_email)) {
            let message="Invalid Email"
            fieldmissAlart(message);
        } else {
            loginUser(user_email, user_password);
            //console.log(loginValue);
        }
    };
    return (
        <div>
            <Header/>
            <section className="space-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7 col-lg-5">
                            <div className="con-control p-4 p-md-5">
                                <div className="icon d-flex align-items-center justify-content-center">
                                    <span className="fa fa-user-o"></span>
                                </div>
                                <h1 className="text-center mb-4">Login</h1>
                                <form  onSubmit={(event) => submitData(event)}>
                                    <label htmlFor="exampleDropdownFormEmail2" className="form-label">Email address</label>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="user_email"
                                            placeholder="email@example.com"
                                            onChange={(e) => onChange(e)}
                                            value={user_email}
                                            name="user_email"
                                            />
                                    </div>
                                    <label htmlFor="exampleDropdownFormPassword2" className="form-label">Password</label>
                                    <div className="form-group d-flex">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="user_password"
                                            placeholder="Password"
                                            onChange={(e) => onChange(e)}
                                            value={user_password}
                                            name="user_password"
                                            required
                                        />
                                    </div>
                                    <div className="w-80 forgot1">
                                        <a href="/forgot">Forgot Password</a>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit"
                                                className="form-control btn btn-primary">Login
                                        </button>
                                    </div>
                                </form>
                                <div className="w-50 register" >
                                    <h6>Create an Account? <Link to="/register">Register</Link></h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
})

export default connect(mapStateToProps, {loginUser: LoginUser})(Login);