import React, { Component} from 'react';
import axios from 'axios';

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
                alert('Declined');
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
                alert('Accepted');
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
            <div className="container">
                <h1>Research Events</h1>
                {this.state.ResearchEvents.length > 0 && this.state.ResearchEvents.map((item, index) => (
                    <div key={index} className="card mb-3">
                        <div className="p-3" >
                            <img src={item.res_img} alt="Logo" />
                            <h4>Topic: {item.res_topic}</h4>
                            <h6>Description: {item.res_description}</h6>
                            <h6>Fee: {item.res_presenterFee}</h6>
                            <h6><small> {item.res_AdminStatus}</small></h6>

                            <button className="btn btn-success" onClick={() => this.acceptResearch(item._id,item.res_topic)}>Accept</button>
                            <button className="btn btn-danger" onClick={() => this.declineResearch(item._id,item.res_topic)}>Decline</button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default ShowResearchEventAdminByConference;