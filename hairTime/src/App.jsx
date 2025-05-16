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



function App() {
  const [showLoginRegister, setShowLogin] = useState(false);
  const [currentView, setCurrentView] = useState("home");

  return(

    <>
      <header>
        <Navigationbar 
          onLoginRegisterClick={() => setShowLogin((isVisible) => !isVisible)}
          onAppointmentClick={() => setCurrentView("appointment")} />
      </header>
      <main>
        {currentView === "home" && <Home/>}
        {currentView === "appointment" && <BookAppointment />}
      </main>
      <Footer/>
      {showLoginRegister && <LoginRegister onClose = {() => setShowLogin((isVisible) => !isVisible)}/>}
    </>

   
  );
}

export default App;