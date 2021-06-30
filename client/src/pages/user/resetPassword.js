import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import swat from "sweetalert2";
const RegisteredAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'You have successfully registered',
        showConfirmButton: false,
        timer: 3000
    });
}

const RegisterFail = () => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Registration Error!'
    })
}
class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state={
            password:'',
            confirm_password:'',
            token:''
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    componentDidMount() {
        let token1= this.props.match.params.id
        console.log(token1)
        this.setState({
            token:token1
        })

    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        let user = {
            user_password: this.state.password
        }
        if(isMatch(this.state.password,this.state.confirm_password)) {
            console.log('DATA TO SEND', user);
            axios.post('http://localhost:4002/users/reset_password', user, {
                headers: {Authorization: this.state.token}
            })
                .then(response => {
                    RegisteredAlert();
                })
                .catch(error => {
                    console.log(error.message);
                    RegisterFail();
                })
        }
    }
    render() {
        return (
            <div>
                <section className="space-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-7 col-lg-5">
                                <div className="con-control p-4 p-md-5">
                                    <h1 className="text-center mb-4">Reset Password</h1>
                                    <form onSubmit={this.onSubmit}>
                                        <label htmlFor="exampleDropdownFormEmail2" className="form-label">Email address</label>
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                id="password"
                                                placeholder="password"
                                                value={this.state.password}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Confirm Password</label>
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="confirm_password"
                                                id="confirm_password"
                                                placeholder="Confirm Password"
                                                value={this.state.confirm_password}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit"
                                                    className="form-control btn btn-primary">Reset Password
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
export default ResetPassword;