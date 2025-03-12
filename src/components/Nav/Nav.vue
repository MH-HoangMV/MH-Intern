<template>
  <section class="nav-container">
    <div class="nav">
      <router-link to="/" exact custom v-slot="{ href, navigate, isActive }">
        <a :class="{ active: isActive }" :href="href" @click="navigate">
          Home
        </a>
      </router-link>
      <router-link to="/about" custom v-slot="{ href, navigate, isActive }">
        <a :class="{ active: isActive }" :href="href" @click="navigate">
          About
        </a>
      </router-link>
      <router-link to="/todos" custom v-slot="{ href, navigate, isActive }">
        <a :class="{ active: isActive }" :href="href" @click="navigate">
          Todo
        </a>
      </router-link>
      <router-link to="/users" custom v-slot="{ href, navigate, isActive }">
        <a :class="{ active: isActive }" :href="href" @click="navigate">
          Users</a
        >
      </router-link>
      <router-link to="/profile" custom v-slot="{ href, navigate, isActive }">
        <a :class="{ active: isActive }" :href="href" @click="navigate">
          Profile</a
        >
      </router-link>
    </div>
    <div class="nav-action">
      <router-link
        v-if="!isAccess"
        to="/login"
        custom
        v-slot="{ href, navigate, isActive }"
      >
        <a :class="{ active: isActive }" :href="href" @click="navigate">
          Login
        </a>
      </router-link>
      <span v-else @click="handleLogout">Logout</span>
    </div>
  </section>
</template>

<script>
export default {
  name: "NavComponent",
  data() {
    return {
      isAccess: localStorage.getItem("access"),
    };
  },
  computed: {},
  mounted() {},
  methods: {
    handleLogout() {
      localStorage.removeItem("access");
      return this.$router.go(0);
    },
  },
};
</script>

<style scoped>
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav {
  padding: 20px 0;
  display: flex;
  gap: 20px;
}
.active {
  color: rgba(92, 17, 161, 0.87);
}
</style>
z
