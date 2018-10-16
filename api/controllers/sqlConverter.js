exports.getSQL = (data, callback) => {
    var response = {
        delete : null,
        insert : null
    };

    console.log(data);

    var deleteStatements = [];
    var insertStatements = [];
    var columns = [];
    var FirstColumnName;
    var tableName;
    var columns;
    var FirstColumnValue;
    var entries;
    

    tableName = data.tableName;
    columns = data.columns;
    FirstColumnName = columns[0];
    entries = data.rows;
    entries.forEach(params => {
        FirstColumnValue = params[0];
        var deleteString = `DELETE FROM ${tableName} WHERE ${FirstColumnName} = '${FirstColumnValue}'`;        
        var insertString = `INSERT INTO ${tableName}(`;
        columns.forEach((column) => {
            insertString += column + ",";
        });
        insertString = insertString.substr(0, insertString.length-1);
        insertString += ") VALUES (";
        params.forEach((colValue) => {
            insertString += colValue + ",";
        });
        insertString = insertString.substr(0, insertString.length-1) + ");";


        deleteStatements.push(deleteString);
        insertStatements.push(insertString);
    });
    
    console.log("insertStatements : " + JSON.stringify(insertStatements));
    response.delete = deleteStatements;
    response.insert = insertStatements;

    console.log('=============================\n'
    + 'generated the sql queries :\n\n'
    + JSON.stringify(response, null, 2)
    + '=============================\n');
    
    callback(response);
}