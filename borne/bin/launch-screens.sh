#!/bin/bash

# Launch kiosk mode controller
chromium-browser    --kiosk 'http://localhost:8080/controller' \
                    --noerrdialogs --disable-infobars --disable-session-crashed-bubble \
                    --disable-features=TranslateUI,AutofillServerCommunication,PasswordManagerRedesign,EnableEphemeralTab,EnableEphemeralTabPage,EnableEphemeralTabPageOnStartup \
                    --disable-pinch --disable-pinch-virtual-keyboard --disable-pinch-virtual-keyboard \
                    --autoplay-policy=no-user-gesture-required