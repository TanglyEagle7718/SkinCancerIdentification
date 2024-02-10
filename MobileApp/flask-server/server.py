from flask import Flask
from flask import current_app,jsonify,request, send_file
import base64
import socket
import json
import base64

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/members")
def members():
    print("here")
    return "image"

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



    #with open("imageToSave.png", "wb") as fh:
    #    fh.write(base64.decodebytes(metaData.get('postName')))
    
    return metaData.get('postName')


if __name__ == "__main__":
    print(socket.getaddrinfo('localhost', 8081))
    app.run(host="0.0.0.0", debug=False)