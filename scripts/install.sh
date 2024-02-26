#!/bin/bash

# Install and configure nvm
sudo yum install -y nodejs
node --version
npm --version

# Exit the script to apply changes in the current shell
exec bash