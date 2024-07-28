import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../../css/main.css';

export default function DescriptionPage() {
    const navigate = useNavigate();

    const handleTryItNow = () => {
        // Navigate to the root path="/" (the `HomePage` page) when the button is clicked
        navigate("/");
    };

    return (
        <Container className="main">
            <Row className="justify-content-center">
                <Col xxl={10} lg={9}>
                    <h1 className="app-title text-center mb-4">Welcome to <span className="green-color">Dog&Cat </span>Detection</h1>
                    <p className="app-description">
                        Explore the amazing world of object detection with our <span className="green-color fw-bold">Dog&Cat </span>
                        Detection web application. Whether you are a pet lover or just
                        curious, this application lets you identify and visualize dogs and
                        cats in your images.
                    </p>

                    <h2 className="mt-4">How It Works</h2>
                    <p className="app-description">
                        Our <span className="green-color fw-bold">Dog&Cat </span>Detection web application leverages cutting-edge
                        YOLOv8 technology to provide you with a seamless and powerful object
                        detection experience. Here's a step-by-step guide on how the magic
                        happens:
                    </p>

                    <ol className="app-description">
                        <li>
                            <strong>Upload Your Image:</strong> Begin by uploading an image, and our application will attempt to detect and identify any dogs and cats present in the image. You can easily
                            do this by clicking the 'Upload' button and selecting the image
                            from your device.
                        </li>
                        <li>
                            <strong>Explore Sample Images:</strong> Don't have an image on
                            hand? No problem! Explore our sample images to witness the power
                            of object detection. Click on a sample image, and the application
                            will showcase its ability to identify dogs and cats in various
                            scenarios.
                        </li>
                        <li>
                            <strong>Efficient Detection Process:</strong> After selecting your image, our application gears up to unveil the magic through the YOLOv8 model. But hold on, we've added a touch of suspense! The real show begins when you hit that 'Detect' button. Get ready for an exciting reveal as the detection process kicks in, showcasing the incredible capabilities of our technology.
                        </li>
                        <li>
                            <strong>Visualize Results:</strong> The detected dogs and cats are
                            then highlighted on the image, providing you with a visual
                            representation of the detection results. Each bounding box
                            represents the location of a detected object, making it easy for
                            you to see the accuracy of the detection.
                        </li>
                        <li>
                            <strong>Enjoy the Experience:</strong> Sit back, relax, and enjoy
                            the experience of discovering the world of object detection.
                            Whether you're a pet owner curious about the technology or simply
                            want to have some fun, our application provides an intuitive and
                            enjoyable way to interact with image recognition technology.
                        </li>
                    </ol>

                    <p className="app-description">
                        It's that simple! Our <span className="green-color fw-bold">Dog&Cat </span>Detection web application puts the
                        power of advanced object detection in your hands, making it
                        accessible and enjoyable for users of all backgrounds.
                    </p>

                    <h2 className="mt-4">Get Started</h2>
                    <p className="app-description">
                        Ready to see the magic? Click the button below to start detecting
                        dogs and cats in your images!
                    </p>
                    <Button variant="primary" onClick={handleTryItNow}>Try It Now</Button>
                </Col>
            </Row>
        </Container>
    );
}