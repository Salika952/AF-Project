import React, {Component} from 'react';
import axios from 'axios';
import {SERVER_ADDRESS} from "../../Constants/Constants";
import swat from "sweetalert2";
import AdminNavBar from "../../Components/navbar/adminNavBar";

const RegisteredAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Notification Create Successfully',
        showConfirmButton: false,
        timer: 3000
    });
}

const RegisterFail = () => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Notification Error!'
    })
}

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type:'',
            title:'',
            message:'',
            expire:'',
            token:''
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    componentDidMount() {
        const token = localStorage.getItem('token');
        if (!token) {
            this.setState({
                user: null
            });
            return;
        }
        this.setState({
            token:token
        })

        axios({
            method: 'get',
            url: 'http://localhost:4002/users/',
            headers: {
                Authorization: token
            },
            data: {}
        })
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e){
        e.preventDefault();
        let notification = {
            type: this.state.type,
            title: this.state.title,
            message: this.state.message,
            expire: this.state.expire,

        }
        console.log('DATA TO SEND', notification);
        axios.post(SERVER_ADDRESS +'/notify/create_notify', notification,{
        })
            .then(response => {
                RegisteredAlert();
            })
            .catch(error => {
                console.log(error.message);
                RegisterFail();
            })
    }
    render() {
        return (
            <div>
                <AdminNavBar/>
                <div className="container">
                    <h1>Create Notification</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Notification Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                id="title"
                                placeholder="Notification Title"
                                value={this.state.title}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Message</label>
                            <textarea
                                className="form-control"
                                name="message"
                                id="message"
                                placeholder="Notification Message"
                                rows="3"
                                value={this.state.message}
                                onChange={this.onChange}
                            >
                    </textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Type</label>
                            <select
                                className="form-control"
                                name="type"
                                id="exampleInputPosition"
                                value={this.state.type}
                                onChange={this.onChange}
                                required>
                                <option value="" selected disabled>Select&nbsp;Type</option>
                                <option value={'user'}>User</option>
                                <option value={'editor'}>Editor</option>
                                <option value={'reviewer'}>Reviewer</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">password</label>
                            <input
                                type="date"
                                className="form-control"
                                name="expire"
                                id="expire"
                                value={this.state.expire}
                                onChange={this.onChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default Notification;