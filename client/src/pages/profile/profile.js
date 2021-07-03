import React, {Component} from 'react';
import axios from "axios";
import './profile.css'
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import swat from "sweetalert2";
import FileBase from 'react-file-base64';
import UserNavbar from "../../Components/navbar/UserNavBar";
import EditorNavbar from "../../Components/navbar/editorNavbar";
import ReviewerNavBar from "../../Components/navbar/reviewerNavBar";
import {isMatch,isEmpty,isLength} from "../../utils/validation";

const SuccessAlert = (res) => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: res + 'Successfully',
        showConfirmButton: false,
        timer: 3000
    });
}

const FailAlert = (res) => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: res
    })
}

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state={
            fullName:'',
            email:'',
            telephone:'',
            address:'',
            position:"",
            passwordFields:'',
            updateFields:true,
            token:'',
            password:'',
            confirmPassword:'',
            image:'',
            PImage:'',
            id:'',
            type:''
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmitHandler=this.onSubmitHandler.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.onDelete=this.onDelete.bind(this);

    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }
    componentDidMount() {
        const token = localStorage.getItem('token');
        const type = localStorage.getItem('userPosition');
        if (!token) {
            this.setState({
                user: null
            });
            return;
        }
        this.setState({
            token:token,
            type:type

        })

        axios({
            method: 'get',
            url: 'http://localhost:4002/users/',
            headers: {
                Authorization: token
            },
            data: {}
        }).then(res => {
            this.setState({
                image: res.data.user_imageUrl,
                position: res.data.user_position,
                fullName: res.data.user_name,
                email: res.data.user_email,
                telephone: res.data.user_telephone,
                address: res.data.user_address,
                id:res.data._id,
                isLoggedIn: true
            })
        }).catch(err => {
            console.log(err.message);
        })
    }
    onSubmitHandler (e) {
        e.preventDefault();
        let user = {
            user_name: this.state.fullName,
            user_address: this.state.address,
            user_telephone: this.state.telephone,
            user_imageUrl: this.state.PImage,
        }
        if (isEmpty(this.state.fullName) || isEmpty(this.state.address) || isEmpty(this.state.telephone)){
            let message = "Please Fill the Fields"
            FailAlert(message)
        }else{
            axios.put('http://localhost:4002/users/update', user, {
                headers: {Authorization: this.state.token}
            })
                .then(response => {
                    let message = "User Update"
                    SuccessAlert(message)
                    this.props.history.push('/profile');

                }).catch(error => {
                let message = " Update Successfully"
                console.log(error);
                FailAlert(message)
            });
        }
    }
    onDelete = async (id) =>{
        try {
            if(window.confirm("Are you sure you want to delete this account?")) {
                await axios.delete(`http://localhost:4002/users/delete/${id}`, {
                    headers: {Authorization: this.state.token}
                })
                let message = "User Delete"
                SuccessAlert(message)
            }
        } catch (err) {
            let message = " Delete"
            console.log(err);
            FailAlert(message)
        }
    }


    onSubmit(e) {
        e.preventDefault();
        let user = {
            user_password: this.state.password
        }
        if (isEmpty(this.state.password) || isEmpty(this.state.confirmPassword)) {
            let message = "Please Fill the Field"
            FailAlert(message);
        } else if (isLength(this.state.password) || isLength(this.state.confirmPassword)) {
            let message = "At least 3 characters"
            FailAlert(message);
        } else if (!isMatch(this.state.password, this.state.confirmPassword)) {
            let message = "Password not match"
            FailAlert(message);
        } else {
            console.log('DATA TO SEND', user);
            axios.post('http://localhost:4002/users/reset_password', user, {
                headers: {Authorization: this.state.token}
            })
                .then(response => {
                    let message = "Password Update"
                    SuccessAlert(message)
                    this.props.history.push('/profile');
                })
                .catch(error => {
                    let message = "Password Update Failed"
                    console.log(error);
                    FailAlert(message)
                })
        }
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
                    <ReviewerNavBar/>
                }
                <Form  onSubmit={this.onSubmitHandler}>
                    <div className="profile_page">
                        <div className="col-left">

                            <div className="avatar">
                                <img src={this.state.image} alt=""/>
                                <span>
                            <i className="fas fa-camera"></i>
                            <p>Change</p>
                            <input type="file" name="file" id="fileUp" />
                        </span>
                            </div>
                            {this.state.updateFields &&
                            <Row form>
                                <h1>User Profile</h1>
                                <Col md={25}>
                                    <FormGroup>
                                        <Label for="">Position</Label>
                                        <Input disabled
                                               value={this.state.position}
                                               type="text"
                                               name="position"
                                               id="position"
                                               onChange={this.onChange}
                                        >
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={25}>
                                    <FormGroup>
                                        <Label for="">Full Name</Label>
                                        <Input
                                            value={this.state.fullName}                                               type="text"
                                            name="fullName"
                                            id="fullName"
                                            onChange={this.onChange}
                                        >
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={25}>
                                    <FormGroup>
                                        <Label for="">Email</Label>
                                        <Input disabled
                                               value={this.state.email}
                                               type="email"
                                               name="email"
                                               id="email"
                                               onChange={this.onChange}
                                        >
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={25}>
                                    <FormGroup>
                                        <Label for="">Mobile No</Label>
                                        <Input
                                            value={this.state.telephone}
                                            type="tel"
                                            name="telephone"
                                            id="telephone"
                                            onChange={this.onChange}
                                        >
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={25}>
                                    <FormGroup>
                                        <Label for="">Address</Label>
                                        <Input
                                            value={this.state.address}
                                            type="text"
                                            name="address"
                                            id="address"
                                            onChange={this.onChange}
                                        >
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <div className="mb-3">
                                    <Label htmlFor="res_img" className="form-label">Picture</Label>
                                    <div>
                                        <FileBase type="file" multiple={false} onDone={({base64}) => this.state.PImage = base64} />
                                    </div>
                                </div>
                            </Row>
                            }
                            <br/>
                            {!this.state.passwordFields &&

                            <Button size="lg" block color="success" type="button"
                                    onClick={this.passwordFieldShow}>Change Password</Button>

                            }
                            &nbsp;
                            {this.state.passwordFields &&
                            <Row form>
                                <Col md={25}>
                                    <FormGroup>
                                        <h2>Change Password</h2>
                                        <br/>
                                        <Input type="password"
                                               name="password"
                                               placeholder="New Password"
                                               value={this.state.password}
                                               onChange={this.onChange}
                                        />
                                        <br/>
                                        <Input type="password"
                                               name="confirmPassword"
                                               placeholder="Confirm Password"
                                               value={this.state.confirmPassword}
                                               onChange={this.onChange}
                                        />
                                        <br/>
                                        &nbsp;
                                        <Button size="lg" block color="success" type="button"
                                                onClick={this.onSubmit}>Update Password</Button>
                                        &nbsp;
                                        <Button size="lg" block color="warning" type="button"
                                                onClick={this.passwordFieldHide}>Cancel</Button>

                                    </FormGroup>
                                </Col>
                            </Row>
                            }
                            &nbsp;
                            {this.state.updateFields &&
                            <Button size="lg" block color="primary">Update Profile</Button>
                            }
                            &nbsp;
                            <div>
                                &nbsp;

                                {this.state.updateFields &&
                                <div>
                                    <h6>Delete Profile</h6>
                                    <a className="btn btn-danger float-right" block href="/"
                                       onClick={() => this.onDelete(this.state.id)}>
                                        <i className="fas fa-trash"></i>&nbsp;Delete
                                    </a>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </Form>
                <br/><br/>
            </div>
        );
    }

    passwordFieldShow = () =>{
        this.setState({
            passwordFields: true,
            updateFields:false
        })
    }
    passwordFieldHide = () =>{
        this.setState({
            passwordFields: false,
            updateFields:true
        })
    }
}

export default Profile;