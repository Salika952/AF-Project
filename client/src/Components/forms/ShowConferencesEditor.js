import React, { Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";
import moment from 'moment';
import EditorNavbar from "../navbar/editorNavbar";

class ShowConferencesEditor extends Component {
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


    deleteConference(id){
        axios.delete(`http://localhost:4002/Conference/${id}`)
            .then(response => {
                this.setState({ Conferences: response.data.data });
            })
    }



    render() {
        return (
            <div>
                <EditorNavbar/>
                <div className="container">
                    <h1>Conferences</h1>
                    {this.state.Conferences.length > 0 && this.state.Conferences.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <div className="p-3" >
                                <img src={item.con_img} alt="Logo" />
                                <h4>Name: {item.con_name}</h4>
                                <h6>Theme: {item.con_theme}</h6>
                                <h6>Venue: {item.con_venue}</h6>
                                <h6>Date & Time: {moment(item.con_date).format('Do of MMMM, YYYY')}</h6>
                                <h6>Fee: {item.con_amount}</h6>
                                <h6><small> {item.con_AdminStatus}</small></h6>


                                <button className="btn btn-danger" onClick={() => this.deleteConference(item._id)}>Delete</button>

                                <Link to = {{
                                    pathname:'/conferenceUpdate',
                                    conEditProps2:{
                                        conferenceID: item._id
                                    }
                                }}><button className="btn btn-success" >Update</button></Link>


                                <Link to = {{
                                    pathname:'/researchCreate',
                                    conEditProps:{
                                        conferenceID: item._id
                                    }
                                }}><button className="btn btn-primary" >Add Research Event</button></Link>

                                <Link to = {{
                                    pathname:'/researchByConferenceEditor',
                                    conEditProps3:{
                                        conferenceID: item._id
                                    }
                                }}><button className="btn btn-warning" >Research Events</button></Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default ShowConferencesEditor;