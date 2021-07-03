import React, {Component} from 'react';
import axios from 'axios';
import {SERVER_ADDRESS} from "../../Constants/Constants";
import swat from "sweetalert2";
import AdminNavBar from "../../Components/navbar/adminNavBar";
import {Link} from "react-router-dom";
import {isEmpty, isEmail, isLengthMobile, isLength} from "../../utils/validation";

const RegisteredAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'You have successfully registered',
        showConfirmButton: false,
        timer: 3000
    });
}

const RegisterFail = (message) => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
    })
}

class AdminRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName:'',
            email:'',
            telephone:'',
            address:'',
            position:"",
            password: ''
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        let subject = {
            user_name: this.state.fullName,
            user_email: this.state.email,
            user_telephone: this.state.telephone,
            user_address: this.state.address,
            user_position: this.state.position,
            password: this.state.password
        }
        if (isEmpty(this.state.fullName) || isEmpty(this.state.email) || isEmpty(this.state.telephone) || isEmpty(this.state.address) || isEmpty(this.state.position)  || isEmpty(this.state.password)) {
            let message = "Please Fill the Field"
            RegisterFail(message);
        } else if (isLength(this.state.password)) {
            let message = " Password at least 3 characters"
            RegisterFail(message);
        } else if (!isEmail(this.state.email)) {
            let message = "Invalid Email"
            RegisterFail(message);
        } else if (!isLengthMobile(this.state.telephone)) {
            let message = "Mobile, Please enter 10 Numbers"
            RegisterFail(message);
        } else {
            console.log('DATA TO SEND', subject);
            axios.post(SERVER_ADDRESS + '/users/admin_register', subject)
                .then(response => {
                    RegisteredAlert();
                })
                .catch(error => {
                    console.log(error.message);
                    let message = "Registration Failed"
                    RegisterFail(message);
                })
        }
    }
    render() {
        return (
            <div>
                <AdminNavBar/>
                <section className="space-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-7 col-lg-5">
                                <div className="con-control p-4 p-md-5">
                                    <h1 className="text-center mb-4">Admin Register</h1>
                                    <form  onSubmit={this.onSubmit}>
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Full Name</label>
                                        <div className="form-group">
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
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                                        <div className="form-group d-flex">
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
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Telephone Number</label>
                                        <div className="form-group d-flex">
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
                                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Address</label>
                                        <div className="form-group d-flex">
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
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Position</label>
                                        <div className="form-group d-flex">
                                            <select
                                                className="form-control"
                                                name="position"
                                                id="exampleInputPosition"
                                                value={this.state.position}
                                                onChange={this.onChange}
                                                required>
                                                <option value="" selected disabled>Select&nbsp;Position</option>
                                                <option value={'user'}>User</option>
                                                <option value={'editor'}>Editor</option>
                                                <option value={'reviewer'}>Reviewer</option>
                                                <option value={'admin'}>Administrator</option>
                                            </select>
                                        </div>
                                        <label htmlFor="exampleFormControlInput1" className="form-label">password</label>
                                        <div className="form-group d-flex">
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
                                        <div className="form-group">
                                            <button type="submit"
                                                    className="form-control btn btn-primary">Register
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        );
    }
}
export default AdminRegister;