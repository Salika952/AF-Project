import React, { Component} from 'react';
import axios from 'axios';
import FileBase from 'react-file-base64';
import {isEmpty} from "../../utils/validation";
import swat from "sweetalert2";
import UserNavbar from "../navbar/UserNavBar";


const initialState = {
    propo_content: '',
    propo_contact: 0,
    propo_sign: '',
    propo_pres:''
}
const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Proposal Event Edit Successfully!',
        showConfirmButton: false,
        timer: 3000
    });
}

const SubmissionFail = (message) => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
    })
}
class EditProposal extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    componentDidMount() {


        axios.get(`http://localhost:4002/ProposalEvents/${this.props.match.params.id}`)
            .then(response => {
                this.setState(
                    {
                        propo_content: response.data.data.propo_content,
                        propo_contact: response.data.data.propo_contact,
                        propo_sign: response.data.data.propo_sign,

                    });
            })
            .catch(error => {
                alert(error.message)
            })

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    onSubmit(e) {
        e.preventDefault();
        let proposal = {
            propo_content: this.state.propo_content,
            propo_contact: this.state.propo_contact,
            propo_sign: this.state.propo_sign,
            propo_pres: this.state.propo_pres

        };
        if (isEmpty(this.state.propo_content) || isEmpty(this.state.propo_contact) || isEmpty(this.state.propo_sign)) {
            let message = "Fill the required fields"
            SubmissionFail(message);
        } else {
            console.log('DATA TO SEND', proposal)
            axios.put(`http://localhost:4002/ProposalEvents/${this.props.match.params.id}`, proposal)
                .then(response => {
                    SubmissionAlert()
                })
                .catch(error => {
                    console.log(error.message);
                    let message = "Error"
                    SubmissionFail(message);
                })
        }
    }
    render() {
        return (
            <div>
                <UserNavbar/>
                <div className="container">
                    <h1>Edit Paper</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="propoContent" className="form-label">Content</label>
                            <input
                                type="text"
                                className="form-control"
                                id="propoContent"
                                name="propo_content"
                                value={this.state.propo_content}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="propoContact" className="form-label">Contact</label>
                            <input
                                type="text"
                                className="form-control"
                                id="propoContact"
                                name="propo_contact"
                                value={this.state.propo_contact}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="paperSign" className="form-label">Sign</label>
                            <input
                                type="text"
                                className="form-control"
                                id="paperSign"
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
                <br/>
            </div>
        )
    }
}

export default EditProposal;
