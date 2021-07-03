import React, { Component} from 'react';
import axios from 'axios';
import UserNavbar from "../navbar/UserNavBar";
import swat from "sweetalert2";
import {isEmpty} from "../../utils/validation";

const initialState = {
    paper_content: '',
    paper_contact: '',
    paper_mail: '',
    pdf:'',
    paper_id:''

}

const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Paper details Edited Successfully!',
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


class EditPaper extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        this.state.paper_id = this.props.location.conProps.paperID;

       console.log(this.state.paper_id);

        axios.get(`http://localhost:4002/paper/${this.state.paper_id}`)
            .then(response => {
                this.setState(
                    {
                        paper_content: response.data.data.paper_content,
                        paper_contact: response.data.data.paper_contact,
                        paper_sign: response.data.data.paper_sign,

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
        let paper = {
            paper_content: this.state.paper_content,
            paper_contact: this.state.paper_contact,
            paper_sign: this.state.paper_mail,
            pdf: this.state.pdf
        };
        if (isEmpty(this.state.paper_content) || isEmpty(this.state.paper_contact) || isEmpty(this.state.paper_mail)) {
            let message = "Fill the required fields"
            SubmissionFail(message);
        } else {
            console.log('DATA TO SEND', paper)
            axios.put(`http://localhost:4002/paper/${this.state.paper_id}`, paper)
                .then(response => {
                    SubmissionAlert()
                })
                .catch(error => {
                    console.log(error.message);
                    let message = "Submission Error"
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
                        <label htmlFor="paperContent" className="form-label">Content</label>
                        <input
                            type="text"
                            className="form-control"
                            id="paperContent"
                            name="paper_content"
                            value={this.state.paper_content}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="paperContact" className="form-label">Contact</label>
                        <input
                            type="text"
                            className="form-control"
                            id="paymentAmount"
                            name="paperContact"
                            value={this.state.paper_contact}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="paperSign" className="form-label">Sign</label>
                        <input
                            type="text"
                            className="form-control"
                            id="paperSign"
                            name="paper_sign"
                            value={this.state.paper_sign}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="paperPdf" className="form-label">File</label>
                        <input
                            type="file"
                            className="form-control"
                            id="paperPdf"
                            name="pdf"
                            value={this.state.pdf}
                            onChange={this.onChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
                <br/>
            </div>
        )
    }
}

export default EditPaper;