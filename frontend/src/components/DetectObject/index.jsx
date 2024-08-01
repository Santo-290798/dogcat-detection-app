import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Image, Accordion } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { setUploadedImage, deleteImageById } from '../../redux/slices/detectedImagesSlice';
import { detectedImageListSelector } from '../../redux/selectors';
import drawImageBoxes from '../../utils/canvasUtils';
import UploadIcon from '../../img/upload.png';
import DownloadIcon from '../../img/download.png';
import Canvas from '../Canvas';
import AlertDismissible from '../Alert';
import { DownloadAlert } from '../Alert';
import PopoverCustomize from '../Popover';
import './style.css';

const getDetectionCategory = (detectedResults) => {
    if (detectedResults.length === 0) return "Dog&Cat Not Found";
    else if (detectedResults.length === 1) {
        if (detectedResults[0].class === 1) return "A Dog";
        else return "A Cat";
    } else {
        let class_name = detectedResults[0].class_name;
        for (let i = 1; i < detectedResults.length; i++) {
            if (detectedResults[i].class_name !== class_name) return "Both Dog&Cat";
        }
        return `Many ${class_name.charAt(0).toUpperCase()}${class_name.slice(1)}s`;
    }
};

export default function DetectObject() {
    const [showDownloadAlert, setShowDownloadAlert] = useState(false);
    const inputFile = useRef(null);
    const detectedImageList = useSelector(detectedImageListSelector);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (detectedImageList.length === 0) {
            navigate("/");
            return;
        }

        // Attach paste event listener to the document
        document.addEventListener("paste", handlePasteImage);

        // Add the drop event listener to the document
        document.addEventListener("dragover", allowDrop);
        document.addEventListener("dragenter", handleDragEnter);
        document.addEventListener("dragleave", handleDragLeave);
        document.addEventListener("drop", handleDrop);

        // Cleanup
        return () => {
            // Remove event listener when component unmounts
            document.removeEventListener("paste", handlePasteImage);
            document.removeEventListener("dragover", allowDrop);
            document.removeEventListener("dragenter", handleDragEnter);
            document.removeEventListener("dragleave", handleDragLeave);
            document.removeEventListener("drop", handleDrop);
        };
    }, []);


    // Event handling

    const allowDrop = (event) => {
        event.preventDefault();
    };

    const handleDragEnter = () => {
        // Add overlay effect when dragged element enters the body
        document.body.classList.add("drag-enter");
    };

    const handleDragLeave = (event) => {
        // Check if the drag is leaving the body element
        if (event.target === document.body) {
            document.body.classList.remove("drag-enter");
        }
    }

    const handleDrop = (event) => {
        event.preventDefault();

        // Remove overlay effect when dropping
        document.body.classList.remove("drag-enter");

        const file = event.dataTransfer.files[0];
        if (!file) return;

        handleImageFile(file);
    };

    const handlePasteImage = (event) => {
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;

        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") !== -1) {
                const file = items[i].getAsFile();
                handleImageFile(file);
                break; // Select only 1 last selected image to paste
            }
        }
    };

    const handleImageFile = (file) => {
        const validExtensions = ["png", "jpg", "jpeg"];
        const fileExtension = file.name.substring(file.name.lastIndexOf(".") + 1);

        if (!validExtensions.includes(fileExtension)) {
            alert("Only JPG and PNG images are supported.");
            return;
        }

        if (file.size > 5000000) {
            alert(`Your image's size '${file.name}' is too big (${(file.size / 1000000).toFixed(2)}MB) - the maximum size is 5MB.`);
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const uploadedImage = {
                id: uuidv4(),
                imageData: e.target.result
            };

            dispatch(setUploadedImage(uploadedImage));
        };
        reader.readAsDataURL(file);
    };

    const focusInputFile = () => {
        inputFile.current.click();
    };

    const handleUploadImage = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        handleImageFile(file);
    };

    const handleDeleteImage = (id) => {
        dispatch(deleteImageById(id));
    };

    const handleDownloadImage = async (index) => {
        /*
        The function is used to download the specified image
        */

        // Show downloading alert
        setShowDownloadAlert(true);

        // Create a temp canvas
        const tempCanvas = document.createElement("canvas");
        const tempContext = tempCanvas.getContext("2d");

        drawImageBoxes(tempContext, detectedImageList[index].imageData, detectedImageList[index].detectedResults, true, () => {
            // Format file name
            const category = getDetectionCategory(detectedImageList[index].detectedResults).replace(/\s+/g, "");
            const num_dogs = detectedImageList[index].detectedResults.reduce((total, obj) => {
                return obj.class === 1 ? total + 1 : total;
            }, 0);
            const num_cats = detectedImageList[index].detectedResults.reduce((total, obj) => {
                return obj.class === 0 ? total + 1 : total;
            }, 0);
            const image_id = detectedImageList[index].id;

            const a = document.createElement("a");
            a.href = tempCanvas.toDataURL();
            a.download = `${category}_${num_dogs}dogs${num_cats}cats_${image_id}.png`;
            a.click();

            a.remove();
            tempCanvas.remove();
        });
    };

    // Event handling


    return (
        <Container id="detect-object" className="main">
            {/* Image Upload Section */}
            <Row className="justify-content-center">
                <Col xs={11} xxl={10} className="bg-white rounded-3 shadow-sm">
                    <Row className="justify-content-center">
                        <Col className="text-center">
                            <input type="file" ref={inputFile} onChange={handleUploadImage} name="image" accept=".png, .jpg, .jpeg" hidden />
                            <Row className="justify-content-center">
                                <Col md={11} lg={9} xxl={7} className="d-flex flex-row align-items-center justify-content-center gap-3 py-2">
                                    <Button className="upload-btn fs-5 my-2" onClick={focusInputFile}>
                                        <Image
                                            src={UploadIcon}
                                            alt="upload icon"
                                            className="upload-icon mb-1 me-2"
                                        />
                                        Upload Image
                                    </Button>
                                    <div className="drop-paste-img mt-2">
                                        <p className="fs-6">
                                            or drop a file, ctrl+V to paste image
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* The section displays Detected Image List */}
            <Accordion defaultActiveKey={0} flush>
                {detectedImageList.map((image, index) => (
                    <Row key={image.id} className="justify-content-center my-4">
                        <Col xs={11} xxl={10} className="bg-white p-3 rounded-3 shadow-sm">
                            <Row className="justify-content-end mb-2">
                                <Col xs={2} className="text-end">
                                    <Button
                                        className="btn-close"
                                        onClick={() => handleDeleteImage(image.id)}
                                        title="Delete the image"
                                        disabled={!image.detectedResults && image.status !== "failed"}
                                    >
                                    </Button>
                                </Col>
                            </Row>
                            <Row className="row-gap-2">
                                <Col className="position-relative" xs={12} lg={8} xxl={9}>
                                    {/* Canvas element used to draw image and detected results*/}
                                    <Canvas results={image} />

                                    {/* Loading spinner when detecting objects  */}
                                    {(!image.detectedResults && image.status !== "failed") && <div className="loading">
                                        <div className="spinner"></div>
                                        <p className="detection-results mt-2">Detecting Dogs and Cats...</p>
                                    </div>}
                                </Col>
                                <Col xs={12} lg={4} xxl={3}>
                                    <Accordion.Item eventKey={index} className="app-description fs-6">
                                        <Accordion.Header className="border-bottom pb-2">
                                            <div className="detection-results text-secondary fw-bold">Detection Results</div>
                                        </Accordion.Header>
                                        {image.detectedResults ? (
                                            <>
                                                <Accordion.Body className="my-2">
                                                    <div>
                                                        Category: <br />
                                                        <span className="detection-results">{getDetectionCategory(image.detectedResults)}</span>
                                                    </div>
                                                    {image.detectedResults.length > 0 && (
                                                        <div className="mt-2 mb-4">
                                                            Confidence score:
                                                            <div className="conf-score">
                                                                {image.detectedResults.map((obj, i) => (
                                                                    <div key={i} className="mb-1">
                                                                        <div className="d-flex justify-content-between">
                                                                            <span>{obj.class_name}</span>
                                                                            <span>{`${obj.conf * 100}%`}</span>
                                                                        </div>
                                                                        <div className="w-100" style={{ backgroundColor: "#e0e0e0" }}>
                                                                            <div className={obj.class === 1 ? "bg-success" : "bg-danger"} style={{ height: "5px", width: `${obj.conf * 100}%` }}></div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </Accordion.Body>
                                                {image.detectedResults.length > 0 && (
                                                    <div className="mt-3 text-center">
                                                        <Button
                                                            className="download-btn"
                                                            variant="secondary"
                                                            onClick={() => handleDownloadImage(index)}
                                                        >
                                                            <Image
                                                                src={DownloadIcon}
                                                                alt="download icon"
                                                                className="download-icon mb-1 me-2"
                                                            />
                                                            Download Image
                                                        </Button>
                                                        <p>
                                                            Image with boxes and labels
                                                            <PopoverCustomize
                                                                id="popover-download-image-info"
                                                                popover_header="Download image info"
                                                                popover_body={
                                                                    <>
                                                                        <p>The image downloaded including the <i>boxes</i> and <i>labels</i> similar to the image view.</p>
                                                                        <div>
                                                                            <div>File name of the image follows format:</div>
                                                                            <div className="border p-2">
                                                                                <span className="file-name-format fst-italic">{"{category}"}_{"{num_dogs}"}dogs{"{num_cats}"}cats_{"{image_id}"}.png</span>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                }
                                                            >
                                                                <Button
                                                                    variant="outline-light"
                                                                    size="sm"
                                                                    className="rounded-circle text-secondary fs-6 mb-1"
                                                                >
                                                                    &#9432;
                                                                </Button>
                                                            </PopoverCustomize>
                                                        </p>
                                                    </div>
                                                )}
                                            </>
                                        ) : image.status === "failed" && (
                                            <Accordion.Body className="text-danger mt-2">Detecting objects failed!</Accordion.Body>
                                        )}
                                    </Accordion.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                ))}
            </Accordion>

            {/* Show dismissible alerts that displays detected images status */}
            {detectedImageList.map((image, index) => (
                !image.alerted && (image.status === "succeeded" || image.status === "failed") && <AlertDismissible key={index} status={image.status} imageId={image.id} />
            ))}

            {/* Show download alert */}
            {showDownloadAlert && <DownloadAlert setShow={setShowDownloadAlert} />}
        </Container>
    );
}
