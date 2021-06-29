import React, { Component} from 'react';
import Select from 'react-select';
import axios from 'axios';
import swat from "sweetalert2"


import {Link} from "react-router-dom";

const initialState = {
    paper_content: '',
    paper_contact: 0,
    paper_mail: '',
    pdf:'',
    paper_author:'',
    paper_event:'',
    id:'',


}

const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Paper added successfully,Please check your Email for Confirmation!',
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

class CreatePaper extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        this.state.paper_author = '60bcff2d5b1db804dc3a4181';
        this.state.paper_event = '60d961ca1b76b24828423586';

    }

    deletePaper(){
        let id = this.state.paper_author;

        window.location = `/userPaper/${id}`
    }


    downloadPaper(){
        axios.get('http://localhost:4002/paper/download')
            .then(response => {
                SubmissionAlert()


            })

            .catch(error => {
                console.log(error.message);
                SubmissionFail()
            })
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        let paper = {
            paper_author: this.state.paper_author,
            paper_content: this.state.paper_content,
            paper_contact: this.state.paper_contact,
            paper_mail: this.state.paper_mail,
            paper_event: this.state.paper_event,
            pdf: this.state.pdf
        }
        console.log('DATA TO SEND', paper);
        axios.post('http://localhost:4002/paper', paper)
            .then(response => {
                SubmissionAlert()



                // let details = {
                //     researchId:this.state.research_id,
                //     paperAuthor: this.state.paper_author,
                //
                // };


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
                        <label htmlFor="paperMail" className="form-label">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="paperMail"
                            name="paper_mail"
                            value={this.state.paper_mail}
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


                    <button type="submit" className="btn btn-primary" >Submit</button>

                    <button className="btn btn-primary" onClick={e => this.downloadPaper()} >d</button>




                    </form>
             </div>

            </div>
        )
    }
}

export default CreatePaper;