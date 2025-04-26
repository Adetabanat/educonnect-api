const express = require("express");
const app = require("./app");
const bodyParser = require("body-parser");
require("dotenv").config();

const { initdb } = require("./data/database");


const port = process.env.PORT || 3000;

app.use(bodyParser.json());

(async () => {
    try {
        await initdb(); // Initialize the DB first
        app.listen(port, () => {
            console.log(`🚀 Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error("❌ Failed to initialize the database:", error);
        process.exit(1);
    }
})();
