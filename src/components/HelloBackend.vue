<!-- frontend/src/components/HelloBackend.vue -->
<template>
  <div>
    <h2>Message reçu du backend by sam 🚀</h2>
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import api from "../services/api"

const message = ref("")

onMounted(async () => {
  const res = await api.get("/hello")
  message.value = res.data.message
})
</script>
