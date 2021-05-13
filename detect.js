/*jshint esversion:8*/
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
const projectId = 'lable-detection-293223';
const location = 'us-central1';
const modelId = 'ICN4308944287812288512';


// Imports the Google Cloud AutoML library
const {PredictionServiceClient} = require('@google-cloud/automl').v1;
const fs = require('fs');

// Instantiates a client
const client = new PredictionServiceClient();

// Read the file content for translation.


async function predict(filePath) {
  // const filePath = 'images/tomato1.jpg';
  console.log("Predicting");
  const content = fs.readFileSync(filePath);

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

  console.log(response.payload);
  console.log("");
  for (const annotationPayload of response.payload) {
    console.log(`Predicted class name: ${annotationPayload.displayName}`);
    console.log(
      `Predicted class score: ${annotationPayload.classification.score}`
    );
  }

  console.log("Done predicting");
  return response;
}

module.exports = {
  predict
};

// predict();