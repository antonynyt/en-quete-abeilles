import { Hono } from "hono";
import { createNodeWebSocket } from "@hono/node-ws";
import BarcodeScanner from "scanner";

function isValidBase64(str: string): boolean {
    return /^[A-Za-z0-9+/]+={0,2}$/.test(str);
}

export default function createWsRoutes() {
    const wsApp = new Hono();
    const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app: wsApp });

    wsApp.get(
        "/ws",
        upgradeWebSocket((c) => {
            return {
                onOpen(event, ws) {
                    const scanner = new BarcodeScanner();
                    scanner.on("data", (data) => {
                        if (
                            typeof data === "string" &&
                            data.startsWith("beecode:")
                        ) {
                            const code = data.slice(8);
                            if (isValidBase64(code)) {
                                ws.send(
                                    JSON.stringify({ type: "beecode", code })
                                );
                            } else {
                                ws.send(JSON.stringify({ type: "invalid" }));
                            }
                        } else {
                            ws.send(JSON.stringify({ type: "invalid" }));
                        }
                    });
                },
                onClose: () => {
                    console.log("Connection closed");
                },
            };
        })
    );

    return { wsApp, injectWebSocket };
}