#Install Ops Agent
sudo curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install


#Ops Agent configuration
CONFIG_CONTENT=$(cat <<EOF
logging:
  receivers:
    my-app-receiver:
      type: files
      include_paths:
        - /var/log/webapp/myapp.log
      record_log_file_path: true
  processors:
    my-app-processors:
      type: parse_json
      time_key: time
      time_format: "%Y-%m-%dT%H:%M:%S.%L"
    move_level_severity:
      type: modify_fields
      fields:
        severity:
          move_from: jsonPayload.level
          map_values:
            "debug": "DEBUG"
            "info": "INFO"
            "warn": "WARN"            
  service:
    pipelines:
      default_pipeline:
        receivers: [my-app-receiver]
        processors: [my-app-processors, move_level_severity]
EOF
)

CONFIG_FILE="/etc/google-cloud-ops-agent/config.yaml"

#Configuration inside config.yaml
echo "$CONFIG_CONTENT" | sudo tee "$CONFIG_FILE" > /dev/null

#Restart
sudo systemctl restart google-cloud-ops-agent