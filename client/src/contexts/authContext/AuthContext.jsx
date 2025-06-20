import React, { useContext, useState, useEffect, createContext } from "react";
import { signInApi } from "../../httpManager/request"; 

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedTimestamp = localStorage.getItem("tokenTimestamp");
  
    if (storedToken && storedTimestamp) {
      const tokenAge = Date.now() - parseInt(storedTimestamp, 10);
      const twoHours = 2 * 60 * 60 * 1000; 
  
      if (tokenAge < twoHours) {
        setToken(storedToken);
        setUsername(storedUsername);
        setUserLoggedIn(true);
      } else {
        // Token scaduto
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("tokenTimestamp");
      }
    }
  
    setLoading(false);
  }, []);
  


  const login = async (email, password) => {
    try {
      const { token, username } = await signInApi(email, password); 
      setToken(token);
      setUsername(username);
      setUserLoggedIn(true);
  
      const timestamp = Date.now();
  
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
