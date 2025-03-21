<template>
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold">Our Products👇</h1>

        <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            class="mt-4 w-full p-2 border rounded-lg"
        />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div v-for="product in filteredProducts" :key="product.id" class="border p-4 rounded-lg shadow">
                <img :src="product.image_url || '/images/default.jpg'" alt="Product Image" class="w-full h-40 object-cover rounded-md" />
                <h2 class="text-xl font-semibold mt-2">{{ product.name }}</h2>
                <p class="text-gray-700">${{ product.price }}</p>
                <button @click="addToCart(product)" 
                    class="mt-2 px-4 py-2 bg-[#A59482] text-white rounded transition-opacity duration-300 opacity-100 hover:opacity-80" 
                >
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: "",
            isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
            products: []
        };
    },
    computed: {
        filteredProducts() {
            console.log("filtered products:", this.products);
            return this.products.filter(product =>
                product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    methods: {
        async fetchProducts() {
            try {
                const response = await fetch("http://localhost:3001/home");
                if (!response.ok) throw new Error("Failed to fetch products");
                this.products = await response.json();
                console.log("fetch products:", this.products);
            } catch (error) {
                console.error("fetching products error");
            }
        },
        addToCart(product) {
            if (!this.isLoggedIn) {
                this.$router.push("/login");
                return;
            }

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let existingProduct = cart.find(item => item.id === product.id);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            this.$emit("update-cart");
        }
    },
    mounted() {
        this.fetchProducts();
    }
};
</script>
