import React, { Component} from 'react';
import Select from 'react-select';
import axios from 'axios';
import FileBase from 'react-file-base64';
import EditorNavbar from "../navbar/editorNavbar";
import swat from "sweetalert2";
import {isEmpty} from "../../utils/validation";

const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Conference Updated Successfully!',
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

const initialState = {
    con_img:'',
    con_name: '',
    con_theme: '',
    con_venue: '',
    con_date: '',

    con_amount: 0
}

class UpdateConference extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = initialState;
    }

    componentDidMount() {

        axios.get(`http://localhost:4002/Conference/${this.props.location.conEditProps2.conferenceID}`)
            .then(response => {
                this.setState(
                    {  con_name: response.data.data.con_name,
                        con_theme : response.data.data.con_theme,
                        con_venue : response.data.data.con_venue,
                        con_date : response.data.data.con_date,
                        con_researchList_selected: response.data.data.con_researchList,
                        con_workshopList_selected: response.data.data.con_workshopList,
                        con_img:this.state.con_img,
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
        let conference = {
            con_img: this.state.con_img,
            con_name: this.state.con_name,
            con_theme: this.state.con_theme,
            con_venue: this.state.con_venue,
            con_date: this.state.con_date,
            con_amount: this.state.con_amount,
            con_AdminStatus: 'Updated'
        };
        if (isEmpty(this.state.con_name) || isEmpty(this.state.con_theme) || isEmpty(this.state.con_venue) || isEmpty(this.state.con_date) || isEmpty(this.state.con_amount)) {
            let message = "Fill the required fields"
            SubmissionFail(message);
        } else {
            console.log('DATA TO SEND', conference)
            axios.put(`http://localhost:4002/Conference/${this.props.location.conEditProps2.conferenceID}`, conference)
                .then(response => {
                    SubmissionAlert();
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
                <EditorNavbar/>
                <div className="container">
                    <h1>Update Conference</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="con_name" className="form-label">Conference Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="con_name"
                                name="con_name"
                                value={this.state.con_name}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="con_theme" className="form-label">Conference Theme</label>
                            <input
                                type="text"
                                className="form-control"
                                id="con_theme"
                                name="con_theme"
                                value={this.state.con_theme}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="con_venue" className="form-label">Conference Venue</label>
                            <input
                                type="text"
                                className="form-control"
                                id="con_venue"
                                name="con_venue"
                                value={this.state.con_venue}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="con_date" className="form-label">Conference Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="con_date"
                                name="con_date"
                                value={this.state.con_date}
                                onChange={this.onChange}
                            />
                        </div>


                        <div className="mb-3">
                            <label htmlFor="con_amount" className="form-label">Entry fee</label>
                            <input
                                type="number"
                                className="form-control"
                                id="con_amount"
                                name="con_amount"
                                value={this.state.con_amount}
                                onChange={this.onChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="con_img" className="form-label">Picture</label>
                            <div>
                                <FileBase type="file" multiple={false} onDone={({base64}) => this.state.con_img = base64} />
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

export default UpdateConference;