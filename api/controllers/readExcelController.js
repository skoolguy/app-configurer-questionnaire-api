//requiring path and fs modules
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');

exports.extract = function(callback){


    //setting the directory path
    const directoryPath = path.join(__dirname,'../../public/uploadedFiles');

    var filename, filecount;
    var data;

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
                data = readFile(directoryPath, filename);
            }
        }
        callback(data);
    });  
}

readFile = function(directoryPath, filename){
    console.log('Opening file ' + filename + '\n\n');
    var workbook = XLSX.readFile(path.join(directoryPath, filename));

    //get all the sheetnames
    var tables = workbook.SheetNames;

    //to store all the objects
    var sqlTableObjects = [];

    //Iterate through each sheet
    tables.forEach((table) => {

        var tableData = workbook.Sheets[table];
        var sheetRange = XLSX.utils.decode_range(tableData['!ref']);
        //console.log(tableData);

        //Building object for SQL generation
        sqlTableObject = {
            tableName: table,
            columns: [],
            rows: []
        };

        //Iterating through the first row
        for(colCounter = 0; colCounter <= sheetRange.e.c; colCounter++){
            value = tableData[XLSX.utils.encode_cell({r: 0, c: colCounter})].v;
                if(value){
                    sqlTableObject.columns.push(value);
                }
        }

        for(var R = sheetRange.s.r + 1; R <= sheetRange.e.r; ++R) {
            var rowData = [];
            for(var C = sheetRange.s.c; C <= sheetRange.e.c; ++C) {
            var cell_address = {c:C, r:R};
            var cell_ref = XLSX.utils.encode_cell(cell_address);
            rowData.push(tableData[cell_ref].v);
            }
            sqlTableObject.rows.push(rowData);
        }
    });

    sqlTableObjects.push(sqlTableObject);
    console.log('==========================\n' +
    'Generated pre sql object array containing data from all the sheets:\n'
    + JSON.stringify(sqlTableObjects, null, 2)
    + '==========================\n');

    return sqlTableObjects;
}
