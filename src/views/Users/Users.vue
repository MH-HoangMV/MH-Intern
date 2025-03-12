<template>
  <div>
    <router-link to="/users/1">
      <a> User 1</a>
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "UsersPage",
};
</script>

<style scoped></style>
