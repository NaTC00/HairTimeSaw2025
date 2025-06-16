import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa la libreria per React 18
import './index.css';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css'; // Importa il CSS di Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa il JS di Bootstrap
import { AuthProvider } from 'contexts/authContext/AuthContext';
import { ServicesProvider } from 'contexts/ServicesContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Usa createRoot invece di render per React 18
/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);*/

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
         <App />
    </AuthProvider>
  </React.StrictMode>,
);
