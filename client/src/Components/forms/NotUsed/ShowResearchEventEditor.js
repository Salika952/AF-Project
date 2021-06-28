import React, { Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";

class ShowResearchEventEditor extends Component {
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


    deleteResearch(id){
        axios.delete(`http://localhost:4002/ResearchEvent/${id}`)
            .then(response => {
                this.setState({ ResearchEvents: response.data.data });
            })
    }




    render() {
        return (
            <div className="container">
                <h1>Categories</h1>
                {this.state.ResearchEvents.length > 0 && this.state.ResearchEvents.map((item, index) => (
                    <div key={index} className="card mb-3">
                        <div className="p-3" >
                            <img src={item.res_img} alt="Logo" />
                            <h4>Topic: {item.res_topic}</h4>
                            <h6>Description: {item.res_description}</h6>
                            <h6>Fee: {item.res_presenterFee}</h6>
                            <h6><small> {item.res_AdminStatus}</small></h6>
                            <button className="btn btn-danger" onClick={() => this.deleteResearch(item._id)}>Delete</button>

                            <Link to = {{
                                pathname:'/researchUpdate',
                                resEditProps:{
                                    researchID: item._id
                                }
                            }}><button className="btn btn-success" >Update</button></Link>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default ShowResearchEventEditor;