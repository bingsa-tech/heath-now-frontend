<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref<string | null>(null);
const loading = ref(false);

async function onLogin() {
  try {
    error.value = null;
    loading.value = true;

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!res.ok) {
      const errMsg = await res.json();
      throw new Error(errMsg.message || "Erreur lors de la connexion");
    }

    const data = await res.json();
    console.log("✅ Réponse login:", data);

    if (data.token) {
      localStorage.setItem("token", data.token);
      router.push("/dashboard"); // 🔀 redirection vers le dashboard
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
    <div class="card shadow-sm p-4" style="width: 100%; max-width: 400px;">
      <div class="card-body">
        <h3 class="text-center mb-4">
          <i class="fas fa-user-circle"></i> Connexion
        </h3>

        <!-- Erreur -->
        <div v-if="error" class="alert alert-danger">
          ❌ {{ error }}
        </div>

        <!-- Formulaire -->
        <form @submit.prevent="onLogin">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <div class="input-group">
              <span class="input-group-text">
                <i class="fas fa-envelope"></i>
              </span>
              <input
                v-model="email"
                type="email"
                class="form-control"
                required
                placeholder="exemple@mail.com"
              />
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Mot de passe</label>
            <div class="input-group">
              <span class="input-group-text">
                <i class="fas fa-lock"></i>
              </span>
              <input
                v-model="password"
                type="password"
                class="form-control"
                required
                placeholder="********"
              />
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary w-100"
            :disabled="loading"
          >
            <i class="fas fa-sign-in-alt"></i>
            {{ loading ? "Connexion..." : "Se connecter" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
