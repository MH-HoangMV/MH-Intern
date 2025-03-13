<template>
  <div class="filter-tabs">
    <span
      v-for="tab in tabs"
      :key="tab.value"
      :class="['tab', { active: currentTab === tab.value }]"
      @click="updateCurrentTab(tab)"
    >
      {{ tab.label }}
    </span>
  </div>
</template>
<script>
export default {
  name: "FilterTabs",
  props: {
    tabs: Array,
    currentTab: String,
  },
  methods: {
    updateCurrentTab(tab) {
      this.$emit("update:currentTab", tab.value);
    },
  },
};
</script>
<style scoped>
.filter-tabs {
  display: flex;
  margin-top: 10px;
  border-bottom: 1px solid #dee2e6;
  overflow-x: auto;
  padding-bottom: 5px;
}

.filter-tabs .tab {
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-bottom: 2px solid transparent;
  font-size: 14px;
}

.filter-tabs .tab:hover {
  background-color: #f0f0f0;
}

.filter-tabs .tab.active {
  border-bottom: 2px solid rgba(137, 43, 226, 0.87);
  color: rgba(137, 43, 226, 0.87);
  font-weight: bold;
}
</style>
