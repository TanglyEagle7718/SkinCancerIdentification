CancelCancer allows you to detect early-stage melanoma using a phone. With one in five Americans developing skin cancer at some point in their lives, it is crucial to catch it as quickly as possible.

About the project/the problem it solves
CancelCancer is an app that uses a convolutional neural network to determine if scans of people's skin that are uploaded by users are likely to show skin cancer. One-fifth of Americans are predicted to develop skin cancer in their lifetimes. Unlike other similar products, CancelCancer provides transparency about efficacy for individuals with darker complexions. 


To run models for the flask server, move these files to ./MobileApp/flask-server/
Pre-trained weights:
1. Resnet Architecture: https://drive.google.com/file/d/13oJrnYqW-zlFOQqysS3zCCBW9HEe5Tzw/view
2. Regnet Architecture: https://drive.google.com/file/d/1-KYkk6diz0aiIomno-hcQLR5rPklfZNX/view

Resnet Architecture:
Accuracy - 88.78%
Precision - 0.9143
Recall - 0.8333
F1 Score - 0.879

Regnet Architecture (underwent early stopping):
Accuracy - 92%
Precision - 0.79
Recall - 0.96
F1 Score - 0.87
