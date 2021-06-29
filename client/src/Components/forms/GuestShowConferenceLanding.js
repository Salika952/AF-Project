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

                {/*<div>*/}
                {/*    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">*/}
                {/*        <ol className="carousel-indicators">*/}
                {/*            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>*/}
                {/*            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>*/}
                {/*            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>*/}
                {/*        </ol>*/}
                {/*        <div className="carousel-inner">*/}
                {/*            <div className="carousel-item active">*/}
                {/*                <img className="d-block w-100" src="../../../" alt="First slide"/>*/}
                {/*            </div>*/}
                {/*            <div className="carousel-item">*/}
                {/*                <img className="d-block w-100" src="../../yasPic.jpg" alt="Second slide"/>*/}
                {/*            </div>*/}
                {/*            <div className="carousel-item">*/}
                {/*                <img className="d-block w-100" src="../../yasPic.jpg" alt="Third slide"/>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button"*/}
                {/*           data-slide="prev">*/}
                {/*            <span className="carousel-control-prev-icon" aria-hidden="true"></span>*/}
                {/*            <span className="sr-only">Previous</span>*/}
                {/*        </a>*/}
                {/*        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button"*/}
                {/*           data-slide="next">*/}
                {/*            <span className="carousel-control-next-icon" aria-hidden="true"></span>*/}
                {/*            <span className="sr-only">Next</span>*/}
                {/*        </a>*/}
                {/*    </div>*/}

                {/*</div>*/}


                <div className="parallax">

                    <div className="parallax-container" >
                        <br></br>
                        <h1 className="h1-yas"> {this.state.name}</h1>
                        <h2 className="h4-yas">{this.state.theme}</h2>
                        <h2 className="h2-yas">{this.state.venue}</h2>
                        <h3 className="h3-yas">{moment(this.state.date).format('Do of MMMM YYYY')}</h3>
                        {/*<h6>{this.state.amount}</h6>*/}

                        {/*////////////////////////*/}
                        <div>
                            <Timer dueDate = {this.state.date}/>
                        </div>
                        {/*////////////////////////*/}

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


                    {/*<button className="btn btn-danger" onClick={() => this.joinConference()}>Join</button>*/}

                    {/*<Link to = {{*/}
                    {/*    pathname:'/conferencePay',*/}
                    {/*    conProps:{*/}
                    {/*        conferenceID: this.state.id,*/}
                    {/*        conferenceAmount: this.state.amount,*/}
                    {/*        conferenceName: this.state.name*/}
                    {/*    }*/}
                    {/*}}><button className="yas-button" >Join</button></Link>*/}


                    <br></br>
                </div>
            </div>
        )
    }
}

export default ShowConferencesUserLanding;