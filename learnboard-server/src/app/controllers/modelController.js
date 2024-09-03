const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');

function processImage(base64Image) {
    return new Promise((resolve, reject) => {
        // Crear un archivo temporal para la imagen
        const tempFilePath = path.join(__dirname, 'temp_image.png');
        const imageData = base64Image.replace(/^data:image\/\w+;base64,/, '');
        fs.writeFile(tempFilePath, imageData, { encoding: 'base64' }, (err) => {
            if (err) return reject(err);

            // Ejecutar el script de Python
            execFile('python', ['C:\\Users\\ariel\\OneDrive\\Escritorio\\HandWritingRecognition\\PytesseractTest.py', tempFilePath], (error, stdout, stderr) => {
                // Eliminar el archivo temporal
                fs.unlink(tempFilePath, (unlinkErr) => {
                    if (unlinkErr) console.error('Error deleting temp file:', unlinkErr);
                });

                if (error) return reject(error);
                if (stderr) return reject(stderr);

                // Devolver la salida del script de Python
                resolve(stdout.trim());
            });
        });
    });
}

module.exports = { processImage };