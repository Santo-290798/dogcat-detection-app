import requests

from helpers.results_to_json import results_to_json


def detection(img_buffer, model_id, api_key, size, confidence, iou):
    # Run inference on an image
    response = requests.post(
        url=f"https://api.ultralytics.com/v1/predict/{model_id}",
        headers={"x-api-key": api_key},
        data={
            "size": size,
            "confidence": confidence,
            "iou": iou
        },
        files={"image": img_buffer},
    )

    # Check for successful response
    response.raise_for_status()

    results = response.json()
    results = results_to_json(results)
    # print(results)

    # Return inference results
    return results
