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
      <div class="filter-tabs">
        <span 
          v-for="tab in tabs" 
          :key="tab.value"
          :class="['tab', { active: currentTab === tab.value }]"
          @click="currentTab = tab.value"
        >
          {{ tab.label }}
        </span>
      </div>
      <div
        class="list-items"
        :class="{ 'p-15': todos.length === 0 }"
        v-if="todos.length === 0"
      >
        There is no todo
      </div>
      <ul class="list-items" v-if="filteredTodos.length > 0">
        <div class="group-item" v-for="todo in filteredTodos" :key="todo.id">
          <div class="item-content">
            <label class="gr-check">
              <input 
                type="checkbox" 
                :checked="todo.completed" 
                @change="toggleComplete(todo.id)"
                class="todo-checkbox"
                hidden
              />
              <span class="ct-check"></span>
            </label>
            <li 
              class="item" 
              :class="{ completed: todo.completed }" 
              :title="todo.name"
            >
              <span v-html="todo.name"></span>
            </li>
          </div>
          <div class="action-item">
            <span
              @click.stop="startEditTodo(todo.id, todo.name)"
              class="edit-icon"
            >
              <i class="fa-solid fa-pen-to-square"></i>
            </span>
            <span @click.stop="removeTodo(todo.id)" class="delete-icon">
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
      currentTab: 'all',
      tabs: [
        { label: 'All', value: 'all' },
        { label: 'Completed', value: 'completed' },
        { label: 'Incomplete', value: 'incomplete' }
      ]
    };
  },
  computed: {
    filteredTodos() {
      // console.log(this.currentTab);
      switch (this.currentTab) {
        case 'completed':
          return this.todos.filter(todo => todo.completed);
        case 'incomplete':
          return this.todos.filter(todo => !todo.completed);
        default:
          return this.todos;
      }
    }
  },

  

  methods: {
    toggleComplete(id) {
      this.todos = this.todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
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
<style scoped lang="scss">
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

.container .group-item {
  text-align: start;
  display: flex;
  column-gap: 10px;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  transition: background 0.15s ease-in-out;
  cursor: auto;
}

.container .group-item:hover {
  background: #f8f8f8;

}
.container .gr-check {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;

 
}


.container .ct-check {
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 6px;
  border: 2px solid #ccc;
  cursor: pointer;
  position: relative;
  transition: all 0.15s ease-in-out;
}
.container .ct-check::before {
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
.container .todo-checkbox:checked + .ct-check {
  background: #008BA1;
  border-color: #008BA1;
}
.container .todo-checkbox:checked + .ct-check::before {
  opacity: 1;
}
.container .item-content {
  font-size: 1.4rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  overflow: hidden;
  max-width: 80%;
}

.container .todo-checkbox {
  margin-right: 8px;
  cursor: pointer;
}

.container .item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.container .item.completed {
  text-decoration: line-through;
  color: #9ca3af;
}

.container .action-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.container .edit-icon {
  color: #0077ff;
  cursor: pointer;
  padding: 2px 4px;
  display: inline-block;
  transition: all 0.2s ease-in-out;
}

.container .edit-icon:hover {
  transform: scale(1.1);
}

.container .delete-icon {
  color: #ff3333;
  cursor: pointer;
  padding: 2px 4px;
  display: inline-block;
  transition: all 0.2s ease-in-out;
}

.container .delete-icon:hover {
  transform: scale(1.1);
}

.container .add-todo {
  display: flex;
}

.container .add-todo input {
  padding: 0 10px;
  height: 48px;
  width: 100%;
  border: solid #dee2e6;
  border-width:  2px 0 2px 2px;
  border-radius: 8px 0 0 8px;
}

.container .add-todo input::placeholder {
  font-size: 1.4rem;
}

.container .add-todo > button {
  padding: 0 10px;
  border:  solid transparent;
  border-width:  2px 2px 2px 0;
  
  border-radius: 0px 8px 8px 0px;
  background: rgba(137, 43, 226, 0.87);
  display: inline-block;
  color: #fff;
  height: 48px;
  cursor: pointer;
}

.container .add-todo > button:hover {
  background: rgba(137, 43, 226, 0.699);
}

.container .filter-tabs {
  display: flex;
  margin-top: 10px;
  border-bottom: 1px solid #dee2e6;
}

.container .filter-tabs .tab {
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-bottom: 2px solid transparent;
  font-size: 14px;
}

.container .filter-tabs .tab:hover {
  background-color: #f0f0f0;
}

.container .filter-tabs .tab.active {
  border-bottom: 2px solid rgba(137, 43, 226, 0.87);
  color: rgba(137, 43, 226, 0.87);
  font-weight: bold;
}
  .p-15 {
    padding: 15px;
  }
</style>
