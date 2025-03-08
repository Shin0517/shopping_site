<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 class="text-4xl font-bold text-blue-600">Welcome to MyShop</h1>
      <p class="text-gray-700 text-lg mt-2">Discover the best products at unbeatable prices!</p>
      
      <img src="..\assets\images\5e7b2bb5-f44b-4ab6-8384-2e56c1d9f478.png" alt="Shop Banner" class="mt-6 w-3/4 max-w-lg rounded-lg shadow-lg" />
  
      <router-link to="/home">
        <button class="mt-6 px-6 py-3 bg-blue-500 text-white text-lg rounded-lg shadow hover:bg-blue-600">
          Start Shopping!
        </button>
      </router-link>
    </div>
  </template>
  