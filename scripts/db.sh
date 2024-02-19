#!/bin/bash

dnf module list postgresql
sudo dnf module enable postgresql:16 -y
sudo dnf install postgresql-server -y
sudo postgresql-setup --initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql


To create a db:
---vi create-db.sh
# Load environment variables from .env file
source .env
# Set PostgreSQL connection parameters
export PGUSER=$PSQL_USERNAME
export PGPASSWORD=$PSQL_PASSWORD
# Create the database
createdb $PSQL_DATABASE
echo "Database '$PSQL_DATABASE' created successfully."

echo "Changing authentication method in pg_hba.conf..."

echo "Authentication method changed."

sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"