<template>
  <footer class="footer">
    <slot name="footer"></slot>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
.footer {
  font-size: 2.5rem;
  padding: 20px;
  text-align: center;
}
</style>
