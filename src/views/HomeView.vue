<template>
  <div class="home-view text-center p-8">
    <h1 class="text-3xl font-bold mb-4">🪨 Welcome to Mineral Kingdom</h1>
    <p class="text-lg mb-6">
      Discover unique minerals, crystals, and fossils from around the world.
    </p>
    <router-link to="/register" class="text-blue-500 hover:underline mr-4"
      >Register</router-link
    ><br />
    <router-link to="/login" class="text-blue-500 hover:underline"
      >Login</router-link
    >
  </div>
</template>

<script setup>
</script>

<style scoped>
.home-view {
  max-width: 700px;
  margin: auto;
}
</style>
