<template>
  <ul class="list-items" v-if="filteredTodos.length > 0">
    <div class="group-item" v-for="todo in filteredTodos" :key="todo.id">
      <TodoContent :todo="todo" @toggleComplete="toggleComplete" />
      <EditOrDel
        :item="todo"
        @removeItem="removeTodo"
        @startEditItem="startEditTodo"
      />
    </div>
  </ul>
</template>
<script>
import TodoContent from "./TodoContent.vue";
import EditOrDel from "../../components/Action/EditOrDel.vue";

export default {
  name: "TodoItems",
  props: {
    filteredTodos: Array,
  },
  components: {
    TodoContent,
    EditOrDel,
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

.group-item:hover {
  background: #f8f8f8;
}

.gr-check {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
}

.ct-check {
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 6px;
  border: 2px solid #ccc;
  cursor: pointer;
  position: relative;
  transition: all 0.15s ease-in-out;
}

.ct-check::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 3px;
  height: 8px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  translate: -50% -60%;
  opacity: 0;
  transition: all 0.15s ease-in-out;
}

.todo-checkbox:checked + .ct-check {
  background: #008ba1;
  border-color: #008ba1;
}

.todo-checkbox:checked + .ct-check::before {
  opacity: 1;
}

.item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.item.completed {
  text-decoration: line-through;
  color: #9ca3af;
}
</style>
