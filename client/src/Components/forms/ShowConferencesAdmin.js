import React, { Component} from 'react';
import axios from 'axios';
import moment from 'moment'
import {Link} from "react-router-dom";

class ShowConferencesAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Conferences: [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4002/Conference/')
            .then(response => {
                this.setState({ Conferences: response.data.data });
            })
    }



    declineConference(id,name){
        let conference = {
            con_validation: false,
            con_AdminStatus:'Declined'
        };

        axios.put(`http://localhost:4002/Conference/${id}`, conference)
            .then(response => {
                alert('Declined');
                let sent = {
                    status: name +" Conference Declined",
                };
                axios.post('http://localhost:4002/Conference/mail', sent)
                    .then(response => {
                        alert('Email Sent')
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

    acceptConference(id,name){
        let conference = {
            con_validation: true,
            con_AdminStatus:'Accepted'
        };

        axios.put(`http://localhost:4002/Conference/${id}`, conference)
            .then(response => {
                alert('Accepted')
                let sent = {
                    status: name +" Conference Accepted",
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

    addToLanding(id){
        axios.patch(`http://localhost:4002/Conference/main`)
            .then(response => {

                let conference = {
                    con_main: true,
                };

                axios.put(`http://localhost:4002/Conference/${id}`, conference)
                    .then(response => {
                        alert('Added to Landing')
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
                <h1>Conferences</h1>
                {this.state.Conferences.length > 0 && this.state.Conferences.map((item, index) => (
                    <div key={index} className="card mb-3">
                        <div className="p-3" >
                            <img src={item.con_img} alt="Logo" />
                            <h4>Name: {item.con_name}</h4>
                            <h6>Theme: {item.con_theme}</h6>
                            <h6>Venue: {item.con_venue}</h6>
                            {/*<h6>Date & Time: {item.con_date}</h6>*/}
                            <h6>Date & Time: {moment(item.con_date).format('Do of MMMM, YYYY')}</h6>
                            <h6>Fee: {item.con_amount}</h6>

                            <h6><small> {item.con_AdminStatus}</small></h6>

                            <button className="btn btn-danger" onClick={() => this.declineConference(item._id,item.con_name)}>Decline</button>
                            <button className="btn btn-success" onClick={() => this.acceptConference(item._id,item.con_name)}>Accept</button>
                            <button className="btn btn-warning" onClick={() => this.addToLanding(item._id)}>Add to Main Page</button>

                            <Link to = {{
                                pathname:'/researchByConferenceAdmin',
                                conAdminProps:{
                                    conferenceID: item._id
                                }
                            }}><button className="btn btn-primary">Research Events</button></Link>

                            <button className="btn btn-primary">Workshop Events</button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default ShowConferencesAdmin;