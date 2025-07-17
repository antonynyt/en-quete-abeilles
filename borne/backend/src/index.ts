import { Hono } from "hono";
import { serve } from "@hono/node-server";
import db from "./db/bees.js";
import createBeeRoutes from "./routes/bees.js";
import createWsRoutes from "./ws/server.js";

const app = new Hono();

const { wsApp, injectWebSocket } = createWsRoutes();
app.route("/", wsApp);
app.route("/api", createBeeRoutes(db));

const server = serve({
  fetch: app.fetch,
  port: 3000,
}, (info) => {
  console.log(`API and WS is running on http://localhost:${info.port}`);
});

injectWebSocket(server);