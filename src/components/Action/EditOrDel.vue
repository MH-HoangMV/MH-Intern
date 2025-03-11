<template>
  <div class="action-item">
    <span @click.stop="startEditItem(item.id, item.name)" class="edit-icon">
      <i class="fa-solid fa-pen-to-square"></i>
    </span>
    <span @click.stop="removeItem(item.id)" class="delete-icon">
      <i class="fa-solid fa-trash"></i>
    </span>
  </div>
</template>
<script>
export default {
  name: "editOrDel",
  props: {
    item: {
      type: Object,
      id: Number,
      name: {
        type: String,
        default: "",
      },
    },
  },
  methods: {
    startEditItem(id, name) {
      this.$emit("startEditItem", id, name);
    },
    removeItem(id) {
      this.$emit("removeItem", id);
    },
  },
};
</script>
<style scoped>
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
}

.edit-icon:hover {
  transform: scale(1.1);
}

.delete-icon {
  color: #ff3333;
  cursor: pointer;
  padding: 2px 4px;
  display: inline-block;
  transition: all 0.2s ease-in-out;
}

.delete-icon:hover {
  transform: scale(1.1);
}
</style>
