data "archive_file" "hello_world_function_source" {
  type        = "zip"
  source_dir  = "../backend/event-handlers"
  output_path = "/tmp/function-hello-world-${local.timestamp}.zip"
}

resource "google_storage_bucket_object" "hello_world_function_archive" {
  name   = "function-hello-world-${local.timestamp}.zip"
  bucket = google_storage_bucket.functions_bucket.name
  source = data.archive_file.hello_world_function_source.output_path
}

resource "google_cloudfunctions_function" "hello_world_function" {
  name        = "function-hello-world"
  description = "Hello World"
  runtime     = "nodejs14"
  region      = var.project_region

  available_memory_mb   = 128
  source_archive_bucket = var.functions_bucket
  source_archive_object = google_storage_bucket_object.hello_world_function_archive.name
  trigger_http          = true
  entry_point           = "helloWorld"
}

# IAM entry for all users to invoke the function
resource "google_cloudfunctions_function_iam_member" "invoker" {
  project        = google_cloudfunctions_function.hello_world_function.project
  region         = google_cloudfunctions_function.hello_world_function.region
  cloud_function = google_cloudfunctions_function.hello_world_function.name

  role   = "roles/cloudfunctions.invoker"
  member = "allUsers"
}
