<template>
    <div class="mt-20 max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
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
            <button type="submit" class="w-full bg-[#A59482] text-white py-2 rounded hover:bg-[#8B7765] transition">
                {{ isRegistering ? "Register" : "Login" }}
            </button>
        </form>

        <p class="text-center mt-4 text-gray-600">
            {{ isRegistering ? "Already have an account?" : "Don't have an account?" }}
            <button @click="toggleMode" class="text-[#A59482] underline">
                {{ isRegistering ? "Login" : "Register" }}
            </button>
        </p>

        <p v-if="message" :class="messageType" class="text-center mt-2">{{ message }}</p>
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
            messageType: "text-red-500", // 預設錯誤訊息為紅色
        };
    },
    methods: {
        toggleMode() {
            this.isRegistering = !this.isRegistering;
            this.message = "";
        },
        async handleSubmit() {
            this.isRegistering ? await this.register() : await this.login();
        },
        async register() {
            if (!this.email || !this.password) {
                this.setMessage("Please fill in all fields.", "error");
                return;
            }

            try {
                const response = await fetch("http://localhost:3001/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: this.email, password: this.password })
                });

                const data = await response.json();
                if (response.ok) {
                    this.setMessage("Registration successful! Please log in.", "success");
                    this.isRegistering = false;
                } else {
                    this.setMessage(data.message || "Registration failed.", "error");
                }
            } catch (error) {
                console.error("Registration error:", error);
                this.setMessage("Server error, please try again later.", "error");
            }
        },
        async login() {
            if (!this.email || !this.password) {
                this.setMessage("Please fill in all fields.", "error");
                return;
            }

            try {
                const response = await fetch("http://localhost:3001/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: this.email, password: this.password })
                });

                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("account_id", data.userId); // 儲存 userId，未來用於訂單管理
                    this.setMessage("Login successful!", "success");
                    this.$emit("login-success");
                    this.$router.push("/home");
                } else {
                    this.setMessage(data.message || "Login failed.", "error");
                }
            } catch (error) {
                console.error("Login error:", error);
                this.setMessage("Server error, please try again later.", "error");
            }
        },
        setMessage(msg, type) {
            this.message = msg;
            this.messageType = type === "success" ? "text-green-500" : "text-red-500";
        }
    }
};
</script>