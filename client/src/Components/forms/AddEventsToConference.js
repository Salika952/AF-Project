import React, { Component} from 'react';
import Select from 'react-select';
import axios from 'axios';

const initialState = {

    con_name: '',

    con_researchList:[],
    con_researchList_options:[],
    con_researchList_selected:[],

    con_workshopList:[],
    con_workshopList_options:[],
    con_workshopList_selected:[],

}

class AddEventsToConference extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onResearchSelect = this.onResearchSelect.bind(this);
        this.onWorkshopSelect = this.onWorkshopSelect.bind(this);
        this.state = initialState;
    }

    componentDidMount() {

        axios.get(`http://localhost:4002/Conference/60d811524cee61152c551ecc`)
            .then(response => {
                this.setState(
                    {  con_name: response.data.data.con_name,
                        con_researchList_selected: response.data.data.con_researchList,
                        con_workshopList_selected: response.data.data.con_workshopList,
                    });
            })
            .catch(error => {
                alert(error.message)
            })

        axios.get('http://localhost:4002/ResearchEvent/')
            .then(response => {
                this.setState({ con_researchList: response.data.data }, () => {
                    let data = [];
                    this.state.con_researchList.map((item, index) => {
                        let research = {
                            value: item._id,
                            label: item.res_topic
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
                            label: item.work_topic
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
            con_researchList: this.state.con_researchList_selected,
            con_workshopList: this.state.con_workshopList_selected
        };
        console.log('DATA TO SEND', conference)
        axios.put(`http://localhost:4002/Conference/60d811524cee61152c551ecc`, conference)
            .then(response => {
                alert('Conference Data successfully updated')
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render() {
        return (
            <div className="container">
                <h1>Conference: {this.state.con_name}</h1>
                <form onSubmit={this.onSubmit}>
                    <div>
                    <Select
                        options={this.state.con_researchList_options}
                        onChange={this.onResearchSelect}
                        className="basic-multi-select"
                        isMulti
                    />
                    </div>
                    <div>
                    <Select
                        options={this.state.con_workshopList_options}
                        onChange={this.onWorkshopSelect}
                        className="basic-multi-select"
                        isMulti
                    />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default AddEventsToConference;