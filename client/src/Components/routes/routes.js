import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EditPaper from "../views/EditorPaper";
import CreatePaper from "../forms/createPaper";

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
                        <Route path='/addPaper' component={CreatePaper}/>
                        <Route path='/EditorPaper' component={EditPaper}/>
                        <Route path='/' component={EditPaper}/>
                    </Switch>
                </section>
            </Router>
        </div>
    );
}

export default Routes;