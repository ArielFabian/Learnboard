import io
import base64
import sys
import os
import matplotlib.pyplot as plt
from openai import OpenAI

# Configurar la API key de OpenAI
client = OpenAI(
    api_key=""
)

def generate_latex_from_expression(expression):
    prompt = f"Genera el codigo latex del siguiente enunciado: {expression}, si lo anterior no es posible, genera un enunciado similar que pueda ser expresado en latex."
    
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ],
            max_tokens=200,
            temperature=0,
            stop=["\n"]
        )
        
        # Acceder al contenido generado por el asistente
        latex_string = response.choices[0].message.content
        return latex_string
    
    except Exception as e:
        raise RuntimeError(f"Error en OpenAI API: {e}")

def latex_to_base64(latex_string):
    if not latex_string.startswith("$"):
        latex_string = "$" + latex_string
    if not latex_string.endswith("$"):
        latex_string = latex_string + "$"

    # Crear la figura de Matplotlib
    fig, ax = plt.subplots()
    ax.text(0.5, 0.5, latex_string, fontsize=20, ha='center', va='center')
    ax.axis('off')

    # Guardar la imagen en un buffer
    buffer = io.BytesIO()
    plt.savefig(buffer, format='png', bbox_inches='tight', pad_inches=0.1)
    plt.close(fig) 
    buffer.seek(0)

    # Codificar la imagen en base64
    image_base64 = base64.b64encode(buffer.read()).decode('utf-8')
    return image_base64

if __name__ == "__main__":
    try:
        expression = sys.argv[1]
        latex_string = generate_latex_from_expression(expression)
        base64_image = latex_to_base64(latex_string)
        print(base64_image)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)