import { app, BrowserWindow, screen } from "electron";

let win1, win2;

function createWindows() {
    const displays = screen.getAllDisplays();

    if (displays.length < 2) {
        console.error("You need at least two monitors!");
        app.quit();
        return;
    }

    // First monitor (HDMI0)
    const { x: x1, y: y1, width: w1, height: h1 } = displays[0].bounds;
    // Second monitor (HDMI1)
    const { x: x2, y: y2, width: w2, height: h2 } = displays[1].bounds;

    win1 = new BrowserWindow({
        x: x1,
        y: y1,
        width: w1,
        height: h1,
        kiosk: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            partition: "persist:kiosk",
        },
    });

    win2 = new BrowserWindow({
        x: x2,
        y: y2,
        width: w2,
        height: h2,
        kiosk: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            partition: "persist:kiosk",
        },
    });

    win1.loadURL("http://localhost:8080/controller");
    win2.loadURL("http://localhost:8080/display");

    win1.setMenuBarVisibility(false);
    win2.setMenuBarVisibility(false);
}

app.whenReady().then(createWindows);

app.on("window-all-closed", () => {
    app.quit();
});
