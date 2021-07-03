import React, {Component} from 'react';
import axios from "axios";
import swat from "sweetalert2";
import {Redirect } from "react-router-dom";
import AdminNavBar from "../../Components/navbar/adminNavBar";


const usersAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: ' Delete Successfully',
        showConfirmButton: false,
        timer: 3000
    });
}

const usersFail = () => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: ' Delete Failed!'
    })
}

class GetallUsers extends Component {
    constructor(props) {
        super(props);
        this.state={
            users:[],
            token:'',
        }
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
            url: 'http://localhost:4002/users/all',
            headers: {
                Authorization: token
            },
            data: {}

        }).then(res => {
            this.setState({
                users: res.data,
                isLoggedIn: true
            })
        }).catch(err => {
            console.log(err.message);
        })
    }

    onDelete(id){
        axios.delete(`http://localhost:4002/users/delete/${id}`,{
            headers: {
                Authorization: this.state.token
            }
        }).then(res=>{
            usersAlert()
        }).catch(err=>{
            usersFail()
            console.log(err.message);
        })
    }

    render() {
        return (
            <div>
                <AdminNavBar/>
                <br/>
                <h1>All Users</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Position</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact No </th>
                        <th scope="col">Address </th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.length > 0 && this.state.users.map((users, index)=>(
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{users._id}</td>
                            <td>{users.user_position}</td>
                            <td>{users.user_name}</td>
                            <td>{users.user_email}</td>
                            <td>{users.user_telephone}</td>
                            <td>{users.user_address}</td>
                            <td>
                                <a className = "btn btn-warning" href={`/edit_user/${users._id}`}>
                                    <i className="fa fa-edit"></i>&nbsp;Edit
                                </a>
                                &nbsp;
                                <a className = "btn btn-danger" href="#" onClick={()=>this.onDelete(users._id)}>
                                    <i className="fa fa-trash"></i>&nbsp;Delete
                                </a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <br/>
                <br/>
            </div>
        );
    }
}

export default GetallUsers;