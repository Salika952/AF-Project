import React, {Component} from 'react';
import Template1 from "url:../../Assets/Templates/temp2.docx";
import Template2 from "url:../../Assets/ProposalTemplate/Presentation1.pptx";
import Template3 from "url:../../Assets/Templates/temp2.docx";
import Header from "../navbar/guestHeader";
class Download extends Component {
    render() {
        return (
            <div>
                <Header/>
                <br/>
                <h1>Downloads</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Template</th>
                        <th scope="col">Type</th>
                        <th scope="col">Download</th>
                    </tr>
                    </thead>
                    <tbody>
                       <tr>
                           <th scope="row">1</th>
                           <td>Research Paper</td>
                           <td>Word (docx)</td>
                           <td> <form method="get" action={Template1}>
                               <button type="submit" className="btn btn-primary">Research Paper</button>
                           </form></td>
                       </tr>
                       <tr>
                           <th scope="row">2</th>
                           <td>Workshop Paper</td>
                           <td>PowerPoint (PPT)</td>
                           <td> <form method="get" action={Template2}>
                               <button type="submit" className="btn btn-primary">Workshop Paper</button>
                           </form></td>
                     </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Guideline</td>
                        <td>PDF</td>
                        <td> <form method="get">
                            <button type="submit" className="btn btn-primary">Guideline</button>
                        </form></td>
                     </tr>
                    </tbody>
                </table>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}

export default Download;