const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
    console.log("Received order data:", req.body);
    const { account_id, total_price, cart } = req.body;

    if (!account_id || !cart || cart.length === 0) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const [orderId] = await db("orders").insert({
            account_id: parseInt(account_id) || 0,
            total_price: parseFloat(total_price) || 0,
            status: "pending"
        });

        const orderItems = cart.map(item => ({
            order_id: orderId,
            product_id: parseInt(item.product_id) || 0,
            quantity: parseInt(item.quantity) || 1,
            price: parseFloat(item.price) || 0
        }));

        await db("order_items").insert(orderItems);
        res.json({ message: "Order created successfully", orderId });
    } catch (error) {
        console.error("Order creation failed:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;