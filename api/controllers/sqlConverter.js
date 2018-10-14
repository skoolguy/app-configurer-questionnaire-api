exports.getSQL = (data, callback) => {
    var response = {
        delete : null,
        insert : null
    };

    var deleteStatements = [];
    var insertStatements = [];
    var columns = [];
    var FirstColumnName;
    var tableName;
    var columns;
    var FirstColumnValue;
    var entries;
    
    data.forEach(tableData => {
        tableName = tableData.tableName;
        columns = tableData.columns;
        FirstColumnName = columns[0];
        entries = tableData.rows;
        entries.forEach(params => {
            FirstColumnValue = params[0];
            var deleteString = `DELETE FROM ${tableName} WHERE ${FirstColumnName} = '${FirstColumnValue}'`;        
            var insertString;
            console.log("test log : " + JSON.stringify('adsf'));
            console.log(deleteString);
            deleteStatements.push(deleteString);
        });
    });
    console.log("insertStatements : " + JSON.stringify(insertStatements));
    response.delete = deleteStatements;
    response.insert = insertStatements;

    console.log('=============================\n'
    + 'generated the sql queries :\n\n'
    + JSON.stringify(response, null, 2));
    
    callback(response);
}