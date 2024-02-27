#!/bin/bash

# Install and configure nvm
sudo dnf module enable nodejs:20
sudo dnf install -y nodejs
node --version
npm --version
