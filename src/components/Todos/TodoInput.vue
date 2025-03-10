<template>
  <div class="add-todo">
    <input
      class="input"
      type="text"
      placeholder="What needs to be done?..."
      :value="content"
      @input="onChange"
      @keyup.enter="$emit('add-or-update')"
      ref="input"
    />
    <button @click="$emit('add-or-update')">
      {{ editingId ? "Update" : "Add" }}
    </button>
  </div>
</template>

<script>
export default {
  name: "TodoInput",
  props: {
    content: {
      type: String,
      default: "",
    },
    editingId: {
      type: Number,
      default: null,
    },
  },
  methods: {
    onChange(e) {
      this.$emit("update", e.target.value);
    },

    focus() {
      this.$refs.input.focus();
    },
  },
};
</script>

<style scoped>
.add-todo {
  display: flex;
}

.add-todo input {
  padding: 0 10px;
  height: 48px;
  width: 100%;
  border: solid #dee2e6;
  border-width: 2px 0 2px 2px;
  border-radius: 8px 0 0 8px;
  outline-color: #892be2de;
}

.add-todo input::placeholder {
  font-size: 1.4rem;
}

.add-todo > button {
  padding: 0 10px;
  border: solid transparent;
  border-width: 2px 2px 2px 0;
  border-radius: 0px 8px 8px 0px;
  background: rgba(137, 43, 226, 0.87);
  display: inline-block;
  color: #fff;
  height: 48px;
  cursor: pointer;
}

.add-todo > button:hover {
  background: rgba(137, 43, 226, 0.699);
}
</style>
