import { useState } from "react";
import { signUp } from "../httpManager/request";
import { useAuth } from "../contexts/authContext/AuthContext";
import { useAlert } from "./useAlert";

// Hook custom per gestire login e registrazione
export default function useLoginRegister() {
  const { login } = useAuth();

  // Hook personalizzato per gestire login e registrazione
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [isSigningIn, setIsSigningIn] = useState(false);
  const { alert, showAlert, hideAlert } = useAlert();
  const [errorMessage, setErrorMessage] = useState("");

  const resetFormFields = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setErrorMessage("");
  };

  // Funzione per gestire il login
  const onSubmitSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await login(email, password); // Effettua il login
        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error,
        };
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  // Funzione per gestire la registrazione
  const onSubmitSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(username, email, password); // Chiamata API per registrarsi
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    isSigningIn,
    alert,
    showAlert,
    hideAlert,
    errorMessage,
    setErrorMessage,
    onSubmitSignIn,
    onSubmitSignUp,
    resetFormFields,
  };
}
