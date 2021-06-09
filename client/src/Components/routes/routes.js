import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function Routes() {
    return (
        <div>
            <Router>
                <section>
                    <Switch>
                        <Route path="/conferences" component={} />
                        <Route path="/researchEvents" component={} />
                        <Route path="/workshopEvents" component={} />
                        <Route path="/keynotes" component={}  />
                        <Route path="/other" component={}  />
                        <Route path="/contactUs" component={}  />
                    </Switch>
                </section>
            </Router>
        </div>
    );
}

export default Routes;