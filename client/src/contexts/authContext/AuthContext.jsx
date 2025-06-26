import React, { useContext, useState, useEffect, createContext } from "react";
import { signInApi } from "../../httpManager/request"; 

// Creazione del contesto di autenticazione
const AuthContext = createContext();

// Hook custom per accedere facilmente al contesto
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null); // Token JWT dell'utente
  const [username, setUsername] = useState(null); // Nome utente
  const [userLoggedIn, setUserLoggedIn] = useState(false); // Flag se utente è loggato
  const [loading, setLoading] = useState(true);

  // Recupera dati dal localStorage all'avvio dell'app
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedTimestamp = localStorage.getItem("tokenTimestamp");
  
    if (storedToken && storedTimestamp) {
      const tokenAge = Date.now() - parseInt(storedTimestamp, 10);
      const twoHours = 2 * 60 * 60 * 1000; 
  
      if (tokenAge < twoHours) {
        // Se il token non è scaduto, ripristina lo stato utente
        setToken(storedToken);
        setUsername(storedUsername);
        setUserLoggedIn(true);
      } else {
        // Token scaduto
        // Cancella i dati
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("tokenTimestamp");
      }
    }
  
    setLoading(false);
  }, []);
  


  //Effettua la login
  const login = async (email, password) => {
    try {
      const { token, username } = await signInApi(email, password); 
      setToken(token);
      setUsername(username);
      setUserLoggedIn(true);
  
      const timestamp = Date.now();// Salva anche timestamp
  
      // Salvataggio dati nel localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("tokenTimestamp", timestamp.toString());
    } catch (error) {
      console.error("Errore login:", error.response?.data || error.message);
      throw error;
    }
  };
  


  const logout = () => {
    setToken(null);
    setUserLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  const value = {
    token,
    userLoggedIn,
    username,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
