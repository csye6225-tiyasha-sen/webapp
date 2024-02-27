#!/bin/bash

sudo mkdir /opt/csye6225
sudo chown -R $(whoami) /opt/csye6225
unzip /tmp/webapp.zip -d /opt/csye6225/
cd /opt/csye6225/webapp && sudo npm install
