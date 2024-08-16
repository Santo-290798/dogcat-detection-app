import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-bootstrap';

import { setAlertedForDetectedImageById } from '../redux/slices/detectedImagesSlice';

export const DismissibleAlert = ({ status, imageId }) => {
    const [show, setShow] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            dispatch(setAlertedForDetectedImageById(imageId));
        }, status === 'succeeded' ? 2000 : 3000);
        return () => clearTimeout(timer); // cleanup on unmount
    }, []);

    if (show) {
        return (
            <div className='wrap-alert d-flex justify-content-center justify-content-md-end align-items-start position-fixed top-0 bottom-0 start-0 end-0'>
                {status === 'succeeded' ? (
                    <Alert
                        variant='primary'
                        onClose={() => {
                            setShow(false);
                            dispatch(setAlertedForDetectedImageById(imageId));
                        }}
                        dismissible
                    >
                        <div className='app-description text-black fs-6'>
                            <Alert.Heading className='fs-6 fw-bold'>Detected objects successfully!</Alert.Heading>
                        </div>
                        <div className='alert-progress-bar alert-progress-bar-2s position-absolute start-0 bottom-0 bg-primary'></div>
                    </Alert>
                ) : (
                    <Alert
                        variant='danger'
                        onClose={() => {
                            setShow(false);
                            dispatch(setAlertedForDetectedImageById(imageId));
                        }}
                        dismissible
                    >
                        <div className='app-description text-black fs-6'>
                            <Alert.Heading className='fs-6 fw-bold'>Detecting objects failed!</Alert.Heading>
                            <p className='alert-message overflow-hidden'>Network error or the server is not running</p>
                        </div>
                        <div className='alert-progress-bar alert-progress-bar-3s position-absolute start-0 bottom-0 bg-danger'></div>
                    </Alert>
                )}
            </div>
        );
    }
};

export const DownloadingAlert = ({ setShow }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 1000);
        return () => clearTimeout(timer); // cleanup on unmount
    }, []);

    return (
        <div className='wrap-alert d-flex justify-content-center justify-content-md-end align-items-start position-fixed top-0 bottom-0 start-0 end-0'>
            <Alert variant='info'>
                <div className='app-description text-black fs-6'>Downloading the image file...</div>
                <div className='alert-progress-bar alert-progress-bar-1s position-absolute start-0 bottom-0 bg-info'></div>
            </Alert>
        </div>
    );
};