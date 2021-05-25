provider "google" {
  project = var.project_id
  region  = var.project_region
}


# terraform {
#   backend "local" {
#     path = "state/terraform.tfstate"
#   }
# }

terraform {
  backend "gcs" {
    bucket = "loopbin-tiptapflow-terraform"
    prefix = "state"
  }
}
