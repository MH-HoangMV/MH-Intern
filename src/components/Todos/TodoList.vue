<template>
  <div class="container">
    <section class="todo-list">
      <h1 class="heading">Todo List</h1>
      <TodoInput
        :content="content"
        :editingId="editingId"
        @update="content = $event"
        @add-or-update="addOrUpdateTodo"
        ref="input-todo"
      />
      <FilterTabs
        :tabs="tabs"
        :current-tab="currentTab"
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
        :filtered-todos="filteredTodos"
        @removeTodo="removeTodo"
        @startEditTodo="startEditTodo"
        @toggle-complete="toggleComplete"
      />
    </section>
  </div>
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
          completed: true,
        },
        {
          name: "Todo_2",
          id: 2,
          completed: false,
        },
      ],
      content: "",
      editingId: null,
      currentTab: "all",
      tabs: [
        { label: "All", value: "all" },
        { label: "Completed", value: "completed" },
        { label: "Incomplete", value: "incomplete" },
      ],
    };
  },
  computed: {
    filteredTodos() {
      // console.log(this.currentTab);
      switch (this.currentTab) {
        case "completed":
          return this.todos.filter((todo) => todo.completed);
        case "incomplete":
          return this.todos.filter((todo) => !todo.completed);
        default:
          return this.todos;
      }
    },
  },
  watch: {},

  methods: {
    toggleComplete(id) {
      this.todos = this.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
    },

    addOrUpdateTodo() {
      if (this.content.trim() === "") {
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
      if (this.todos.length) {
        this.todos = [
          ...this.todos,
          {
            name: this.content,
            id: this.todos[this.todos.length - 1].id + 1,
            status: "unfinished",
          },
        ];
      } else {
        this.todos = [
          ...this.todos,
          {
            name: this.content,
            id: 1,
            status: "unfinished",
          },
        ];
      }

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
        if (todo.id === id) {
          return {
            ...todo,
            name: this.content,
          };
        }
        return todo;
      });

      this.content = "";
    },
  },
};
</script>
<style scoped lang="css">
.container {
  width: 640px;
  max-width: calc(100% - 32px);
  height: 769px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  background: #f2f2f2;
}

.container .heading {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.4rem;
  font-weight: 600;
}

.container .todo-list {
  width: 285px;
  margin-top: 200px;
}

.container .list-items {
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
