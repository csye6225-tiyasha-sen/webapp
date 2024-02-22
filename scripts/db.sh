#!/bin/bash

dnf module list postgresql
sudo dnf module enable postgresql:16 -y
sudo dnf install postgresql-server -y
sudo postgresql-setup --initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql
echo "Changing authentication method in pg_hba.conf..."
PG_HBA_CONTENT="\
# PostgreSQL Host-Based Authentication Configuration
# TYPE      DATABASE            USER                ADDRESS              METHOD
host          all              all                  127.0.0.1/32          trust
local         all              all                                        trust
host          all              all                  ::1/128               trust
"

sudo cp /var/lib/pgsql/data/pg_hba.conf /var/lib/pgsql/data/pg_hba.conf.bak
echo "$PG_HBA_CONTENT" | sudo tee /var/lib/pgsql/data/pg_hba.conf > /dev/null
sudo systemctl restart postgresql


# Load environment variables from .env file
echo "Alter: USER:$PSQL_USER PASSWORD:$PSQL_PASSWORD DB:$PSQL_DATABASE"
#alter script
sudo -u postgres psql -c "CREATE USER $PSQL_USER WITH PASSWORD '$PSQL_PASSWORD';"
sudo -u postgres psql -c "ALTER USER $PSQL_USER PASSWORD '$PSQL_PASSWORD';"
# Create the database
sudo -u postgres psql -c "CREATE DATABASE $PSQL_DATABASE;"