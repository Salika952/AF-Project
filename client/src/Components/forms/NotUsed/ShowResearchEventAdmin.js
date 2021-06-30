import React, { Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";
import AdminNavBar from "../../navbar/adminNavBar";
import swat from "sweetalert2";

const SubmissionAlert1 = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Research Event Declined!',
        showConfirmButton: false,
        timer: 3000
    });
}

const SubmissionAlert2 = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Research Event Accepted!',
        showConfirmButton: false,
        timer: 3000
    });
}

const SubmissionFail = () => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Submission Error!'
    })
}

class ShowResearchEventUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ResearchEvents: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4002/ResearchEvent/')
            .then(response => {
                this.setState({ ResearchEvents: response.data.data });
            })


    }

    declineResearch(id){
        let research = {
            res_validation: false,
            res_AdminStatus:'Declined'
        };

        axios.put(`http://localhost:4002/ResearchEvent/${id}`, research)
            .then(response => {
                SubmissionAlert1();
                window.location.reload(false);
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    acceptResearch(id){

        let research = {
            res_validation: true,
            res_AdminStatus:'Accepted'
        };

        axios.put(`http://localhost:4002/ResearchEvent/${id}`, research)
            .then(response => {
                SubmissionAlert2();
                window.location.reload(false);
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }


    render() {
        return (
            <div>
                <AdminNavBar/>
                <div className="container p-3 my-3 bg-dark text-black-100">
                    <h1  className="text-white">Research Events</h1>
                    {this.state.ResearchEvents.length > 0 && this.state.ResearchEvents.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <div className="p-3 " >
                                <img src={item.res_img} alt="Logo" />
                                <h3>Conference: {item.res_conferenceName}</h3>
                                <h4>Topic: {item.res_topic}</h4>
                                <h6>Description: {item.res_description}</h6>
                                <h6>Fee: {item.res_presenterFee}</h6>
                                <h6><small> {item.res_AdminStatus}</small></h6>

                                <button className="btn btn-success" onClick={() => this.acceptResearch(item._id)}>Accept</button>
                                &nbsp;
                                <button className="btn btn-danger" onClick={() => this.declineResearch(item._id)}>Decline</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default ShowResearchEventUser;