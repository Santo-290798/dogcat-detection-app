import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useRef, useEffect } from 'react';
import SampleImg1 from '../../img/dogcat_sample1.png';
import SampleImg2 from '../../img/dogcat_sample2.png';
import SampleImg3 from '../../img/dogcat_sample3.jpg';
import SampleImg4 from '../../img/dogcat_sample4.jpg';
import './style.css';

import axios from "../../api/axios";
import { DETECT_URL } from '../../api/axios';

export default function PicView({ drawImageBoxes }) {
    let isDetected = false;
    let base64ImgSelected = undefined;

    const canvasRef = useRef(null);
    const inputFile = useRef(null);
    const spinner = useRef(null);

    let context = null;
    const displayWidth = 616;
    const displayHeight = 310;

    useEffect(() => {
        const canvas = canvasRef.current;
        context = canvas.getContext('2d');

        // Setting the width and height properties of the canvas.
        canvas.style.width = displayWidth + 'px';
        canvas.style.height = displayHeight + 'px';
        canvas.width = displayWidth;
        canvas.height = displayHeight;

        handleSelectSampleImage(SampleImg1); // auto select first sample image when the app starts
    }, []);

    const handleSelectSampleImage = (imgSrc) => {
        isDetected = false;

        const canvas = canvasRef.current;

        drawImageBoxes(context, imgSrc, [], canvas.width, canvas.height);

        // Load the image as a blob via XMLHttpRequest and uses the FileReader API to convert it to a dataURL
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onload = function (e) {
                base64ImgSelected = e.target.result;
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', imgSrc);
        xhr.responseType = 'blob';
        xhr.send();
    };

    const focusInputFile = () => {
        inputFile.current.click();
    };

    const handleUploadImage = (event) => {
        const validExtensions = ["png", "jpg", "jpeg"];
        const file = event.target.files[0];
        if (!file) return;

        const fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1);
        if (!validExtensions.includes(fileExtension)) {
            alert('Only JPG and PNG images are supported.');
            return;
        }
        if (file.size > 5000000) { // size in bytes
            alert(`Your image's size '${file.name}' too big (${(file.size / 1000000).toFixed(2)}MB) - the maximum size is 5MB.`);
            return;
        }

        const url = URL.createObjectURL(file);
        const canvas = canvasRef.current;
        drawImageBoxes(context, url, [], canvas.width, canvas.height);

        isDetected = false;

        // Assign base64 string of image that the user just uploaded to base64ImgSelected variable
        const reader = new FileReader();
        reader.onload = function (e) {
            base64ImgSelected = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    const handleDetectObject = () => {
        const canvas = canvasRef.current;

        const fetchData = async () => {
            try {
                // Start the spinner
                spinner.current.style.display = 'flex';

                // Fetch data from the server
                const response = await axios.post(DETECT_URL,
                    JSON.stringify({ image: base64ImgSelected }),
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                    }
                );

                const data = response.data;

                // Log the message
                console.log(data.message);

                // Stop the spinner
                spinner.current.style.display = 'none';

                if (data.data.length === 0) alert('No Dogs or Cats found!');
                else {
                    drawImageBoxes(context, base64ImgSelected, data.data, canvas.width, canvas.height);
                }

                isDetected = true; // Detected
            } catch (error) {
                console.error(error)
                if (!error?.response) {
                    alert('Network error or the server is not running! object detected failed!');
                } else if (error.response?.data) {
                    alert(`${error.response.data.error}! ${error.response.data.message}`);
                }

                // Stop the spinner
                spinner.current.style.display = 'none';
            }
        }

        if (!isDetected) fetchData();
    };

    return (
        <>
            <Row className="justify-content-center my-4">
                <Col lg={8} xxl={6} className="text-center">
                    {/* Canvas element used to draw image and detected results*/}
                    <canvas className="border border-3 w-100 shadow" ref={canvasRef}></canvas>
                </Col>
            </Row>
            <Row className="justify-content-center my-4">
                <Col xs={9} md={6} lg={5} xxl={4} className="text-center">
                    <p className="app-description fs-6">No picture on hand? Try with one of these</p>
                    <Row>
                        <Col xs={3} className="px-1">
                            <Image
                                src={SampleImg1}
                                className="sampleImg"
                                thumbnail
                                onClick={() => handleSelectSampleImage(SampleImg1)}
                            />
                        </Col>
                        <Col xs={3} className="px-1">
                            <Image
                                src={SampleImg2}
                                className="sampleImg"
                                thumbnail
                                onClick={() => handleSelectSampleImage(SampleImg2)}
                            />
                        </Col>
                        <Col xs={3} className="px-1">
                            <Image
                                src={SampleImg3}
                                className="sampleImg"
                                thumbnail
                                onClick={() => handleSelectSampleImage(SampleImg3)}
                            />
                        </Col>
                        <Col xs={3} className="px-1">
                            <Image
                                src={SampleImg4}
                                className="sampleImg"
                                thumbnail
                                onClick={() => handleSelectSampleImage(SampleImg4)}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="justify-content-center my-4">
                <Col className="text-center">
                    <Button className="me-2 upload-btn" onClick={focusInputFile}>Upload</Button>
                    <Button className="detect-btn" onClick={handleDetectObject}>Detect</Button>
                </Col>
            </Row>

            <input type="file" ref={inputFile} onChange={handleUploadImage} name="image" accept=".png, .jpg, .jpeg" hidden />

            {/* Loading spinner */}
            <div className="loading" ref={spinner}>
                <div className="spinner"></div>
                <p>Detecting Dogs and Cats...</p>
            </div>
        </>
    );
}