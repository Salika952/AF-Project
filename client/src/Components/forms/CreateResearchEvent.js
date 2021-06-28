import React, { Component} from 'react';
import axios from 'axios';
import FileBase from 'react-file-base64';

const initialState = {
    res_presenterFee: 0,
    res_topic: '',
    res_description: '',
    res_img:''

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
            res_presenterFee: this.state.res_presenterFee,
            res_topic: this.state.res_topic,
            res_description: this.state.res_description,
            res_img:this.state.res_img

        };
        console.log('DATA TO SEND', research)
        axios.post('http://localhost:4002/ResearchEvent/', research)
            .then(response => {
                alert('Research Event Data successfully inserted');


                ///////////////////////////////////////////
                let details = {
                    //conferenceID: this.state.conference_id,
                    conferenceID: this.props.location.conEditProps.conferenceID,
                    researchID: response.data.data._id,
                };
                console.log('DATA TO SEND', details)
                axios.patch(`http://localhost:4002/Conference/research`, details)
                    .then(response => {
                        alert('Research added')
                    })
                    .catch(error => {
                        console.log(error.message);
                        alert(error.message)
                    })

                ///////////////////////////////////////////

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
        )
    }
}

export default CreateResearchEvent;