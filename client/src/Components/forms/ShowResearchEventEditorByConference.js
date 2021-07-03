import React, { Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
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

class ShowResearchEventEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ResearchEvents: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:4002/Conference/${this.props.location.conEditProps3.conferenceID}`)
            .then(response => {
                this.setState({ ResearchEvents: response.data.data.con_researchList });

            })


    }


    deleteResearch(id){
        axios.delete(`http://localhost:4002/ResearchEvent/${id}`)
            .then(response => {
                this.setState({ ResearchEvents: response.data.data });
                SubmissionAlert();
            })
    }

    render() {
        return (
            <div>
                <EditorNavbar/>
                <div className="container p-3 my-3 bg-dark text-black-100">
                    <h1  className="text-white">Research Events</h1>
                    {this.state.ResearchEvents.length > 0 && this.state.ResearchEvents.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <div className="p-3" >
                                <img src={item.res_img} alt="Logo" />
                                <h4>Topic: {item.res_topic}</h4>
                                <h6>Description: {item.res_description}</h6>
                                <h6>Fee: {item.res_presenterFee}</h6>
                                <h6><small> {item.res_AdminStatus}</small></h6>
                                <a className = "btn btn-danger" href="/conferenceEditorShow" onClick={() => this.deleteResearch(item._id)}>
                                   &nbsp;Delete
                                </a>
                                &nbsp;
                                <Link to = {{
                                    pathname:'/researchUpdate',
                                    resEditProps:{
                                        researchID: item._id
                                    }
                                }}>  &nbsp;<button className="btn btn-success" >Update</button></Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default ShowResearchEventEditor;