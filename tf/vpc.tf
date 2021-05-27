# resource "google_vpc_access_connector" "serverless_connector" {
#   provider      = google-beta
#   name          = "serverless-connector"
#   ip_cidr_range = "10.8.0.0/28"
#   network       = "default"
#   region        = var.project_region
#   min_instances = 2
#   max_instances = 3
#   machine_type  = "f1-micro"
# }
