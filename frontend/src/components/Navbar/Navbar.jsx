import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../../img/logo.svg';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import '../../css/main.css';
import './style.css';

export default function MyNavbar() {
    return (
        <Navbar expand="lg" fixed="top" className="shadow bg-white">
            <Container>
                <Link to="/" className="navbar-brand d-flex align-items-center">
                    <img
                        alt="logo"
                        src={Logo}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                    />{' '}
                    <span className="brand"><span className="green-color">Dog&Cat</span>Detection</span>
                </Link>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">
                            Menu
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-center flex-grow-1 menu-item">
                            <Link to="/how-it-works" className="nav-link">How it works</Link>
                            <NavDropdown title="Solutions" id="solutions-dropdown">
                                <NavDropdown.Item href="/#solution/detect">Detection</NavDropdown.Item>
                                {/* <NavDropdown.Item href="#solution/segment">Segmentation</NavDropdown.Item>
                                <NavDropdown.Item href="#solution/classify">Classification</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#solution/pose">Pose estimation</NavDropdown.Item> */}
                            </NavDropdown>
                            <NavDropdown title="Features" id="features-dropdown">
                                <NavDropdown.Item href="/#feature/ai">Computer vision</NavDropdown.Item>
                                {/* <NavDropdown.Item href="#feature/export">Export images</NavDropdown.Item> */}
                                {/* <NavDropdown.Item href="#feature/auto-labeling">Auto labeling</NavDropdown.Item> */}
                            </NavDropdown>
                        </Nav>
                        <div>
                            <Button className="login-btn">Login</Button>
                        </div>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}