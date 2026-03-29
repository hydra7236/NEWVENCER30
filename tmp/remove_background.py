
from PIL import Image
import os

def remove_background(input_path, output_path):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    
    datas = img.getdata()
    
    new_data = []
    for item in datas:
        # If pixel is near white (240-255 range to handle some artifacts)
        # We also check if it's very bright
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

input_logo = r"d:\gta\vencer-2k26-portal-mainvecnerrr\vencer-2k26-portal-main\src\assets\vencer-logo.png"
output_logo = r"d:\gta\vencer-2k26-portal-mainvecnerrr\vencer-2k26-portal-main\src\assets\vencer-logo-transparent.png"

remove_background(input_logo, output_logo)
print(f"Background removed. Saved to {output_logo}")
