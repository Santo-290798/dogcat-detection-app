import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Image, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';

import { setUploadedImage } from '../redux/slices/detectedImagesSlice';

const UploadImage = () => {
    const inputFile = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Attach paste event listener to the document
        document.addEventListener('paste', handlePasteImage);

        // Add the drop event listener to the document
        document.addEventListener('dragover', allowDrop);
        document.addEventListener('dragenter', handleDragEnter);
        document.addEventListener('dragleave', handleDragLeave);
        document.addEventListener('drop', handleDrop);

        // Cleanup: remove event listener when component unmounts
        return () => {
            document.removeEventListener('paste', handlePasteImage);
            document.removeEventListener('dragover', allowDrop);
            document.removeEventListener('dragenter', handleDragEnter);
            document.removeEventListener('dragleave', handleDragLeave);
            document.removeEventListener('drop', handleDrop);
        };
    }, []);


    // Event handling

    const allowDrop = (event) => {
        event.preventDefault();
    };

    const handleDragEnter = () => {
        // Add overlay effect when dragged element enters the body
        document.body.classList.add('drag-enter');
    };

    const handleDragLeave = (event) => {
        // Check if the drag is leaving the body element
        if (event.target === document.body) {
            document.body.classList.remove('drag-enter');
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();

        // Remove overlay effect when dropping
        document.body.classList.remove('drag-enter');

        const file = event.dataTransfer.files[0];
        if (!file) return;

        handleImageFile(file);
    };

    const handlePasteImage = (event) => {
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;

        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const file = items[i].getAsFile();
                handleImageFile(file);
                break; // Select only 1 last selected image to paste
            }
        }
    };

    const handleImageFile = (file) => {
        const validExtensions = ['png', 'jpg', 'jpeg'];
        const fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1);

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
            navigate('/detect-objects');
        };
        reader.readAsDataURL(file);
    };

    const handleSelectSampleImage = (imgSrc) => {
        // Load the image as a blob via XMLHttpRequest and uses the FileReader API to convert it to a dataURL
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onload = function (e) {
                const uploadedImage = {
                    id: uuidv4(),
                    imageData: e.target.result
                };

                dispatch(setUploadedImage(uploadedImage));
                navigate('/detect-objects');
            };
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
        const file = event.target.files[0];
        if (!file) return;

        handleImageFile(file);
    };

    // Event handling


    return (
        <>
            <Row className='justify-content-center mt-3'>
                <Col xs={10} md={9} lg={7} xxl={5} className='bg-white shadow'>
                    <Row className='justify-content-center'>
                        <Col className='text-center p-0'>
                            <input type='file' ref={inputFile} onChange={handleUploadImage} name='image' accept='.png, .jpg, .jpeg' hidden />

                            <Row className='justify-content-center mx-4'>
                                <Col xs={9} md={8} className='upload-img-container d-flex flex-column justify-content-center align-items-center pt-3 pt-sm-5 border-bottom'>
                                    <Button className='upload-btn fw-semibold fs-5 my-2 w-100' onClick={focusInputFile}>
                                        <Image
                                            src='/assets/icons/upload.svg'
                                            alt='upload icon'
                                            width={22}
                                            className='upload-icon mb-1 me-2'
                                        />
                                        Upload Image
                                    </Button>
                                    <div className='drop-paste-img mt-2'>
                                        <p className='app-description fs-6'>
                                            or drop a file,<br />
                                            ctrl+V to paste image
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='justify-content-center my-4'>
                        <Col xs={8} md={6} xxl={6} className='text-center'>
                            <p className='app-description text-black-50 fs-6 mb-2'>No picture? Try with one of these</p>
                            <Row>
                                {Array.from({ length: 4 }, (_, i) => `/assets/images/sample_img${i + 1}.jpg`).map((img_path, index) => (
                                    <Col xs={3} className='px-1' key={index}>
                                        <Image
                                            src={img_path}
                                            alt={`SampleImg${index + 1}`}
                                            className='sampleImg border w-100'
                                            onClick={() => handleSelectSampleImage(img_path)}
                                            draggable={false}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default UploadImage;