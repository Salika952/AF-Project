import './App.css';
import React from "react";
import Routes from "./Components/routes/routes";
import UserNavbar from "./Components/navBars/UserNavBar";
import Footer from "./Components/footer/footer";


function App() {
    return (
        <div className="App">
            <UserNavbar/>

            <Routes/>
            <Footer/>
        </div>
    );
}

export default App;
