import React, { Component} from 'react';
import axios from 'axios';


class UserWorkshop extends Component {
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

    // acceptPaper(workshopId) {
    //     let workshop = {
    //         work_validation: true,
    //     };
    //     axios.put(`http://localhost:4002/WorkshopEvents/${workshopId}`, workshop)
    //         .then(response => {
    //             alert('Category Data successfully updated')
    //         })
    //         .catch(error => {
    //             console.log(error.message);
    //             alert(error.message)
    //         })
    // }

    navigateProposalPage(e, workshopId) {
        window.location = `/addProposal/${workshopId}`
    }


    render() {
        return (
            <div>
                <div className="container">
                    <h1>Workshop</h1>
                    {this.state.workshop.length > 0 && this.state.workshop.map((item, index) => (
                        <div key={index} className="card mb-3">
                            {/*<div className="p-3" onClick={e => this.navigateSubjectPage(e, item._id)}>*/}
                            <img src={item.work_image} alt="WorkShops"  width="800px"  height="600px" />
                            <h4>Topic: {item.work_topic}</h4>
                            <h6>Description: {item.work_description}</h6>
                            <h6>Place: {item.work_place}</h6>
                            <h6>Validation: {item.work_validation}</h6>
                            <iframe
                                src={item.work_template}
                                width="60px"
                                height="60px"
                                frameBorder="0"
                            >
                            </iframe>

                            <button className="btn btn-success" onClick={e => this.navigateProposalPage(e, item._id)}>Be a Conductor</button>
                            {/*</div>*/}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default UserWorkshop;
