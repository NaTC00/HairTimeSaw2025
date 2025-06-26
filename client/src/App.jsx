import Home from './pages/Home.jsx' 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigationbar from './components/Navigationbar.jsx'
import Footer from './components/Footer.jsx'
import './styles/global.css' 
import { useState, useEffect } from 'react'
import LoginRegister from './components/authentication/LoginRegister.jsx'
import BookAppointment from './pages/BookAppointment.jsx'
import 'bootstrap-icons/font/bootstrap-icons.css';
import UserAppointmentsPage from 'pages/UserAppointmentsPage.jsx'
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  // Stato per mostrare/nascondere il modale di login/registrazione
  const [showLoginRegister, setShowLogin] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  return(
    
    <>
     {/* Router per gestire la navigazione tra le pagine */}
    <Router>

    <header>
        <Navigationbar 
          onLoginRegisterClick={() => setShowLogin((isVisible) => !isVisible)}
          />
      </header>
      <main>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/appuntamenti" element={<BookAppointment />} />
            <Route path="/mie-prenotazioni" element={<UserAppointmentsPage />} />
        </Routes>
      </main>
      <Footer/>
      {showLoginRegister && <LoginRegister onClose = {() => setShowLogin((isVisible) => !isVisible)}/>}
      

    </Router>
     
    </>

   
  );
}

export default App;