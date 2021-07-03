import React, { Component } from 'react';
import axios from 'axios';
import Timer from './Timer/timer';
import moment from 'moment';
import {Link} from "react-router-dom";
import UserNavbar from "../navbar/UserNavBar";

class ShowConferencesUserLanding extends Component {
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
            img:''
        }
    }

    componentDidMount() {

        axios.get(`http://localhost:4002/Conference/${this.props.location.conAcceptedProps.conferenceID}`)
            .then(response => {
                this.setState({
                    id: response.data.data._id,
                    name: response.data.data.con_name,
                    theme: response.data.data.con_theme,
                    venue: response.data.data.con_venue,
                    date: response.data.data.con_date,
                    amount: response.data.data.con_amount,
                    researchList: response.data.data.con_researchList,
                    workshopList: response.data.data.con_workshopList,
                    img: response.data.data.con_img
                });
            })

    }



    render() {


        return (
            <div>
                <UserNavbar/>
                <div className="container">
                    <h1>Conference</h1>
                    <div className="parallax">
                        <div className="parallax-container" >
                            <div className="p-3" >
                                <img src={this.state.img} alt="Logo" />
                                <h4 className="h1-yas">Name: {this.state.name}</h4>
                                <h6 className="h2-yas">Venue: {this.state.venue}</h6>
                                <h6 className="h3-yas">Date & Time: {moment(this.state.date).format('Do of MMMM, YYYY')}</h6>
                                <h6 className="h3-yas">Fee: {this.state.amount}</h6>
                                <br/>
                                <h6 className="h4-yas">Theme: {this.state.theme}</h6>
                                <Link to = {{
                                    pathname:'/conferencePay',
                                    conProps:{
                                        conferenceID: this.state.id,
                                        conferenceAmount: this.state.amount,
                                        conferenceName: this.state.name
                                    }
                                }}><button className="btn btn-danger join-button" >Join</button></Link>
                            </div>
                        </div>
                    </div>


                    <br/>

                </div>
            </div>

        )
    }
}

export default ShowConferencesUserLanding;