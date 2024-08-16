import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { getDetectedResults } from '../redux/slices/detectedImagesSlice';
import { drawImageBoxes } from '../utils/canvasUtils';

const Canvas = ({ results }) => {
    const canvasRef = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (!results.detectedResults && results.status !== 'failed') {
            dispatch(getDetectedResults({ src: results.imageData, id: results.id }));
        }

        drawImageBoxes(context, results.imageData, results.detectedResults ? results.detectedResults : []);
    }, [results]);

    return <canvas className={`w-100 border-end${results.status === 'failed' ? ' border-danger-subtle' : ''}`} ref={canvasRef} width={640} height={312} />
};

export default Canvas;