# Python script: handwriteRecognition.py
import cv2
import sys
import pytesseract

def process_image(image_path):
    # Cargar la imagen
    image = cv2.imread(image_path)
    
    # Convertir la imagen a escala de grises
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Realizar el reconocimiento de texto con pytesseract
    text = pytesseract.image_to_string(gray_image)
    
    # Devolver el texto reconocido
    return text

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python handwriteRecognition.py <image_path>")
        sys.exit(1)
    
    image_path = sys.argv[1]
    result = process_image(image_path)
    print(result)