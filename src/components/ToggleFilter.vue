<template>
  <div class="form-check form-switch">
    <input
      class="form-check-input"
      type="radio"
      id="all"
      name="filter"
      :checked="state == 'ALL'"
      @click="$emit('toggleState', 'ALL')"
    />
    <label class="form-check-label" for="all">Tất cả</label>
  </div>
  <div class="form-check form-switch">
    <input
      class="form-check-input"
      type="radio"
      id="done"
      name="filter"
      :checked="state == 'DONE'"
       @click="$emit('toggleState', 'DONE')"
    />
    <label class="form-check-label" for="done">Đã hoàn thành</label>
  </div>
  <div class="form-check form-switch">
    <input
      class="form-check-input"
      type="radio"
      id="ndone"
      name="filter"
      :checked="state == 'NDONE'"
       @click="$emit('toggleState', 'NDONE')"
    />
    <label class="form-check-label" for="ndone">Chưa hoàn thành</label>
  </div>
</template>
<script>
export default {
  name: "ToggleFilter",
  props: {
    state: {
      type: String,
      default: "ALL",
    },
  },
};
</script>
<style>
</style>