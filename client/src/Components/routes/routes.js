import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import EditProposal from "../forms/Proposals/EditProposal";
import CreateProposal from "../forms/Proposals/CreateProposal";
import ReviewerProposal from "../forms/views/ReviewerProposal";
import UserProposal from "../forms/views/UserProposal";
import EditWorkShopEditor from "../forms/Workshops/EditWorkShopEditor";
import EditorWorkshop from "../forms/views/EditorWorkshop";
import CreateWorkshopEditor from "../forms/Workshops/CreateWorkshopEditor";
import AdminWorkshop from "../forms/views/AdminWorkshop";
import UserWorkshop from "../forms/views/UserWorkShop";


function Routes() {
    return (
        <div>
            <Router>
                <section>
                    <Switch>

                        <Route path='/editWorkshop/:id' component={EditWorkShopEditor}/>
                        <Route path='/editorWorkshop' component={EditorWorkshop}/>
                        <Route path='/addWorkshop' component={CreateWorkshopEditor}/>
                        <Route path='/adminWorkshop' component={AdminWorkshop}/>
                        <Route path='/userWorkshop' component={UserWorkshop}/>

                        <Route path='/editProposal/:id' component={EditProposal}/>
                        <Route path='/userProposal' component={UserProposal}/>
                        <Route path='/addProposal' component={CreateProposal}/>
                        <Route path='/reviewerProposal' component={ReviewerProposal}/>


                    </Switch>
                </section>
            </Router>
        </div>
    );
}

export default Routes;
