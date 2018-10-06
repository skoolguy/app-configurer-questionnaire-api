module.exports = function(app){
    var testController = require('../controllers/testServiceController');

    app.route('/test')
        .get(testController.test);
};