import React, { Component} from 'react';
import axios from 'axios';
import UserNavbar from "../navBars/UserNavBar";
import EditorNavBar from "../navBars/editorNavBar";

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

    navigateEditPage(e, paperId) {
        window.location = `/${paperId}`
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
                            <button className="btn btn-success" onClick={e => this.navigateEditPage(e, item._id)}>Edit</button>
                            <button className="btn btn-danger" onClick={e => this.deleteCourse(e, item._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        )
    }
}

export default EditorPaper;