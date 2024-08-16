from flask import Blueprint, request

from services.ultralytics.yolo import YOLOv8
from helpers.json_response import JSONResponse
from config.yolo_models_paths import YOLOV8S_MODEL_PATH
from config.route_urls import DETECT_URL

detection_routes = Blueprint('detection', __name__)


@detection_routes.route(DETECT_URL, methods=['POST'])
def detect():
    data = request.get_json()
    img_base64 = data['image']

    try:
        model = YOLOv8(YOLOV8S_MODEL_PATH)
        detected_results = model.predict(img_base64)

        return JSONResponse(
            data=detected_results,
            message='object detected successfully',
            status=200
        )
    except:
        return JSONResponse(
            message='object detected failed',
            error='HTTPError',
            status=500
        )
