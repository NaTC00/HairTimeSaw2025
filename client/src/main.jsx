import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa la libreria per React 18
import './index.css';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css'; // Importa il CSS di Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa il JS di Bootstrap
import { AuthProvider } from 'contexts/authContext/AuthContext';
import 'bootstrap-icons/font/bootstrap-icons.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
         <App />
    </AuthProvider>
  </React.StrictMode>,
);
