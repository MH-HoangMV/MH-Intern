<template>
  <div class="container">
    <section class="todo-list">
      <h1 class="heading">Todo List</h1>
      <div class="add-todo">
        <input
          class="input"
          type="text"
          placeholder="What needs to be done?..."
          v-model="content"
          @keyup.enter="addOrUpdateTodo"
          ref="input-todo"
        />
        <button @click="addOrUpdateTodo">
          {{ editingId ? "Update" : "Add" }}
        </button>
      </div>
      <div
        class="list-items"
        :style="todos.length === 0 ? { padding: '15px' } : {}"
        v-if="todos.length === 0"
      >
        There is no todo
      </div>
      <ul class="list-items" v-if="todos.length > 0">
        <div class="group-item" v-for="todo in todos" :key="todo.id">
          <li class="item">
            {{ todo.name || "" }}
          </li>
          <div class="action-item">
            <span @click="startEditTodo(todo.id, todo.name)" class="edit-icon">
              <i class="fa-solid fa-pen-to-square"></i>
            </span>
            <span @click="removeTodo(todo.id)" class="delete-icon">
              <i class="fa-solid fa-trash"></i>
            </span>
          </div>
        </div>
      </ul>
    </section>
  </div>
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
        {
          name: "Todo_2",
          id: 2,
        },
      ],
      content: "",
      editingId: null,
    };
  },

  methods: {
    addOrUpdateTodo() {
      if (this.content.trim() === "") {
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
          },
        ];
      } else {
        this.todos = [
          ...this.todos,
          {
            name: this.content,
            id: 1,
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
<style scoped lang="scss">
.container {
  width: 640px;
  max-width: calc(100% - 32px);
  height: 769px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  background: #f2f2f2;
  .heading {
    text-align: center;
    margin-bottom: 20px;
    font-size: 2.4rem;
    font-weight: 600;
  }
  .todo-list {
    width: 285px;
    margin-top: 200px;
  }
  .list-items {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #dee2e6;
    box-shadow: 5px 3px 16px 0 #c6c6c64f;
    max-height: 200px;
    overflow-y: auto;
    padding: 10px 0;
  }
  .group-item {
    text-align: start;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    transition: background 0.15s ease-in-out;
    cursor: pointer;
    &:hover {
      background: #f8f8f8;
    }
  }
  .action-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .edit-icon {
    color: #0077ff;
    cursor: pointer;
    padding: 2px 4px;
    display: inline-block;
    transition: all 0.2s ease-in-out;
    &:hover {
      transform: scale(1.1);
    }
  }
  .delete-icon {
    color: #ff3333;
    cursor: pointer;
    padding: 2px 4px;
    display: inline-block;
    transition: all 0.2s ease-in-out;
    &:hover {
      transform: scale(1.1);
    }
  }
  .add-todo {
    display: flex;
    input {
      padding: 0 10px;
      height: 48px;
      width: 100%;
      border-left: 2px solid #dee2e6;
      border-bottom: 2px solid #dee2e6;
      border-top: 2px solid #dee2e6;
      outline-color: #8a2be2;

      border-radius: 8px 0 0 8px;
      &::placeholder {
        font-size: 1.4rem;
      }
    }
    > button {
      padding: 0 10px;
      border-right: 2px solid transparent;
      border-bottom: 2px solid transparent;
      border-top: 2px solid transparent;
      border-radius: 0px 8px 8px 0px;
      background: rgba(137, 43, 226, 0.87);
      display: inline-block;
      color: #fff;
      height: 48px;
      cursor: pointer;
      &:hover {
        background: rgba(137, 43, 226, 0.699);
      }
    }
  }
}
</style>
