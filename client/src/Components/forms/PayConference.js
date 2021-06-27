import React, { Component} from 'react';
import axios from 'axios';

const initialState = {
    pay_creditCardNo: '',
    pay_users: '',
    pay_amount: '',
    pay_description: '',
    expiry:'',
    digits:'',
    conference_name:'',
    conference_id:''

}
class PayConference extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        this.state.pay_users = '60d8336614007e1848b89e92';
        this.state.pay_amount = 2000;
        this.state.conference_name = 'CCCC';
        this.state.pay_description = 'Payment for Conference';
        this.state.conference_id = "60d811524cee61152c551ecc";

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }



    onSubmit(e) {
        e.preventDefault();
        let pay = {
            pay_creditCardNo: this.state.pay_creditCardNo,
            pay_users: this.state.pay_users,
            pay_amount: this.state.pay_amount,
            pay_description: this.state.pay_description,
        };
        console.log('DATA TO SEND', pay)
        axios.post('http://localhost:4002/Payment/', pay)
            .then(response => {
                alert('Payment Data successfully inserted');

                ////////////////////////////////////////////

                let details = {
                    conferenceID: this.state.conference_id,
                    attendeeID: this.state.pay_users,
                };
                console.log('DATA TO SEND', details)
                axios.patch(`http://localhost:4002/Conference/`, details)
                    .then(response => {
                        alert('Attendee added')
                    })
                    .catch(error => {
                        console.log(error.message);
                        alert(error.message)
                    })




                ///////////////////////////////////////////


            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render() {
        return (

            <div className="container">
                <h1>Conference:{this.state.conference_name} Payment</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="con_name" className="form-label">Charge:{this.state.pay_amount}</label>
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
        )
    }
}

export default PayConference;