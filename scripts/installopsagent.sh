#Install Ops Agent
curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install

sudo mkdir -p /var/log/webapp/
sudo touch /var/log/webapp/myapp.log

#Ops Agent configuration
CONFIG_CONTENT="
logging:
  receivers:
    my-app-receiver:
      type: files
      include_paths:
        - /var/log/webapp/myapp.log
      record_log_file_path: true
  service:
    pipelines:
      default_pipeline:
        receivers: [my-app-receiver]
metrics:
  receivers:
    hostmetrics:
      type: hostmetrics
      collection_interval: 60s
  processors:
    metrics_filter:
      type: exclude_metrics
      metrics_pattern: []
  service:
    pipelines:
      default_pipeline:
        receivers: [hostmetrics]
        processors: [metrics_filter]
"

CONFIG_FILE="/etc/google-cloud-ops-agent/config.yaml"

#Configuration inside config.yaml
echo "$CONFIG_CONTENT" | sudo tee "$CONFIG_FILE" > /dev/null

#Restart
sudo systemctl restart google-cloud-ops-agent

