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
            execFile('python', ['/home/pn/app/src/app/util/handwriteRecognition.py', tempFilePath], (error, stdout, stderr) => {
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

function processLatex(latex) {
    return new Promise((resolve, reject) => {
        // Crear un archivo temporal con el contenido LaTeX
        const tempFilePath = path.join(__dirname, 'temp_latex.txt');
        fs.writeFileSync(tempFilePath, latex);

        // Ejecutar el script de Python
        execFile('python', ['/home/kali/Desktop/latexRecognition.py', tempFilePath], (error, stdout, stderr) => {
            // Limpiar archivo temporal
            fs.unlinkSync(tempFilePath);

            if (error) return reject(error);
            if (stderr) return reject(new Error(stderr.trim()));

            // Devolver la salida del script de Python
            resolve(stdout.trim());
        });
    });
}

module.exports = { processImage, processLatex};