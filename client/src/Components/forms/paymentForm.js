import React, { Component} from 'react';
import Select from 'react-select';
import axios from 'axios';
import UserNavbar from "../navbar/UserNavBar";
import swat from "sweetalert2";
import {isEmail, isEmpty, isLength2} from "../../utils/validation";

const initialState = {
    pay_creditCardNo: '',
    pay_amount: '',
    pay_description: '',
    pay_email:'',
    pay_users:''

}

const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Payment has been done,Please check your Email for Confirmation!',
        showConfirmButton: false,
        timer: 3000
    });
}

const SubmissionFail = (message) => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
    })
}

class PaymentForm extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (!token) {
            this.setState({
                user: null
            });
            return;
        }
        this.setState({
            token:token
        })

        axios({
            method: 'get',
            url: 'http://localhost:4002/users/',
            headers: {
                Authorization: token
            },
            data: {}
        }).then(res => {
            this.setState({
                pay_users:res.data._id,
                isLoggedIn: true
            })

        }).catch(err => {
            console.log(err.message);
        })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        let payment = {
            pay_creditCardNo: this.state.pay_creditCardNo,
            pay_users: this.state.pay_users,
            pay_amount: this.state.pay_amount,
            pay_email: this.state.pay_email,
            pay_description: this.state.pay_description
        }
        if (isEmpty(this.state.pay_creditCardNo) || isEmpty(this.state.pay_amount)  || isEmpty(this.state.pay_email) ) {
            let message = "Fill the required fields"
            SubmissionFail(message);
        }else if (!isLength2(this.state.pay_creditCardNo)) {
            let message = "Enter Valid Credit Card"
            SubmissionFail(message);
        }else if (!isEmail(this.state.pay_email)) {
            let message = "Invalid Email"
            SubmissionFail(message);
        }else {
            console.log('DATA TO SEND', payment);
            axios.post('http://localhost:4002/payment/', payment)
                .then(response => {
                    SubmissionAlert()
                })
                .catch(error => {
                    console.log(error.message);
                    let message = 'Submission Error!'
                    SubmissionFail(message);
                })
        }
    }
    render() {
        return (
            <div>
                <UserNavbar/>
            <div className="container">
                <h1>Payment Details</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                    <label htmlFor="paymentCard" className="form-label">Credit Card</label>
                    <input
                        type="number"
                        className="form-control"
                        id="paymentCard"
                        name="pay_creditCardNo"
                        value={this.state.pay_creditCardNo}
                        onChange={this.onChange}
                    />
            </div>
                <div className="mb-3">
                    <label htmlFor="paymentAmount" className="form-label">Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        id="paymentAmount"
                        name="pay_amount"
                        value={this.state.pay_amount}
                        onChange={this.onChange}
                    />
                </div>
                    <div className="mb-3">
                        <label htmlFor="paymentEmail" className="form-label">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="paymentEmail"
                            name="pay_email"
                            value={this.state.pay_email}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="paymentDescription" class="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="paymentDescription"
                            rows="3"
                            name="pay_description"
                            value={this.state.pay_description}
                            onChange={this.onChange}>
            </textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
                <br/>
            </div>
        )
    }
}

export default PaymentForm;