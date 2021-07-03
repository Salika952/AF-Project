import React, { Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";
import moment from 'moment';
import EditorNavbar from "../navbar/editorNavbar";
import swat from "sweetalert2";

const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Deleted Successfully!',
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
        axios.delete(`http://localhost:4002/Conference/${id}`);

        SubmissionAlert();
        window.location.reload(false);
    }



    render() {
        return (
            <div>
                <EditorNavbar/>
                <div className="container p-3 my-3 bg-dark text-black-100">
                    <h1  className="text-white">Conferences</h1>
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
                                &nbsp;
                                <Link to = {{
                                    pathname:'/conferenceUpdate',
                                    conEditProps2:{
                                        conferenceID: item._id
                                    }
                                }}><button className="btn btn-success" >Update</button></Link>

                                &nbsp;
                                <Link to = {{
                                    pathname:'/researchCreate',
                                    conEditProps:{
                                        conferenceID: item._id,
                                        conferenceName:item.con_name
                                    }
                                }}><button className="btn btn-primary" >Add Research Event</button></Link>
                                &nbsp;
                                <Link to = {{
                                    pathname:'/addWorkshop',
                                }}><button className="btn btn-primary" >Add Workshop Event</button></Link>
                                &nbsp;
                                <Link to = {{
                                    pathname:'/researchByConferenceEditor',
                                    conEditProps3:{
                                        conferenceID: item._id
                                    }
                                }}><button className="btn btn-warning" >Research Events</button></Link>
                                &nbsp;
                                <Link to = {{
                                    pathname:'/editorWorkshop',
                                }}> &nbsp;<button className="btn btn-warning" >Workshop Events</button></Link>
                            </div>
                        </div>
                    ))}
                    &nbsp;
                    <Link to = {{
                        pathname:'/conferenceCreate'
                    }}><button className="btn btn-dark" >Create Conferences</button></Link>
                </div>
            </div>
        )
    }
}

export default ShowConferencesEditor;