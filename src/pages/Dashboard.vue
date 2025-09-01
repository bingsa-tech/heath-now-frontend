<script setup lang="ts">
import { getCurrentUser, logout } from "../services/auth";
import api from "../services/api";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const router = useRouter();
const user = ref(getCurrentUser());
const me = ref<any>(null);
const error = ref("");
const loading = ref(true);

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    error.value = "Token manquant. Veuillez vous reconnecter.";
    loading.value = false;
    return;
  }
  try {
    const res = await fetch("https://health-now-gitspace.onrender.com/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Erreur lors de la récupération des données");
    }
    const data = await res.json();
    me.value = data.user;
  } catch (e: any) {
    error.value = e.message || "Non authentifié";
  } finally {
    loading.value = false;
  }
});


function onLogout() {
  logout();
  router.push("/login");
}
</script>

<template>
  <div class="d-flex align-items-center justify-content-center vh-100 bg-light">
    <div class="card shadow-sm p-4" style="width: 100%; max-width: 600px;">
      <div class="card-body">
        <h3 class="text-center mb-4">
          <i class="fas fa-tachometer-alt"></i> Tableau de bord
        </h3>

        <!-- Loader -->
        <div v-if="loading" class="text-center my-3">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Chargement...</span>
          </div>
        </div>

        <!-- Erreur -->
        <div v-if="error && !loading" class="alert alert-danger">
          ❌ {{ error }}
        </div>

        <!-- Infos utilisateur -->
        <div v-if="me && !loading" class="mb-3">
          <p>
            <i class="fas fa-user-circle"></i>
            Connecté en tant que
            <strong>{{ me.name }}</strong>
            <span class="badge bg-secondary ms-2">{{ me.role }}</span>
          </p>
          <p>
            <i class="fas fa-envelope"></i> {{ me.email }}
          </p>
          <p>
            <i class="fas fa-phone"></i> {{ me.telephone }}
          </p>
          <p>
            <i class="fas fa-city"></i> {{ me.ville }}
          </p>
          <p>
            <i class="fas fa-birthday-cake"></i> {{ me.age }} ans
          </p>
        </div>

        <!-- Bouton logout -->
        <div class="d-grid">
          <button @click="onLogout" class="btn btn-outline-danger">
            <i class="fas fa-sign-out-alt"></i> Déconnexion
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
