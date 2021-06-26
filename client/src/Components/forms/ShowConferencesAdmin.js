import React, { Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";

class ShowConferencesAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Conferences: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4002/Conference/')
            .then(response => {
                this.setState({ Conferences: response.data.data });
            })
    }


    // deleteResearch(id){
    //     axios.delete(`http://localhost:4002/ResearchEvent/${id}`)
    //         .then(response => {
    //             this.setState({ categories: response.data.data });
    //         })
    // }
    //
    // updateResearch(id){
    //     window.location = `/update-researchEvent/${id}`
    // }

    declineConference(id){

    }

    acceptConference(id){

    }

    render() {
        return (
            <div className="container">
                <h1>Conferences</h1>
                {this.state.Conferences.length > 0 && this.state.Conferences.map((item, index) => (
                    <div key={index} className="card mb-3">
                        <div className="p-3" >
                            <h4>Name: {item.con_name}</h4>
                            <h6>Theme: {item.con_theme}</h6>
                            <h6>Venue: {item.con_venue}</h6>
                            <h6>Date & Time: {item.con_date}</h6>
                            <h6>Fee: {item.con_amount}</h6>


                            <button className="btn btn-danger" onClick={() => this.declineConference(item._id)}>Decline</button>
                            <button className="btn btn-success" onClick={() => this.acceptConference(item._id)}>Accept</button>

                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default ShowConferencesAdmin;