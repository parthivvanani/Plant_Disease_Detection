from google.cloud import automl

project_id = "lable-detection-293223"
model_id = "ICN4308944287812288512"

client = automl.AutoMlClient()
# Get the full path of the model.
model_full_id = client.model_path(project_id, "us-central1", model_id)

print("List of model evaluations:")
for evaluation in client.list_model_evaluations(parent=model_full_id, filter=""):
    print("Model evaluation name: {}".format(evaluation.name))
    print(
        "Model annotation spec id: {}".format(
            evaluation.annotation_spec_id
        )
    )
    print("Create Time: {}".format(evaluation.create_time))
    print(
        "Evaluation example count: {}".format(
            evaluation.evaluated_example_count
        )
    )
    print(
        "Object detection model evaluation metrics: {}\n\n".format(
            evaluation.image_object_detection_evaluation_metrics
        )
    )