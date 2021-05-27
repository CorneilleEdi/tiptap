provider "google" {
  project = var.project_id
  region  = var.project_region
}


provider "google-beta" {
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


module "functions" {
  source         = "./functions"
  project_region = var.project_region
}
