const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');

function processImage(base64Image) {
    return new Promise((resolve, reject) => {
        // Ejecutar el script de Python con la imagen base64 como argumento
        execFile('python', ['/home/kali/Desktop/handwriteRecognition.py', base64Image], (error, stdout, stderr) => {
            if (error) return reject(error);
            if (stderr) return reject(new Error(stderr.trim()));

            // Devolver la salida del script de Python
            resolve(stdout.trim());
        });
    });
}

function processLatex(expression) {
    return new Promise((resolve, reject) => {
        if (!expression) {
            return reject(new Error("Expression is undefined"));
        }

        // Log the expression to debug
        console.log(`Expression to process: ${expression}`);

        // Ejecutar el script de Python con la expresión como argumento
        execFile('python', ['/home/kali/Desktop/latexRecognition.py', expression], (error, stdout, stderr) => {
            if (error) return reject(error);
            if (stderr) return reject(new Error(stderr.trim()));

            // Devolver la salida del script de Python
            resolve(stdout.trim());
        });
    });
}

module.exports = { processImage, processLatex};