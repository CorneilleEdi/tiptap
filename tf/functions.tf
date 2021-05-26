
# locals {
#   timestamp = formatdate("YYMMDDhhmmss", timestamp())
# }
# resource "google_storage_bucket" "bucket" {
#   name = "${var.project_id}-functions"
# }

# data "archive_file" "source" {
#   type        = "zip"
#   source_dir  = "../backend/event-handlers"
#   output_path = "/tmp/function-${local.timestamp}.zip"
#   source {
#     filename = ""
#   }
# }

# resource "google_storage_bucket_object" "archive" {
#   name   = "${local.timestamp}-index.zip"
#   bucket = google_storage_bucket.bucket.name
#   source = data.archive_file.source.output_path
# }

# resource "google_cloudfunctions_function" "function" {
#   name        = "function-hello-world"
#   description = "Hello World"
#   runtime     = "nodejs14"

#   available_memory_mb   = 128
#   source_archive_bucket = google_storage_bucket.bucket.name
#   source_archive_object = google_storage_bucket_object.archive.name
#   trigger_http          = true
#   entry_point           = "helloWorld"
# }

# # IAM entry for all users to invoke the function
# resource "google_cloudfunctions_function_iam_member" "invoker" {
#   project        = google_cloudfunctions_function.function.project
#   region         = google_cloudfunctions_function.function.region
#   cloud_function = google_cloudfunctions_function.function.name

#   role   = "roles/cloudfunctions.invoker"
#   member = "allUsers"
# }
