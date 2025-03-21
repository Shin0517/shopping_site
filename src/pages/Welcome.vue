<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-[#EAE5DE] p-6">
        <h1 class="text-4xl font-bold text-[#876D5A]">
            Welcome to OIIAI🐈
            <img src="https://images.squarespace-cdn.com/content/v1/663f738a89dc02694adb8670/ab586c91-6b0b-4791-aa5a-b60824f92094/OIIA-Website-loop.gif" alt="Animated GIF" class="w-100 h-100 ml-2" />
        </h1>
        <p class="text-gray-700 text-lg mt-2">Swing by our shop and take a look 🥴</p>
                
        <router-link to="/home">
            <button class="mt-16 px-6 py-3 bg-[#A59482] text-white text-lg rounded-lg shadow hover:bg-[#BBA78F]">
                Start Spinning!
            </button>
        </router-link>
    </div>
</template>
