import React, {Component} from 'react';
import axios from 'axios';
import {SERVER_ADDRESS} from "../../Constants/Constants";
import swat from "sweetalert2";
import AdminNavBar from "../../Components/navbar/adminNavBar";
import {isEmpty, isEmail, isLengthMobile} from "../../utils/validation";

const UpdateAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Update Successfully',
        showConfirmButton: false,
        timer: 3000
    });
}

const UpdateFail = (message) => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
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

    onSubmit(e) {
        e.preventDefault();
        let user = {
            user_name: this.state.fullName,
            user_telephone: this.state.telephone,
            user_address: this.state.address,
            user_position: this.state.position,
        }
        if (isEmpty(this.state.fullName) || isEmpty(this.state.telephone) || isEmpty(this.state.address) || isEmpty(this.state.position)) {
            let message = "Please Fill the Field"
            UpdateFail(message);
        } else if (!isLengthMobile(this.state.telephone)) {
            let message = "Mobile, Please enter 10 Numbers"
            UpdateFail(message);
        } else {
            console.log('DATA TO SEND', user);
            axios.put(SERVER_ADDRESS + `/users/admin_update/${this.props.match.params.id}`, user)
                .then(response => {
                    UpdateAlert();
                    this.props.history.push('/get_all_users');

                })
                .catch(error => {
                    console.log(error.message);
                    let message = "Update Failed"
                    UpdateFail(message);
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
                                    <h1 className="text-center mb-4">Update User</h1>
                                    <form  onSubmit={this.onSubmit}>
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Full Name</label>
                                        <div className="form-group">
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
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Telephone Number</label>
                                        <div className="form-group d-flex">
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
                                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Address</label>
                                        <div className="form-group d-flex">
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
                                        <div className="form-group d-flex">
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
                                        </div>
                                        <div className="form-group">
                                            <button type="submit"
                                                    className="form-control btn btn-primary">Update Details
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
export default AdminRegister;