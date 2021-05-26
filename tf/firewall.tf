resource "google_compute_firewall" "default_allow_http_server_firewall" {
  name          = "http-server-firewall"
  network       = "default"
  target_tags   = ["http-server"]
  source_ranges = ["0.0.0.0/0"]

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }
}
