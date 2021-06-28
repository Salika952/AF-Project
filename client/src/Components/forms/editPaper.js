import React, { Component} from 'react';
import axios from 'axios';
import UserNavbar from "../navBars/UserNavBar";
import swat from "sweetalert2";

const initialState = {
    paper_content: '',
    paper_contact: '',
    paper_sign: '',
    pdf:''

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

const SubmissionFail = () => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Submission Error!'
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


        axios.get(`http://localhost:4002/paper/${this.props.match.params.id}`)
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
            paper_sign: this.state.paper_sign,
            pdf: this.state.pdf

        };
        console.log('DATA TO SEND', paper)
        axios.put(`http://localhost:4002/paper/${this.props.match.params.id}`, paper)
            .then(response => {
                SubmissionAlert()
            })
            .catch(error => {
                console.log(error.message);
                SubmissionFail()
            })
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
            </div>
        )
    }
}

export default EditPaper;