import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx' 

import Navigationbar from './components/Navigationbar.jsx'
import Footer from './components/Footer.jsx'
import OverlayGeneralReview from './components/OverlayGeneralReview.jsx'
import './styles/global.css' 
import Stack from 'react-bootstrap/Stack';



function App() {
  return(

    <>
      <header>
        <Navigationbar />
      </header>
      <main>
        <Home /> 
      </main>
      <Footer/>
      
      </>

   
  );
}

export default App;