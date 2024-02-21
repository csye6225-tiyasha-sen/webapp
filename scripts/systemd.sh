sudo adduser csye6225 --shell /usr/sbin/nologin
sudo cp -r /tmp/webappdev.service /etc/systemd/system/
sudo chown -R csye6225:csye6225 /etc/systemd/system/webappdev.service


sudo systemctl daemon-reload

# Enable the service to start on boot
sudo systemctl enable webappdev.service