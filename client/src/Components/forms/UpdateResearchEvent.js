import React, { Component} from 'react';
import Select from 'react-select';
import axios from 'axios';
import FileBase from 'react-file-base64';
import EditorNavbar from "../navbar/editorNavbar";
import swat from "sweetalert2";
import {isEmpty} from "../../utils/validation";

const initialState = {

    res_presenterFee: 0,
    res_topic: '',
    res_description:''
}

const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Research Event Updated Successfully!',
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

class UpdateResearchEvent extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    componentDidMount() {

        axios.get(`http://localhost:4002/ResearchEvent/${this.props.location.resEditProps.researchID}`)
            .then(response => {
                this.setState(
                    {  res_presenterFee: response.data.data.res_presenterFee,
                        res_topic : response.data.data.res_topic,
                        res_description:response.data.data.res_description,
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
        let research = {
            res_presenterFee: this.state.res_presenterFee,
            res_topic: this.state.res_topic,
            res_description: this.state.res_description,
            res_AdminStatus: 'Updated'
        };
        if (isEmpty(this.state.res_presenterFee) || isEmpty(this.state.res_topic) || isEmpty(this.state.res_description)) {
            let message = "Fill the required fields"
            SubmissionFail(message);
        } else {
            console.log('DATA TO SEND', research);
            axios.put(`http://localhost:4002/ResearchEvent/${this.props.location.resEditProps.researchID}`, research)
                .then(response => {
                    SubmissionAlert();
                })
                .catch(error => {
                    console.log(error.message);
                    let message ="Error!"
                    SubmissionFail(message);
                })
        }
    }

    render() {
        return (
            <div>
                <EditorNavbar/>
                <div className="container">
                    <h1>Update Research Events</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="res_topic" className="form-label">Research Event Topic</label>
                            <input
                                type="text"
                                className="form-control"
                                id="res_topic"
                                name="res_topic"
                                value={this.state.res_topic}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="res_description" className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                id="res_description"
                                rows="6"
                                name="res_description"
                                value={this.state.res_description}
                                onChange={this.onChange}>
                        </textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="res_presenterFee" className="form-label">Research Event Fee</label>
                            <input
                                type="number"
                                className="form-control"
                                id="res_presenterFee"
                                name="res_presenterFee"
                                value={this.state.res_presenterFee}
                                onChange={this.onChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="res_img" className="form-label">Picture</label>
                            <div>
                                <FileBase type="file" multiple={false} onDone={({base64}) => this.state.res_img = base64} />
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

export default UpdateResearchEvent;