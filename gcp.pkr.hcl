packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "~> 1"
    }
  }
}

variable "dbuser" {
  type    = string
  default = env("PSQL_USERNAME")
}

variable "dbpassword" {
  type    = string
  default = env("PSQL_PASSWORD")
}

variable "dbdatabase" {
  type    = string
  default = env("PSQL_DATABASE")
}

source "googlecompute" "sharedvpc-example" {
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
    environment_vars = [
      "PSQL_USER=${var.dbuser}",
      "PSQL_PASSWORD=${var.dbpassword}",
      "PSQL_DATABASE=${var.dbdatabase}",
    ]
    pause_before = "10s"
    timeout      = "10s"
  }

}



