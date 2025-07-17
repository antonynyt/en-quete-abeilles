import { createServer } from "http";
import { WebSocketServer } from "ws";
import BarcodeScanner from "../scanner/scanner.js";

export function startWebSocketServer(port = 3001) {
    const server = createServer();
    const wss = new WebSocketServer({ server });

    const scanner = new BarcodeScanner();
    scanner.on("data", (data) => {
        if (typeof data === "string" && data.startsWith("beecode:")) {
            wss.clients.forEach((ws) =>
                ws.send(
                    JSON.stringify({ type: "beecode", code: data.slice(8) })
                )
            );
        } else {
            wss.clients.forEach((ws) =>
                ws.send(JSON.stringify({ type: "invalid", raw: data }))
            );
        }
    });

    wss.on("connection", (ws) => {
        ws.send(
            JSON.stringify({ type: "info", message: "WebSocket connected" })
        );
    });

    server.listen(port, () => {
        console.log(`WebSocket server running on ws://localhost:${port}`);
    });
}
