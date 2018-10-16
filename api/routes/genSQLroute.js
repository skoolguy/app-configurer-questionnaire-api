module.exports = function(app){
    var genSQLController = require('../controllers/sqlConverter');

    app.route('/generateSQL')
    .post((req, res) => {
        genSQLController.getSQL(req.body, (data) => {
            res.send(data);
        });
    });
};