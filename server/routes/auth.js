const express = require("express");
const router = express.Router();
const db = require("../db"); 
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        console.log("Received request:", { email });

        let user = await db("users").where({ email }).first();
        if (!user) {
            const [userId] = await db("users").insert({ email });
            user = { id: userId, email };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed password:", hashedPassword);

        await db("accounts").insert({ user_id: user.id, password_hash: hashedPassword });
        console.log("User registered successfully:", user.id);

        res.json({ message: "Registration successful" });
    } catch (error) {
        console.error("Registration error:", error.message);
        res.status(500).json({ error: "Server error, please try again later." });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        console.log("Login attempt:", { email });

        const user = await db("users").where({ email }).first();
        if (!user) {
            console.log("User not found:", email);
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const account = await db("accounts").where({ user_id: user.id }).first();
        if (!account) {
            console.log("Account not found for user:", user.id);
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, account.password_hash);
        if (!isPasswordValid) {
            console.log("Password mismatch for user:", user.id);
            return res.status(401).json({ message: "Invalid email or password" });
        }

        console.log("Login successful:", user.id);
        res.json({ userId: user.id });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Server error, please try again later." });
    }
});

module.exports = router;
