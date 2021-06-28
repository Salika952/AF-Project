import React, {Component} from 'react';
import swat from "sweetalert2";
import axios from "axios";
import Header from "../../Component/navbar/guestHeader";

const ForgotAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'You have Successfully Forgot Password',
        showConfirmButton: false,
        timer: 3000
    });
}

const ForgotFail = () => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Forgot Error!'
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
        console.log('DATA TO SEND', forgot);
        axios.post('http://localhost:4002/users/forgot_password', forgot)
            .then(response => {
                ForgotAlert();
            })
            .catch(error => {
                console.log(error.message);
                ForgotFail();
            })
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                    <h1>Forgot Password</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Enter your email address</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                id="email"
                                placeholder="Enter Your Email"
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                            <button type="submit" className="btn btn-primary">Verify your email</button>
                            <p>please enter the work email</p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ForgotPassword;