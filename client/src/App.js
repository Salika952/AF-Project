import React, {useEffect} from 'react';
import {Provider} from "react-redux";
import store from "./Store";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {LoadUser} from "./Actions/Authentication";
import {setToken} from "./setToken";
import Reducer from './Reducers'
import { createStore } from 'redux';

//Umesh Routes
import Login from "./pages/login/Login";
const userData = createStore(Reducer);
import UserPage from "./pages/user/user";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminPage from "./pages/admin/admin";
import EditorPage from "./pages/editor/editor";
import Register from "./pages/register/register";
import ReviewerPage from "./pages/reviewer/reviewer";
import ConfirmEmail from "./Actions/confirmEmail";
import AdminRegister from "./pages/admin/adminRegister";
import ForgotPassword from "./pages/user/forgotpassword";
import ResetPassword from "./pages/user/resetPassword";
import Profile from "./pages/profile/profile";
import GetallUsers from "./pages/admin/GetallUsers";
import EditUsers from "./pages/admin/EditUsers";
import Notification from "./pages/admin/Notification";

///Yasoja routes
import CreateConference from "./Components/forms/CreateConference";
import ShowConferencesAdmin from "./Components/forms/ShowConferencesAdmin";
import ShowConferencesEditor from "./Components/forms/ShowConferencesEditor";
import UpdateConference from "./Components/forms/UpdateConference";
import CreateResearchEvent from "./Components/forms/CreateResearchEvent";
import ShowResearchEventAdmin from "./Components/forms/NotUsed/ShowResearchEventAdmin";
import ShowResearchEventEditor from "./Components/forms/NotUsed/ShowResearchEventEditor";
import UpdateResearchEvent from "./Components/forms/UpdateResearchEvent";
import ShowConferencesUserLanding from "./Components/forms/ShowConferenceUserLanding";
import ShowResearchEventUser from "./Components/forms/ShowResearchEventUser";
import AddEventsToConference from "./Components/forms/NotUsed/AddEventsToConference";
import PayConference from "./Components/forms/PayConference";
import ShowResearchEventAdminByConference from "./Components/forms/ShowResearchEventAdminByConference";
import ShowResearchEventEditorByConference from "./Components/forms/ShowResearchEventEditorByConference";
import ShowConferenceUser from "./Components/forms/ShowConferenceUser";

const App = () => {
    if(localStorage.getItem('token')){
        setToken(localStorage.getItem('token'));
    }
    useEffect(() => {
        store.dispatch(LoadUser())
    },[]);
    return (
        <div className="page-container">
            <div className="content-wrap">
                <Provider store={store}>
                    <Router>
                        <Switch>
                            {/*Umesh Routes*/}
                            <Route path="/" component={Dashboard} exact/>
                            <Route path="/register" component={Register} exact/>
                            <Route path="/admin_register" component={AdminRegister} exact/>
                            <Route path="/user" component={UserPage}/>
                            <Route path="/editor" component={EditorPage}/>
                            <Route path="/admin" component={AdminPage}/>
                            <Route path="/reviewer" component={ReviewerPage}/>
                            <Route path="/get_all" component={GetallUsers}/>
                            <Route path="/notification" component={Notification}/>
                            <Route path="/edit_user/:id" component={EditUsers}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/forgot" component={ForgotPassword}/>
                            <Route path="/profile" component={Profile}/>
                            <Route path="/users/reset_password/:id" component={ResetPassword}/>
                            <Route path="/users/activate/:auth_token" component={ConfirmEmail}  />

                            {/*Yasoja Routes*/}
                            <Route path="/conferenceCreate" component={CreateConference} />
                            <Route path="/conferenceAdminShow" component={ShowConferencesAdmin} />
                            <Route path="/conferenceEditorShow" component={ShowConferencesEditor} />
                            <Route path="/conferenceUpdate" component={UpdateConference} />
                            <Route path="/researchAdminShow" component={ShowResearchEventAdmin} />
                            <Route path="/researchEditorShow" component={ShowResearchEventEditor} />
                            <Route path="/researchCreate" component={CreateResearchEvent} />
                            <Route path="/conferenceUserShowLanding" component={ShowConferencesUserLanding} />
                            <Route path="/researchUserShow" component={ShowResearchEventUser} />
                            <Route path="/researchUpdate" component={UpdateResearchEvent} />
                            <Route path="/conferenceAddEvent" component={AddEventsToConference} />
                            <Route path="/conferencePay" component={PayConference} />
                            <Route path="/researchByConferenceAdmin" component={ShowResearchEventAdminByConference} />
                            <Route path="/researchByConferenceEditor" component={ShowResearchEventEditorByConference} />
                            <Route path="/conferenceUserShow" component={ShowConferenceUser} />

                        </Switch>
                    </Router>
                </Provider>
            </div>

        </div>
    );
}
export default App;
