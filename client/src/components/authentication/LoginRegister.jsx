

import React, { useState } from "react" 
import "./LoginResterStyle.css"
import { useAuth } from "contexts/authContext/AuthContext"
import EditInputText from "../EditInputText";
import {signUp} from "../../httpManager/request"
import FailureAlert from "../alert/FailureAlert"
import SuccessAlert from "../alert/SuccessAlert"
import useLoginRegister from "../../hooks/useLoginRegister";

function LoginRegister({ onClose }) {
   const {
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
  } = useLoginRegister(onClose);

    const commonProps = {
      borderColor: "var(--secondary)",
      focusColor: "var(--orange)",
      backgroundColor: "var(--background_cream)",
      textColor: "var(--secondary)",
      size: "lg",
      onSubmit: {},
    };
    
   
    const handleSignUp = async (e) => {
      const result = await onSubmitSignUp(e);
      if (!result.success) {
        showAlert({
          title: "Registrazione fallita!",
          message: result.error,
          error: true,
        });
      } else {
        showAlert({
          title: "Registrazione completata!",
          message: "Benvenuto nel nostro salone",
          error: false,
        });
      }
    };

    const handleSignIn = async (e) => {
      const result = await onSubmitSignIn(e);
    
      if (result.success) {
        setErrorMessage(""); 
        console.log("Success login")  
        onClose?.();          
      } else {
        console.log("Success login")  
        const serverMessage =
          result?.error?.response?.data?.error || "Errore durante il login.";
        setErrorMessage(serverMessage); 
      }
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
       {alert && (
        alert.error ? (
          <FailureAlert error={alert.message} title={alert.title} onClose={hideAlert} />
        ) : (
          <SuccessAlert content={{ heading: alert.title, message: alert.message }} onClose={hideAlert} />
        )
      )}

      <div className="modal_content d-flex justify-content-center align-items-center" id="modal_content">
        <button className="close-button" onClick={onClose}>×</button>

        {/* ----------- Left side - Create Account ----------- */}
        <div className="p-5">
         
          <form onSubmit={handleSignUp}>
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
              <button type="submit" className="btn p-2" disabled={isSigningIn}>
                Register
              </button>
            </div>
          </form>
        </div>

        {/* ----------- Right side - Sign In ----------- */}
        <div className="col-md-6 right-box">
          <form onSubmit={handleSignIn}>
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