import React, { Component} from 'react';
import axios from 'axios';
import moment from 'moment'
import {Link} from "react-router-dom";
import UserNavbar from "../navbar/UserNavBar";

class ShowConferencesAccepted extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Conferences: [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4002/Conference/conAccepted/add/add')
            .then(response => {
                this.setState({ Conferences: response.data.data });
            })
    }



    render() {
        return (
            <div>
                <UserNavbar/>
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


                                <Link to = {{
                                    pathname:'/conferenceUserShow',
                                    conAcceptedProps:{
                                        conferenceID: item._id
                                    }
                                }}><button className="btn btn-primary">Enter</button></Link>


                            </div>
                        </div>
                    ))}
                </div>
            </div>


        )
    }
}

export default ShowConferencesAccepted;