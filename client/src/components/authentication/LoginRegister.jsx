

import React from "react" 
import "./LoginResterStyle.css"
import EditInputText from "../EditInputText";
import FailureAlert from "../alert/FailureAlert"
import SuccessAlert from "../alert/SuccessAlert"
import useLoginRegister from "../../hooks/useLoginRegister";

// Componente per login e registrazione utente
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
  } = useLoginRegister();

    const commonProps = {
      borderColor: "var(--secondary)",
      focusColor: "var(--orange)",
      backgroundColor: "var(--background_cream)",
      textColor: "var(--secondary)",
      size: "lg",
      onSubmit: {},
    };
    
   //Funzione chiamata al submit del form per effettuare la registrazione
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

    // Funzione chiamata al submit del form di login
    const handleSignIn = async (e) => {
      const result = await onSubmitSignIn(e);
    
      if (result.success) {
        setErrorMessage(""); // Pulisce eventuali messaggi di errore
        console.log("Success login")  
        onClose?.(); // Chiude la modale in caso di successo     
      } else {
        console.log("Error login")  
        const serverMessage =
          result?.error?.response?.data?.error || "Errore durante il login.";
        setErrorMessage(serverMessage); 
      }
    };
    
    
  // Passaggio dalla vista di registrazione a login
  const handleSwitchToLogin = () => {
    document.getElementById("modal_content").classList.remove("active");
    resetFormFields();
  };
  // Passaggio dalla vista di login a registrazione
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
              <h1>Bentornato!</h1>
              <p>Siamo felici di rivederti. Accedi per continuare.</p>
              <button className="hidden btn border-white text-white p-2" id="login" onClick={handleSwitchToLogin}>
                Login
              </button>
            </div>
            <div className="switch-panel switch-right">
              <h1>Benvenuto!</h1>
              <p>Unisciti a noi e scopri tutti i vantaggi della nostra piattaforma.</p>
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