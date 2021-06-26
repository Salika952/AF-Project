import React, { Component} from 'react';
import Select from 'react-select';
import axios from 'axios';
import UserNavbar from "../navBars/UserNavBar";

const initialState = {
    paper_content: '',
    paper_contact: 0,
    paper_sign: '',
    pdf:''


}
class CreatePaper extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
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
        }
        console.log('DATA TO SEND', paper);
        axios.post('http://localhost:4002/paper', paper)
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
            <UserNavbar/>
            <div className="container">
                <h1>Create Paper</h1>
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
                            type="number"
                            className="form-control"
                            id="paperContact"
                            name="paper_contact"
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

export default CreatePaper;