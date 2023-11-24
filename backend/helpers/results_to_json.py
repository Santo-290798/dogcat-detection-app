def results_to_json(results):
    """
    Converts yolo model output to json (list of dicts)
    """

    # Get the first inference result in results for each element in the input source - the input source with one image
    result = results[0]

    return [
        {
            "class": bndbox.cls[0].item(),
            "class_name": result.names[bndbox.cls[0].item()],
            "box": {
                "xmin": bndbox.xyxy[0].tolist()[0],
                "ymin": bndbox.xyxy[0].tolist()[1],
                "xmax": bndbox.xyxy[0].tolist()[2],
                "ymax": bndbox.xyxy[0].tolist()[3],
            },
            "conf": round(bndbox.conf[0].item(), 2)
        }
        for bndbox in result.boxes
    ]
