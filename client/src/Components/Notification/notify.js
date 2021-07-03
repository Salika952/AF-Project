import React, {Component} from 'react';
import axios from "axios";
import UserNavbar from "../navbar/UserNavBar";
import EditorNavbar from "../navbar/editorNavbar";
import ReviewerNavbar from "../navbar/reviewerNavBar";

class Notify extends Component {
    constructor(props) {
        super(props);
        this.state={
            notification:[],
            type:''
        }
    }
    componentDidMount() {
        const type = localStorage.getItem('userPosition');
        this.setState({
            type:type
        })
        axios({
            method: 'get',
            url: 'http://localhost:4002/notify/'+type,
            data: {}
        }).then(res => {
            this.setState({
                notification: res.data.data,
                isLoggedIn: true
            })
            console.log(this.state.notification)
        })
    }


    render() {
        return (
            <div>
                {this.state.type==="user"&&
                <UserNavbar/>
                }
                {this.state.type==="editor"&&
                <EditorNavbar/>
                }
                {this.state.type==="reviewer"&&
                <ReviewerNavbar/>
                }
                <div className="container p-3 my-3 bg-primary text-black-100">
                    <h1 className="text-white">Notifications</h1>
                    {this.state.notification.length > 0 && this.state.notification.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <h5 className="card-title">Notification Title : {item.title}</h5>
                            <p className="card-text">Notification Message: {item.message}</p>
                            <p className="card-text">
                                <small className="text-muted">Expire Dare : {item.expire}</small>
                            </p>
                        </div>
                    ))}
                </div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
        );
    }
}

export default Notify;