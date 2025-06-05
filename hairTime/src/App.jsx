import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx' 

import Navigationbar from './components/Navigationbar.jsx'
import Footer from './components/Footer.jsx'
import OverlayGeneralReview from './components/OverlayGeneralReview.jsx'
import './styles/global.css' 
import Stack from 'react-bootstrap/Stack'
import { useState } from 'react'
import LoginRegister from './components/authentication/LoginRegister.jsx'
import BookAppointment from './components/appointment/BookAppointment.jsx'
import 'bootstrap-icons/font/bootstrap-icons.css';
import MyAppointments from 'components/appointment/MyAppointments.jsx'


function App() {
  const [showLoginRegister, setShowLogin] = useState(false);
  const [currentView, setCurrentView] = useState("home");
  const [showMyAppointments, setShowMyAppointments] = useState(false)

  return(

    <>
      <header>
        <Navigationbar 
          onLoginRegisterClick={() => setShowLogin((isVisible) => !isVisible)}
          onMyAppointmentsClick={() => setShowMyAppointments((isVisible) => !isVisible) }
          onAppointmentClick={() => setCurrentView("appointment")} />
      </header>
      <main>
        {currentView === "home" && <Home/>}
        {currentView === "appointment" && <BookAppointment />}
        {currentView === ""}
      </main>
      <Footer/>
      {showLoginRegister && <LoginRegister onClose = {() => setShowLogin((isVisible) => !isVisible)}/>}
      {showMyAppointments && <MyAppointments onClose = {() => setShowMyAppointments ((isVisible) => !isVisible)}/>}
    </>

   
  );
}

export default App;