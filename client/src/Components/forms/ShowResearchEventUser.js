import React, { Component} from 'react';
import axios from 'axios';
import UserNavbar from "../navbar/UserNavBar";

class ShowResearchEventUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            topic:'',
            description: '',
            fee:0,
            img:'',
            con:''
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:4002/ResearchEvent/${this.props.match.params.id}`)
            .then(response => {
                this.setState({
                    topic: response.data.data.res_topic,
                    description: response.data.data.res_description,
                    fee: response.data.data.res_presenterFee,
                    id: response.data.data._id,
                    img: response.data.data.res_img,
                    con:response.data.data.res_conferenceName
                });
            })


    }

    becomeResearcher(id){
        window.location = `/addPaper/${id}`
    }


    render() {
        return (
            <div>
                <UserNavbar/>
                <div className="container">


                    <div className="p-3" >
                        <img src={this.state.img} alt="Logo" />
                        <h3>Conference: {this.state.con}</h3>
                        <h4>Topic: {this.state.topic}</h4>
                        <h6>Description: {this.state.description}</h6>
                        <h6>Fee: {this.state.fee}</h6>

                        <button className="btn btn-success" onClick={() => this.becomeResearcher(this.state.id)}>Become a Researcher</button>

                    </div>
                </div>
                <br/><br/><br/>
            </div>
        )

    }
}

export default ShowResearchEventUser;