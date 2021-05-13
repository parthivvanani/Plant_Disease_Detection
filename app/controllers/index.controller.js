/*jshint esversion: 8*/
//var formidable = require('formidable');
var path = require('path');
exports.postUpload = (req, res) => {

	//
     console.log(req.files[0]);
		/**
		 * TODO(developer): Uncomment these variables before running the sample.
		 */
		 const projectId = 'lable-detection-293223';
		 const location = 'us-central1';
		 const modelId = 'ICN4308944287812288512';
		 const filePath = req.files[0].path;

		// Imports the Google Cloud AutoML library
		const {PredictionServiceClient} = require('@google-cloud/automl').v1;
		const fs = require('fs');

		// Instantiates a client
		const client = new PredictionServiceClient();

		// Read the file content for translation.
		const content = fs.readFileSync(filePath);

		async function predict() {
		  // Construct request
		  // params is additional domain-specific parameters.
		  // score_threshold is used to filter the result
		  const request = {
		    name: client.modelPath(projectId, location, modelId),
		    payload: {
		      image: {
		        imageBytes: content,
		      },
		    },
		  };

		  const [response] = await client.predict(request);

		  for (const annotationPayload of response.payload) {
		    console.log(`Predicted class name: ${annotationPayload.displayName}`);
		    console.log(
		      `Predicted class score: ${annotationPayload.classification.score}`
		    );
		  }
		}

		predict();

     res.status(200).send("Uplaoded image");

};

exports.getUpload = (req, res) => {
	//console.log(path.join(__dirname+''));
     res.status(200).render('upload.html');
};
exports.getLogin = (req, res) => {
	//console.log();
     res.status(200).render('login.html');
};
exports.getRegister = (req, res) => {
	//console.log();
     res.status(200).render("signup.html");
};

exports.getTypes = (req, res) => {
    res.status(200).render("types.html");
};

