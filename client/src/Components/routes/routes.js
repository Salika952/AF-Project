import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateConference from "../forms/CreateConference";
import ShowConferencesAdmin from "../forms/ShowConferencesAdmin";
import ShowConferencesEditor from "../forms/ShowConferencesEditor";
import UpdateConference from "../forms/UpdateConference";
import CreateResearchEvent from "../forms/CreateResearchEvent";
import ShowResearchEventAdmin from "../forms/ShowResearchEventAdmin";
import ShowResearchEventEditor from "../forms/ShowResearchEventEditor";
import UpdateResearchEvent from "../forms/UpdateResearchEvent";
import ShowConferencesUser from "../forms/ShowConferenceUser";
import ShowResearchEventUser from "../forms/ShowResearchEventUser";
import AddEventsToConference from "../forms/AddEventsToConference";
import PayConference from "../forms/PayConference";


function Routes() {
    return (
        <div>
            <Router>
                <section>
                    <Switch>
                        <Route path="/conferenceAdminShow" component={ShowConferencesAdmin} />
                        <Route path="/conferenceEditorShow" component={ShowConferencesEditor} />
                        <Route path="/conferenceUpdate" component={UpdateConference} />
                        <Route path="/researchAdminShow" component={ShowResearchEventAdmin} />
                        <Route path="/researchEditorShow" component={ShowResearchEventEditor} />
                        <Route path="/researchCreate" component={CreateResearchEvent} />
                        <Route path="/conferenceCreate" component={CreateConference} />
                        <Route path="/conferenceUserShow" component={ShowConferencesUser} />
                        <Route path="/researchUserShow" component={ShowResearchEventUser} />
                        <Route path="/researchUpdate" component={UpdateResearchEvent} />
                        <Route path="/conferenceAddEvent" component={AddEventsToConference} />
                        <Route path="/conferencePay" component={PayConference} />
                        {/*<Route path="/keynotes" component={}  />*/}
                        {/*<Route path="/other" component={}  />*/}
                        {/*<Route path="/contactUs" component={}  />*/}
                    </Switch>
                </section>
            </Router>
        </div>
    );
}

export default Routes;
