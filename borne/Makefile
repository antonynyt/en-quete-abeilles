start:
	bin/start.sh

update:
	bin/update.sh

map-touchscreen:
	bin/map-touchscreen.sh

install-app:
	cp bin/enquete-abeilles.desktop ~/.local/share/applications/
	chmod +x ~/.local/share/applications/enquete-abeilles.desktop
	cp bin/enquete-abeilles.desktop ~/Desktop/enquete-abeilles.desktop
	chmod +x ~/Desktop/enquete-abeilles.desktop

install-service:
	sudo cp bin/systemd/beequest.service /etc/systemd/system/beequest.service
	sudo systemctl daemon-reload
	sudo systemctl enable beequest.service
	sudo systemctl start beequest.service

install-map-touchscreen:
	cp bin/map-touchscreen.sh /home/turbopollen/map-touchscreen.sh
	echo '@/home/turbopollen/map-touchscreen.sh' >> /etc/xdg/lxsession/LXDE-pi/autostart

stop-service:
	sudo systemctl stop beequest.service

remove-service:
	sudo systemctl disable beequest.service
	sudo systemctl stop beequest.service
	sudo rm -f /etc/systemd/system/beequest.service
	sudo systemctl daemon-

wipe:
	rm -r /home/turbopollen/.config/borne-wrapper/