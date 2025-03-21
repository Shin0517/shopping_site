還有這個
<template>
    <div class="mt-20 container mx-auto p-4">
    <h1 class="text-3xl font-bold">Shopping Cart</h1>

    <div v-if="cart.length">
    <div v-for="item in cart" :key="item.id" class="flex items-center justify-between p-4 border-b bg-white rounded-md shadow-md">
        <img :src="item.image_url" alt="Product Image" class="w-16 h-16 object-cover rounded-md">
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

    <div class="text-right mt-6 relative">
    <h2 class="text-2xl font-bold">Total: ${{ calculateTotal() }}</h2>

    <div v-if="parseFloat(calculateTotal()) < 10000" class="mt-2">
        <img
            src="https://media.tenor.com/yIWyg_2g9EgAAAAM/feyresmaid.gif"
            alt="Animated GIF"
            class="w-64 h-auto inline-block"
        />
    </div>

    <button
        @click="checkout"
        class="mt-4 px-4 py-2 bg-[#A59482] text-white rounded absolute transition-all duration-300 whitespace-nowrap"
        :style="{ top: buttonPosition.top + 'px', left: buttonPosition.left + 'px' }"
        @mouseover="moveButton"
    >
        💰 Give me money 💰
    </button>
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
                buttonPosition: { top: 275, left: 1400 }, 
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
                if (parseFloat(this.calculateTotal()) < 10000) {
                    alert("You poor!");
                    return;
                }
                this.$router.push("/checkout");
            },
            moveButton() {
            if (parseFloat(this.calculateTotal()) < 10000) {
                this.buttonPosition.top = Math.random() * window.innerHeight * 0.8;
                this.buttonPosition.left = Math.random() * window.innerWidth * 0.8;
            }
        },
        },
        mounted() {
            this.loadCart();
        }
    };
</script>