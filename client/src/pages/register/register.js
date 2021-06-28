import React, {Component} from 'react';
import axios from 'axios';
import swat from "sweetalert2";
import { Link } from 'react-router-dom'
import Header from "../../Component/navbar/guestHeader";
import FileBase from 'react-file-base64';


const RegisteredAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Register Successfully ',
        showConfirmButton: false,
        timer: 3000
    });
}

const RegisterFail = () => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Register Error!'
    })
}

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName:'',
            email:'',
            telephone:'',
            address:'',
            password: '',
            image:''
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e){
        e.preventDefault();
        let user = {
            user_name: this.state.fullName,
            user_email: this.state.email,
            user_telephone: this.state.telephone,
            user_address: this.state.address,
            user_password: this.state.password,

        }
        console.log('DATA TO SEND', user);
        axios.post('http://localhost:4002/users/register', user)
            .then(response => {
                RegisteredAlert();
            })
            .catch(error => {
                console.log(error.message);
                RegisterFail();
            })
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                <h1>Sign Up</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="fullName"
                            id="fullName"
                            placeholder="Full Name"
                            value={this.state.fullName}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="name@example.com"
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Telephone Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="telephone"
                            id="telephone"
                            placeholder="Tel No"
                            value={this.state.telephone}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Address</label>
                        <textarea
                            className="form-control"
                            name="address"
                            id="address"
                            rows="3"
                            value={this.state.address}
                            onChange={this.onChange}
                        >
                    </textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">password</label>
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

                    <button type="submit" className="btn btn-primary">Submit</button>
                    <p>Already an account? <Link to="/login">Login</Link></p>
                </form>
            </div>
            </div>
        );
    }
}

export default Register;