import React, {Component} from 'react';
import axios from 'axios';
import {SERVER_ADDRESS} from "../../Constants/Constants";
import swat from "sweetalert2";
import AdminNavBar from "../../Components/navbar/adminNavBar";
import {isEmpty} from "../../utils/validation";

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
    onSubmit(e) {
        e.preventDefault();
        let notification = {
            type: this.state.type,
            title: this.state.title,
            message: this.state.message,
            expire: this.state.expire,

        }
        if (isEmpty(this.state.type) || isEmpty(this.state.title) || isEmpty(this.state.message) || isEmpty(this.state.expire)) {
            let message = "Please Fill the Field"
            RegisterFail(message);
        } else {
            console.log('DATA TO SEND', notification);
            axios.post(SERVER_ADDRESS + '/notify/create_notify', notification, {})
                .then(response => {
                    RegisteredAlert();
                })
                .catch(error => {
                    console.log(error.message);
                    RegisterFail();
                })
        }
    }
    render() {
        return (
            <div>
                <AdminNavBar/>
                <section className="space-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-7 col-lg-5">
                                <div className="con-control p-4 p-md-5">
                                    <h1 className="text-center mb-4">Add Notification</h1>
                                    <form  onSubmit={this.onSubmit}>
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Notification Title</label>
                                        <div className="form-group">
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
                                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Message</label>
                                        <div className="form-group d-flex">
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
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Type</label>
                                        <div className="form-group d-flex">
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
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Expire Date</label>
                                        <div className="form-group d-flex">
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="expire"
                                                id="expire"
                                                value={this.state.expire}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit"
                                                    className="form-control btn btn-primary">Create Notification
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
export default Notification;