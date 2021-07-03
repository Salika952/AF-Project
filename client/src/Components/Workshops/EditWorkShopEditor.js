import React, { Component} from 'react';
import axios from 'axios';
import FileBase from 'react-file-base64';
import swat from "sweetalert2";
import {isEmpty} from "../../utils/validation";
import EditorNavbar from "../navbar/editorNavbar";

const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Workshop Event Added Successfully!',
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
    work_topic:'',
    work_description:'',
    work_place:'',
    work_template:'',
    work_image:''
}

class EditWorkShopEditor extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    componentDidMount() {


        axios.get(`http://localhost:4002/WorkshopEvents/${this.props.match.params.id}`)
            .then(response => {
                this.setState(
                    {
                        work_topic: response.data.data.work_topic,
                        work_description: response.data.data.work_description,
                        work_place: response.data.data.work_place,

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
        let workshop = {
            work_topic: this.state.work_topic,
            work_description: this.state.work_description,
            work_place: this.state.work_place,
            work_image: this.state.work_image,
            work_template: this.state.work_template,

        };
        if (isEmpty(this.state.work_topic) || isEmpty(this.state.work_place) || this.state.work_template === "") {
            let message = "Fill the required fields"
            SubmissionFail(message);
        } else {
            console.log('DATA TO SEND', workshop)
            axios.put(`http://localhost:4002/WorkshopEvents/${this.props.match.params.id}`, workshop)
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
                <EditorNavbar/>
                <div className="container">
                    <h1>Edit WorkShop</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="workTopic" className="form-label">Workshop Topic</label>
                            <input
                                type="text"
                                className="form-control"
                                id="workTopic"
                                name="work_topic"
                                value={this.state.work_topic}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="workDescription" className="form-label">Workshop description </label>
                            <input
                                type="text"
                                className="form-control"
                                id="workDescription"
                                name="work_description"
                                value={this.state.work_description}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="workPlace" className="form-label">Work Place</label>
                            <input
                                type="text"
                                className="form-control"
                                id="workPlace"
                                name="work_place"
                                value={this.state.work_place}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="workImage" className="form-label">WorkShop Image</label>
                            <div>
                                <FileBase type="file" multiple={false} onDone={({base64}) => this.state.work_image = base64} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="workTemplate" className="form-label">WorkShop Template</label>
                            <div>
                                <FileBase type="file" multiple={false} onDone={({base64}) => this.state.work_template = base64} />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default EditWorkShopEditor;
