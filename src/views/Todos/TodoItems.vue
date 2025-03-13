<template>
  <ul class="list-items" v-if="filteredTodos.length > 0">
    <Item
      :filteredTodos="filteredTodos"
      @removeItem="removeTodo"
      @startEditItem="startEditTodo"
      @toggleComplete="toggleComplete"
    />
  </ul>
</template>
<script>
import Item from "./Item.vue";

export default {
  name: "TodoItems",
  props: {
    filteredTodos: Array,
  },
  components: {
    Item,
  },
  methods: {
    toggleComplete(id) {
      this.$emit("toggleComplete", id);
    },
    removeTodo(id) {
      this.$emit("removeItem", id);
    },
    startEditTodo(id, name) {
      this.$emit("startEditItem", id, name);
    },
  },
};
</script>
<style scoped>
.list-items {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  box-shadow: 5px 3px 16px 0 #c6c6c64f;
  max-height: 250px;
  overflow-y: auto;
  padding: 10px 0;
}
</style>
