import React, {useState} from 'react';
import {LoadUser, LoadUserOther, LoginUser} from "../../Actions/Authentication";
import {Redirect, Link } from "react-router-dom";
import {connect} from 'react-redux';
import swat from "sweetalert2";
import Header from "../../Components/navbar/guestHeader";
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

            if (!localStorage.getItem('userEmail')) {
                localStorage.setItem('userEmail', res.data.user_email);
            }

            if (!localStorage.getItem('fullName')) {
                localStorage.setItem('fullName', res.data.user_name);
            }
        });

        switch (user.position) {
            case 'admin':
                if (!localStorage.getItem('admin')) {
                    localStorage.setItem('admin', "true");
                }
                if (!localStorage.getItem('userId')) {
                    localStorage.setItem('userId', user.userId);
                }
                return <Redirect to="/admin"/>
            case 'editor':
                if (!localStorage.getItem('editor')) {
                    localStorage.setItem('editor', "true");
                }
                if (!localStorage.getItem('userId')) {
                    localStorage.setItem('userId', user.userId);
                }
                return <Redirect to="/editor"/>
            case 'reviewer':
                if (!localStorage.getItem('reviewer')) {
                    localStorage.setItem('reviewer', "true");
                }
                if (!localStorage.getItem('userId')) {
                    localStorage.setItem('userId', user.userId);
                }
                return <Redirect to="/reviewer"/>
            case 'user':
                if (!localStorage.getItem('userType')) {
                    localStorage.setItem('userType', user.position);
                }

                if (!localStorage.getItem('userId')) {
                    localStorage.setItem('userId', user.userId);
                }
                return <Redirect to="/user"/>
        }
    }

    const fieldmissAlart = ()=>{
        swat.fire({
            icon: 'question',
            title: 'OOps! something missing',
            text: 'Please enter username and password!'
        })
    }


    const onChange = e => {
        setData({...data, [e.target.name]: e.target.value})
    };

    const submitData = (event) => {

        event.preventDefault();

        if (user_email === "" || user_password === "") {
            fieldmissAlart();
        } else {
            loginUser(user_email, user_password);
            //console.log(loginValue);
        }


    };
        return (
            <div>
                <Header/>
                <div className="container">
                    <h1>Login</h1>
                    <form onSubmit={(event) => submitData(event)}>
                        <div className="form-group-1">
                            <label htmlFor="exampleDropdownFormEmail2" className="form-label">Email address</label>
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
                        <div className="form-group-1">
                            <label htmlFor="exampleDropdownFormPassword2" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="user_password"
                                placeholder="Password"
                                onChange={(e) => onChange(e)}
                                value={user_password}
                                name="user_password"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                    <p>New Customer? <Link to="/register">Register</Link></p>
                    <p> <Link to="/forgot">Forgot Password</Link></p>
                </div>
            </div>
        );
    }

const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
})

export default connect(mapStateToProps, {loginUser: LoginUser})(Login);