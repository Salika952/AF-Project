import React, {Component} from 'react';
import axios from "axios";
import {SERVER_ADDRESS} from "../constraint/constraint";
import swat from "sweetalert2";
import {Redirect} from "react-router-dom";

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

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password: '',
            user: []

        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }


    componentDidMount() {
        axios.get('http://localhost:4002/api/users')
            .then(response => {
                this.setState({
                    user: response.data.data.data
                });
                console.log(this.state.user);
            }).catch =(e) =>{
            console.log(e.message);
        }


    }


    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }



    onSubmit(e){
        e.preventDefault();
        let user = {
            user_email: this.state.email,
            user_password: this.state.password
        }
        console.log('DATA TO SEND', user);
        axios.post(SERVER_ADDRESS +'/api/users/login', user)
            .then(response => {
                RegisteredAlert();

            })
            .catch(error => {
                console.log(error.message);
                RegisterFail();
            })
        return <Redirect to="/"/>
    }

    render() {
        return (
            <div className="container">
                <h1>Login</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default Login;