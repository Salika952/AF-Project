import React, { Component } from 'react';
import axios from 'axios';
import Timer from './Timer/timer';
import moment from 'moment';
import {Link} from "react-router-dom";
import Header from "../navbar/guestHeader";
import HeroSection from "../Landing Page/HeroSection";
import Cards from "../Landing Page/Cards";

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


    }



    render() {


        return (

            <div>
                <Header/>
                <div className="parallax">

                    <div className="parallax-container" >
                        <HeroSection/>
                        <div>
                            <Timer dueDate = {this.state.date}/>
                        </div>
                        <h4 className="h1-yas"> {this.state.name}</h4>
                        <h5 className="h2-yas">{this.state.venue}</h5>
                        <h3 className="h3-yas">{moment(this.state.date).format('Do of MMMM YYYY')}</h3>
                        <p className="h4-yas">{this.state.theme}</p>
                        <Cards/>
                    </div>
                    <br></br>
                </div>
            </div>
        )
    }
}

export default ShowConferencesUserLanding;