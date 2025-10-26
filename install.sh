#!/bin/bash

sudo apt update
sudo apt install -y npm

SERVICE_DIR="/home/stilo/FiatStilo-hudiy/Services"

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
