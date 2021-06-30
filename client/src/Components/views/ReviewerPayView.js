import React, { Component} from 'react';
import axios from 'axios';
import UserNavbar from "../navbar/UserNavBar";
import ReviewerNavBar from "../navbar/reviewerNavBar";
import swat from "sweetalert2";

const SubmissionAlert1 = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Payment Accepted!',
        showConfirmButton: false,
        timer: 3000
    });
}

const SubmissionAlert2 = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Payment Rejected!',
        showConfirmButton: false,
        timer: 3000
    });
}


class ReviewerPayView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payment: [],
            status:'',

        }
    }

    componentDidMount() {
        axios.get('http://localhost:4002/payment/')
            .then(response => {
                this.setState({ payment: response.data.data });
            })
    }



    acceptPaper(paymentId,mail) {
        let payment = {
            pay_validation: true,
        };
        axios.put(`http://localhost:4002/payment/${paymentId}`, payment)
            .then(response => {
                let sent = {
                    status: mail,
                };

                console.log(mail);

                axios.post('http://localhost:4002/payment/mail',sent)
                    .then(response => {
                        alert('Email Sent');
                    })
                    .catch(error => {
                        console.log(error.message);
                        alert(error.message)
                    })

                SubmissionAlert1()

            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    declinePaper(paymentId) {
        let payment = {
            pay_validation: false,
            pay_note:'Accepted'
        };
        axios.put(`http://localhost:4002/payment/${paymentId}`, payment)
            .then(response => {

                SubmissionAlert2()
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })

    }


    render() {
        return (
            <div>
                <ReviewerNavBar/>
                <div className="container p-3 my-3 bg-dark text-black-100">
                    <h1  className="text-white">Payments</h1>
                    {this.state.payment.length > 0 && this.state.payment.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <div className="p-3">
                                <h4>Credit CardNo: {item.pay_creditCardNo}</h4>
                                <h5>Amount: {item.pay_amount}</h5>
                                <h5>Description: {item.pay_description}</h5>
                                <h6>{item.pay_email}</h6>
                                <h6><small>{item.pay_note}</small></h6>
                                <button className="btn btn-success" onClick={e => this.acceptPaper(item._id,item.pay_email)}>Accept</button>
                                &nbsp;
                                <button className="btn btn-danger" onClick={e => this.declinePaper(item._id)}>Decline</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default ReviewerPayView;
