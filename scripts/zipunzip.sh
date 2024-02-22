#!/bin/bash

unzip /tmp/webapp.zip -d ~/
cd ~/webapp

touch .env

cat > .env <<EOF
PSQL_USERNAME: ${PSQL_USERNAME}
PSQL_PASSWORD: ${PSQL_PASSWORD}
PSQL_DATABASE: ${PSQL_DATABASE}
EOF

npm install

