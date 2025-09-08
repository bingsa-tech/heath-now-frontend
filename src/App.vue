<template>
  <div>
    <!-- HEADER -->
    <header class="bg-primary text-white p-3 shadow-sm">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <!-- Bouton Toggle Sidebar -->
        <button
          class="btn btn-outline-light me-3 d-md-none"
          @click="toggleSidebar"
        >
          <i class="fas fa-bars"></i>
        </button>

        <h1 class="h4 mb-0">
          <i class="fas fa-hospital"></i> Health-Now
        </h1>
        <nav class="d-flex gap-3">
          <router-link to="/dashboard" class="text-white text-decoration-none">Dashboard</router-link>
          <router-link to="/login" class="text-white text-decoration-none">Login</router-link>
          <router-link to="/register" class="text-white text-decoration-none">Register</router-link>
          <router-link to="/chat" class="text-white text-decoration-none">Chat</router-link>
        </nav>
      </div>
    </header>

    <!-- LAYOUT PRINCIPAL -->
    <div class="container-fluid my-4">
      <div class="row">
        <!-- ✅ SIDEBAR -->
        <aside
          class="col-md-3 col-12 mb-4 sidebar bg-light p-3 shadow-sm"
          :class="{ 'd-none': !showSidebar && isMobile }"
        >
          <!-- Bloc Services -->
          <div class="card shadow-sm mb-4">
            <div class="card-header bg-primary text-white">
              <i class="fas fa-stethoscope"></i> Nos Services
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item" v-for="(service, i) in services" :key="i">
                <i class="fas fa-check-circle text-success me-2"></i>{{ service }}
              </li>
            </ul>
          </div>

          <!-- Bloc Géolocalisation -->
          <div class="card shadow-sm">
            <div class="card-header bg-primary text-white">
              <i class="fas fa-map-marker-alt"></i> Nous trouver
            </div>
            <div class="card-body p-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345094345!2d144.95373531531848!3d-37.81627974201352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f2a4f9%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australie!5e0!3m2!1sfr!2sfr!4v1677600000000!5m2!1sfr!2sfr"
                width="100%"
                height="200"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </aside>

        <!-- ✅ CONTENU PRINCIPAL -->
        <main class="col-md-9 col-12">
          <!-- Vue dynamique -->
          <router-view />

          <!-- Section Partenaires -->
          <section class="my-5">
            <h2 class="text-center mb-4">
              <i class="fas fa-handshake"></i> Nos Partenaires
            </h2>
            <div class="row g-4">
              <div class="col-md-4" v-for="(partner, i) in partners" :key="i">
                <div class="card shadow-sm h-100 text-center p-3">
                  <i class="fas fa-building fa-3x text-primary mb-3"></i>
                  <h5>{{ partner.name }}</h5>
                  <p class="text-muted">{{ partner.description }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Section Témoignages -->
          <section class="my-5">
            <h2 class="text-center mb-4">
              <i class="fas fa-comment-dots"></i> Témoignages Clients
            </h2>
            <div class="row g-4">
              <div class="col-md-4" v-for="(testimonial, i) in testimonials" :key="i">
                <div class="card shadow-sm h-100 p-3">
                  <p class="fst-italic">"{{ testimonial.text }}"</p>
                  <div class="d-flex align-items-center mt-3">
                    <i class="fas fa-user-circle fa-2x text-secondary me-2"></i>
                    <div>
                      <strong>{{ testimonial.name }}</strong><br />
                      <small class="text-muted">{{ testimonial.role }}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>

    <!-- FOOTER -->
    <footer class="bg-dark text-white text-center py-3 mt-4">
      <div class="container">
        <p class="mb-0">
          &copy; {{ new Date().getFullYear() }} Health-Now. Tous droits réservés bingsa.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// ✅ Données
const services = ref([
  "Prise en charge des personnes agées",
  "Suivi contidien personnes agées",
  "Consultations en ligne",
  "Suivi médical personnalisé",
  "Urgences 24/7",
  "Analyse et diagnostic rapide",
]);

const partners = ref([
  { name: "Clinique ABC", description: "Spécialiste en cardiologie." },
  { name: "Hôpital XYZ", description: "Partenaire en soins intensifs." },
  { name: "PharmaPlus", description: "Fournisseur de médicaments." },
]);

const testimonials = ref([
  { name: "Pascale M", role: "Patiente", text: "Service impeccable et médecins à l’écoute !" },
  { name: "Dr. Alima", role: "Médecin partenaire", text: "Une collaboration fluide et efficace." },
  { name: "Teukeu JB", role: "Client", text: "Une expérience très positive, je recommanderai en permanence !" },
]);

// ✅ Toggle Sidebar
const showSidebar = ref(true);
const isMobile = ref(false);

function toggleSidebar() {
  showSidebar.value = !showSidebar.value;
}

// ✅ Détection mobile (petits écrans)
onMounted(() => {
  const checkScreen = () => {
    isMobile.value = window.innerWidth < 768;
    if (isMobile.value) {
      showSidebar.value = false; // cache par défaut en mobile
    } else {
      showSidebar.value = true; // montre par défaut en desktop
    }
  };
  checkScreen();
  window.addEventListener("resize", checkScreen);
});
</script>

<style scoped>
main {
  min-height: 70vh;
}
.card {
  border-radius: 10px;
}
.sidebar {
  transition: all 0.3s ease-in-out;
}
.bg-primary {
  background-color: #2ecc71 !important; /* ton vert personnalisé */
}

.bg-dark {
  background-color: #2c3e50 !important; /* bleu foncé */
}
</style>
