const { authJwt } = require("../middlewares");
const indexcontroller = require("../controllers/index.controller");
path = require('path');
var multer = require('multer');

var multer = require('multer');

var uploadpic1 = multer();
var uploadpic = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) 
    { 
        callback(null, './app/public/');},
    filename: function (req, file, callback) 
    { callback(null, "123" + path.extname(file.originalname));}
  }), 
});

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/upload",uploadpic.any(), indexcontroller.postUpload);

   app.get("/upload", indexcontroller.getUpload);
    app.get("/login", indexcontroller.getLogin);
    app.get("/register", indexcontroller.getRegister);

  //app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
  };







