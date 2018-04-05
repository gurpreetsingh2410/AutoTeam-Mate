const path = require('path');
const pythonExecutable = "/Library/Frameworks/Python.framework/Versions/3.5/bin/python3";
const spawn = require('child_process').spawn;

let ProcessFileFactory = function () {
    let pythonFile = path.resolve("../"+"/spark/");
    let myPythonScript = pythonFile+"/init.py";
    let teamScript = pythonFile+"/team_init.py";

    let uint8arrayToString = function(data){
        return String.fromCharCode.apply(null, data);
    };

    function getObject(input) {
        let convertToString = uint8arrayToString(input).replace(/}'+/g, '}');
        let data = convertToString.replace(/'{+/g, '{');
        let out = {};
        let result = [];
        if(data && data.search('\]\n')){
            result = data.split('\n');
        }
        for (let i = 0; i < result.length - 1; i++){
            out[i] = JSON.parse(result[i])
        }
        return out;
    }

    function processFile() {
        const scriptExecution = spawn(pythonExecutable, [myPythonScript]);
        return new Promise((resolve, reject) => {
            scriptExecution.stderr.on('data', (data) => {
                // As said before, convert the Uint8Array to a readable string.
                console.log(uint8arrayToString(data));
            });

            scriptExecution.on('exit', (code) => {
                console.log("Process quit with code : " + code);
            });
            scriptExecution.stdout.on('data', (data) => {
                if(data){
                    resolve(getObject(data));
                }else {
                    reject(true)
                }
            });
        }).catch((err) => {
            "use strict";
            console.log(err);
        })

    }

        function teamMates() {

        return new Promise((resolve, reject) => {
            const scriptExecution = spawn(pythonExecutable, [teamScript]);
            scriptExecution.stderr.on('data', (data) => {
                console.log(uint8arrayToString(data));
            });

            scriptExecution.on('exit', (code) => {
                console.log("Process quit with code : " + code);
            });
            scriptExecution.stdout.on('data', (data) => {
                if(data){
                    resolve(getObject(data));
                }else {
                    reject(true)
                }
            });
        }).catch((err) => {
            "use strict";
            console.log(err);
        })

    }

    return {
        processFile,
        teamMates
    }

};

module.exports = ProcessFileFactory;