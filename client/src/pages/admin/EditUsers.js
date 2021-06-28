import React, {Component} from 'react';
import axios from 'axios';
import {SERVER_ADDRESS} from "../../Constants/Constants";
import swat from "sweetalert2";

const UpdateAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Update Successfully',
        showConfirmButton: false,
        timer: 3000
    });
}

const UpdateFail = () => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Update Failed!'
    })
}

class AdminRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName:'',
            email:'',
            telephone:'',
            address:'',
            position:"",
            password: ''
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

    }
    componentDidMount() {
        axios.get(`http://localhost:4002/users/${this.props.match.params.id}`)
            .then(response=>{
                this.setState({
                    fullName:response.data.data.user_name,
                    telephone:response.data.data.user_telephone,
                    address:response.data.data.user_address,
                    position:response.data.data.user_position,
                });
            }).catch(err=>{
            alert(err.message)
        })
    }


    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e){
        e.preventDefault();
        let user = {
            user_name: this.state.fullName,
            user_telephone: this.state.telephone,
            user_address: this.state.address,
            user_position: this.state.position,
        }
        console.log('DATA TO SEND', user);
        axios.put(SERVER_ADDRESS +`/users/admin_update/${this.props.match.params.id}`, user)
            .then(response => {
                UpdateAlert();
                this.props.history.push('/get_all');

            })
            .catch(error => {
                console.log(error.message);
                UpdateFail();
            })
    }

    render() {
        return (
            <div className="container">
                <h1>Update User</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="fullName"
                            id="fullName"
                            placeholder="Full Name"
                            value={this.state.fullName}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Telephone Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="telephone"
                            id="telephone"
                            placeholder="Tel No"
                            value={this.state.telephone}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Address</label>
                        <textarea
                            className="form-control"
                            name="address"
                            id="address"
                            rows="3"
                            value={this.state.address}
                            onChange={this.onChange}
                            required
                        >
                    </textarea>
                    </div>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Position</label>
                    <select className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            name="position"
                            id="exampleInputPosition"
                            value={this.state.position}
                            onChange={this.onChange}
                            required>
                        <option value="" selected disabled>Select&nbsp;Position</option>
                        <option value='user'>User</option>
                        <option value='editor'>Editor</option>
                        <option value='reviewer'>Reviewer</option>
                        <option value='admin'>Administrator</option>
                    </select>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}
export default AdminRegister;