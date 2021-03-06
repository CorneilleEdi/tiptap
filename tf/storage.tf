data "google_iam_policy" "viewer" {
  binding {
    role = "roles/storage.objectViewer"
    members = [
      "allUsers",
    ]
  }
}


# Terraform state bucket
resource "google_storage_bucket" "terraform_state_bucket" {
  name                        = "loopbin-tiptapflow-terraform"
  location                    = var.project_region
  uniform_bucket_level_access = true
}

# Users profile images bucket
resource "google_storage_bucket" "users_profile_image_bucket" {
  name                        = "loopbin-tiptapflow-users-profile-image"
  location                    = var.project_region
  force_destroy               = true
  uniform_bucket_level_access = false

  cors {
    origin          = ["*"]
    method          = ["GET"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}
resource "google_storage_bucket_access_control" "users_profile_image_bucket_public_rule" {
  bucket = google_storage_bucket.users_profile_image_bucket.name
  role   = "READER"
  entity = "allUsers"
}


# Questions images bucket
resource "google_storage_bucket" "questions_images_bucket" {
  name                        = "loopbin-tiptapflow-questions-images"
  location                    = var.project_region
  force_destroy               = true
  uniform_bucket_level_access = false

  cors {
    origin          = ["*"]
    method          = ["GET"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}
resource "google_storage_bucket_access_control" "questions_images_bucket_public_rule" {
  bucket = google_storage_bucket.questions_images_bucket.name
  role   = "READER"
  entity = "allUsers"
}
