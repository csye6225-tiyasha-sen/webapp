#!/bin/bash

sudo mkdir /opt/csye6225
sudo mkdir -p /var/log/webapp
sudo unzip /tmp/webapp.zip -d /opt/csye6225/
cd /opt/csye6225/webapp && sudo npm install


