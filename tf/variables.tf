variable "project_id" {
  description = "Google Cloud Platform (GCP) Project ID."
  type        = string
  default     = "tiptapflow"
}

variable "project_region" {
  description = "Project region"
  type        = string
  default     = "asia-south1"
}
variable "project_zone" {
  description = "Project zone"
  type        = string
  default     = "asia-south1-b"
}

variable "app_name" {
  description = "Name of the app"
  type        = string
  default     = "tiptap"
}
