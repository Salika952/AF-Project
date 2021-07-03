import React, { Component} from 'react';
import axios from 'axios';
import UserNavbar from "../navbar/UserNavBar";



class UserProposal extends Component {
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

    deletePaper(id){
        axios.delete(`http://localhost:4002/ProposalEvents/${id}`)
            .then(response => {
                this.setState({ proposal: response.data.data });
            })
        window.location = `/userProposal`
    }

    navigateEditPage(e, proposalId) {
        window.location = `/editproposal/${proposalId}`
    }

    render() {
        return (
            <div>
                <UserNavbar/>
                <div className="container p-3 my-3 bg-dark text-black-100">
                    <h1  className="text-white">Proposal</h1>
                    {this.state.proposal.length > 0 && this.state.proposal.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <div className="p-3">
                                <h4>Name: {item.propo_content}</h4>
                                <h5>Contact: {item.propo_contact}</h5>
                                <h5>Sign: {item.propo_sign}</h5>
                                <h6>Validation: {item.propo_validation}</h6>
                                <button className="btn btn-success" onClick={e => this.navigateEditPage(e, item._id)}>Edit</button>
                                &nbsp;
                                <button className="btn btn-danger" onClick={e => this.deletePaper(item._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default UserProposal;
