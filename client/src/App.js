import './App.css';
import React from "react";
import NavBar from './Components/navBars/guestNavBar';
import Routes from './Components/routes/routes';

function App() {
  return (
    <div className="App">
        <NavBar/>
        <Routes/>
    </div>
  );
}

export default App;
