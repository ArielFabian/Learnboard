const axios = require('axios');

// Configuración de la API Judge0
const JUDGE0_URL = 'https://judge0-ce.p.rapidapi.com/submissions';
const JUDGE0_HEADERS = {
  'x-rapidapi-key': '3991985dd2msh94e632ba672b516p14fc8cjsn6b7eb410d4d7',  // Cambia por tu clave de RapidAPI
  'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
  'Content-Type': 'application/json',
};

// Método para ejecutar código
const executeCode = async (req, res) => {
  const { language, code, commands } = req.body;

  // Codificar el código a Base64
  const encodedCode = Buffer.from(code).toString('base64');
  //codificar los comandos
  const encodedCommands = Buffer.from(commands).toString('base64');
  // Crear payload para enviar a Judge0
  const payload = {
    source_code: encodedCode,
    language_id: getLanguageId(language),
    stdin: encodedCommands || '', // Comandos adicionales si existen
  };

  try {
    const response = await axios.post(`${JUDGE0_URL}?base64_encoded=true&wait=true`, payload, {
      headers: JUDGE0_HEADERS,
    });

    // Retornar la respuesta de Judge0 al cliente
    res.json({ output: response.data });
  } catch (error) {
    console.error('Error al ejecutar código:', error);
    res.status(500).json({ error: 'Error al ejecutar el código' });
  }
};

// Función para mapear lenguajes a sus IDs correspondientes en Judge0
const getLanguageId = (language) => {
  const languageMap = {
    javascript: 63,
    python: 71,
    cpp: 54,
    java: 91,
    c: 50,
    ruby: 72,
    swift: 83,
    kotlin: 78,
    go: 60,
    // Agrega más lenguajes si es necesario
  };
  return languageMap[language] || 63; // JavaScript como valor predeterminado
};

module.exports = { executeCode };
