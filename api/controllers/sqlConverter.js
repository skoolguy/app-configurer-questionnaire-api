exports.getSQL = (data, callback) => {
    var response = {
        delete  : null,
        insert  : null,
        xml     : null
    };

    var deleteStatements = [];
    var insertStatements = [];
    var xmlTags = [];

    var columns = [];
    var tableName;
    var columns;
    var entries;
    

    tableName = data.tableName;
    columns = data.columns;
    entries = data.rows;
    entries.forEach(params => {

        var insertString;
        var deleteString;
        var xmlString;

        deleteString = `DELETE FROM ${tableName} WHERE ${columns[0]} = '${params[0]}';`;            
        
        insertString = `INSERT INTO ${tableName}(`;
        columns.forEach((column) => {
            insertString += column + ",";
        });
        insertString = insertString.substr(0, insertString.length-1);
        insertString += ") VALUES (";
        params.forEach((colValue) => {
            insertString += colValue + ",";
        });
        insertString = insertString.substr(0, insertString.length-1) + ");";

        xmlString = `<${tableName} `;
        for(index = 0; index < columns.length; index++){
            xmlString += `${columns[index]} = "${params[index]}" `;
        }
        xmlString = xmlString.substr(0, xmlString.length-1) + "/>";

        deleteStatements.push(deleteString);
        insertStatements.push(insertString);
        xmlTags.push(xmlString);
    });
    
    console.log("insertStatements : " + JSON.stringify(insertStatements));
    response.delete = deleteStatements;
    response.insert = insertStatements;
    response.xml    = xmlTags;

    console.log('=============================\n'
    + 'generated the sql queries :\n\n'
    + JSON.stringify(response, null, 2)
    + '=============================\n');
    
    callback(response);
}