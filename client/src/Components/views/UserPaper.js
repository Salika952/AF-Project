import React, { Component} from 'react';
import axios from 'axios';
import UserNavbar from "../navbar/UserNavBar";
import ReviewerNavBar from "../navbar/reviewerNavBar";
import swat from "sweetalert2";

const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Paper Deleted Successfully!',
        showConfirmButton: false,
        timer: 3000
    });
}


class UserPaper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paper: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:4002/paper/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ paper: response.data.data });
            })
    }

    deletePaper(id){
        axios.delete(`http://localhost:4002/paper/${id}`)
            .then(response => {
                this.setState({ paper: response.data.data });
                SubmissionAlert()
            })
        window.location = `/userPaper`
    }

    navigateEditPage(e, paperId) {
        window.location = `/editpaper/${paperId}`
    }

    render() {
        return (
            <div>
                <UserNavbar/>
                <div className="container p-3 my-3 bg-dark text-black-100">
                    <h1  className="text-white">Papers</h1>
                    {this.state.paper.length > 0 && this.state.paper.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <div className="p-3">
                                <h4>Name: {item.paper_content}</h4>
                                <h5>Contact: {item.paper_contact}</h5>
                                <h5>Sign: {item.paper_sign}</h5>
                                <h6></h6>
                                <button className="btn btn-success" onClick={e => this.navigateEditPage(e, item._id)}>Edit</button>
                                &nbsp;
                                <button className="btn btn-danger" onClick={e => this.deletePaper(item._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default UserPaper;