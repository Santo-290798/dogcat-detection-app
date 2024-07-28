import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { setAlertedForDetectedImageById } from '../../redux/slices/detectedImagesSlice';
import './style.css';

export default function AlertDismissible({ status, imageId }) {
    const [show, setShow] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            dispatch(setAlertedForDetectedImageById(imageId));
        }, status === "succeeded" ? 2000 : 3000);
        return () => clearTimeout(timer); // cleanup on unmount
    }, []);

    if (show) {
        return (
            <div className="fullscreen">
                {status === "succeeded" ? (
                    <Alert
                        variant="primary"
                        onClose={() => {
                            setShow(false);
                            dispatch(setAlertedForDetectedImageById(imageId));
                        }}
                        dismissible
                    >
                        <div className="app-description fs-6">
                            <Alert.Heading className="detection-results fs-6 fw-bold">Detected objects successfully!</Alert.Heading>
                        </div>
                        <div className="alert-progress-bar alert-progress-bar-2s bg-primary"></div>
                    </Alert>
                ) : (
                    <Alert
                        variant="danger"
                        onClose={() => {
                            setShow(false);
                            dispatch(setAlertedForDetectedImageById(imageId));
                        }}
                        dismissible
                    >
                        <div className="app-description fs-6">
                            <Alert.Heading className="detection-results fs-6 fw-bold">Detecting objects failed!</Alert.Heading>
                            <p className="alert-message">Network error or the server is not running</p>
                        </div>
                        <div className="alert-progress-bar alert-progress-bar-3s bg-danger"></div>
                    </Alert>
                )}
            </div>
        );
    }
}

export const DownloadAlert = ({ setShow }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 1000);
        return () => clearTimeout(timer); // cleanup on unmount
    }, []);

    return (
        <div className="fullscreen">
            <Alert variant="info">
                <div className="app-description fs-6">Downloading the image file...</div>
                <div className="alert-progress-bar alert-progress-bar-1s bg-info"></div>
            </Alert>
        </div>
    )
}
