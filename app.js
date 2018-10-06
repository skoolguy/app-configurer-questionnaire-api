var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var testRoutes = require('./api/routes/testRoute');

testRoutes(app);//register the testRoute

app.listen(port);

console.log('app-configurer-questionnaire-api RESTful API server started on: ' + port);