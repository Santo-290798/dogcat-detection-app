import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className='mt-5 pt-4 pb-2 text-center'>
            <Container>
                <Row>
                    <Col>
                        <p>&copy; 2024 Dog&Cat Detection</p>
                        <p>Created by Tin Doan</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;