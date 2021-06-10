import React from "react";
import './App.css'
import Register from "./pages/register";
import Login from "./pages/login";
import AdminRegister from "./pages/admin/adminRegister";
import Home from "./pages/Home";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
function App() {
  return (
    <div>
        <main>
            <Router>
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/login" component={Login}  />
                </Switch>
            </Router>
        </main>
    </div>
  );
}

export default App;
