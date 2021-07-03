import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Header from "../navbar/guestHeader";
import UserNavbar from "../navbar/UserNavBar";
import EditorNavbar from "../navbar/editorNavbar";
import ReviewerNavbar from "../navbar/reviewerNavBar";


class AboutUs extends Component {
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
                <>
                    {this.state.type==="user"&&
                        <UserNavbar/>
                    }
                    {this.state.type==="editor"&&
                         <EditorNavbar/>
                    }
                    {this.state.type==="reviewer"&&
                          <ReviewerNavbar/>
                    }
                    <Container>
                        <Card>
                            <Card.Header><h1>About&nbsp;Us</h1></Card.Header>
                            <Card.Body>
                                <Card.Text><h6>Our Team Members</h6></Card.Text>
                                <ul>
                                    <li>IT19101620&nbsp;&nbsp;&nbsp;&nbsp;Salika Madhushanka W.J</li>
                                    <li>IT19129372&nbsp;&nbsp;&nbsp;&nbsp;H.H.W.M.Binuka Sihan Paranagama</li>
                                    <li>IT19240152&nbsp;&nbsp;&nbsp;&nbsp;Umesh Ranthilina K.M</li>
                                    <li>IT19117256&nbsp;&nbsp;&nbsp;&nbsp;P.Y.D Jayasinghe</li>
                                </ul>
                            </Card.Body>
                            <Card.Footer>
                                <p>
                                    This AF Project is done by 3rd Year 1st Semester Students
                                </p>
                            </Card.Footer>
                        </Card>
                    </Container>
                </>
                );
                <br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
        );
    }
}

export default AboutUs;