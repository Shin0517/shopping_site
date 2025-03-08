<template>
    <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold">Shopping Cart</h1>

    <div v-if="cart.length">
    <div v-for="item in cart" :key="item.id" class="flex items-center justify-between p-4 border-b bg-white rounded-md shadow-md">
        <img :src="item.image" alt="Product Image" class="w-16 h-16 object-cover rounded-md">
        <span class="text-lg font-medium">{{ item.name }}</span>
        <span class="text-gray-700">{{ item.price }}</span>
        <div class="flex items-center">
            <button @click="updateQuantity(item.id, -1)" class="px-2 py-1 bg-gray-300 rounded">-</button>
            <span class="px-3">{{ item.quantity }}</span>
            <button @click="updateQuantity(item.id, 1)" class="px-2 py-1 bg-gray-300 rounded">+</button>
        </div>
        <span class="font-bold">${{ calculateItemTotal(item) }}</span>
        <button @click="removeFromCart(item.id)" class="text-red-500">Remove</button>
    </div>

        <div class="text-right mt-6">
            <h2 class="text-2xl font-bold">Total: ${{ calculateTotal() }}</h2>
            <button @click="checkout" class="mt-4 px-4 py-2 bg-green-500 text-white rounded">Proceed to Checkout</button>
        </div>
    </div>

    <p v-else class="text-gray-500">Your cart is empty.</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cart: [],
        };
    },
    methods: {
        loadCart() {
            this.cart = JSON.parse(localStorage.getItem("cart")) || [];
        },
        updateQuantity(id, change) {
            let item = this.cart.find(product => product.id === id);
            if (!item) return;

            item.quantity += change;
            if (item.quantity < 1) {
                this.removeFromCart(id);
            } else {
                localStorage.setItem("cart", JSON.stringify(this.cart));
            }
        },
        removeFromCart(id) {
            this.cart = this.cart.filter(item => item.id !== id);
            localStorage.setItem("cart", JSON.stringify(this.cart));
        },
        calculateItemTotal(item) {
            return (parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2);
        },
        calculateTotal() {
            return this.cart
            .reduce((total, item) => total + parseFloat(this.calculateItemTotal(item)), 0)
            .toFixed(2);
        },
        checkout() {
            if (this.cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        this.$router.push("/checkout");
        },
    },
    mounted() {
        this.loadCart();
    }
};
</script>
  