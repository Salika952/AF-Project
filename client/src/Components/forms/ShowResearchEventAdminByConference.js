import React, { Component} from 'react';
import axios from 'axios';
import adminNavBar from "../navbar/adminNavBar";
import AdminNavBar from "../navbar/adminNavBar";
import swat from "sweetalert2";

const SubmissionAlert1 = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Declined Research Event!',
        showConfirmButton: false,
        timer: 3000
    });
}

const SubmissionAlert2 = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Accepted Research Event!',
        showConfirmButton: false,
        timer: 3000
    });
}

const SubmissionFail = () => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error!'
    })
}

class ShowResearchEventAdminByConference extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ResearchEvents: [],
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:4002/Conference/${this.props.location.conAdminProps.conferenceID}`)
            .then(response => {
                this.setState({ ResearchEvents: response.data.data.con_researchList });
                console.log(this.state.ResearchEvents);
            })


    }

    declineResearch(id,name){
        let research = {
            res_validation: false,
            res_AdminStatus:'Declined'
        };

        axios.put(`http://localhost:4002/ResearchEvent/${id}`, research)
            .then(response => {
                SubmissionAlert1();
                let sent = {
                    status: name +" Research Event Declined",
                };
                axios.post('http://localhost:4002/Conference/mail', sent)
                    .then(response => {
                        alert('Email Sent');
                    })
                    .catch(error => {
                        console.log(error.message);
                        alert(error.message)
                    })
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    acceptResearch(id,name){

        let research = {
            res_validation: true,
            res_AdminStatus:'Accepted'
        };

        axios.put(`http://localhost:4002/ResearchEvent/${id}`, research)
            .then(response => {
                SubmissionAlert2();
                let sent = {
                    status: name +" Research Event Accepted",
                };
                axios.post('http://localhost:4002/Conference/mail', sent)
                    .then(response => {
                        alert('Email Sent');
                    })
                    .catch(error => {
                        console.log(error.message);
                        alert(error.message)
                    })
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
                        <div key={index} className="card mb-3 ">
                            <div className="p-3 " >
                                <img src={item.res_img} alt="Logo" />
                                <h4>Topic: {item.res_topic}</h4>
                                <h6>Description: {item.res_description}</h6>
                                <h6>Fee: {item.res_presenterFee}</h6>
                                <h6><small> {item.res_AdminStatus}</small></h6>

                                <a className="btn btn-success" href="/conferenceAdminShow" onClick={() => this.acceptResearch(item._id,item.res_topic)}>Accept</a>
                                &nbsp;
                                <a className="btn btn-danger" href="/conferenceAdminShow" onClick={() => this.declineResearch(item._id,item.res_topic)}>Decline</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        )
    }
}

export default ShowResearchEventAdminByConference;