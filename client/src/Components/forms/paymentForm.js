import React, { Component} from 'react';
import Select from 'react-select';
import axios from 'axios';

const initialState = {
    pay_creditCardNo: '',
    pay_amount: '',
    pay_description: '',

}
class PaymentForm extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        let payment = {
            pay_creditCardNo: this.state.pay_creditCardNo,
            pay_amount: this.state.pay_amount,
            pay_description: this.state.pay_description
        }
        console.log('DATA TO SEND', payment);
        axios.post('http://localhost:4002/payment/', payment)
            .then(response => {
                alert('Data successfully inserted')
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render() {
        return (
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
        )
    }
}

export default PaymentForm;