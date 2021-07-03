import React, { Component} from 'react';
import axios from 'axios';
import ReviewerNavBar from "../navbar/reviewerNavBar";


class ReviewerProposal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proposal: []
        }
    }

    // componentDidMount() {
    //     axios.get('http://localhost:4002/ProposalEvents/')
    //         .then(response => {
    //             this.setState({ proposal: response.data.data });
    //         })
    // }

    componentDidMount() {
        axios.get(`http://localhost:4002/WorkshopEvents/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ proposal: response.data.data.work_proposal});
            })
    }


    acceptProposal(proposalId,name) {
        let proposal = {
            propo_validation: true,
        };
        axios.put(`http://localhost:4002/ProposalEvents/${proposalId}`, proposal)
            .then(response => {
                alert('Proposal Data successfully updated')

                let sent = {
                    status: name +"  accepted proposal",
                };
                axios.post('http://localhost:4002/WorkshopEvents/mail/send', sent)
                    .then(response => {
                        alert('Email Sent');
                        window.location.reload(false);
                    })
                    .catch(error => {
                        console.log(error.message);
                        alert(error.message)
                    })



            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    declineProposal(proposalId,name) {

        let proposal = {
            propo_validation: false,
        };
        axios.put(`http://localhost:4002/ProposalEvents/${proposalId}`, proposal)
            .then(response => {
                alert('Proposal Data successfully updated')

                let sent = {
                    status: name +"  decline proposal",
                };
                axios.post('http://localhost:4002/WorkshopEvents/mail/send', sent)
                    .then(response => {
                        alert('Email Sent');
                        window.location.reload(false);
                    })
                    .catch(error => {
                        console.log(error.message);
                        alert(error.message)
                    })

            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })

    }

    render() {
        return (
            <div>
                <ReviewerNavBar/>
                <div className="container p-3 my-3 bg-dark text-black-100">
                    <h1  className="text-white">Proposal</h1>
                    {this.state.proposal.length > 0 && this.state.proposal.map((item, index) => (
                        <div key={index} className="card mb-3">
                            {/*<div className="p-3" onClick={e => this.navigateSubjectPage(e, item._id)}>*/}
                                <img src={item.propo_pres} alt="Proposal" />
                                <h4>Name: {item.propo_author}</h4>
                                <h5>Contact: {item.propo_contact}</h5>
                                <h5>Sign: {item.propo_sign}</h5>
                                <h6>Validation: {item.propo_validation}</h6>
                                <button className="btn btn-success" onClick={e => this.acceptProposal(item._id,item.propo_content)}>Accept</button>
                                &nbsp;
                                <button className="btn btn-danger" onClick={e => this.declineProposal(item._id,item.propo_content)}>Decline</button>
                            {/*</div>*/}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default ReviewerProposal;
