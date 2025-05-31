<template>
  <div class="text-center p-8 max-w-3xl mx-auto">
    <h1 class="text-4xl font-bold mb-4">🪨 Welcome to Mineral Kingdom</h1>
    <p class="text-gray-600 mb-6">
      Discover unique minerals, crystals, and fossils from around the world.
    </p>

    <div v-if="auth.isAuthenticated" class="text-blue-600">
      You're logged in. Go to your
      <router-link to="/dashboard" class="underline">dashboard</router-link>.
    </div>

    <div v-else class="flex justify-center gap-4 mt-4">
      <router-link
        to="/register"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Register
      </router-link>
      <router-link
        to="/login"
        class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Login
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
const auth = useAuthStore()
</script>



<style scoped>
.home-view {
  max-width: 700px;
  margin: auto;
}
</style>
