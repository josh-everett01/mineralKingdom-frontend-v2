<template>
  <div class="dashboard p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-2">Welcome to Your Dashboard</h1>
    <p class="text-gray-600 mb-6">
      You are logged in as
      <strong>{{ auth.userProfile?.displayName || "Unknown user" }}</strong>
    </p>

    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">🛒 Recent Purchases</h2>
      <div class="bg-white p-4 rounded shadow">Coming soon...</div>
    </section>

    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">📈 Recent Bids</h2>
      <div class="bg-white p-4 rounded shadow">Coming soon...</div>
    </section>

    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">👀 Watching / Bidding In</h2>
      <div class="bg-white p-4 rounded shadow">
        <p class="text-sm text-gray-500 mb-2">
          Current auctions you're engaged with will appear here.
        </p>
        <ul class="list-disc list-inside space-y-2">
          <li v-for="auction in watchingAuctions" :key="auction.id">
            {{ auction.title }} — ends {{ auction.endsAt }}
          </li>
        </ul>
        <p v-if="!watchingAuctions?.length" class="text-gray-400 italic">
          Nothing here yet...
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

const logout = async () => {
  await auth.logout()
  router.push('/login')
}
</script>
