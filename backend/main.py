import os
from flask import Flask
from flask_cors import CORS
from controllers.detection import detection_routes
from config.allowed_origins import ALLOWED_ORIGINS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

CORS(app, origins=ALLOWED_ORIGINS)


@app.route('/')
def welcome():
    return 'Welcome to Dog and Cat Detection web application'


app.register_blueprint(detection_routes)

if __name__ == '__main__':
    app.run(host=os.getenv('HOST'), port=os.getenv('PORT'), debug=True)
