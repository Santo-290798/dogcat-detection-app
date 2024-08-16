import { Container, Row, Col } from 'react-bootstrap';

import { UploadImage } from '../../components';

const Home = ({ title, description }) => {
    const [mainObjects, ...restOfTitle] = title.split(' ');

    return (
        <Container style={{ marginTop: '100px' }}>
            <Row className='justify-content-center'>
                <Col sm={12}>
                    <h1 className='text-center app-title'>
                        <span className='highlight-color'>{mainObjects}</span>{' '}
                        <span>{restOfTitle.join(' ')}</span>
                    </h1>
                    <p className='text-center app-description'>{description}</p>
                </Col>
            </Row>

            <UploadImage />
        </Container>
    );
};

export default Home;