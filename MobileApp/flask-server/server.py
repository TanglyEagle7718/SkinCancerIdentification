from flask import Flask
from flask import current_app,jsonify,request, send_file
import base64
import socket
import json
import base64

import convertBase64toImage

import model
import model2

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/members")
def members():
    print("here")
    return {"members": ["Member1", "Member2", "Member3"]}

metaData = None
@app.route("/base64", methods=["GET", "POST", "OPTIONS"])
def base64():
    metaData = request.get_json()
    #print(metaData.get('postName'))
    #base64Data = metaData[22:]
    #theData = json.load(metaData)
    #print(theData)
    #metaData = request.get_json()
    #base64Data = "b'" + base64Data + "'"
    with open("Output.txt", "w") as text_file:
        text_file.write(metaData.get('postName'))
    

    exec(open("convertBase64toImage.py").read())


    #with open("imageToSave.png", "wb") as fh:
    #    fh.write(base64.decodebytes(metaData.get('postName')))
    
    return metaData.get('postName')

@app.route("/output", methods=["GET"])
def output():
    prediction, prob = model2.inference()
    if prob == 0.5:
        prediction = "Barely Malignant"
    return {"pred": prediction, "probability": prob}


if __name__ == "__main__":
    print(socket.getaddrinfo('localhost', 8081))
    app.run(host="0.0.0.0", debug=False)