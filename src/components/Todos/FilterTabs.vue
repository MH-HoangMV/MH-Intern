<template>
  <div class="filter-tabs">
    <span
      v-for="tab in tabs"
      :key="tab.value"
      :class="['tab', { active: currentTab === tab.value }]"
      @click="$emit('update:currentTab', tab.value)"
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
};
</script>
<style scoped>
.filter-tabs {
  display: flex;
  margin-top: 10px;
  border-bottom: 1px solid #dee2e6;
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
