sudo adduser csye6225 --system
sudo cp -r /tmp/webappdev.service /etc/systemd/system/
sudo chown -R csye6225:csye6225 /etc/systemd/system/
# Reload systemd to pick up the new service file
sudo systemctl daemon-reload

# Enable the service to start on boot
sudo systemctl enable webappdev.service
