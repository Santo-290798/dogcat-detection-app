import os
from flask import Blueprint, request
from models.yolo import YOLOv8
from models.json_response import JSONResponse

detection_routes = Blueprint('detection', __name__)


@detection_routes.route('/api/detect', methods=['POST'])
def detect():
    data = request.get_json()
    img_base64 = data['image']

    try:
        model = YOLOv8(os.getenv('MODEL_ID'), os.getenv('API_KEY'))
        detected_results = model.detect(img_base64)

        return JSONResponse(
            data=detected_results,
            message="object detected successfully",
            status=200
        )
    except:
        return JSONResponse(
            message="object detected failed",
            error="HTTPError",
            status=500
        )
