import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../../css/main.css';

export default function DescriptionPage() {
    const navigate = useNavigate();

    const handleTryItNow = () => {
        navigate("/detect-objects");
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
                        Our <span className="green-color fw-bold">Dog&Cat </span>Detection web application leverages cutting-edge <a href="https://docs.ultralytics.com/models/yolov8/" className="green-color fst-italic" target="_blank">YOLOv8</a> technology to provide you with a seamless and powerful object
                        detection experience. Here's a step-by-step guide on how the magic
                        happens:
                    </p>

                    <ol className="app-description">
                        <li>
                            <strong>Upload Your Image:</strong> Start by uploading an image. You can either browse from your device, use ctrl+v to paste from the clipboard, or drag and drop an image into the app. If you don't have any images on hand! No problem! Choose one of our sample images to explore the power of our detecting object systems.
                        </li>
                        <li>
                            <strong>AI Detection Process:</strong> Once your image is uploaded, our application will automatically send the image to our advanced AI model and start processing your image. It will analyze the image to detect and identify dogs and cats within seconds.
                        </li>
                        <li>
                            <strong>View Results:</strong> After successfully inferred, you can see the detected objects highlighted with bounding boxes and labels directly on the image. Also have detailed detection results such as category of the image, confidence score of detected objects.
                        </li>
                        <li>
                            <strong>Download Detected Images:</strong> Save the detected images with bounding boxes and labels. The downloaded image file names follow the format: <span className="file-name-format text-nowrap fst-italic">{"{category}...{image_id}.png"}</span> where <span className="green-color fst-italic">{"{category}"}</span> can be <i>"ADog", "ACat", or "BothDog&Cat"</i>. This makes it easy to store and categorize the images into different folders based on the category.
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
                    <Button className="upload-btn" onClick={handleTryItNow}>Try It Now</Button>
                </Col>
            </Row>
        </Container>
    );
}