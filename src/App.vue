<template>
    <div>
        <nav class="bg-white shadow-md p-4 flex justify-between items-center">
            <router-link to="/" class="text-2xl font-bold text-blue-600">MyShop</router-link>
            <div class="flex items-center space-x-4">
                <router-link to="/" class="nav-link">Welcome</router-link>
                <router-link to="/home" class="nav-link">Shop</router-link>
                <router-link v-if="!isLoggedIn" to="/login" class="nav-link">Login</router-link>
                <div class="relative">
                    <router-link v-if="isLoggedIn" to="/cart" class="nav-link flex items-center">
                    Cart
                    <span v-if="cartCount > 0" class="cart-badge">{{ cartCountDisplay }}</span>
                    </router-link>
                </div>
                <button v-if="isLoggedIn" @click="logout" class="nav-link text-red-500">Sign Out</button>
            </div>
        </nav>

        <main class="p-4">
            <router-view @login-success="handleLogin" @update-cart="updateCartCount"></router-view>
        </main>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
                cartCount: 0,
            };
        },
        computed: {
            cartCountDisplay() {
                return this.cartCount > 99 ? "99+" : this.cartCount;
            }
        },
        methods: {
            handleLogin() {
                this.isLoggedIn = true;
                localStorage.setItem("isLoggedIn", "true");
                this.$router.push("/home");
            },
            logout() {
                this.isLoggedIn = false;
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("cart");
                this.cartCount = 0;
                this.$router.push("/");
            },
            updateCartCount() {
                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                this.cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            },
        },
        mounted() {
        this.updateCartCount();
        }
    };
</script>

<style>
    .nav-link {
        @apply text-gray-700 hover:text-blue-500 transition font-medium;
    }
    .cart-badge {
        @apply absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full;
    }
</style>
