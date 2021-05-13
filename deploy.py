from google.cloud import automl

project_id = "lable-detection-293223"
model_id = "ICN4308944287812288512"

client = automl.AutoMlClient()
# Get the full path of the model.
model_full_id = client.model_path(project_id, "us-central1", model_id)
response = client.deploy_model(name=model_full_id)

print(f"Model deployment finished. {response.result()}")