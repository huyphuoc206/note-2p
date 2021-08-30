<template>
  <div class="form-check form-switch">
    <input
      class="form-check-input"
      type="radio"
      id="radio1"
      name="filter"
      checked
    />
    <label class="form-check-label" for="radio1">Tất cả</label>
  </div>
  <div class="form-check form-switch">
    <input class="form-check-input" type="radio" id="radio2" name="filter" />
    <label class="form-check-label" for="radio2">Đã hoàn thành</label>
  </div>
  <div class="form-check form-switch">
    <input class="form-check-input" type="radio" id="radio3" name="filter" />
    <label class="form-check-label" for="radio3">Chưa hoàn thành</label>
  </div>
</template>
<script>
export default {
  name: "ToggleFilter",
};
</script>
<style>
</style>