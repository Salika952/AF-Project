import React, { Component } from 'react';
import axios from 'axios';
import Timer from './Timer/timer';
import moment from 'moment';
import {Link} from "react-router-dom";

class ShowConferencesUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Conferences:[],
            array1:[],

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
        ///////////////////////////
        axios.get('http://localhost:4002/Conference/')
            .then(response => {
                this.setState({ Conferences: response.data.data });

                let array1 = [];

                this.state.Conferences.map((item, index) => (
                    array1.push(item.con_main)

                ));

                console.log(array1.indexOf(true));
                const value = array1.indexOf(true);
                console.log(this.state.Conferences[value].con_name);


                this.setState({
                    id: this.state.Conferences[value]._id,
                    name: this.state.Conferences[value].con_name,
                    theme: this.state.Conferences[value].con_theme,
                    venue:this.state.Conferences[value].con_venue,
                    date: this.state.Conferences[value].con_date,
                    amount: this.state.Conferences[value].con_amount,
                    researchList: this.state.Conferences[value].con_researchList,
                    workshopList: this.state.Conferences[value].con_workshopList,

                });
            })






        ///////////////////////////
        // axios.get('http://localhost:4002/Conference/60d811524cee61152c551ecc')
        //     .then(response => {
        //         this.setState({
        //             id: response.data.data._id,
        //             name: response.data.data.con_name,
        //             theme: response.data.data.con_theme,
        //             venue: response.data.data.con_venue,
        //             date: response.data.data.con_date,
        //             amount: response.data.data.con_amount,
        //             researchList: response.data.data.con_researchList,
        //             workshopList: response.data.data.con_workshopList,
        //
        //         });
        //     })

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


                {/*<button className="btn btn-danger" onClick={() => this.joinConference()}>Join</button>*/}

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

export default ShowConferencesUser;