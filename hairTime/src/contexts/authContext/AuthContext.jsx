import React, { useContext, useState, useEffect, createContext } from "react";
import { signInApi } from "../../httpManager/request"; 

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setUserLoggedIn(true);
    }
    setLoading(false);
  }, []);


  const login = async (email, password) => {
    try {
      const { token } = await signInApi(email, password); 
      setToken(token);
      setUserLoggedIn(true);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Errore login:", error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUserLoggedIn(false);
    localStorage.removeItem("token");
  };

  const value = {
    token,
    userLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
