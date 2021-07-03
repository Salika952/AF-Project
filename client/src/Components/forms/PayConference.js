import React, { Component} from 'react';
import axios from 'axios';
import swat from "sweetalert2";
import UserNavbar from "../navbar/UserNavBar";
import {isEmail, isEmpty, isLength1, isLength2,isMatch1} from "../../utils/validation";

const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Payment Successful!',
        showConfirmButton: false,
        timer: 3000
    });
}

const SubmissionAlert2 = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Mail Sent!',
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

const SubmissionFail2 = () => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email Error!'
    })
}

const initialState = {
    pay_creditCardNo: '',
    pay_users: '',
    pay_amount: '',
    pay_description: '',
    expiry:'',
    digits:'',
    conference_name:'',
    conference_id:'',
    token:'',
    id:'',
    email:''

}
class PayConference extends Component {
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

        this.state.pay_amount = this.props.location.conProps.conferenceAmount;
        this.state.conference_name = this.props.location.conProps.conferenceName;
        this.state.pay_description = 'Payment for '+this.props.location.conProps.conferenceName+' Conference';
        this.state.conference_id = this.props.location.conProps.conferenceID;



    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }



    onSubmit(e) {
        e.preventDefault();
        if(!isLength1(this.state.digits)){
            let message = "Invalid CCV"
            SubmissionFail(message);
        }else {
            let pay = {
                pay_creditCardNo: this.state.pay_creditCardNo,
                pay_users: this.state.pay_users,
                pay_amount: this.state.pay_amount,
                pay_description: this.state.pay_description,
                pay_email: this.state.email
            };
            if (isEmpty(this.state.pay_creditCardNo) || isEmpty(this.state.pay_users) || isEmpty(this.state.pay_amount) || isEmpty(this.state.pay_description) || isEmpty(this.state.email)) {
                let message = "Fill the required fields"
                SubmissionFail(message);
            } else if (!isLength2(this.state.pay_creditCardNo)) {
                let message = "Enter Valid Credit Card"
                SubmissionFail(message);
            } else if (!isEmail(this.state.email)) {
                let message = "Invalid Email"
                SubmissionFail(message);
            } else if (!isMatch1(this.state.expiry)) {
                let message = "Invalid Date"
                SubmissionFail(message);
            } else {
                console.log('DATA TO SEND', pay)
                axios.post('http://localhost:4002/payment/', pay)
                    .then(response => {
                        SubmissionAlert();


                        let details = {
                            conferenceID: this.state.conference_id,
                            attendeeID: this.state.pay_users,
                        };
                        console.log('DATA TO SEND', details)
                        axios.patch(`http://localhost:4002/Conference/attend`, details)
                            .then(response => {


                                let mail = {
                                    to: this.state.email,
                                    conferenceName: this.state.conference_name,
                                    fee: this.state.pay_amount
                                };

                                console.log('DATA TO SEND', details)
                                axios.post(`http://localhost:4002/Conference/join/mail/to`, mail)
                                    .then(response => {
                                        SubmissionAlert2();
                                    })
                                    .catch(error => {
                                        console.log(error.message);
                                        SubmissionFail2();
                                    })
                            })
                            .catch(error => {
                                console.log(error.message);
                                alert(error.message)
                            })


                    })
                    .catch(error => {
                        console.log(error.message);
                        let message = "Payment Error"
                        SubmissionFail(message);
                    })
            }
        }
    }
    render() {
        return (
            <div>
                <UserNavbar/>
                <div className="container">
                <h1>Conference:{this.state.conference_name} Payment</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="con_name" className="form-label">Charge:{this.state.pay_amount}</label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pay_creditCardNo" className="form-label">CreditCard No:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="pay_creditCardNo"
                            name="pay_creditCardNo"
                            value={this.state.pay_creditCardNo}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="expiry" className="form-label">Expiry Date:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="expiry"
                            name="expiry"
                            placeholder="MM/YY"
                            value={this.state.expiry}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="digits" className="form-label">CVV: </label>
                        <input
                            type="number"
                            className="form-control"
                            id="digits"
                            name="digits"
                            value={this.state.digits}
                            onChange={this.onChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
                <br/>
            </div>
        )
    }
}

export default PayConference;