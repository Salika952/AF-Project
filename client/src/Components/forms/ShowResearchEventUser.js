import React, { Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";

class ShowResearchEventUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            topic:'',
            description: '',
            fee:0
        }
    }

    componentDidMount() {
        //axios.get(`http://localhost:4002/ResearchEvent/${this.props.match.params.id}`)
        axios.get(`http://localhost:4002/ResearchEvent/60d5c8dfc56d6a30ecfe6c20`)
            .then(response => {
                this.setState({
                    topic: response.data.data.res_topic,
                    description: response.data.data.res_description,
                    fee: response.data.data.res_presenterFee,
                    id: response.data.data._id,
                });
            })


    }


    becomeResearcher(id){

    }

    render() {
        return (
            <div className="container">


                        <div className="p-3" >
                            <h4>Topic: {this.state.topic}</h4>
                            <h6>Description: {this.state.description}</h6>
                            <h6>Fee: {this.state.fee}</h6>

                            <button className="btn btn-success" onClick={() => this.becomeResearcher(this.state.id)}>Become a Researcher</button>

                        </div>
                    </div>

                )


    }
}

export default ShowResearchEventUser;