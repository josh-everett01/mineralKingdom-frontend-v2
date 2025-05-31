<!-- views/UserProfileView.vue -->
<template>
  <div class="max-w-xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4">Your Profile</h2>
    <div class="max-w-xl mx-auto p-6" v-if="!loading">
      <form @submit.prevent="handleSave" class="space-y-4">
        <div v-for="field in fields" :key="field.name">
          <label :for="field.name" class="block">{{ field.label }}</label>
          <input
            v-model="form[field.name]"
            :type="field.type"
            :id="field.name"
            class="w-full p-2 border rounded"
          />
        </div>
        <button class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const toast = useToast()

const form = reactive({})
const loading = ref(true)

const fields = [
  { name: 'firstName', label: 'First Name', type: 'text' },
  { name: 'lastName', label: 'Last Name', type: 'text' },
  { name: 'displayName', label: 'Display Name', type: 'text' },
  { name: 'phoneNumber', label: 'Phone Number', type: 'tel' },
  { name: 'streetAddress', label: 'Street Address', type: 'text' },
  { name: 'city', label: 'City', type: 'text' },
  { name: 'state', label: 'State', type: 'text' },
  { name: 'postalCode', label: 'Postal Code', type: 'text' },
  { name: 'country', label: 'Country', type: 'text' },
]

onMounted(async () => {
  try {
    await auth.fetchUserProfile()
    Object.assign(form, auth.userProfile)
  } catch (err) {
    console.error('Failed to load profile', err)
  } finally {
    loading.value = false
  }
})

const handleSave = async () => {
  try {
    await auth.updateUserProfile(form)
    toast.success('Profile updated! Redirecting to dashboard...')
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
  } catch {
    toast.error('Something went wrong.')
  }
}
</script>
