import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx' 

import Navigationbar from './components/Navigationbar.jsx'
import Footer from './components/Footer.jsx'
import OverlayGeneralReview from './components/OverlayGeneralReview.jsx'
import './styles/global.css' 
import Stack from 'react-bootstrap/Stack';
import { useState } from 'react'
import LoginRegister from './components/LoginRegister';



function App() {
  const [showLoginRegister, setShowLogin] = useState(false);

  return(

    <>
      <header>
        <Navigationbar onLoginRegisterClick={() => setShowLogin((isVisible) => !isVisible)} />
      </header>
      <main>
        <Home /> 
      </main>
      <Footer/>
      {showLoginRegister && <LoginRegister onClose = {() => setShowLogin((isVisible) => !isVisible)}/>}
      </>

   
  );
}

export default App;