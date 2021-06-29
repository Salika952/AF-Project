import React, { Component } from 'react';
import axios from 'axios';
import Timer from './Timer/timer';
import moment from 'moment';
import {Link} from "react-router-dom";

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
            <div className="container">
                <h1>Conference</h1>


                <div className="p-3" >
                    <img src={this.state.img} alt="Logo" />
                    <h4>Name: {this.state.name}</h4>
                    <h6>Theme: {this.state.theme}</h6>
                    <h6>Venue: {this.state.venue}</h6>
                    <h6>Date & Time: {moment(this.state.date).format('Do of MMMM, YYYY')}</h6>
                    <h6>Fee: {this.state.amount}</h6>


                </div>

                {/*<h3>Research Events</h3>*/}
                {/*<div>*/}
                {/*    {this.state.researchList.length > 0 && this.state.researchList.map((item, index) => (*/}
                {/*        <div key={index} className="card mb-3" >*/}
                {/*            <div className="p-3"  >*/}
                {/*                <h4>Topic: {item.res_topic}</h4>*/}
                {/*                <h5>Fee: {item.res_presenterFee}</h5>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</div>*/}




                <Link to = {{
                    pathname:'/conferencePay',
                    conProps:{
                        conferenceID: this.state.id,
                        conferenceAmount: this.state.amount,
                        conferenceName: this.state.name
                    }
                }}><button className="btn btn-danger" >Join</button></Link>


            </div>
        )
    }
}

export default ShowConferencesUserLanding;