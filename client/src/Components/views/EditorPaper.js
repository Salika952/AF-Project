import React, { Component} from 'react';
import axios from 'axios';
import UserNavbar from "../navBars/UserNavBar";
import EditorNavBar from "../navBars/editorNavBar";
import swat from "sweetalert2";

const SubmissionAlert1 = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Paper Accepted!',
        showConfirmButton: false,
        timer: 3000
    });
}

const SubmissionAlert2 = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Paper Rejected!',
        showConfirmButton: false,
        timer: 3000
    });
}

class EditorPaper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paper: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4002/paper/')
            .then(response => {
                this.setState({ paper: response.data.data });
            })
    }

    acceptPaper(paperId) {
        let paper = {
            paper_validation: true,
        };
        axios.put(`http://localhost:4002/paper/${paperId}`, paper)
            .then(response => {
                SubmissionAlert1()
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    declinePaper(paperId) {
        let paper = {
            paper_validation: false,
        };
        axios.put(`http://localhost:4002/paper/${paperId}`, paper)
            .then(response => {
                SubmissionAlert2()
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })

    }

    render() {
        return (
            <div>
                <EditorNavBar/>
            <div className="container">
                <h1>Papers</h1>
                {this.state.paper.length > 0 && this.state.paper.map((item, index) => (
                    <div key={index} className="card mb-3">
                        <div className="p-3" onClick={e => this.navigateSubjectPage(e, item._id)}>
                            <h4>Name: {item.paper_content}</h4>
                            <h5>Contact: {item.paper_contact}</h5>
                            <h5>Sign: {item.paper_sign}</h5>
                            <h6>Validation: {item.paper_validation}</h6>
                            <button className="btn btn-success" onClick={e => this.acceptPaper(item._id)}>Accept</button>
                            <button className="btn btn-danger" onClick={e => this.declinePaper(item._id)}>Decline</button>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        )
    }
}

export default EditorPaper;