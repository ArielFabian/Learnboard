import io
import base64
import sys
import os
import matplotlib.pyplot as plt
from openai import OpenAI

# Configurar la API key de OpenAI
client = OpenAI(
    api_key="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"
)

def generate_latex_from_expression(expression):
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Eres un experto en generar expresiones matematicas en formato latex, porfavor ayudame con lo siguiente:"},
                {
                    "role": "user", 
                    "content": f"Segun el siguiente enunciado, escriba la expresion matematica en formato latex: {expression}. Unicamente quiero el formato, no necesito que me expliques el procedimiento ni que añadas texto que no forme parte del formato. Ademas, toma en cuenta que el formato sera utilizado por matplotlib para generar una imagen."
                }
            ],
            max_tokens=200,
            temperature=0
        )
        
        # Acceder al contenido generado por el asistente
        latex_string = response.choices[0].message.content
        return latex_string
    
    except Exception as e:
        raise RuntimeError(f"Error en OpenAI API: {e}")

def latex_to_base64(latex_string):
    latex_string = sanitize_latex_string(latex_string)

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

def sanitize_latex_string(latex_string):
    # Eliminar delimitadores de formato de código y otros caracteres no necesarios
    if latex_string.startswith("```latex") and latex_string.endswith("```"):
        latex_string = latex_string.replace("```latex\n", "").replace("```", "").strip()
    
    # Reemplazar delimitadores de bloque \\[ ... \\] con r"$ ... $"
    elif latex_string.startswith("\\[") and latex_string.endswith("\\]"):
        latex_string = latex_string.replace("\\[", r"$").replace("\\]", r"$").replace("\n", "")

    # Reemplazar delimitadores in-line \\( ... \\) con delimitadores de in-line $
    elif latex_string.startswith("\\(") and latex_string.endswith("\\)"):
        latex_string = latex_string.replace("\\(", "$").replace("\\)", "$").replace("\n", "")

    # En caso de que no tenga delimitadores, agregamos delimitadores inline por defecto
    if not latex_string.startswith("$"):
        latex_string = "$" + latex_string
    if not latex_string.endswith("$"):
        latex_string += "$"
    
    return latex_string

if __name__ == "__main__":
    try:
        expression = sys.argv[1]
        latex_string = generate_latex_from_expression(expression)
        # print(latex_string)
        base64_image = latex_to_base64(latex_string)
        print(base64_image)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)