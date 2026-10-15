const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "DevOps CRUD API is running"
    });
});

let items = [];

// GET: Retrieve all items
app.get("/items", (req, res) => {
    res.json(items);
});

// POST: Create a new item
app.post("/items", (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({
            message: "Name is required"
        });
    }

    const newItem = {
        id: Date.now(),
        name: req.body.name
    };

    items.push(newItem);

    res.status(201).json(newItem);
});

// PATCH: Update an existing item
app.patch("/items/:id", (req, res) => {
    const item = items.find(
        (i) => i.id === Number(req.params.id)
    );

    if (!item) {
        return res.status(404).json({
            message: "Item not found"
        });
    }

    if (req.body.name !== undefined) {
        item.name = req.body.name;
    }

    res.json(item);
});

// DELETE: Remove an item
app.delete("/items/:id", (req, res) => {
    const id = Number(req.params.id);
    const exists = items.some((i) => i.id === id);

    if (!exists) {
        return res.status(404).json({
            message: "Item not found"
        });
    }

    items = items.filter((i) => i.id !== id);

    res.json({
        message: "Item deleted"
    });
});

// Start the server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;