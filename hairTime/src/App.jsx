import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx' 

import Navigationbar from './components/Navigationbar.jsx'
import OverlayGeneralReview from './components/OverlayGeneralReview.jsx'
import './styles/global.css' 
import Stack from 'react-bootstrap/Stack';



function App() {
  return(
   
  <div className='App'>
      <Navigationbar/>
      <Home/>
      <OverlayGeneralReview/>
   </div>
  );
}

export default App;