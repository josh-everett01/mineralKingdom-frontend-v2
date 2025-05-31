<template>
  <nav
    class="bg-gray-800 text-white w-full px-6 py-4 flex items-center justify-between"
  >
    <!-- Left nav links -->
    <div class="flex items-center space-x-4">
      <router-link to="/" class="hover:underline">Home</router-link>
      <router-link
        v-if="auth.isAuthenticated"
        to="/dashboard"
        class="hover:underline"
      >
        My Dashboard
      </router-link>
    </div>

    <!-- Centered logo -->
    <div class="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold">
      <router-link to="/" class="hover:underline">Mineral Kingdom</router-link>
    </div>

    <!-- Right side actions -->
    <div class="flex items-center space-x-4">
      <template v-if="auth.isAuthenticated">
        <span class="text-sm text-gray-300">
          {{ auth.userProfile?.displayName || "Logged in" }}
        </span>
        <router-link
          to="/profile"
          class="text-sm text-blue-300 hover:text-blue-400 hover:underline"
        >
          Edit Profile
        </router-link>
        <button
          @click="handleLogout"
          class="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
        >
          Logout
        </button>
      </template>
      <template v-else>
        <router-link to="/login" class="text-sm text-blue-300 hover:underline">
          Login
        </router-link>
        <router-link
          to="/register"
          class="text-sm text-blue-300 hover:underline"
        >
          Register
        </router-link>
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
  router.push('/')
}
</script>

<style scoped>
/* Ensure navbar spans top */
nav {
  position: relative;
}
</style>
