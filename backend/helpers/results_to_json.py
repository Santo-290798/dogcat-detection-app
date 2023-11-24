def results_to_json(results):
    """
    Converts yolo model output to json (list of dicts)
    """

    return [
        {
            "class": result['class'],
            "class_name": result['name'],
            "box": {
                "xmin": result['box']['x1'],
                "ymin": result['box']['y1'],
                "xmax": result['box']['x2'],
                "ymax": result['box']['y2'],
            },
            "conf": result['confidence']
        }
        for result in results['data']
    ]
