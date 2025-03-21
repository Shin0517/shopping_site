<template>
    <div class="mt-20 max-w-lg mx-auto p-6 bg-white shadow-md rounded">
    <h1 class="text-2xl font-semibold text-center flex items-center justify-center">
        <img src="https://i.pinimg.com/originals/88/14/9b/88149b0400750578f4d07d9bc3fb0fee.gif" alt="Animated GIF" class="w-12 h-12 ml-2" />
        - Checkout -
        <img src="https://i.pinimg.com/originals/88/14/9b/88149b0400750578f4d07d9bc3fb0fee.gif" alt="Animated GIF" class="w-12 h-12 ml-2" />
    </h1>
        <form @submit.prevent="processOrder" class="mt-4">
            <div class="mb-4">
                <label class="block">Full Name</label>
                <input v-model="name" type="text" class="w-full px-3 py-2 border rounded" required />
            </div>
            <div class="mb-4">
                <label class="block">Address</label>
                <input v-model="address" type="text" class="w-full px-3 py-2 border rounded" required />
            </div>
            <div class="mb-4">
                <label class="block">Payment Method</label>
                <select v-model="paymentMethod" class="w-full px-3 py-2 border rounded">
                    <option>Credit Card</option>
                    <option>PayPal</option>
                </select>
            </div>
            <h2 class="text-xl font-bold">Total: ${{ calculateTotal() }}</h2>
            <button type="submit" class="w-full bg-[#A59482] text-white py-2 rounded mt-4">Place Order</button>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            accountId: localStorage.getItem("account_id") || null,
            cart: [],
        };
    },
    methods: {
        loadCart() {
            this.cart = JSON.parse(localStorage.getItem("cart")) || [];
        },
        calculateTotal() {
            return this.cart
                .reduce((total, item) => {
                    const price = parseFloat(item.price.replace("$", ""));
                    return total + price * item.quantity;
                }, 0)
                .toFixed(2);
        },
        async processOrder() {
            if (!this.accountId) {
                alert("User not logged in!");
                return;
            }

            const formattedCart = this.cart.map(item => ({
                product_id: parseInt(item.id) || 0,
                quantity: parseInt(item.quantity) || 1,
                price: parseFloat(item.price.replace("$", "")) || 0
            }));

            const orderData = {
                account_id: parseInt(this.accountId) || 0,
                total_price: parseFloat(this.calculateTotal()) || 0,
                cart: formattedCart
            };

            console.log("Sending formatted order data:", orderData);

            try {
                const res = await fetch("http://localhost:3001/api/orders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(orderData)
                });

                const result = await res.json();
                console.log("Server response:", result);

                if (res.ok) {
                    alert("Order placed successfully!");
                    localStorage.removeItem("cart");
                    this.$router.push("/");
                } else {
                    alert(result.message || "Order failed.");
                }
            } catch (error) {
                console.error("Order error:", error);
                alert("Server error, please try again later.");
            }
        }
    },
    mounted() {
        this.loadCart();
    },
};
</script>
