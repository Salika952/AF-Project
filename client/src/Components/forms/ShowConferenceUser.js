import React, { Component, useState, useRef, useEffect} from 'react';
import axios from 'axios';
import Timer from './Timer/timer';
import moment from 'moment';

class ShowConferencesUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            name:'',
            theme:'',
            venue:'',
            date:'2020-07-07',
            amount:0,
            researchList:[],
            workshopList:[],

        }
    }

    componentDidMount() {
        axios.get('http://localhost:4002/Conference/60d811524cee61152c551ecc')
            .then(response => {
                console.log(response.data.data.con_researchList);
                this.setState({
                    id: response.data.data._id,
                    name: response.data.data.con_name,
                    theme: response.data.data.con_theme,
                    venue: response.data.data.con_venue,
                    date: response.data.data.con_date,
                    amount: response.data.data.con_amount,
                    researchList: response.data.data.con_researchList,
                    workshopList: response.data.data.con_workshopList,

                });
            })

        ///////////////////


//////////////////////
    }


    joinConference(id){
        window.location = `/conferencePay/${id}`
    }




    render() {


        return (
            <div className="container">
                <h1>Conference</h1>


                <div className="p-3" >
                    <h4>Name: {this.state.name}</h4>
                    <h6>Theme: {this.state.theme}</h6>
                    <h6>Venue: {this.state.venue}</h6>
                    <h6>Date & Time: {moment(this.state.date).format('Do of MMMM, YYYY')}</h6>
                    <h6>Fee: {this.state.amount}</h6>

                    {/*////////////////////////*/}
                    <div>
                        <Timer dueDate = {this.state.date}/>
                    </div>
                    {/*////////////////////////*/}

                </div>

                <div>
                    {this.state.researchList.length > 0 && this.state.researchList.map((item, index) => (
                        <div key={index} className="card mb-3" >
                            <div className="p-3"  >
                                <h4>Topic: {item.res_topic}</h4>
                                <h5>Fee: {item.res_presenterFee}</h5>
                            </div>
                        </div>
                    ))}
                </div>


                <button className="btn btn-danger" onClick={() => this.joinConference(this.state.id)}>Join</button>



            </div>
        )
    }
}

export default ShowConferencesUser;