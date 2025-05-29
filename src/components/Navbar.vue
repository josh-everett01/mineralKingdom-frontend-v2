<template>
  <nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <router-link to="/" class="text-xl font-bold">Mineral Kingdom</router-link>

    <div class="flex items-center space-x-4">
      <template v-if="auth.isAuthenticated">
        <span class="text-sm">Logged in</span>
        <button @click="handleLogout" class="bg-red-500 px-3 py-1 rounded">
          Logout
        </button>
      </template>
      <template v-else>
        <router-link to="/login" class="hover:underline">Login</router-link>
        <router-link to="/register" class="hover:underline"
          >Register</router-link
        >
      </template>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  await auth.logout()
  router.push('/home')
}
</script>

<style scoped>
nav a {
  color: white;
  text-decoration: none;
}
nav a:hover {
  text-decoration: underline;
}
</style>
