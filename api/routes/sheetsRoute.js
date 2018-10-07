module.exports = function(app){
    var sheetsController = require('../controllers/sheet-xlsx-controller');

    app.route('/sheets/readFile')
        .post(sheetsController.readFile);
};