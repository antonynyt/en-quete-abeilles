#!/bin/bash

# Launch kiosk mode controller
chromium-browser    --kiosk 'http://localhost:8080/controller' \
                    --noerrdialogs --disable-infobars --disable-session-crashed-bubble \
                    --disable-features=TranslateUI,AutofillServerCommunication,PasswordManagerRedesign,EnableEphemeralTab,EnableEphemeralTabPage,EnableEphemeralTabPageOnStartup \
                    --overscroll-history-navigation=0 \
                    --disable-pinch --disable-pinch-virtual-keyboard --disable-pinch-virtual-keyboard \
                    --autoplay-policy=no-user-gesture-required
                    --window-position=0,0 --window-size=1920,1080

# Launch kiosk mode display
chromium-browser    --kiosk 'http://localhost:8080/display' \
                    --noerrdialogs --disable-infobars --disable-session-crashed-bubble \
                    --disable-features=TranslateUI,AutofillServerCommunication,PasswordManagerRedesign,EnableEphemeralTab,EnableEphemeralTabPage,EnableEphemeralTabPageOnStartup \
                    --overscroll-history-navigation=0 \
                    --disable-pinch --disable-pinch-virtual-keyboard --disable-pinch-virtual-keyboard \
                    --autoplay-policy=no-user-gesture-required \
                    --window-position=1920,0 --window-size=1920,1080