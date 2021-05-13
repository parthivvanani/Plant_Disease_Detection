from google.cloud import automl

project_id = "YOUR_PROJECT_ID"
dataset_id = "ICN86772358152454144"
display_name = "plant_disease_20201102015709"

client = automl.AutoMlClient()

# A resource that represents Google Cloud Platform location.
project_location = f"projects/{project_id}/locations/us-central1"

metadata = automl.ImageObjectDetectionModelMetadata(
    train_budget_milli_node_hours=24000
)
model = automl.Model(
    display_name=display_name,
    dataset_id=dataset_id,
    image_object_detection_model_metadata=metadata,
)

# Create a model with the model metadata in the region.
response = client.create_model(parent=project_location, model=model)

print("Training operation name: {}".format(response.operation.name))
print("Training started...")