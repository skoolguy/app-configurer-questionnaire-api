//requiring path and fs modules
const path = require('path');
const fs = require('fs');

//setting the directory path
const directoryPath = path.join('../../public/uploadedFiles');

//reading the directory
fs.readdir(directoryPath, (err, files) => {
    //error handling
    if(err){
        return console.log('unable to scan directory - ' + err);
    } else {
        //listing all files in the directory
        files.forEach((file) => {
            console.log('File present in the directory : '+ file);
        });
    }
});