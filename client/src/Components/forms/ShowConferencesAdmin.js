import React, { Component} from 'react';
import axios from 'axios';
import moment from 'moment'
import {Link} from "react-router-dom";
import AdminNavBar from "../navbar/adminNavBar";
import swat from "sweetalert2";

const SubmissionAlert1 = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Declined Conference Event!',
        showConfirmButton: false,
        timer: 3000
    });
}

const SubmissionAlert2 = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Accepted Conference Event!',
        showConfirmButton: false,
        timer: 3000
    });
}

const SubmissionAlert3 = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Added to Landing Page!',
        showConfirmButton: false,
        timer: 3000
    });
}


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
                SubmissionAlert1();
                let sent = {
                    status: name +" Conference Declined",
                };
                axios.post('http://localhost:4002/Conference/mail', sent)
                    .then(response => {
                        alert('Email Sent')
                        window.location.reload(false);
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
                SubmissionAlert2();
                let sent = {
                    status: name +" Conference Accepted",
                };
                axios.post('http://localhost:4002/Conference/mail', sent)
                    .then(response => {
                        alert('Email Sent');
                        window.location.reload(false);
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
                        SubmissionAlert3();
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
                    <h1  className="text-white">Conferences</h1>
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
                                    &nbsp;
                                    <button className="btn btn-success" onClick={() => this.acceptConference(item._id,item.con_name)}>Accept</button>
                                    &nbsp;
                                    <button className="btn btn-warning" onClick={() => this.addToLanding(item._id)}>Add to Main Page</button>
                                    &nbsp;
                                    <Link to = {{
                                        pathname:'/researchByConferenceAdmin',
                                        conAdminProps:{
                                            conferenceID: item._id
                                        }
                                    }}><button className="btn btn-primary">Research Events</button></Link>
                                   &nbsp;
                                    <Link to = {{
                                        pathname:'/adminWorkshop',
                                        conAdminProps:{
                                            conferenceID: item._id
                                        }
                                    }}>&nbsp;
                                        <button className="btn btn-primary">Workshop Events</button></Link>
                                </div>
                            </div>
                        ))}
                    </div>
            </div>
        )
    }
}

export default ShowConferencesAdmin;