import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EditorPaper from "../views/EditorPaper";
import CreatePaper from "../forms/createPaper";
import UserPaper from "../views/UserPaper";
import EditPaper from "../forms/editPaper";
import PaymentForm from "../forms/paymentForm";
import AdminPay from "../views/AdminPay";

function Routes() {
    return (
        <div>
            <Router>
                <section>
                    <Switch>
                        {/*<Route path="/conferences" component={} />*/}
                        {/*<Route path="/researchEvents" component={} />*/}
                        {/*<Route path="/workshopEvents" component={} />*/}
                        {/*<Route path="/keynotes" component={}  />*/}
                        {/*<Route path="/other" component={}  />*/}
                        {/*<Route path="/contactUs" component={}  />*/}
                        <Route path="/payView" component={AdminPay}  />
                        <Route path="/addPay" component={PaymentForm}  />
                        <Route path='/editPaper/:id' component={EditPaper}/>
                        <Route path='/userPaper' component={UserPaper}/>
                        <Route path='/addPaper' component={CreatePaper}/>
                        <Route path='/editorPaper' component={EditorPaper}/>
                        <Route path='/' component={EditorPaper}/>
                    </Switch>
                </section>
            </Router>
        </div>
    );
}

export default Routes;