const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');

function processImage(base64Image) {
    return new Promise((resolve, reject) => {
        execFile('python', ['/home/pn/app/src/app/util/handwriteRecognition.py', base64Image], (error, stdout, stderr) => {
            if (error) return reject(error);
            if (stderr) return reject(new Error(stderr.trim()));

            resolve(stdout.trim());
        });
    });
}

function processLatex(expression) {
    return new Promise((resolve, reject) => {
        if (!expression) {
            return reject(new Error("Expression is undefined"));
        }
        console.log("si entro");
        console.log('object', expression);
        execFile('python', ['/home/pn/app/src/app/util/latexRecognition.py', expression], (error, stdout, stderr) => {
            if (error) return reject(error);
            if (stderr) return reject(new Error(stderr.trim()));

            resolve(stdout.trim());
        });
    });
}

module.exports = { processImage, processLatex};