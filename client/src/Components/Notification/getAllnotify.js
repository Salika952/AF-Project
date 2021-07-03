import React, {Component} from 'react';
import axios from "axios";
import swat from "sweetalert2";
import AdminNavBar from "../../Components/navbar/adminNavBar";

const NotifyAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: ' Delete Successfully',
        showConfirmButton: false,
        timer: 3000
    });
}

const NotifyFail = () => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: ' Delete Failed!'
    })
}

class GetAllNotify extends Component {
    constructor(props) {
        super(props);
        this.state={
            notify:[],
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
            url: 'http://localhost:4002/notify/',
            headers: {
                Authorization: token
            },
            data: {}

        }).then(res => {
            this.setState({
                notify: res.data.data,
                isLoggedIn: true
            })
        }).catch(err => {
            console.log(err.message);
        })
    }

    onDelete(id){
        axios.delete(`http://localhost:4002/notify/delete/${id}`,{
            headers: {
                Authorization: this.state.token
            }
        }).then(res=>{
            NotifyAlert()

        }).catch(err=>{
            NotifyFail()
            console.log(err.message);
        })
    }

    render() {
        return (
            <div>
                <AdminNavBar/>
                <br/>
                <div className="container">
                    <h1 className="justify-content-center">All Notification</h1>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Message</th>
                            <th scope="col">Type</th>
                            <th scope="col">Date </th>
                            <th scope="col">Expire Date </th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.notify.length > 0 && this.state.notify.map((notify, index)=>(
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{notify._id}</td>
                                <td>{notify.title}</td>
                                <td>{notify.message}</td>
                                <td>{notify.type}</td>
                                <td>{notify.data}</td>
                                <td>{notify.expire}</td>
                                <td>
                                    <a className = "btn btn-danger" href="#" onClick={()=>this.onDelete(notify._id)}>
                                        <i className="fa fa-trash"></i>&nbsp;Delete
                                    </a>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}

export default GetAllNotify;