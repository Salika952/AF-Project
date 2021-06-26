import './App.css';
import React from "react";
import UserNavbar from "./Components/navBars/UserNavBar";
import PaymentForm from "./Components/forms/paymentForm";
import CreatePaper from "./Components/forms/createPaper";
import EditPaper from "./Components/forms/editPaper";
import EditPayment from "./Components/forms/editPayment";
import Routes from "./Components/routes/routes";


function App() {
  return (
    <div className="App">
       <Routes/>
    </div>
  );
}

export default App;
