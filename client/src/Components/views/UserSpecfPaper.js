import React, { Component} from 'react';
import axios from 'axios';
import UserNavbar from "../navbar/UserNavBar";
import ReviewerNavBar from "../navbar/reviewerNavBar";
import swat from "sweetalert2";
import {Link} from "react-router-dom";

const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Paper Deleted Successfully!',
        showConfirmButton: false,
        timer: 3000
    });
}


class UserSpecfPaper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author:'',
            content:'',
            contact:'',
            sign:'',
            validation:'',
            event:'',
            pdf:''
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:4002/paper/${this.props.match.params.id}`)
            .then(response => {
                this.setState({
                    id: response.data.data._id,
                    content: response.data.data.paper_content,
                    contact: response.data.data.paper_contact,
                    mail: response.data.data.paper_mail,
                    author: response.data.data.paper_author,
                    validation: response.data.data.paper_validation,
                    pdf: response.data.data.pdf,

                });
            })
        console.log(this.state.paper_content);
    }

    // deletePaper(id){
    //     axios.delete(`http://localhost:4002/paper/${id}`)
    //         .then(response => {
    //             this.setState({ paper: response.data.data });
    //             SubmissionAlert()
    //         })
    //     window.location = `/userPaper`
    // }
    //
    navigateEditPage(e, paperId) {
        window.location = `/editpaper/${paperId}`
    }

    navigatePayment(e, paperId) {
        window.location = `/addPay`
    }


    render() {
        return (
            <div>
                <UserNavbar/>
                <div className="container p-3 my-3 bg-dark text-black-100">
                    <h1  className="text-white">Papers</h1>
                        <div className="card mb-3">
                            <div className="p-3">
                                <h4>Name: {this.state.content}</h4>
                                <h5>Contact: {this.state.contact}</h5>
                                <h5>Email: {this.state.mail}</h5>
                                <Link to = {{
                                    pathname:'/editpaper',
                                    conProps:{
                                        paperID: this.state.id,
                                    }
                                }}>  &nbsp;<button className="btn btn-success" >Edit</button></Link>
                                &nbsp;
                                <button className="btn btn-danger" onClick={e => this.deletePaper(this.state.id)}>Delete</button>
                            </div>
                        </div>
                          &nbsp;
                        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={e => this.navigatePayment(this.state.id)}>Make Your Payment</button>

                </div>
            </div>
        )
    }
}

export default UserSpecfPaper;