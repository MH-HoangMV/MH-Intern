<template>
  <section class="container">
    <h1>Todo List</h1>
    <div class="action">
      <input
        type="text"
        placeholder="What needs to be done?..."
        v-model="content"
        @keyup.enter="addTodo"
      />
      <button @click="addTodo">Add</button>
    </div>
    <ul class="todo-list" v-if="todos.length > 0">
      <div class="group-item" v-for="todo in todos" :key="todo.id">
        <li class="todo-item">
          {{ todo?.name }}
        </li>
        <span @click="removeTodo(todo.id)">x</span>
      </div>
    </ul>
  </section>
</template>
<script>
export default {
  name: "TodoList",
  data() {
    return {
      todos: [
        {
          name: "Todo_1",
          id: 1,
        },
      ],
      content: "",
    };
  },

  methods: {
    addTodo() {
      if (this.content.trim() === "") return;
      this.todos.push({
        name: this.content,
        id: this.todos.length + 1,
      });
      this.content = "";
    },
    removeTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
  },
};
</script>
<style scoped>
.container {
  width: 400px;
  margin: 0 auto;
  .group-item {
    text-align: start;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      cursor: pointer;
      padding: 2px 4px;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 10px;
      transition: all 0.2s ease-in-out;
      &:hover {
        background: rgba(231, 152, 152, 0.452);
      }
    }
  }
}
</style>
