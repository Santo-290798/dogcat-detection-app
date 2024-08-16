import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown, Button, Offcanvas } from 'react-bootstrap';

import { emptyDetectedImageList } from '../redux/slices/detectedImagesSlice';

const MyNavbar = () => {
    const [expanded, setExpanded] = useState(false);
    const [showDropdownMenu, setShowDropdownMenu] = useState(false);

    const dispatch = useDispatch();

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    const handleSelect = () => {
        setExpanded(false);
    };

    const handleReloadPage = () => {
        dispatch(emptyDetectedImageList());
    };

    const handleHoverDropdown = (show) => {
        setShowDropdownMenu(show);
    };

    return (
        <Navbar expand='lg' fixed='top' className='shadow bg-white' expanded={expanded}>
            <Container>
                <a
                    href='/'
                    className='navbar-brand d-flex align-items-center'
                    onClick={handleReloadPage}
                    draggable={false}
                >
                    <img alt='logo' src='/assets/images/logo.svg' height={50} width={205} className='d-inline-block align-top ms-3' draggable={false} />
                </a>
                <Navbar.Toggle aria-controls='offcanvasNavbar' onClick={handleToggle} />
                <Navbar.Offcanvas
                    show={expanded}
                    id='offcanvasNavbar'
                    placement='end'
                    className='w-100'
                    aria-labelledby='offcanvasNavbarLabel'
                >
                    <Offcanvas.Header closeButton className='pb-0' onClick={handleToggle}>
                        <Offcanvas.Title id='offcanvasNavbarLabel' className='d-flex flex-grow-1 justify-content-center'>
                            <a
                                href='/'
                                className='navbar-brand d-flex align-items-center'
                                onClick={handleReloadPage}
                                draggable={false}
                            >
                                <img alt='logo' src='/assets/images/logo.svg' height={50} width={205} className='d-inline-block align-top' draggable={false} />
                            </a>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className='justify-content-center flex-grow-1 column-gap-4 menu-item fw-medium'>
                            <Link to='/' className='nav-link' onClick={handleSelect}>Home</Link>
                            <Link to='/how-it-works' onClick={handleSelect} className='nav-link'>How it works</Link>
                            <NavDropdown
                                title='Solutions'
                                id='solutions-dropdown'
                                show={showDropdownMenu}
                                onMouseOver={() => handleHoverDropdown(true)}
                                onMouseLeave={() => handleHoverDropdown(false)}
                            >
                                <NavDropdown.Item href='/detect-objects'>Object Detection</NavDropdown.Item>
                                {/* <NavDropdown.Item href='/export'>Export images</NavDropdown.Item>
                                <NavDropdown.Item href='/auto-labeling'>Auto labeling</NavDropdown.Item> */}
                            </NavDropdown>
                        </Nav>
                        <div>
                            <Button className='login-btn fs-6'>Login</Button>
                        </div>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};

export default MyNavbar;