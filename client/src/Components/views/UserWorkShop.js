import React, { Component} from 'react';
import axios from 'axios';
import UserNavbar from "../navbar/UserNavBar";


class UserWorkshop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workshop: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4002/WorkshopEvents/')
            .then(response => {
                this.setState({ workshop: response.data.data });
            })
    }


    navigateProposalPage(e, workshopId) {
        window.location = `/addProposal/${workshopId}`
    }


    render() {
        return (
            <div>
                <UserNavbar/>
                <div className="container p-3 my-3 bg-dark text-black-100">
                    <h1  className="text-white">Workshop</h1>
                    {this.state.workshop.length > 0 && this.state.workshop.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <div className="p-3" >
                                <img src={item.work_image} alt="WorkShops"  width="800px"  height="600px" />
                                <h4>Topic: {item.work_topic}</h4>
                                <h6>Description: {item.work_description}</h6>
                                <h6>Place: {item.work_place}</h6>
                                <h6>Validation: {item.work_validation}</h6>
                                {/*<iframe*/}
                                {/*    src={item.work_template}*/}
                                {/*    width="60px"*/}
                                {/*    height="60px"*/}
                                {/*    frameBorder="0"*/}
                                {/*>*/}
                                {/*</iframe>*/}

                                <button className="btn btn-success" onClick={e => this.navigateProposalPage(e, item._id)}>Be a Conductor</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default UserWorkshop;
