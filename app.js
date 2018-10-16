var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var multer  = require('multer'); //For gettin multipart form data
var path = require('path'); //used in storage engine to get file extension 


var testRoutes = require('./api/routes/testRoute');
var genSQLroute = require('./api/routes/genSQLroute');
var excelParser = require('./api/controllers/readExcelController');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Set storage engine for multer
var storage = multer.diskStorage({
    destination: './public/uploadedFiles',
    filename: function(req, file, callback){
        callback(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
});

//Initialize upload variable for multer - passing in storageEngine
const upload = multer({
    storage: storage
}).array('excelFile');

// request for file upload
app.post('/sheets/readFile', (req, res) => {
    upload(req, res, (err) => {
        if (err){
            res.send(err);
        } else {
            console.log('The file is uploaded');
            excelParser.extract((data) => {
                console.log('Sending back the response...\n');
                res.send(data);
            });
        }
    });
} );

testRoutes(app);//register the testRoute
genSQLroute(app);

app.listen(
    port, 
    () => console.log(
        `app-configurer-questionnaire-api RESTful API server started on port: ${port}`
        )
);
