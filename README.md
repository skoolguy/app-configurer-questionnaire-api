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
$ curl http://localhost:3000/test
```
#### Response
```
app-configurer-questionnaire-api is running
```
### -> upload File to server
#### Request
```
$ curl -v -F excelFile=@<filename> http://localhost:3000/sheets/readFile
```
#### Response
```
File uploaded  
```
