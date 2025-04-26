const dotenv = require("dotenv");
dotenv.config();
const { MongoClient } = require("mongodb");

let database;

const initdb = async () => {
    if (database) {
        console.log("✅ Database already initialized.");
        return database;
    }
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URL);
        database = client.db(); // get the actual DB object
        console.log("✅ Database connection established.");
        return database;
    } catch (err) {
        console.error("❌ Database connection failed:", err);
        throw err;
    }
};

const getDatabase = () => {
    if (!database) {
        throw new Error("Database has not been initialized.");
    }
    return database;
};

module.exports = { initdb, getDatabase };
