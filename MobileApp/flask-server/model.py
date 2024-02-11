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

# Define the model architecture
model = models.resnet50(pretrained=True)  # Example: Loading a pre-trained ResNet50 model

#add a new final layer
nr_filters = model.fc.in_features  #number of input features of last layer

classifier_head = nn.Sequential(
nn.Linear(nr_filters, 512),
nn.ReLU(inplace=True),
nn.Dropout(p=0.5),
nn.Linear(512, 1))
model.fc = classifier_head

# Load the saved model state dictionary
model.load_state_dict(torch.load('skin_cancer_2.pth', map_location=torch.device('cpu')))

# Set the model to evaluation mode
model.eval()

def inference():
    # Load and apply transformations to the single image
    image = Image.open("image.png") 
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        #transforms.Grayscale(num_output_channels=3),
        transforms.ToTensor(),
         transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    transformed_image = transform(image).unsqueeze(0)
   
    # Perform inference
    with torch.no_grad():
        output = torch.sigmoid(model(transformed_image))

    # Interpret the output
    if output < 0.5:
        return "Benign", output.item()
    else:
        return "Malignant", output.item()