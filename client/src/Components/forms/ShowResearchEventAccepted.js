import React, { Component} from 'react';
import axios from 'axios';
import UserNavbar from "../navbar/UserNavBar";


class ShowResearchEventAccepted extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ResearchEvents: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4002/ResearchEvent/getAll/accepted')
            .then(response => {
                this.setState({ ResearchEvents: response.data.data });
            })


    }

    chooseResearch(e, researchID) {
      window.location = `/researchUserShow/${researchID}`
    }

    render() {
        return (
            <div>
                <UserNavbar/>
                <div className="container p-3 my-3 bg-dark text-black-100">
                    <h1  className="text-white">Research Events</h1>
                    {this.state.ResearchEvents.length > 0 && this.state.ResearchEvents.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <div className="p-3" onClick={e => this.chooseResearch(e, item._id)}>
                                <img src={item.res_img} alt="Logo" />
                                <h4>Conference : {item.res_conferenceName}</h4>
                                <h4>Topic: {item.res_topic}</h4>
                                <h6>Description: {item.res_description}</h6>
                                <h6>Fee: {item.res_presenterFee}</h6>

                                <button className="btn btn-success" onClick={() => this.chooseResearch(item._id)}>Choose</button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default ShowResearchEventAccepted;