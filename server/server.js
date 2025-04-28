const express = require("express");
const db = require("./db");
const cors = require("cors");
require("dotenv").config();

const orderRoutes = require("./routes/orders"); 
const authRoutes = require("./routes/auth");  
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes); 
// app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 3001;

app.get("/home", async (req, res) => {
    try {
        const products = await db("products").select("*");
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});