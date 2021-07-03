import React, { Component} from 'react';
import axios from 'axios';
import ReviewerNavBar from "../navbar/reviewerNavBar";


class ReviewerWorkshop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workshops: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4002/WorkshopEvents/')
            .then(response => {
                this.setState({workshops: response.data.data });
            })
    }



    navigateProposalWorkShopPage(e, workShopId) {
        window.location = `/reviewerProposal/${workShopId}`
    }

    render() {
        return (
            <div>
                <ReviewerNavBar/>
                <div className="container p-3 my-3 bg-dark text-black-100">
                    <h1  className="text-white">Workshop</h1>
                    {this.state.workshops.length > 0 && this.state.workshops.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <div className="p-3">
                                <img src={item.work_image} alt="WorkShops"  width="600px"  height="600px" />
                                <h4>Topic: {item.work_topic}</h4>
                                <h6>Description: {item.work_description}</h6>
                                <h6>Place: {item.work_place}</h6>
                                <h6>Validation: {item.work_validation}</h6>
                                <button className="btn btn-success" onClick={e => this.navigateProposalWorkShopPage(e, item._id)}>Go To Proposals</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default ReviewerWorkshop;
