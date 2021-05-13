from google.cloud import automl

project_id = "lable-detection-293223"
display_name = "plant_disease"

client = automl.AutoMlClient()

# A resource that represents Google Cloud Platform location.
project_location = f"projects/lable-detection-293223/locations/us-central1"
metadata = automl.ImageObjectDetectionDatasetMetadata()
dataset = automl.Dataset(
    display_name=display_name,
    image_object_detection_dataset_metadata=metadata,
)

# Create a dataset with the dataset metadata in the region.
response = client.create_dataset(parent=project_location, dataset=dataset)

created_dataset = response.result()

# Display the dataset information
print("Dataset name: {}".format(created_dataset.name))
print("Dataset id: {}".format(created_dataset.name.split("/")[-1]))