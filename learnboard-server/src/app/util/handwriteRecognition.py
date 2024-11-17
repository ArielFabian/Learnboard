import sys
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
from openai import OpenAI
import base64

def process_image(base64_image):
    client = OpenAI(
        api_key="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"
    )
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user", 
                    "content": [
                        {"type": "text", "text": "Dime que dice la siguiente imagen, porfavor no agregues ningun otro texto mas."},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpg;base64,{base64_image}"
                            }
                        }
                    ]
                }
            ],
            max_tokens=200,
            temperature=0,
            stop=["\n"]
        )
        
        # Acceder al contenido generado por el asistente
        latex_string = response.choices[0].message.content
    except Exception as e:
        raise RuntimeError(f"Error en OpenAI API: {e}")   
    
    img = Image.new('RGB', (800, 200), color=(255, 255, 255))
    d = ImageDraw.Draw(img)
    font = ImageFont.load_default()
    d.text((20, 20), latex_string, font=font, fill=(0, 0, 0))

    
    # Codificar la imagen a base64
    buffered = BytesIO()
    img.save(buffered, format="PNG")
    img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
    
    # Devolver el texto codificado en base64
    return img_base64

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python handwriteRecognition.py <image_path>")
        sys.exit(1)
    
    base64_image = sys.argv[1]
    result = process_image(base64_image)
    print(result)