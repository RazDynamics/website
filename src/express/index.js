(function(controllers) {
    var logger = require("../utils/logger");
    var requires = require("../utils/requireAll");
    var ctrls = requires.requireAll(__dirname + '/');

    controllers.init = function(app, express) {
        ctrls.forEach(function(ctrl) {
            ctrl.init(app, express);
        });

        require("../controllers/").init(app);

        logger.info("Configuring 404 page");
        app.use(function(req, res, next) {
            res.statusCode = 404;
            res.description = "Not found";
            res.render("404");
        });

        logger.info("Configuring 500 page");
        app.use(function(err, req, res, next) {
            logger.error(err.stack);
            res.statusCode = 500;
            res.description = "Internal server error";
            res.render("500",{stack: err.stack});
        });
    };
})(module.exports);
