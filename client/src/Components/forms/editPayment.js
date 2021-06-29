import React, { Component} from 'react';
import axios from 'axios';
import UserNavbar from "../navbar/UserNavBar";

const initialState = {
    pay_creditCardNo: '',
    pay_amount: '',
    pay_description: '',

}

class EditPayment extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    // componentDidMount() {
    //
    //     axios.get(`http://localhost:4002/payment/${this.props.match.params.id}`)
    //         .then(response => {
    //             this.setState(
    //                 {
    //                     pay_creditCardNo: response.data.data.pay_creditCardNo,
    //                     pay_amount: response.data.data.pay_amount,
    //                     pay_description: response.data.data.pay_description
    //
    //                 });
    //         })
    //         .catch(error => {
    //             alert(error.message)
    //         })
    //
    // }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    onSubmit(e) {
        e.preventDefault();
        let paper = {
            pay_creditCardNo: this.state.pay_creditCardNo,
            pay_amount: this.state.pay_amount,
            pay_description: this.state.pay_description


        };
        console.log('DATA TO SEND', paper)
        axios.put(`http://localhost:4000/payment/${this.props.match.params.id}`, paper)
            .then(response => {
                alert('Category Data successfully updated')
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render() {
        return (
            <div>
                <UserNavbar/>
                <div className="container">
                    <h1>Edit Payment</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="paperContent" className="form-label">Content</label>
                            <input
                                type="text"
                                className="form-control"
                                id="paperContent"
                                name="paper_content"
                                value={this.state.paper_content}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="paperContact" className="form-label">Contact</label>
                            <input
                                type="text"
                                className="form-control"
                                id="paymentAmount"
                                name="paperContact"
                                value={this.state.paper_contact}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="paperSign" className="form-label">Sign</label>
                            <input
                                type="text"
                                className="form-control"
                                id="paperSign"
                                name="paper_sign"
                                value={this.state.paper_sign}
                                onChange={this.onChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>

        )
    }
}

export default EditPayment;