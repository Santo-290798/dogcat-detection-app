from flask import Response
import json


# Define the JSONResponse class which inherits from the Flask Response class
class JSONResponse(Response):
    # The constructor method for the JSONResponse class
    def __init__(self, data=None, message=None, error=None, status=None, headers=None, mimetype='application/json', content_type=None, direct_passthrough=False):
        response = json.dumps({
            'data': data,
            'message': message,
            'error': error
        })

        # Call the constructor of the parent class (Response)
        super().__init__(response, status, headers,
                         mimetype, content_type, direct_passthrough)
