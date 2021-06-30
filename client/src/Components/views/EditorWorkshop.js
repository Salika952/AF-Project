import React, { Component} from 'react';
import axios from 'axios';
import EditorNavbar from "../navbar/editorNavbar";



class EditorWorkshop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workshops: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4002/WorkshopEvents/')
            .then(response => {
                this.setState({workshops: response.data.data });
            })
    }

    deletePaper(id){
        axios.delete(`http://localhost:4002/WorkshopEvents/${id}`)
            .then(response => {
                this.setState({ workshops: response.data.data });
            })
        window.location = `/editorWorkshop`
    }

    navigateEditWorkShopPage(e, workShopId) {
        window.location = `/editWorkshop/${workShopId}`
    }

    render() {
        return (
            <div>
                <EditorNavbar/>
                <div className="container p-3 my-3 bg-dark text-black-100">
                    <h1  className="text-white">Workshops</h1>
                    {this.state.workshops.length > 0 && this.state.workshops.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <div className="p-3">
                                <img src={item.work_image} alt="WorkShops"  width="600px"  height="600px" />
                                <h4>Topic: {item.work_topic}</h4>
                                <h6>Description: {item.work_description}</h6>
                                <h6>Place: {item.work_place}</h6>
                                <h6>Validation: {item.work_validation}</h6>
                                <button className="btn btn-success" onClick={e => this.navigateEditWorkShopPage(e, item._id)}>Edit</button>
                                &nbsp;
                                <button className="btn btn-danger" onClick={e => this.deletePaper(item._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default EditorWorkshop;
