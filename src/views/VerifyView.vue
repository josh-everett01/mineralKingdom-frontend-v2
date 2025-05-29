<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const success = ref(false)
const message = ref('')
const error = ref('')

onMounted(async () => {
  const token = route.query.token
  if (!token) {
    loading.value = false
    error.value = 'No verification token found in the URL.'
    return
  }

  try {
    const res = await axios.get(`http://localhost:5177/auth/verify?token=${token}`)
    success.value = true
    message.value = res.data.message || 'Email verified successfully.'

    // ⏳ Redirect after 3 seconds
    setTimeout(() => {
      router.push('/login')
    }, 3000)
  } catch (err) {
    error.value = err.response?.data?.error || 'Verification failed.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="verify-container">
    <div v-if="loading">Verifying your email...</div>
    <div v-else-if="success">{{ message }}</div>
    <div v-else-if="error">{{ error }}</div>
  </div>
</template>

<style scoped>
.verify-container {
  margin-top: 100px;
  text-align: center;
  font-size: 1.2rem;
}
</style>

