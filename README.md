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
### -> upload File to server
#### Request
```
$ curl -X POST -F excelFile=@<file> http://localhost:3000/sheets/readFile
```
#### Response
```
File uploaded  
```
