import React, { Component} from 'react';
import axios from 'axios';
import reviewerNavBar from "../navbar/reviewerNavBar";

class ReviewerProposal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proposal: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4002/ProposalEvents/')
            .then(response => {
                this.setState({ proposal: response.data.data });
            })
    }

    acceptPaper(proposalId) {
        let proposal = {
            propo_validation: true,
        };
        axios.put(`http://localhost:4002/ProposalEvents/${proposalId}`, proposal)
            .then(response => {
                alert('Category Data successfully updated')
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    declinePaper(proposalId) {

    }

    render() {
        return (
            <div>
                <reviewerNavBar/>
                <div className="container">
                    <h1>Proposal</h1>
                    {this.state.proposal.length > 0 && this.state.proposal.map((item, index) => (
                        <div key={index} className="card mb-3">
                            {/*<div className="p-3" onClick={e => this.navigateSubjectPage(e, item._id)}>*/}
                               <img src={item.propo_pres} alt="Proposal" />
                                <h4>Name: {item.propo_author}</h4>
                                <h5>Contact: {item.propo_contact}</h5>
                                <h5>Sign: {item.propo_sign}</h5>
                                <h6>Validation: {item.propo_validation}</h6>
                                <button className="btn btn-success" onClick={e => this.acceptPaper(item._id)}>Accept</button>
                                <button className="btn btn-danger" onClick={e => this.declinePaper(item._id)}>Decline</button>
                            {/*</div>*/}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default ReviewerProposal;
