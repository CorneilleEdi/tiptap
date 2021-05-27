data "archive_file" "user_profile_events_handlers_function_source" {
  type        = "zip"
  source_dir  = "../backend/events-handlers/user-profile-events-handlers"
  output_path = "/tmp/function-user-profile-events-handlers-${local.timestamp}.zip"
  excludes = [
    "node_modules",
    "**/node_modules"
  ]
}

resource "google_storage_bucket_object" "user_profile_events_handlers_function_archive" {
  name   = "function-user-profile-events-handlers-${local.timestamp}.zip"
  bucket = google_storage_bucket.functions_bucket.name
  source = data.archive_file.user_profile_events_handlers_function_source.output_path
}

resource "google_cloudfunctions_function" "user_profile_events_handlers_function" {
  name        = "user-profile-events-handlers"
  description = "Funtion to handle image deletion on user profile change/deletion"
  runtime     = "nodejs14"
  region      = var.project_region

  available_memory_mb   = 128
  source_archive_bucket = var.functions_bucket
  source_archive_object = google_storage_bucket_object.user_profile_events_handlers_function_archive.name
  entry_point           = "userProfileWritten"

  event_trigger {
    event_type = "providers/cloud.firestore/eventTypes/document.write"
    resource   = "projects/${var.project_id}/databases/(default)/documents/users/{id}"
    failure_policy {
      retry = true
    }
  }
}
