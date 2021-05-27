
locals {
  timestamp = formatdate("YYMMDDhhmmss", timestamp())
}
resource "google_storage_bucket" "functions_bucket" {
  name     = var.functions_bucket
  location = var.project_region
}
