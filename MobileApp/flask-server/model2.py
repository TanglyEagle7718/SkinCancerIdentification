# -*- coding: utf-8 -*-
"""
Created on Sat Feb 10 16:50:54 2024

@author: rishi
"""

import torch
from torchvision import transforms
import torchvision.models as models
from PIL import Image
import numpy as np
import torch.nn as nn

# #Model 1
# # Define the model architecture
# model = models.resnet50(pretrained=True)  # Example: Loading a pre-trained ResNet50 model

# #add a new final layer
# nr_filters = model.fc.in_features  #number of input features of last layer
# print(nr_filters)

# classifier_head = nn.Sequential(
# nn.Linear(nr_filters, 512),
# nn.ReLU(inplace=True),
# nn.Dropout(p=0.5),
# nn.Linear(512, 1))
# model.fc = classifier_head

# # Load the saved model state dictionary
# model.load_state_dict(torch.load('D:\Georgia_Tech\Hackathon\skin_cancer.pth', map_location=torch.device('cpu')))

# # Set the model to evaluation mode
# model.eval()

# def inference():
#     # Load and apply transformations to the single image
#     image = Image.open("D:\Georgia_Tech\Hackathon\skin-cancer-pictures-3.jpg") 
#     transform = transforms.Compose([
#         transforms.Resize((224, 224)),
#         #transforms.Grayscale(num_output_channels=3),
#         transforms.ToTensor(),
#          transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
#     ])
#     transformed_image = transform(image).unsqueeze(0)
   
#     # Perform inference
#     with torch.no_grad():
#         output = torch.sigmoid(model(transformed_image))

#     # Interpret the output
#     print(output)
#     if output < 0.5:
#         return "Prediction: Benign"
#     else:
#         return "Prediction: Malignant"

# print(inference())

#Model 2



def inference():
    model = models.regnet_y_8gf(weights = 'DEFAULT')
    model.fc = nn.Linear(model.fc.in_features, 1)
    
    model = nn.DataParallel(model)
    
    model.load_state_dict(torch.load("skin_cancer_detection_regnet_8gf_92_58.pth", map_location=torch.device('cpu')))
    
    imgSize = 224
    # Load the image from a file
    image = Image.open('image.png')
    
    transformer = transforms.Compose([
        transforms.Resize(size = (imgSize, imgSize), antialias = True),
        transforms.CenterCrop(size = (imgSize, imgSize)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.7592, 0.5374, 0.5389], std=[0.0900, 0.1136, 0.1265])
    ])
    
    # Convert the image to a tensor and add a batch dimension
    tensor = transformer(image)
    tensor = torch.unsqueeze(tensor, 0)
    
    
    output = model(tensor)
    # Perform inference
    with torch.no_grad():
        output = torch.sigmoid(output)
    print(output)
    
    threshold = 0.5
    predicted = 'Malignant' if output > threshold else 'Benign'
    #print(f'The predicted class is {predicted} with a confidence of {output}')
    
    return predicted, output.item()
pred, out = inference()