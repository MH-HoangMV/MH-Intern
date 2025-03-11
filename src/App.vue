<template>
  <div id="app">
    <HeaderComponent />
    <div class="container">
      <NavComponent />
      <router-view></router-view>
    </div>

    <FooterComponent><template #footer>Footer</template></FooterComponent>
  </div>
</template>

<script>
import HeaderComponent from "./components/Header/Header.vue";
import FooterComponent from "./components/Footer/Footer.vue";
import NavComponent from "./components/Nav/Nav.vue";

export default {
  name: "App",
  components: {
    NavComponent,
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style>
@import "./assets/css/reset.css";
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");
#app {
  font-family: Inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #3f444a;
}
.container {
  width: 640px;
  max-width: calc(100% - 32px);
  height: 769px;
  margin: 0 auto;
}
</style>
