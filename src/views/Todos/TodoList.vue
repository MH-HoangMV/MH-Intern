<template>
  <section class="todo-list">
    <h1 class="heading">Todo List</h1>
    <TodoInput
      :content="content"
      :editingId="editingId"
      @update="content = $event"
      @addOrUpdate="addOrUpdateTodo"
      ref="input-todo"
    />
    <FilterTabs
      :tabs="tabs"
      :currentTab="currentTab"
      @update:currentTab="currentTab = $event"
    />
    <div
      class="list-items"
      :class="{ 'p-15': todos.length === 0 }"
      v-if="todos.length === 0"
    >
      There is no todo
    </div>
    <TodoItems
      :filteredTodos="filteredTodos"
      @removeItem="removeTodo"
      @startEditItem="startEditTodo"
      @toggleComplete="toggleComplete"
    />
  </section>
</template>
<script>
import TodoInput from "./TodoInput.vue";
import FilterTabs from "./FilterTabs.vue";
import TodoItems from "./TodoItems.vue";

export default {
  name: "TodoList",
  components: {
    TodoInput,
    FilterTabs,
    TodoItems,
  },
  data() {
    return {
      todos: [
        {
          name: "This is a too long long long long todo",
          id: 1,
          status: "completed",
        },
        {
          name: "Todo_2",
          id: 2,
          status: "incomplete",
        },
        {
          name: "Todo_3",
          id: 3,
          status: "progress",
        },
      ],
      content: "",
      editingId: null,
      currentTab: "all",
      tabs: [
        { label: "All", value: "all" },
        { label: "Completed", value: "completed" },
        { label: "Incomplete", value: "incomplete" },
        { label: "Progress", value: "progress" },
      ],
    };
  },
  computed: {
    filteredTodos() {
      return this.currentTab === "all"
        ? this.todos
        : this.todos.filter((todo) => todo.status === this.currentTab);
    },
  },
  watch: {},

  methods: {
    toggleComplete(id) {
      this.todos = this.todos.map((todo) => {
        return todo.id === id
          ? {
              ...todo,
              status: todo.status === "completed" ? "incomplete" : "completed",
            }
          : todo;
      });
    },

    addOrUpdateTodo() {
      if (!this.content.trim()) {
        this.content = "";
        this.editingId = null;
        return;
      }

      if (this.editingId) {
        this.editTodo(this.editingId);
        this.editingId = null;
      } else {
        this.addTodo();
      }
    },

    addTodo() {
      this.todos = [
        ...this.todos,
        {
          name: this.content,
          id: this.todos.length ? this.todos[this.todos.length - 1].id + 1 : 1,
          status: "incomplete",
        },
      ];

      this.content = "";
    },

    removeTodo(id) {
      const confirm = window.confirm("Are you sure to delete this todo?");
      if (!confirm) return;
      this.todos = this.todos.filter((todo) => todo.id !== id);
      if (this.editingId === id) {
        this.editingId = null;
        this.content = "";
      }
    },

    startEditTodo(id, name) {
      this.editingId = id;
      this.content = name;
      this.$nextTick(() => {
        this.$refs["input-todo"].focus();
      });
    },

    editTodo(id) {
      this.todos = this.todos.map((todo) => {
        return todo.id === id
          ? {
              ...todo,
              name: this.content,
            }
          : todo;
      });

      this.content = "";
    },
  },
};
</script>
<style scoped lang="css">
.heading {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.4rem;
  font-weight: 600;
}

.todo-list {
  width: 285px;
  height: 769px;
  margin: 100px auto 0;
}

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

.list-items.p-15 {
  padding: 15px;
}
</style>
