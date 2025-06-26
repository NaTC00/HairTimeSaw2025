import React from 'react';
import { Container, Row, Col, Figure, Stack } from 'react-bootstrap';
import './FooterStyle.css';
// Componente Footer che mostra logo, sedi, contatti e social media
export default function Footer() {
    return(
        <footer className="footer-container" style={{backgroundcolor: 'f8f9fa'}}>
            <Container fluid>
            <Row className="align-items-center">
                   
                    <Col><hr className="footer-line" /></Col>
                    
                    
                    <Col className="figure-container">
                        <Figure>
                            <Figure.Image
                                width={200}
                                height={200}
                                src="/icons/logo.png" 
                                className="footer-logo"
                            />
                        </Figure>
                    </Col>
                    
                   
                    <Col><hr className="footer-line" /></Col>
                </Row>
                <Row className="text-center">
                    <Col>
                        <p style={{fontFamily:'sans-serif', color: 'var(--orange)', fontWeight: 'bold', letterSpacing: '4px', textTransform: 'uppercase', marginBottom:'50px'}}>Dove trovarci</p>
                        
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col className="text-center">
                    
                        <Figure>
                            <Figure.Image
                            width={50}
                            height={50}
                            alt="Location pin"
                            src="/icons/location.png"
                            className="location-icon"
                            />
                            <Figure.Caption>
                            <h4 className="location-title">Roma</h4>
                            <p className="location-address">Via Giulio Cesare, RO, 81063</p>
                            </Figure.Caption>
                        </Figure>
                    </Col>
                    <Col className="text-center">
                    
                        <Figure>
                            <Figure.Image
                            width={50}
                            height={50}
                            alt="Location pin"
                            src="/icons/location.png"
                            className="location-icon"
                            />
                            <Figure.Caption>
                            <h4 className="location-title">Milano</h4>
                            <p className="location-address">Via Monte Napoleone, Mi, 41079</p>
                            </Figure.Caption>
                        </Figure>
                    </Col>
                    <Col className="text-center">
                    
                        <Figure>
                            <Figure.Image
                            width={50}
                            height={50}
                            alt="Location pin"
                            src="/icons/location.png"
                            className="location-icon"
                            />
                            <Figure.Caption>
                            <h4 className="location-title">Firenze</h4>
                            <p className="location-address">Via Michelangelo, FI, 35217</p>
                            </Figure.Caption>
                        </Figure>
                    </Col>
                </Row>
                <Row>

                <Stack gap={3} direction='horizontal' style={{marginTop: '50px'}}>
                    <Stack gap={3}>

                        <Container fluid>
                            <Row>
                                <p style={{fontFamily:'sans-serif', color: 'var(--orange)', fontWeight: 'bold', letterSpacing: '4px', textTransform: 'uppercase' }}>contact us</p>
                            </Row>
                        </Container>
                        <Container fluid>
                                <Row className="align-items-center" >
                                    <Col md="auto" className="d-flex justify-content-center align-items-center">
                                        <Figure>
                                            <Figure.Image
                                                width={40}
                                                height={40}
                                                src="/icons/telephone.png"
                                                className="location-icon"
                                            />
                                        </Figure>
                                    </Col>
                                    <Col md="auto" className="d-flex justify-content-center align-items-center">
                                        <p>+39 345 788 0851</p>
                                    </Col>
                                </Row>

                            </Container>
                            <Container fluid>
                                <Row className="align-items-center" >
                                    <Col md="auto" className="d-flex justify-content-center align-items-center">
                                        <Figure>
                                            <Figure.Image
                                                width={40}
                                                height={40}
                                                src="/icons/email.png"
                                                className="location-icon"
                                            />
                                        </Figure>
                                    </Col>
                                    <Col md="auto" className="d-flex justify-content-center align-items-center">
                                        <p>HairTime@company.com</p>
                                    </Col>
                                </Row>

                        </Container>

                    </Stack>

                    <Stack gap={3}>
                        <Container fluid>
                            <Row>
                                <p style={{fontFamily:'sans-serif', color: 'var(--orange)', fontWeight: 'bold', letterSpacing: '4px', textTransform: 'uppercase' }}>follow us</p>
                            </Row>
                        </Container>

                        <Container fluid>
                            <Row className="align-items-center" >
                                <Col md="auto" className="d-flex justify-content-center align-items-center">
                                    <Figure>
                                        <Figure.Image
                                            width={40}
                                            height={40}
                                            src="/icons/facebook.png"
                                            className="location-icon"
                                        />
                                    </Figure>
                                </Col>
                                <Col md="auto" className="d-flex justify-content-center align-items-center">
                                    <p>HairTime Salon</p>
                                </Col>
                            </Row>

                        </Container>
                        <Container fluid>
                            <Row className="align-items-center" >
                                <Col md="auto" className="d-flex justify-content-center align-items-center">
                                    <Figure>
                                        <Figure.Image
                                            width={40}
                                            height={40}
                                            src="/icons/instagram.png"
                                            className="location-icon"
                                        />
                                    </Figure>
                                </Col>
                                <Col md="auto" className="d-flex justify-content-center align-items-center">
                                    <p>@HairTime_Salon</p>
                                </Col>
                            </Row>

                        </Container>
                        <Container fluid>
                            <Row className="align-items-center" >
                                <Col md="auto" className="d-flex justify-content-center align-items-center">
                                    <Figure>
                                        <Figure.Image
                                            width={40}
                                            height={40}
                                            src="/icons/twitter.png"
                                            className="location-icon"
                                        />
                                    </Figure>
                                </Col>
                                <Col md="auto" className="d-flex justify-content-center align-items-center">
                                    <p>@HairTime_Official</p>
                                </Col>
                            </Row>

                        </Container>

                    </Stack>
                    
                    
                    
                    </Stack>
                </Row>

            </Container>

        </footer>
        
    );
}