//requiring path and fs modules
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');

//setting the directory path
const directoryPath = path.join(__dirname,'../../public/uploadedFiles');

var filename, filecount;

//reading the directory
fs.readdir(directoryPath, (err, files) => {
    //error handling
    if(err){
        return console.log('unable to scan directory - ' + err);
    } else {
        filecount = files.length;
        //listing all files in the directory
        files.forEach((file) => {
            console.log('File present in the directory : '+ file);
            filename = file;
        });
        if (filecount > 0) {
            readFile(directoryPath, filename);
        }
    }
});

readFile = function(directoryPath, filename){
    console.log('Opening file ' + filename);
    var workbook = XLSX.readFile(path.join(directoryPath, filename));

    //console.log('workbook : ' + workbook);

    //get all the sheetnames
    var tables = workbook.SheetNames;

    //to store all the objects
    var sqlTableObjects = [];

    tables.forEach((table) => {

        var tableData = workbook.Sheets[table];
        //console.log(tableData);


        //Building object for SQL generation
        sqlTableObject = {
            tableName: table,
            columns: [],
            rowCount: XLSX.utils.decode_range(tableData['!ref']).e.r
        };

        console.log(sqlTableObject.rowCount);
        //Going through the cell address
        for(cellKey in tableData){

            //get column names(need to find the correct regex)
            if(cellKey.match('[A-Z]1')){
                sqlTableObject.columns.push(cellKey);
            }
        }
    });

    sqlTableObjects.push(sqlTableObject);
    console.log(JSON.stringify(sqlTableObjects));

}