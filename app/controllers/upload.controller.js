/*jshint esversion: 8*/
var multer = require('multer');
var path = require('path');
const {predict} = require('../../detect');

var storage = multer.diskStorage({ 
  destination: function (req, file, cb) { 

      // Uploads is the Upload_folder_name 
      cb(null, "uploads");
  }, 
  filename: function (req, file, cb) { 
    cb(null, file.fieldname + "-1" +".jpg") ;
  } 
}) ;
const maxSize = 1 * 1000 * 1000; 

var upload = multer({  
  storage: storage, 
  limits: { fileSize: maxSize }, 
  fileFilter: function (req, file, cb){ 
  
      // Set the filetypes, it is optional 
      var filetypes = /jpeg|jpg|png/; 
      var mimetype = filetypes.test(file.mimetype); 

      var extname = filetypes.test(path.extname( 
                  file.originalname).toLowerCase()); 
      
      if (mimetype && extname) { 
          return cb(null, true); 
      } 
    
      cb("Error: File upload only supports the " + "following filetypes - " + filetypes); 
    }  

// mypic is the name of file attribute 
}).single("upload");  

exports.upload = async (req, res, next) => {
    // console.log(req);
    upload(req, res, async (err) => {
        if(err) {
            res.status(500).send("Error\n " + err);
        } else {
            //call the deployed model API and send an HTML file with appropriate lables  of the image
            predict("./uploads/upload-1"  + ".jpg")
                .then( (prediction) => {
                            console.log(prediction);
                            console.log(prediction.payload[0].classification.score * 100 + "% sure");
                            res.status(200).send(prediction);//For example : string: "success" || bool: true
                        },
                        (error) => {
                            res.status(200).send(error);//For example : string: "fail" || bool: false
                        }
                    );
        }
    });
    
};
