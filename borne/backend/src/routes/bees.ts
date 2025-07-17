import { Hono } from "hono";
import sqlite3 from "sqlite3";

export default function createBeeRoutes(db: sqlite3.Database) {
    const app = new Hono();

    app.post("/bees", async (c) => {
        const { name } = await c.req.json();
        if (!name) return c.text("Missing name", 400);
        db.run("INSERT INTO bees (name) VALUES (?)", [name]);
        return c.text("Bee added");
    });

    app.get("/bees", (c) => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM bees", [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(c.json(rows));
                }
            });
        });
    });

    return app;
}
