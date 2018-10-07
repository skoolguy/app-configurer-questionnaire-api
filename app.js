var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var testRoutes = require('./api/routes/testRoute');
var sheetsRoute = require('./api/routes/sheetsRoute');

testRoutes(app);//register the testRoute
sheetsRoute(app);//register sheetsRoute

app.listen(
    port, 
    () => console.log(
        `app-configurer-questionnaire-api RESTful API server started on port: ${port}`
        )
);
