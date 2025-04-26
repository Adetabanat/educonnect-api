const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().collection("users").find();
        const users = await result.toArray();

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while fetching the users", error: err });
    }
};

const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection("users").findOne({ _id: userId });

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while fetching the user", error: err });
    }
};

const createUser = async (req, res) => {
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            role: req.body.role,
            address: req.body.address    
        };

        const response = await mongodb.getDatabase().collection("users").insertOne(user);
        if (response.acknowledged) {
            res.status(201).json({ message: "User created successfully" });
        } else {
            res.status(500).json({ message: "An error occurred while creating the user" });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred while creating the user", error: err });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);

        const updatedUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            role: req.body.role,
            address: req.body.address
        };

        const response = await mongodb.getDatabase().collection("users").updateOne(
            { _id: userId },
            { $set: updatedUser }
        );

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: "User updated successfully" });
        } else {
            res.status(404).json({ message: "No changes made, user may not exist or data is the same" });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred while updating the user", error: err });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection("users").deleteOne({ _id: userId });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred while deleting the user", error: err });
    }
};

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };
