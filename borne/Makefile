start:
	bin/start.sh

update:
	bin/update.sh

launch-screens:
	bin/launch-screens.sh

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

stop-service:
	sudo systemctl stop beequest.service

remove-service:
	sudo systemctl disable beequest.service
	sudo systemctl stop beequest.service
	sudo rm -f /etc/systemd/system/beequest.service
	sudo systemctl daemon-