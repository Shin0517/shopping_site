<template>
    <div class="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded">
    <h1 class="text-2xl font-semibold text-center">Checkout</h1>
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
            <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded mt-4">Place Order</button>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: "",
                address: "",
                paymentMethod: "Credit Card",
                cart: [],
            };
        },
        methods: {
            loadCart() {
                this.cart = JSON.parse(localStorage.getItem("cart")) || [];
            },
            calculateTotal() {
                return this.cart
                .reduce((total, item) => total + parseFloat(item.price.replace("$", "")) * item.quantity, 0)
                .toFixed(2);
            },
            processOrder() {
                if (!this.name || !this.address) {
                alert("Please fill in all fields.");
                return;
                }
                alert(`Order placed successfully for ${this.name}!`);
                localStorage.removeItem("cart");
                this.$router.push("/"); 
            },
        },
        mounted() {
            this.loadCart();
        },
    };
</script>
