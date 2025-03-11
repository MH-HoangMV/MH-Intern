<template>
  <div class="item-content">
    <label class="gr-check">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="toggleComplete"
        class="todo-checkbox"
        hidden
      />
      <span class="ct-check"></span>
    </label>
    <li class="item" :class="{ completed: todo.completed }" :title="todo.name">
      <span v-html="todo.name"></span>
    </li>
  </div>
</template>
<script>
export default {
  name: "TodoContent",
  props: {
    todo: Object,
  },
  methods: {
    toggleComplete() {
      this.$emit("toggleComplete", this.todo.id);
    },
  },
};
</script>
<style scoped>
.item-content {
  font-size: 1.4rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  overflow: hidden;
  max-width: 80%;
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
