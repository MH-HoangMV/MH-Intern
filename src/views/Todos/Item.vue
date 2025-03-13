<template>
  <fragment>
    <li
      v-for="todo in filteredTodos"
      :key="todo.id"
      :class="['group-item', { progress: todo.status === 'progress' }]"
    >
      <TodoContent :todo="todo" @toggleComplete="toggleComplete" />
      <EditOrDel
        :item="todo"
        @removeItem="removeTodo"
        @startEditItem="startEditTodo"
      />
    </li>
  </fragment>
</template>

<script>
import EditOrDel from "@/components/Action/EditOrDel.vue";
import TodoContent from "./TodoContent.vue";

export default {
  name: "ItemComponent",
  components: {
    TodoContent,
    EditOrDel,
  },
  props: {
    filteredTodos: Array,
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
.group-item {
  text-align: start;
  display: flex;
  column-gap: 10px;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  transition: background 0.15s ease-in-out;
  cursor: auto;
}
.group-item.progress {
  background: #f8f8f8;
}
.group-item:hover {
  background: #f8f8f8;
}
</style>
