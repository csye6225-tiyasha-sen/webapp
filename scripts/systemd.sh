sudo adduser csye6225 --shell /usr/sbin/nologin
sudo cp -r /tmp/webappdev.service /etc/systemd/system/
sudo chown -R csye6225:csye6225 /etc/systemd/system/webappdev.service

sudo sed -i "s/enforcing/disabled/g" /etc/selinux/config
sudo setenforce 0
# Reload systemd to pick up the new service file
sudo systemctl daemon-reload

# Enable the service to start on boot
sudo systemctl enable webappdev.service