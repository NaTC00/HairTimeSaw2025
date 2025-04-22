import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './NavigationbarStyle.css';

function Navigationbar() {
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
            <Nav.Link href="#link">Appuntamenti</Nav.Link>
            <NavDropdown title="Login" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;