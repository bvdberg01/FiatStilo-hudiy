#!/bin/bash

sudo apt update
sudo apt install -y npm
sudo npm install -g serve

SERVICE_DIR="/home/stilo/FiatStilo-hudiy/Services"
SCRIPTS_DIR="/home/stilo/FiatStilo-hudiy/Scripts"

cd "$SCRIPTS_DIR"
python3 -m venv venv
source venv/bin/activate
pip install protobuf websocket-client

for service in "$SERVICE_DIR"/*.service; do
    if [ -f "$service" ]; then
        echo "Installeer service: $(basename "$service")"
        sudo cp "$service" /etc/systemd/system/
        sudo systemctl daemon-reload
        sudo systemctl start "$(basename "$service")"
        sudo systemctl enable "$(basename "$service")"
        echo "Service $(basename "$service") is gestart en ingeschakeld."
    fi
done

echo "Alle services zijn geïnstalleerd."
