import base64
import io

from services.detection import detection
from config import inference_args


class YOLOv8:
    def __init__(self, model_id, api_key):
        self.model_id = model_id
        self.api_key = api_key

    def image_preprocess(self, img_base64):
        if img_base64.find("base64") != -1:
            img_base64 = img_base64.split(',')[1]

        # decode the base64 string
        img_bytes = base64.b64decode(img_base64)

        # create BytesIO object as a buffer
        img_buffer = io.BytesIO(img_bytes)

        return img_buffer

    def detect(self, img_base64, size=inference_args.IMG_SIZE, confidence=inference_args.CONF, iou=inference_args.IOU):
        img_buffer = self.image_preprocess(img_base64)

        detected_results = detection(
            img_buffer, self.model_id, self.api_key, size, confidence, iou)

        return detected_results
