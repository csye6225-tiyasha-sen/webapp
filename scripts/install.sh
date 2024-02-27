#!/bin/bash

# Install and configure nvm
sudo dnf module enable nodejs:20 -y
sudo dnf install -y nodejs
node --version
npm --version
