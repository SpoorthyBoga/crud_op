
const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("../index");

test("GET / returns the API status message", async () => {
    const server = app.listen(0);

    try {
        const address = server.address();
        const response = await fetch(`http://127.0.0.1:${address.port}/`);

        assert.equal(response.status, 200);
        assert.deepEqual(await response.json(), {
            message: "DevOps CRUD API is running"
        });
    } finally {
        await new Promise((resolve, reject) => {
            server.close((error) => {
                if (error) reject(error);
                else resolve();
            });
        });
    }
});

test("GET /items returns an array", async () => {
    const server = app.listen(0);

    try {
        const address = server.address();
        const response = await fetch(`http://127.0.0.1:${address.port}/items`);

        assert.equal(response.status, 200);
        assert.ok(Array.isArray(await response.json()));
    } finally {
        await new Promise((resolve, reject) => {
            server.close((error) => {
                if (error) reject(error);
                else resolve();
            });
        });
    }
});
