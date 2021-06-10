import React, { Component} from 'react';
import axios from 'axios';

const initialState = {
    res_presenterFee: 0,
    res_topic: '',
}

class CreateResearchEvent extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    componentDidMount() {

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    onSubmit(e) {
        e.preventDefault();
        let research = {
            fee: this.state.res_presenterFee,
            topic: this.state.res_topic,
        };
        console.log('DATA TO SEND', research)
        axios.post('http://localhost:4002/ResearchEvent/', research)
            .then(response => {
                alert('Research Event Data successfully inserted')
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render() {
        return (
            <div className="container">
                <h1>Create Research Events</h1>
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

export default CreateResearchEvent;