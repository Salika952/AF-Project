import React, { Component} from 'react';
import axios from 'axios';
import AdminNavBar from "../navbar/adminNavBar";


class AdminWorkshop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workshop: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4002/WorkshopEvents/')
            .then(response => {
                this.setState({ workshop: response.data.data });
            })
    }

    acceptPaper(workshopId,name) {
        let workshop = {
            work_validation: true,
        };
        axios.put(`http://localhost:4002/WorkshopEvents/${workshopId}`, workshop)
            .then(response => {
                alert('WorkShop Data successfully updated')

                let sent = {
                    status: name +" Workshop Accepted",
                };
                axios.post('http://localhost:4002/WorkshopEvents/mail/send', sent)
                    .then(response => {
                        alert('Email Sent');
                        window.location.reload(false);
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

    declinePaper(workshopId,name) {


        let workshop = {
            work_validation: false,
        };
        axios.put(`http://localhost:4002/WorkshopEvents/${workshopId}`, workshop)
            .then(response => {
                alert('WorkShop Data successfully updated')

                let sent = {
                    status: name +" Workshop decline proposal",
                };
                axios.post('http://localhost:4002/WorkshopEvents/mail/send', sent)
                    .then(response => {
                        alert('Email Sent');
                        window.location.reload(false);
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
            <div>
                <AdminNavBar/>
                <div className="container p-3 my-3 bg-dark text-black-100">
                    <h1  className="text-white">Workshop</h1>
                    {this.state.workshop.length > 0 && this.state.workshop.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <div className="p-3 " >
                            {/*<div className="p-3" onClick={e => this.navigateSubjectPage(e, item._id)}>*/}
                                <img src={item.work_image} alt="WorkShops"  width="600px"  height="600px" />
                                <h4>Topic: {item.work_topic}</h4>
                                <h6>Description: {item.work_description}</h6>
                                <h6>Place: {item.work_place}</h6>
                                <h6>Validation: {item.work_validation}</h6>
                                {/*<iframe*/}
                                {/*    src={item.work_template}*/}
                                {/*    width="60px%"*/}
                                {/*    height="60px"*/}
                                {/*    frameBorder="0"*/}
                                {/*>*/}
                                {/*</iframe>*/}
                                <button className="btn btn-success" onClick={e => this.acceptPaper(item._id,item.work_topic)}>Accept</button>
                                &nbsp;
                                <button className="btn btn-danger" onClick={e => this.declinePaper(item._id,item.work_topic)}>Decline</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default AdminWorkshop;
