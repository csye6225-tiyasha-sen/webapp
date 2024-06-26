sudo adduser csye6225 --shell /usr/sbin/nologin
sudo cp -r /tmp/webappdev.service /etc/systemd/system/
sudo chown -R csye6225:csye6225 /opt/csye6225/webapp
sudo chown -R csye6225:csye6225 /var/log/webapp
# sudo sed -i "s/enforcing/disabled/g" /etc/selinux/config
sudo setenforce 0
sudo systemctl daemon-reload

# Last step: Enable the service to start on boot
sudo systemctl restart google-cloud-ops-agent
sudo systemctl enable webappdev.service