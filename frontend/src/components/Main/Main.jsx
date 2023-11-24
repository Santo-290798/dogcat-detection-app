import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PicView from '../PicView';
import { drawImage, drawBoxes } from '../../utils/canvasUtils';
import '../../css/main.css';
import './style.css';

export default function Main({ title: fullTitle, description }) {
    const [firstWordTitle, ...restOfTitle] = fullTitle.split(' ');

    const drawImageBoxes = (context, src, bndboxList, canvasWidth, canvasHeight) => {
        const img = new Image();
        img.onload = function () {
            const { scale, centerShiftX, centerShiftY } = drawImage(context, img, canvasWidth, canvasHeight);
            drawBoxes(context, bndboxList, scale, centerShiftX, centerShiftY);
        }
        img.src = src;
    };

    return (
        <Container className="main">
            <Row className="justify-content-center">
                <Col sm={12}>
                    <h1 className="text-center app-title">
                        <span className="green-color">{firstWordTitle}</span>{" "}
                        <span>{restOfTitle.join(' ')}</span>
                    </h1>
                    <p className="text-center app-description">{description}</p>
                </Col>
            </Row>

            <PicView drawImageBoxes={drawImageBoxes} />
        </Container>
    )
}