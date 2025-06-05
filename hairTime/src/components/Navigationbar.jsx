import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './NavigationbarStyle.css';

import { useAuth } from "contexts/authContext/AuthContext"

function Navigationbar({onLoginRegisterClick, onMyAppointmentsClick, onAppointmentClick}) {

  const { userLoggedIn, username, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" id='nav_conteiner'>
      <Container>
        <Navbar.Brand href="#home">
          <img src="/icons/logo.png" alt="Logo" style={{ height: '100px', width: 'auto', objectFit: 'contain' }}  />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" >Home</Nav.Link>
            <Nav.Link href="#link">I nostri lavori</Nav.Link>
            <Nav.Link href="#link" onClick={onAppointmentClick}>Appuntamenti</Nav.Link>
             {userLoggedIn ? (
              <NavDropdown title={`Benvenuta, ${username || "User"}`} id="user-nav-dropdown">
                <NavDropdown.Item href="#myaccount" onClick={onMyAppointmentsClick}>
                  <i className="bi bi-gear me-2" />Le mie prenotazioni
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <i className="bi bi-power me-2"/> Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Login" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={onLoginRegisterClick}>
                  Accedi / Registrati
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;