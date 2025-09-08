<script setup lang="ts">
import { ref } from "vue";
import api from "../services/api";

const messages = ref<{ sender: string; text: string }[]>([]);
const input = ref("");

async function sendMessage() {
  if (!input.value.trim()) return;

  messages.value.push({ sender: "user", text: input.value });

  try {
    const { data } = await api.post("/chat", { message: input.value });
    messages.value.push({ sender: "bot", text: data.reply });
  } catch {
    messages.value.push({ sender: "bot", text: "❌ Erreur du chatbot." });
  }

  input.value = "";
}
</script>

<template>
  <div class="chat-container">
    <div class="messages">
      <div
        v-for="(m, i) in messages"
        :key="i"
        :class="m.sender === 'user' ? 'user-msg' : 'bot-msg'"
      >
        <strong>{{ m.sender === "user" ? "👤" : "🤖" }}</strong> {{ m.text }}
      </div>
    </div>

    <div class="input-area">
      <input v-model="input" @keyup.enter="sendMessage" placeholder="Pose ta question..." />
      <button @click="sendMessage">Envoyer</button>
    </div>
  </div>
</template>

<style scoped>
.chat-container { max-width: 500px; margin: auto; border: 1px solid #ccc; padding: 10px; border-radius: 10px; }
.messages { max-height: 300px; overflow-y: auto; margin-bottom: 10px; }
.user-msg { text-align: right; color: blue; }
.bot-msg { text-align: left; color: green; }
.input-area { display: flex; gap: 10px; }
</style>
