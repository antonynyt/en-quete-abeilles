import { serve } from '@hono/node-server';
import db from './db/bees.js';
import createBeeRoutes from './routes/bees.js';
import { startWebSocketServer } from './ws/server.js';

const app = createBeeRoutes(db);

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});

startWebSocketServer(3001);