import React, { Component} from 'react';
import Select from 'react-select';
import axios from 'axios';
import FileBase from 'react-file-base64';
import EditorNavbar from "../navbar/editorNavbar";

const initialState = {
    con_img:'',
    con_name: '',
    con_theme: '',
    con_venue: '',
    con_date: '',
    con_amount: 0,
    con_researchList:[],
    con_researchList_options:[],
    con_researchList_selected:[],
    con_workshopList:[],
    con_workshopList_options:[],
    con_workshopList_selected:[],

}
class CreateConference extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // this.onResearchSelect = this.onResearchSelect.bind(this);
        // this.onWorkshopSelect = this.onWorkshopSelect.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        // axios.get('http://localhost:4002/ResearchEvent/')
        //     .then(response => {
        //         this.setState({ con_researchList: response.data.data }, () => {
        //             let data = [];
        //             this.state.con_researchList.map((item, index) => {
        //                 let research = {
        //                     value: item._id,
        //                     label: item.res_topic
        //                 }
        //                 console.log(research);
        //                 data.push(research)
        //             });
        //             this.setState({ con_researchList_options: data });
        //         })
        //     })
        //
        //
        // axios.get('http://localhost:4002/WorkshopEvent/')
        //     .then(response => {
        //         this.setState({ con_workshopList: response.data.data }, () => {
        //             let data = [];
        //             this.state.con_workshopList.map((item, index) => {
        //                 let workshop = {
        //                     value: item._id,
        //                     label: item.name
        //                 }
        //                 data.push(workshop)
        //             });
        //             this.setState({ con_workshopList_options: data });
        //         })
        //     })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    // onResearchSelect(e) {
    //     this.setState({ con_researchList_selected: e ? e.map(item => item.value) : [] });
    // }
    //
    // onWorkshopSelect(e) {
    //     this.setState({ con_workshopList_selected: e ? e.map(item => item.value) : [] });
    // }

    onSubmit(e) {
        e.preventDefault();
        let conference = {
            con_name: this.state.con_name,
            con_theme: this.state.con_theme,
            con_venue: this.state.con_venue,
            con_date: this.state.con_date,
            con_amount:this.state.con_amount,
            con_img:this.state.con_img,
            // con_researchList: this.state.con_researchList_selected,
            // con_workshopList: this.state.con_workshopList_selected
        };
        console.log('DATA TO SEND', conference)
        axios.post('http://localhost:4002/Conference/', conference)
            .then(response => {
                alert('Conference Data successfully inserted');

            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render() {
        return (
            <div>
                <EditorNavbar/>
                <div className="container">
                    <h1>Create Conference</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="con_name" className="form-label">Conference Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="con_name"
                                name="con_name"
                                value={this.state.con_name}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="con_theme" className="form-label">Conference Theme</label>
                            <input
                                type="text"
                                className="form-control"
                                id="con_theme"
                                name="con_theme"
                                value={this.state.con_theme}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="con_venue" className="form-label">Conference Venue</label>
                            <input
                                type="text"
                                className="form-control"
                                id="con_venue"
                                name="con_venue"
                                value={this.state.con_venue}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="con_date" className="form-label">Conference Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="con_date"
                                name="con_date"
                                value={this.state.con_date}
                                onChange={this.onChange}
                            />
                        </div>
                        {/*<div className="mb-3">*/}
                        {/*    <label htmlFor="con_researchList_options" className="form-label">Research Events</label>*/}
                        {/*    <Select*/}
                        {/*        options={this.state.con_researchList_options}*/}
                        {/*        onChange={this.onResearchSelect}*/}
                        {/*        className="basic-multi-select"*/}
                        {/*        isMulti*/}
                        {/*    />*/}
                        {/* </div>*/}
                        {/*<div className="mb-3">*/}
                        {/*    <label htmlFor="con_workshopList_options" className="form-label">Workshop Events</label>*/}
                        {/*    <Select*/}
                        {/*        options={this.state.con_workshopList_options}*/}
                        {/*        onChange={this.onWorkshopSelect}*/}
                        {/*        className="basic-multi-select"*/}
                        {/*        isMulti*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <div className="mb-3">
                            <label htmlFor="con_amount" className="form-label">Entry fee</label>
                            <input
                                type="number"
                                className="form-control"
                                id="con_amount"
                                name="con_amount"
                                value={this.state.con_amount}
                                onChange={this.onChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="con_img" className="form-label">Picture</label>
                            <div>
                                <FileBase type="file" multiple={false} onDone={({base64}) => this.state.con_img = base64} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>

        )
    }
}

export default CreateConference;