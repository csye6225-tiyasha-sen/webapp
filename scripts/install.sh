#!/bin/bash

# Install and configure nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
source ~/.bashrc

nvm install v21.6.1 -y
nvm install lts/erbium -y
nvm use v21.6.1
node --version
npm --version

# Exit the script to apply changes in the current shell
exec bash