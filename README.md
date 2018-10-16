# app-configurer-questionnaire-api

## To run :

```
$ git clone https://github.com/skoolguy/app-configurer-questionnaire-api.git
$ npm install
$ node app.js
```
## Webservices to call

### -> test to check if API is up
#### Request
```
$ curl -X GET http://localhost:3000/test
```
#### Response
```
app-configurer-questionnaire-api is running
```
### -> Send tableData to receive insert query, delete query and XML
#### Request
```
$ curl --header "Content-Type: application/json" --request POST 
  --data '{
	"tableName" : "DKDBLABLA",
	"columns": [
		"col1",
		"col2",
		"col3"
	],
	"rows":[
		[
			"col1data",
			"col2data",
			"col3data"
		],
		[
			"bla",
			"bli",
			"blu"
		],
		[
			"col1data",
			"col2data",
			"col3data"
		]
		
	]
}' http://localhost:3000/generateSQL           (remove the next line characters if you run this on command line)
``` 
#### Response
in the format:
```
{
    "delete": [
        "DELETE FROM DKDBLABLA WHERE column1 = 'col1data'",
        "DELETE FROM DKDBLABLA WHERE column1 = 'bla'",
        "DELETE FROM DKDBLABLA WHERE column1 = 'col1data'"
    ],
    "insert": [
        "INSERT INTO DKDBLABLA(column1,column2,column3) VALUES (col1data,col2data,col3data);",
        "INSERT INTO DKDBLABLA(column1,column2,column3) VALUES (bla,bli,blu);",
        "INSERT INTO DKDBLABLA(column1,column2,column3) VALUES (col1data,col2data,col3data);"
    ]
}
```
### -> upload File to server
#### Request
```
$ curl -X POST -F excelFile=@<file> http://localhost:3000/sheets/readFile
```
#### Response
in the format
```
[{"tableName":"TABLE1","columns":["COL1","COL2","COL3","COL4"],"rows":[["row1data1","row1data2","row1data3","row1data4"],["row2data1","row2data2","row2data3","row2data4"]]}]
```
