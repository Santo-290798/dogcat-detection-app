import base64
import io
from PIL import Image
from ultralytics import YOLO

from config import inference_args
from helpers.results_to_json import results_to_json


class YOLOv8:
    def __init__(self, model_path):
        self.model = YOLO(model_path)

    def image_preprocess(self, img_base64):
        if img_base64.find("base64") != -1:
            img_base64 = img_base64.split(',')[1]

        # decode the base64 string
        img_bytes = base64.b64decode(img_base64)

        # create BytesIO object
        img_buffer = io.BytesIO(img_bytes)

        # Convert bytes to a PIL image object
        image = Image.open(img_buffer)

        return image

    def predict(self, img_base64, size=inference_args.IMG_SIZE, confidence=inference_args.CONF, iou=inference_args.IOU):
        image = self.image_preprocess(img_base64)

        results = self.model.predict(image, imgsz=size, conf=confidence, iou=iou)
        detected_results = results_to_json(results)

        return detected_results
