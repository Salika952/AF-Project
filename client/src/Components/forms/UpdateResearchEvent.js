import React, { Component} from 'react';
import Select from 'react-select';
import axios from 'axios';

const initialState = {

    res_presenterFee: 0,
    res_topic: '',
    res_description:''
}

class UpdateResearchEvent extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    componentDidMount() {

        axios.get(`http://localhost:4002/ResearchEvent/${this.props.match.params.id}`)
            .then(response => {
                this.setState(
                    {  res_presenterFee: response.data.data.con_name,
                        res_topic : response.data.data.con_theme
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
            res_description: this.state.res_description
        };
        console.log('DATA TO SEND', research);
        axios.put(`http://localhost:4002/ResearchEvent/${this.props.match.params.id}`, research)
            .then(response => {
                alert('ResearchEvent Data successfully updated')
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render() {
        return (
            <div className="container">
                <h1>Update Research Events</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="topic" className="form-label">Research Event Topic</label>
                        <input
                            type="text"
                            className="form-control"
                            id="topic"
                            name="topic"
                            value={this.state.res_topic}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            rows="6"
                            name="description"
                            value={this.state.res_description}
                            onChange={this.onChange}>
                        </textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="researchFee" className="form-label">Research Event Fee</label>
                        <input
                            type="number"
                            className="form-control"
                            id="researchFee"
                            name="researchFee"
                            value={this.state.res_presenterFee}
                            onChange={this.onChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default UpdateResearchEvent;