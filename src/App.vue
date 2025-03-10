<template>
  <div id="app">
    <HeaderComponent />
    <TodoList />
    <FooterComponent><template #footer>Footer</template></FooterComponent>
  </div>
</template>

<script>
import HeaderComponent from "./components/Header/Header.vue";
import FooterComponent from "./components/Footer/Footer.vue";

import TodoList from "./components/Todos/TodoList.vue";

export default {
  name: "App",
  components: {
    HeaderComponent,
    TodoList,
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
</style>
