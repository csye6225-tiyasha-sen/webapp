packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "~> 1"
    
  }
}

source "googlecompute" "sharedvpc-example" {
  image_name          = "image-dev"
  project_id          = "csye-6225-dev-414704"
  source_image_family = "centos-stream-8"
  subnetwork          = "default"
  network_project_id  = "csye-6225-dev-414704"
  ssh_username        = "tiyashasen_net"
  zone                = "us-central1-a"
  image_licenses      = ["projects/vm-options/global/licenses/enable-vmx"]
}

build {
  sources = ["sources.googlecompute.sharedvpc-example"]

  provisioner "file" {
    source      = "./scripts/webapp.zip"
    destination = "/tmp/"
  }

  provisioner "file" {
    source      = "./scripts/webappdev.service"
    destination = "/tmp/"
  }

  provisioner "shell" {
    scripts = [
      "scripts/load.sh",
      "scripts/install.sh",
      "scripts/db.sh",
      "scripts/zipunzip.sh",
      "scripts/systemd.sh"
    ]
    pause_before = "10s"
    timeout      = "10s"
  }

}



