<template>
  <div class="register-view">
    <h2 class="text-2xl font-bold mb-4">Register</h2>
    <form @submit.prevent="handleRegister" class="space-y-4">
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

      <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded">
        Register
      </button>
    </form>

    <p v-if="message" class="text-green-600 mt-4">{{ message }}</p>
    <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const password = ref('')
const message = ref('')
const error = ref('')

const handleRegister = async () => {
  message.value = ''
  error.value = ''
  try {
    await axios.post('http://localhost:5177/auth/register', {
      email: email.value,
      password: password.value,
    })

    message.value =
      'Registration successful! Please check your email to verify your account.'
    email.value = ''
    password.value = ''
  } catch (err) {
    error.value = err.response?.data?.error || 'Registration failed'
  }
}
</script>

<style scoped>
.register-view {
  max-width: 400px;
  margin: 2rem auto;
}
</style>