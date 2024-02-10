# -*- coding: utf-8 -*-
"""
Created on Sat Feb 10 09:21:45 2024

@author: rishi
"""

with open('Output.txt', 'r') as file:
    data = file.read().rstrip()
    
import pybase64
decoded_data=pybase64.b64decode((data))
#write the decoded data back to original format in  file
img_file = open('image.png', 'wb')
img_file.write(decoded_data)
img_file.close()