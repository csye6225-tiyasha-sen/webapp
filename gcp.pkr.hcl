packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "~> 1"
    }
  }
}

source "googlecompute" "sharedvpc-example" {
  image_name          = "image-dev-new-temp"
  project_id          = "csye-6225-dev-414704"
  source_image_family = "centos-stream-8"
  subnetwork          = "default"
  network_project_id  = "csye-6225-dev-414704"
  ssh_username        = "tiyashasen_net"
  zone                = "us-east1-c"
  image_licenses      = ["projects/vm-options/global/licenses/enable-vmx"]
  machine_type        = "custom-4-4096"
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
      "scripts/zipunzip.sh",
      "scripts/installopsagent.sh",
      "scripts/systemd.sh"
    ]
    pause_before = "10s"
    timeout      = "10s"
  }

}



