import React, { Component} from 'react';
import Select from 'react-select';
import axios from 'axios';
import swat from "sweetalert2"
import {Link} from "react-router-dom";
import UserNavbar from "../navbar/UserNavBar";
import Template1 from "url:../../Assets/Templates/temp2.docx";
import firebase from "../firebase/index";
import {isEmpty} from "../../utils/validation";

const initialState = {
    paper_content: '',
    paper_contact: 0,
    paper_mail: '',
    pdf:'',
    paper_author:'',
    paper_event:'',
    id:'',
    files:null,
    u:'',
    paper_users:''


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

const SubmissionFail = (message) => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
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
        const token = localStorage.getItem('token');
        if (!token) {
            this.setState({
                user: null
            });
            return;
        }
        this.setState({
            token:token
        })

        axios({
            method: 'get',
            url: 'http://localhost:4002/users/',
            headers: {
                Authorization: token
            },
            data: {}
        }).then(res => {
            this.setState({
                paper_users:res.data._id,
                isLoggedIn: true
            })

        }).catch(err => {
            console.log(err.message);
        })
        console.log(this.props.match.params.id);
        this.state.paper_author = this.state.paper_users;
        this.state.paper_event = this.props.match.params.id;
    }
    handleChange = (files) => {
        this.setState({
            files: files
        })

    }
    handleSave = (files) => {
        // let bucketName = 'images';
        let file = this.state.files[0];
        // let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
        // let uploadTask = storageRef.put(file);
        // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,function(){
        //     let downloadURL = uploadTask.snapshot.downloadURL
        // })


        // firebase.storage().ref(`images/${images.name}`)


        const upload = firebase.storage().ref(`images/${file.name}`).put(file);
        upload.on(
            "state_changed",
            snapshot => {
            },
            error => {
                console.log(error);
            }, () => {
                firebase.storage()
                    .ref("images")
                    .child(file.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url)
                        this.setState({
                            pdf: url
                        })

                        console.log(this.state.pdf);
                    })
            }
        )


    }


    deletePaper() {
        let id = this.state.paper_author;

        window.location = `/userPaper/${id}`
    }


    downloadPaper() {
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
        this.setState({[e.target.name]: e.target.value})
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
        if (isEmpty(this.state.paper_content) || isEmpty(this.state.paper_contact) || isEmpty(this.state.paper_mail)) {
            let message = "Fill the required fields"
            SubmissionFail(message);
        } else {
            console.log('DATA TO SEND', paper);
            axios.post('http://localhost:4002/paper', paper)
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
                    <h1>Create Paper</h1>
                    <div className="row">
                        <div className="col-11">
                            If You want Use a Template
                        </div>
                        <div className="col-1 text-right">
                            <form method="get" action={Template1}>
                                <button type="submit" className="btn btn-primary">Download!</button>
                            </form>
                        </div>
                    </div>

                    <div>
                        <input
                            type="file"
                            className="form-control"
                            name="pdf"
                            onChange={(e) => {
                                this.handleChange(e.target.files)
                            }}/>
                        <button className="btn btn-danger" onClick={this.handleSave}>Submit Paper</button>
                        <p>ee:{this.state.pdf}</p>
                    </div>

                    <p>Please Submit the paper before details</p>

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
                        <button type="submit" className="btn btn-primary">Submit Details</button>
                    </form>
                </div>
                <br/>
            </div>
        )
    }
}
export default CreatePaper;