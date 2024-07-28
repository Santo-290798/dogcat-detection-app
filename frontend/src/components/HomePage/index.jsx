import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UploadImage from '../UploadImage';
import '../../css/main.css';
import './style.css';

export default function HomePage({ title: fullTitle, description }) {
    const [firstWordTitle, ...restOfTitle] = fullTitle.split(" ");

    return (
        <Container className="main">
            <Row className="justify-content-center">
                <Col sm={12}>
                    <h1 className="text-center app-title">
                        <span className="green-color">{firstWordTitle}</span>{" "}
                        <span>{restOfTitle.join(" ")}</span>
                    </h1>
                    <p className="text-center app-description">{description}</p>
                </Col>
            </Row>

            <UploadImage />
        </Container>
    )
}