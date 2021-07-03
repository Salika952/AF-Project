import React, {Component} from 'react';
import AdminNavBar from "../../Components/navbar/adminNavBar";
import axios from "axios";

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state={
            count:[]
        }
    }
    componentDidMount() {
        axios.get("http://localhost:4002/count/")
            .then(res=>{
                this.setState({
                    count:res.data.data
                })
            }).catch(err=>{
            alert(err.message)
        })
    }

    render() {
        return (
            <div>
                <AdminNavBar/>
            <div className="container">
                <br/>
                <br/>
                <div className="row container">
                    <div className="col-sm-3 ">
                        <div className="card text-white bg-primary">
                            <div className="card-body">
                                <h4 className="card-title">Total Conferences</h4>
                                <h2 className="card-text">{this.state.count.totalConference}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card text-white bg-danger">
                            <div className="card-body">
                                <h4 className="card-title">Notification</h4>
                                <h2 className="card-text">{this.state.count.Notification}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card text-white bg-success">
                            <div className="card-body">
                                <h4 className="card-title">Research Papers</h4>
                                <h2 className="card-text">{this.state.count.Papers}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card text-white bg-warning">
                            <div className="card-body">
                                <h4 className="card-title">Proposal</h4>
                                <h2 className="card-text">{this.state.count.ProposalCount}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="row container">
                    <div className="col-sm-3">
                        <div className="card text-white bg-info">
                            <div className="card-body">
                                <h4 className="card-title">Research Events</h4>
                                <h2 className="card-text">{this.state.count.researChcount}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card text-white bg-dark">
                            <div className="card-body">
                                <h4 className="card-title">All Users</h4>
                                <h2 className="card-text">{this.state.count.UsersCount}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card text-white bg-primary">
                            <div className="card-body">
                                <h4 className="card-title">WorkShop Event</h4>
                                <h2 className="card-text">{this.state.count.WorkshopCount}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card text-white bg-success">
                            <div className="card-body">
                                <h4 className="card-title">Payment</h4>
                                <h2 className="card-text">{this.state.count.PaymentCount}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <br/><br/>
                <br/>
                <br/>
            </div>
            </div>
        );
    }
}

export default Admin;