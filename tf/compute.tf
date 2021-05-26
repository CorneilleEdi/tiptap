data "google_compute_image" "tiptap_search_engine_image" {
  family  = "ubuntu-2004-lts"
  project = "ubuntu-os-cloud"

}

resource "google_compute_instance" "tiptap_search_engine" {
  name         = "tiptap-search-engine"
  machine_type = "f1-micro"
  zone         = var.project_zone
  tags         = ["http-server"]


  boot_disk {
    initialize_params {
      image = data.google_compute_image.tiptap_search_engine_image.self_link
    }
  }


  network_interface {
    network = "default"
    access_config {}
    network_ip = "10.160.0.2"
  }
}
