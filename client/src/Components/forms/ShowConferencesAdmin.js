import React, { Component} from 'react';
import axios from 'axios';
import moment from 'moment'

class ShowConferencesAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Conferences: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4002/Conference/')
            .then(response => {
                this.setState({ Conferences: response.data.data });
            })
    }



    declineConference(id){
        let conference = {
            con_validation: false,
        };

        axios.put(`http://localhost:4002/Conference/${id}`, conference)
            .then(response => {
                alert('Declined')
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    acceptConference(id){
        let conference = {
            con_validation: true,
        };

        axios.put(`http://localhost:4002/Conference/${id}`, conference)
            .then(response => {
                alert('Accepted')
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    addToLanding(id){
        axios.patch(`http://localhost:4002/Conference/main`)
            .then(response => {

                let conference = {
                    con_main: true,
                };

                axios.put(`http://localhost:4002/Conference/${id}`, conference)
                    .then(response => {
                        alert('Added to Landing')
                    })
                    .catch(error => {
                        console.log(error.message);
                        alert(error.message)
                    })
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render() {
        return (
            <div className="container">
                <h1>Conferences</h1>
                {this.state.Conferences.length > 0 && this.state.Conferences.map((item, index) => (
                    <div key={index} className="card mb-3">
                        <div className="p-3" >
                            <h4>Name: {item.con_name}</h4>
                            <h6>Theme: {item.con_theme}</h6>
                            <h6>Venue: {item.con_venue}</h6>
                            {/*<h6>Date & Time: {item.con_date}</h6>*/}
                            <h6>Date & Time: {moment(item.con_date).format('Do of MMMM, YYYY')}</h6>
                            <h6>Fee: {item.con_amount}</h6>

                            <button className="btn btn-danger" onClick={() => this.declineConference(item._id)}>Decline</button>
                            <button className="btn btn-success" onClick={() => this.acceptConference(item._id)}>Accept</button>
                            <button className="btn btn-success" onClick={() => this.addToLanding(item._id)}>Add to Main Page</button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default ShowConferencesAdmin;