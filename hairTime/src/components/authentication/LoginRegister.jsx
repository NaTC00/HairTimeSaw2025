/* eslint-disable no-unused-vars */

import React, { useState } from "react" 
import "./LoginResterStyle.css"
import { useAuth } from "contexts/authContext/AuthContext"
import EditInputText from "../EditInputText";
import {signUp} from "../../httpManager/request"
import FailureAlert from "../alert/FailureAlert"
import SuccessAlert from "../alert/SuccessAlert"

function LoginRegister({ onClose }) {
    const {userLoggedIn, login} = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [alertError, setAlertError] = useState(null);
    const [alertSucces, setAlertSuccess] = useState(null);


    const commonProps = {
      borderColor: "var(--secondary)",
      focusColor: "var(--orange)",
      backgroundColor: "var(--background_cream)",
      textColor: "var(--secondary)",
      size: "lg",
      onSubmit: {},
    };
    const onSubmitSignUp = async (e) => {
      
      e.preventDefault();
      try {
       
        await signUp(username, email, password)
        console.log(`Registrazione utente ${username} andata a buon fine`);
        const content = {heading: "Registrazione completata",  message: "Il tuo account è stato creato con successo. Ora puoi accedere."}
        setAlertSuccess({...content})
      } catch (error) {
        console.error(`Errore registrazione utente ${username}: ${error.message}`);
        setAlertError({ ...error });
      }
    };


  

    

    
    const onSubmitSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMessage("");
      try {
        await login(email, password);
        console.log(`Login utente ${username} andata a buon fine`);
      } catch (error) {
        console.error(`Errore login utente ${username}: ${error.message}`);
        setErrorMessage("Le credenziali non sono corrette. Verifica e riprova.");
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  const resetFormFields = () => {
    setEmail("");
    setPassword("");
    setUsername("");
  };

  const handleSwitchToLogin = () => {
    document.getElementById("modal_content").classList.remove("active");
    resetFormFields();
  };

  const handleSwitchToRegister = () => {
    document.getElementById("modal_content").classList.add("active");
    resetFormFields();
  };

  return (
    <div className="modal_overlay">
       {alertError && <FailureAlert error={alertError} title = "Registrazione fallita" />}
       {alertSucces && <SuccessAlert content={alertSucces}/>}
      <div className="modal_content d-flex justify-content-center align-items-center" id="modal_content">
        <button className="close-button" onClick={onClose}>×</button>

        {/* ----------- Left side - Create Account ----------- */}
        <div className="p-5">
         
          <form>
            <div className="header-text mb-4">
              <h1>Crea account</h1>
            </div>
            <EditInputText
              {...commonProps}
              backgroundColor="white"
              label="Username"
              placeholder="Username"
              inputType="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isSigningIn}
            />
            <EditInputText
              {...commonProps}
              backgroundColor="white"
              label="Email"
              placeholder="Email"
              inputType="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSigningIn}
            />
            <EditInputText
              {...commonProps}
              backgroundColor="white"
              label="Password"
              placeholder="Password"
              inputType="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSigningIn}
            />
            <div className="input-group mb-3 justify-content-center">
              <button type="submit" className="btn p-2" onClick={onSubmitSignUp} disabled={isSigningIn}>
                Register
              </button>
            </div>
          </form>
        </div>

        {/* ----------- Right side - Sign In ----------- */}
        <div className="col-md-6 right-box">
          <form>
            <div className="header-text mb-4">
              <h1>Login</h1>
            </div>
            <EditInputText
              {...commonProps}
              backgroundColor="white"
              label="Email"
              placeholder="Email"
              inputType="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSigningIn}
            />
            <EditInputText
              {...commonProps}
              backgroundColor="white"
              label="Password"
              placeholder="Password"
              inputType="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSigningIn}
            />

            {errorMessage && (
              <div className="d-flex align-items-center text-danger mb-2" style={{ fontSize: "0.9rem" }}>
                <span>{errorMessage}</span>
              </div>
            )}

          
            <div className="input-group mb-3 justify-content-center">
              <button
                type="submit"
                className="btn p-2 d-flex align-items-center justify-content-center"
                onClick={onSubmitSignIn}
                disabled={isSigningIn}
                style={{ minWidth: "100px" }}
              >
                {isSigningIn ? (
                  <div className="spinner-border spinner-border-sm text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* ---------- switch panel ---------- */}
        <div className="switch-content">
          <div className="switch">
            <div className="switch-panel switch-left">
              <h1>Hello, Again</h1>
              <p>We are happy to see you back</p>
              <button className="hidden btn border-white text-white p-2" id="login" onClick={handleSwitchToLogin}>
                Login
              </button>
            </div>
            <div className="switch-panel switch-right">
              <h1>Welcome</h1>
              <p>Join Our Platform</p>
              <button className="hidden btn border-white text-white p-2" id="register" onClick={handleSwitchToRegister}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;