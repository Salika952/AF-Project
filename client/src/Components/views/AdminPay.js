import React, { Component} from 'react';
import axios from 'axios';
import UserNavbar from "../navBars/UserNavBar";
import EditorNavBar from "../navBars/editorNavBar";

class AdminPay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payment: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4002/payment/')
            .then(response => {
                this.setState({ payment: response.data.data });
            })
    }


    render() {
        return (
            <div>
                <EditorNavBar/>
                <div className="container">
                    <h1>Payments</h1>
                    {this.state.payment.length > 0 && this.state.payment.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <div className="p-3">
                                <h4>Credit CardNo: {item.pay_creditCardNo}</h4>
                                <h5>Amount: {item.pay_amount}</h5>
                                <h5>Description: {item.pay_description}</h5>
                                <button className="btn btn-success" onClick={e => this.navigateEditPage(e, item._id)}>Accept</button>
                                <button className="btn btn-danger" onClick={e => this.deletePaper(item._id)}>Decline</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default AdminPay;
