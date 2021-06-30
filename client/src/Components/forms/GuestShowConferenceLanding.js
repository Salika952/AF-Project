import React, { Component } from 'react';
import axios from 'axios';
import Timer from './Timer/timer';
import moment from 'moment';
import {Link} from "react-router-dom";
import Header from "../navbar/guestHeader";



class ShowConferencesUserLanding extends Component {
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

                const value = array1.indexOf(true);

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

            <div>
                <Header/>
                <div className="parallax">

                    <div className="parallax-container" >
                        <br></br>
                        <h1 className="h1-yas"> {this.state.name}</h1>
                        <h2 className="h4-yas">{this.state.theme}</h2>
                        <h2 className="h2-yas">{this.state.venue}</h2>
                        <h3 className="h3-yas">{moment(this.state.date).format('Do of MMMM YYYY')}</h3>
                        {/*<h6>{this.state.amount}</h6>*/}


                        <div>
                            <Timer dueDate = {this.state.date}/>
                        </div>


                    </div>
                    <br></br>
                </div>
            </div>
        )
    }
}

export default ShowConferencesUserLanding;