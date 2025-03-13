<template>
  <div class="nav">
    <router-link to="/" exact custom v-slot="{ href, navigate, isActive }">
      <a :class="{ active: isActive }" :href="href" @click="navigate"> Home </a>
    </router-link>
    <router-link to="/about" custom v-slot="{ href, navigate, isActive }">
      <a :class="{ active: isActive }" :href="href" @click="navigate">
        About
      </a>
    </router-link>
    <router-link to="/todos" custom v-slot="{ href, navigate, isActive }">
      <a :class="{ active: isActive }" :href="href" @click="navigate"> Todo </a>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NavComponent",
};
</script>

<style scoped>
.nav {
  padding: 20px 0;
}
.active {
  color: rgba(92, 17, 161, 0.87);
}
</style>
z
