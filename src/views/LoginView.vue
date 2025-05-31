<template>
  <div class="login-view">
    <h2 class="text-2xl font-bold mb-4">Login</h2>
    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label for="email" class="block">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          class="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label for="password" class="block">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          class="w-full p-2 border rounded"
        />
      </div>

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Login
      </button>
    </form>

    <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const authStore = useAuthStore()

const handleLogin = async () => {
  console.log('Logging in with', email.value, password.value) // ✅ Debug
  error.value = ''
  try {
    await authStore.login(email.value, password.value)
    await authStore.fetchUserProfile()
    router.push('/dashboard')
  } catch (err) {
    console.error('Login error:', err) // ✅ Log the full error
    error.value = err.response?.data?.error || 'Login failed'
  }
}
</script>


<style scoped>
.login-view {
  max-width: 400px;
  margin: 2rem auto;
}
</style>
