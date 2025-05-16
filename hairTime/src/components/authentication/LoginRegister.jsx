/* eslint-disable no-unused-vars */

import React, { useState } from "react" 
import "./LoginResterStyle.css"
import { Container, Row, Col, Figure } from 'react-bootstrap'
import {doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword, doSignInWithGoogle} from '../../firebase/authHelper'
import { useAuth } from "contexts/authContext/AuthContext"

function LoginRegister({ onClose }) {
    const {userLoggedIn} = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmitSignUp = async (e) => {
      
      e.preventDefault();
      try {
        await doCreateUserWithEmailAndPassword(email, password, username);
        console.log(`Registrazione utente ${username} andata a buon fine`);
      } catch (error) {
        console.error(`Errore registrazione utente ${username}: ${error.message}`);
        setErrorMessage(error.message);
      }
    };
    
    
      const onSubmitSignIn = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
          setIsSigningIn(true);
          try{
            await doSignInWithEmailAndPassword(email, password)
            console.log(`Login utente ${username} andata a buon fine`);
          }catch(error){
            console.log(`Errore login utente ${username}: ${error.message}`);
            setErrorMessage(error.message);
            setIsSigningIn(false);
          }
        }
      };
    
      const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if (isSigningIn) return;

      

        try {
          await doSignInWithGoogle();
          setIsSigningIn(true);
        } catch (err) {
          setErrorMessage(err.message);
        } finally {
          setIsSigningIn(false);
        }
      };


      const resetFormFields = () => {
        setEmail('');
        setPassword('');
        setUsername('');
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
        <div className="modal_content d-flex justify-content-center align-items-center " id="modal_content">
            <button className="close-button" onClick={onClose}>×</button>
          {/* ----------- Left side - Create Account ----------- */}
            <div className="p-4">
                <form>
                <div className="header-text mb-4">
                    <h1>Crea account</h1>
                </div>
                <div className="input-group mb-3">
                    <input type="text" placeholder="Username" className="form-control form-control-lg bg-light fs-6" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input-group mb-3">
                    <input type="email" placeholder="Email" className="form-control form-control-lg bg-light fs-6" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="input-group mb-3">
                    <input type="password" placeholder="Password" className="form-control form-control-lg bg-light fs-6" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="input-group mb-3 justify-content-center">
                    <button type="submit" className="btn  w-50 fs-6" onClick={onSubmitSignUp}>Register</button>
                </div>
                
                </form>
                <Container fluid hidden>
                    <p className="text-center">Oppure accedi con:</p>
                   <Row className="align-items-center justify-content-center" >
                   
                       <Col md="auto" className="d-flex justify-content-center align-items-center">
                           <Figure>
                               <Figure.Image
                                   width={40}
                                   height={40}
                                   src="/icons/facebook.png"
                                   className="auth2-icon"
                                
                               />
                           </Figure>
                       </Col>
                       <Col md="auto" className="d-flex justify-content-center align-items-center">
                        
                           <div onClick={onGoogleSignIn} style={{ cursor: "pointer" }}>
                            <Figure>
                              <Figure.Image
                                width={40}
                                height={40}
                                src="/icons/ic_google.png"
                                className="auth2-icon"
                              />
                            </Figure>
                          </div>

                       </Col>
                   </Row>
               </Container>
            </div>
  
            {/* ----------- Right side - Sign In ----------- */}
            <div className="col-md-6 right-box">
                <form>
                <div className="header-text mb-4">
                    <h1>Login</h1>
                </div>
                <div className="input-group mb-3">
                    <input type="email" placeholder="Email" className="form-control form-control-lg bg-light fs-6" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="input-group mb-3">
                    <input type="password" placeholder="Password" className="form-control form-control-lg bg-light fs-6" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">Remember me</label>

                </div>
                
                <div className="input-group mb-3 justify-content-center">
                    <button type="submit" className="btn w-50 fs-6" onClick={onSubmitSignIn}>Login</button>
                </div>
        
                </form>
                <Container fluid>
                   
                    <Row className="align-items-center justify-content-center" >
                        <p className="text-center">Oppure accedi con:</p>
                        <Col md="auto" className="d-flex justify-content-center align-items-center">
                            <Figure>
                                <Figure.Image
                                    width={40}
                                    height={40}
                                    src="/icons/facebook.png"
                                    className="auth2-icon"
                                />
                            </Figure>
                        </Col>
                        <Col md="auto" className="d-flex justify-content-center align-items-center">
                        <Figure>
                                <Figure.Image
                                    width={40}
                                    height={40}
                                    src="/icons/ic_google.png"
                                    className="auth2-icon"
                                    onClick={onGoogleSignIn}
                                />
                            </Figure>
                        </Col>
                    </Row>
                </Container>
            </div>

            

          {/* ---------- switch panel ----------*/}
           <div className="switch-content">
                <div className="switch">
                    <div className="switch-panel switch-left">
                        <h1>Hello, Again</h1>
                        <p>We are happy to see you back</p>
                        <button className="hidden btn border-white text-white w-50 fs-6" id="login" onClick={handleSwitchToLogin}>Login</button>
                    </div>
                    <div className="switch-panel switch-right">
                        <h1>Welcome</h1>
                        <p>Join Our Platform</p>
                        <button className="hidden btn border-white text-white w-50 fs-6" id="register" onClick={handleSwitchToRegister}>Register</button>
                    </div>
                </div>
            </div>
        </div>
        
      </div>
    );
  }
  

export default LoginRegister