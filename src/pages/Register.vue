<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loading = ref(false);
const error = ref<string | null>(null);

const form = ref({
  name: "",
  email: "",
  password: "",
  role: "patient",
  telephone: "",
  ville: "",
  age: null,
});

async function handleRegister() {
  try {
    error.value = null;
    loading.value = true;

    const res = await fetch("health-now-gitspace.onrender.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.value),
    });

    if (!res.ok) {
      const errMsg = await res.json();
      throw new Error(errMsg.message || "Erreur lors de l'inscription");
    }

    const data = await res.json();
    console.log("✅ Réponse inscription:", data);

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } else {
      throw new Error("Token non reçu !");
    }
  } catch (e: any) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="d-flex align-items-center justify-content-center vh-100 bg-light">
    <div class="card shadow-sm p-4" style="width: 100%; max-width: 500px;">
      <div class="card-body">
        <h3 class="text-center mb-4">
          <i class="fas fa-user-plus"></i> Inscription
        </h3>

        <!-- Erreur -->
        <div v-if="error" class="alert alert-danger">
          ❌ {{ error }}
        </div>

        <form @submit.prevent="handleRegister">
          <!-- Nom -->
          <div class="mb-3">
            <label class="form-label">Nom</label>
            <div class="input-group">
              <span class="input-group-text"><i class="fas fa-user"></i></span>
              <input v-model="form.name" type="text" class="form-control" required />
            </div>
          </div>

          <!-- Email -->
          <div class="mb-3">
            <label class="form-label">Email</label>
            <div class="input-group">
              <span class="input-group-text"><i class="fas fa-envelope"></i></span>
              <input v-model="form.email" type="email" class="form-control" required />
            </div>
          </div>

          <!-- Mot de passe -->
          <div class="mb-3">
            <label class="form-label">Mot de passe</label>
            <div class="input-group">
              <span class="input-group-text"><i class="fas fa-lock"></i></span>
              <input v-model="form.password" type="password" class="form-control" required />
            </div>
          </div>

          <!-- Rôle -->
          <div class="mb-3">
            <label class="form-label">Rôle</label>
            <div class="input-group">
              <span class="input-group-text"><i class="fas fa-user-tag"></i></span>
              <select v-model="form.role" class="form-select">
                <option value="patient">Patient</option>
                <option value="doctor">Médecin</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <!-- Téléphone -->
          <div class="mb-3">
            <label class="form-label">Téléphone</label>
            <div class="input-group">
              <span class="input-group-text"><i class="fas fa-phone"></i></span>
              <input v-model="form.telephone" type="text" class="form-control" required />
            </div>
          </div>

          <!-- Ville -->
          <div class="mb-3">
            <label class="form-label">Ville</label>
            <div class="input-group">
              <span class="input-group-text"><i class="fas fa-city"></i></span>
              <input v-model="form.ville" type="text" class="form-control" required />
            </div>
          </div>

          <!-- Âge -->
          <div class="mb-3">
            <label class="form-label">Âge</label>
            <div class="input-group">
              <span class="input-group-text"><i class="fas fa-birthday-cake"></i></span>
              <input v-model.number="form.age" type="number" class="form-control" min="0" required />
            </div>
          </div>

          <!-- Bouton -->
          <button type="submit" class="btn btn-success w-100" :disabled="loading">
            <i class="fas fa-user-plus"></i>
            {{ loading ? "Inscription..." : "S'inscrire" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
