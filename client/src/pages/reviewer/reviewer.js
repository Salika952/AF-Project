import React, {Component} from 'react';
import reviewerNavBar from "../../Components/navbar/reviewerNavBar";

class Reviewer extends Component {
    render() {
        return (
            <div>
                <reviewerNavBar/>
                <h1>Hello Reviewer</h1>
            </div>
        );
    }
}

export default Reviewer;