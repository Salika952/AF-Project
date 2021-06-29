import React, { Component} from 'react';
import axios from 'axios';
import FileBase from 'react-file-base64';


const initialState = {
    propo_content: '',
    propo_contact: 0,
    propo_sign: '',
    propo_pres:''

}

class FileBase extends Component {
    render() {
        return null;
    }
}

class CreateProposal extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    // onSubmit(e) {
    //     e.preventDefault();
    //     let proposal = {
    //         propo_content: this.state.propo_content,
    //         propo_contact: this.state.propo_contact,
    //         propo_sign: this.state.propo_sign,
    //         pdf: this.state.pdf
    //     }
    //     console.log('DATA TO SEND', proposal);
    //     axios.post('http://localhost:4002/ProposalEvents', proposal)
    //         .then(response => {
    //             alert('Data successfully inserted')
    //         })
    //         .catch(error => {
    //             console.log(error.message);
    //             alert(error.message)
    //         })
    // }

    onSubmit(e) {
        e.preventDefault();
        let proposals = {
            propo_content: this.state.propo_content,
            propo_contact: this.state.propo_contact,
            propo_sign: this.state.propo_sign,
            propo_pres: this.state.propo_pres

        };

        console.log('DATA TO SEND', proposals);
        axios.post('http://localhost:4002/ProposalEvents', proposals)
            .then(response => {
                alert('Data successfully inserted')

            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h1>Create Proposal</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="proposalContent" className="form-label">Content</label>
                            <input
                                type="text"
                                className="form-control"
                                id="proposalContent"
                                name="propo_content"
                                value={this.state.propo_content}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="propoContact" className="form-label">Contact</label>
                            <input
                                type="number"
                                className="form-control"
                                id="propoContact"
                                name="propo_contact"
                                value={this.state.propo_contact}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="propoSign" className="form-label">Sign</label>
                            <input
                                type="text"
                                className="form-control"
                                id="propoSign"
                                name="propo_sign"
                                value={this.state.propo_sign}
                                onChange={this.onChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="propo_pres" className="form-label">Proposal</label>
                            <div>
                                <FileBase type="file" multiple={false} onDone={({base64}) => this.state.propo_pres = base64} />
                            </div>
                        </div>


                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateProposal;
