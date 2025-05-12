import React from "react" 
import "./LoginResterStyle.css"
import { Container, Row, Col, Figure } from 'react-bootstrap';
function LoginRegister({ onClose }) {
    
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
                    <input type="text" placeholder="Nome" className="form-control form-control-lg bg-light fs-6" />
                </div>
                <div className="input-group mb-3">
                    <input type="email" placeholder="Email" className="form-control form-control-lg bg-light fs-6" />
                </div>
                <div className="input-group mb-3">
                    <input type="password" placeholder="Password" className="form-control form-control-lg bg-light fs-6" />
                </div>
                <div className="input-group mb-3 justify-content-center">
                    <button type="submit" className="btn  w-50 fs-6">Register</button>
                </div>
                
                </form>
                <Container fluid>
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
                       <Figure>
                               <Figure.Image
                                   width={40}
                                   height={40}
                                   src="/icons/ic_google.png"
                                   className="auth2-icon"
                               />
                           </Figure>
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
                    <input type="email" placeholder="Email" className="form-control form-control-lg bg-light fs-6" />
                </div>
                <div className="input-group mb-3">
                    <input type="password" placeholder="Password" className="form-control form-control-lg bg-light fs-6" />
                </div>
                <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">Remember me</label>

                </div>
                
                <div className="input-group mb-3 justify-content-center">
                    <button type="submit" className="btn w-50 fs-6">Login</button>
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
                        <button className="hidden btn border-white text-white w-50 fs-6" id="login" onClick={() => {document.getElementById("modal_content").classList.remove("active");}}>Login</button>
                    </div>
                    <div className="switch-panel switch-right">
                        <h1>Welcome</h1>
                        <p>Join Our Platform</p>
                        <button className="hidden btn border-white text-white w-50 fs-6" id="register" onClick={() => {
                            document.getElementById("modal_content").classList.add("active");}}>Register</button>
                    </div>
                </div>
            </div>
        </div>
        
      </div>
    );
  }
  

export default LoginRegister