import React, {Component} from 'react';
import swat from "sweetalert2";
import axios from "axios";
import Header from "../../Components/navbar/guestHeader";
import {Link} from "react-router-dom";
import {isEmail,isEmpty} from '../../utils/validation'

const ForgotAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'You have Successfully Forgot Password',
        showConfirmButton: false,
        timer: 3000
    });
}

const ForgotFail = (message) => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
    })
}

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:''
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e){
        e.preventDefault();
        let forgot = {
            user_email: this.state.email,
        }
        if(isEmpty(this.state.email)){
            let message="Please Fill the Field"
            ForgotFail(message);
        }else if(!isEmail(this.state.email)){
            let message="Invalid Email"
            ForgotFail(message);
        }else{
        console.log('DATA TO SEND', forgot);
        axios.post('http://localhost:4002/users/forgot_password', forgot)
            .then(response => {
                ForgotAlert();
            })
            .catch(error => {
                console.log(error.message);
                let message="Forgot Error"
                ForgotFail(message);
            })
         }
    }

    render() {
        return (
            <div>
                <Header/>
                <section className="space-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-7 col-lg-5">
                                <div className="con-control p-4 p-md-5">

                                    <h1 className="text-center mb-4">Forgot Password</h1>
                                    <form onSubmit={this.onSubmit}>
                                        <label htmlFor="exampleDropdownFormEmail2" className="form-label">Email address</label>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="email"
                                                id="email"
                                                placeholder="Enter Your Email"
                                                value={this.state.email}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit"
                                                    className="form-control btn btn-primary">Forgot Password
                                            </button>
                                        </div>
                                    </form>
                                    <div className="w-50 register" >
                                        <h6>Login Page <Link to="/login">Login</Link></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default ForgotPassword;