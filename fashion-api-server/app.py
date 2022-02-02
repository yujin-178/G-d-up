from flask import Flask
from flask import jsonify
import base64
import requests
import json

app = Flask(__name__)

@app.route('/')
def hello():
    endpoint = 'https://api.ximilar.com/tagging/fashion/v2/detect_tags'
    headers = {
        'Authorization': "Token API_KEY",
        'Content-Type': 'application/json'
    }

    with open('test.jpg', "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')

    data = {
        'records': [
            {"_base64": encoded_string},
        ],
    }

    response = requests.post(endpoint, headers=headers, data=json.dumps(data))
    print(json.dumps(response.json(), indent=2))

    return jsonify({ 'categpry': 'pants' })
