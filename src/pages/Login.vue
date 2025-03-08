<template>
    <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
        <h1 class="text-2xl font-semibold text-center">{{ isRegistering ? "Register" : "Login" }}</h1>
        <form @submit.prevent="handleSubmit" class="mt-4">
            <div class="mb-4">
                <label class="block">Email</label>
                <input v-model="email" type="email" class="w-full px-3 py-2 border rounded" required />
            </div>
            <div class="mb-4">
                <label class="block">Password</label>
                <input v-model="password" type="password" class="w-full px-3 py-2 border rounded" required />
            </div>
            <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded">
                {{ isRegistering ? "Register" : "Login" }}
            </button>
        </form>
        <p class="text-center mt-4 text-gray-600">
            {{ isRegistering ? "Already have an account?" : "Don't have an account?" }}
            <button @click="toggleMode" class="text-blue-500 underline">
                {{ isRegistering ? "Login" : "Register" }}
            </button>
        </p>
        <p class="text-center text-red-500 mt-2">{{ message }}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                email: "",
                password: "",
                isRegistering: false,
                message: "",
            };
        },
        methods: {
            toggleMode() {
                this.isRegistering = !this.isRegistering;
                this.message = "";
            },
            async handleSubmit() {
                if (this.isRegistering) {
                await this.register();
                } else {
                await this.login();
                }
            },
            async register() {
                if (!this.email || !this.password) {
                this.message = "Please fill in all fields.";
                return;
                }
        
                try {
                const response = await fetch("http://localhost:3001/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                    email: this.email,
                    password: this.password,
                    }),
                });
        
                const data = await response.json();
                if (response.ok) {
                    this.message = "Registration successful! Please log in.";
                    this.isRegistering = false;
                } else {
                    this.message = data.message || "Registration failed.";
                }
                } catch (error) {
                this.message = "Server error, please try again later.";
                }
            },
            async login() {
                if (!this.email || !this.password) {
                this.message = "Please fill in all fields.";
                return;
                }
        
                try {
                const response = await fetch("http://localhost:3001/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                    email: this.email,
                    password: this.password,
                    }),
                });
        
                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem("token", data.token);
                    this.$emit("login-success");
                    this.$router.push("/home");
                } else {
                    this.message = data.message || "Login failed.";
                }
                } catch (error) {
                this.message = "Server error, please try again later.";
                }
            },
        },
    };
</script>
