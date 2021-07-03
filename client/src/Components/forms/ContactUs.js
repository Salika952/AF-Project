import React, {Component} from 'react';
import UserNavbar from "../navbar/UserNavBar";
import EditorNavbar from "../navbar/editorNavbar";
import ReviewerNavbar from "../navbar/reviewerNavBar";

class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state={
            token:'',
            type:'',
            isLoggedIn:true
        }
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
            type:type,
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
            <div className="container">
                <br/><br/><br/><br/>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Contact Us</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <form>
                            <div className="form-group row">
                                <label htmlFor="firstname" className="col-md-2 col-form-label">First Name</label>
                                <div className="col-md-10">
                                    <input type="text" className="form-control" id="firstname" name="firstname"
                                           placeholder="First Name"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="lastname" className="col-md-2 col-form-label">Last Name</label>
                                <div className="col-md-10">
                                    <input type="text" className="form-control" id="lastname" name="lastname"
                                           placeholder="Last Name"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="telnum" className="col-md-2 col-form-label">Contact Tel.</label>
                                <div className="col-5 col-md-3">
                                    <input type="tel" className="form-control" id="areacode" name="areaCode"
                                           placeholder="Area Code"/>
                                </div>
                                <div className="col-7 col-md-7">
                                    <input type="tel" className="form-control" id="telnum" name="telnum"
                                           placeholder="Telephone Number"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="email" className="col-md-2 col-form-label">Email</label>
                                <div className="col-md-10">
                                    <input type="email" className="form-control" id="email" name="email"
                                           placeholder="Email"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-md-6 offset-md-2">
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input"
                                               name="approve" id="approve" value=""/>
                                            <label className="form-check-label" htmlFor="approve">
                                                <strong>May we contact you?</strong>
                                            </label>
                                    </div>
                                </div>
                                <div className="col-md-3 offset-md-1">
                                    <select className="form-control">
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="feedback" className="col-md-2 col-form-label">Feedback</label>
                                <div className="col-md-10">
                            <textarea type="email" className="form-control" id="feedback" name="feedback"
                                      rows="12"></textarea>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="offset-md-2 col-md-10">
                                    <button type="submit" className="bt btn-primary">Send Feedback</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-12 col-md">
                    </div>
                </div>
                <br/><br/><br/><br/><br/><br/>
            </div>
            </div>
        );
    }
}

export default ContactUs;