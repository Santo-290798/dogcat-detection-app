import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css';

const Footer = () => {
    return (
        <footer className="mt-5 pt-4 pb-2 text-center footer">
            <Container>
                <Row>
                    <Col>
                        <p>&copy; 2023 Dog&Cat Detection</p>
                        <p>Created by Tin Doan</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
