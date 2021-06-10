import React, { Component} from 'react';
import Select from 'react-select';
import axios from 'axios';

const initialState = {
    con_name: '',
    con_theme: '',
    con_venue: '',
    con_date: '',

    con_researchList:[],
    con_researchList_options:[],
    con_researchList_selected:[],

    con_workshopList:[],
    con_workshopList_options:[],
    con_workshopList_selected:[],

    con_amount: 0
}
class CreateConference extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        axios.get('http://localhost:4002/ResearchEvent/')
            .then(response => {
                this.setState({ con_researchList: response.data.data }, () => {
                    let data = [];
                    this.state.con_researchList.map((item, index) => {
                        let research = {
                            value: item._id,
                            label: item.name
                        }
                        data.push(research)
                    });
                    this.setState({ con_researchList_options: data });
                })
            })

        axios.get('http://localhost:4002/WorkshopEvent/')
            .then(response => {
                this.setState({ con_workshopList: response.data.data }, () => {
                    let data = [];
                    this.state.con_workshopList.map((item, index) => {
                        let workshop = {
                            value: item._id,
                            label: item.name
                        }
                        data.push(workshop)
                    });
                    this.setState({ con_workshopList_options: data });
                })
            })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onResearchSelect(e) {
        this.setState({ con_researchList_selected: e ? e.map(item => item.value) : [] });
    }

    onWorkshopSelect(e) {
        this.setState({ con_workshopList_selected: e ? e.map(item => item.value) : [] });
    }

    onSubmit(e) {
        e.preventDefault();
        let conference = {
            name: this.state.con_name,
            theme: this.state.con_theme,
            venue: this.state.con_venue,
            date: this.state.con_date,
            amount:this.state.con_amount,
            researchList: this.state.con_researchList_selected,
            workshopList: this.state.con_workshopList_selected
        };
        console.log('DATA TO SEND', conference)
        axios.post('http://localhost:4002/Conference/', conference)
            .then(response => {
                alert('Conference Data successfully inserted')
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render() {
        return (
            <div className="container">
                <h1>Create Conference</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="conferenceName" className="form-label">Conference Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="conferenceName"
                            name="conferenceName"
                            value={this.state.con_name}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="theme" className="form-label">Conference Theme</label>
                        <input
                            type="text"
                            className="form-control"
                            id="theme"
                            name="theme"
                            value={this.state.con_theme}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="venue" className="form-label">Conference Venue</label>
                        <input
                            type="text"
                            className="form-control"
                            id="venue"
                            name="venue"
                            value={this.state.con_venue}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date1" className="form-label">Conference Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="date1"
                            name="date1"
                            value={this.state.con_date}
                            onChange={this.onChange}
                        />
                    </div>
                    <Select
                        options={this.state.con_researchList_options}
                        onChange={this.onResearchSelect()}
                        className="basic-multi-select"
                        isMulti
                    />
                    <Select
                        options={this.state.con_workshopList_options}
                        onChange={this.onWorkshopSelect()}
                        className="basic-multi-select"
                        isMulti
                    />

                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Entry fee</label>
                        <input
                            type="number"
                            className="form-control"
                            id="amount"
                            name="amount"
                            value={this.state.con_amount}
                            onChange={this.onChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default CreateConference;