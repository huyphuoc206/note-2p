<template>
  <div class="search-form">
    <div class="form-outline">
      <input
        type="search"
        class="form-control search border-end-0"
        placeholder="Tìm kiếm"
      />
    </div>
    <button type="button" class="btn btn-primary border-start-0">
      <i class="fas fa-search"></i>
    </button>
  </div>
</template>
<script>
export default {
  name: "Search",
};
</script>
<style scoped>
.search-form {
  display: flex;
}
.search {
  border-start-end-radius: 0;
  border-end-end-radius: 0;
}
.search-form button {
  border-start-start-radius: 0;
  border-end-start-radius: 0;
}
.search:focus {
  border-color: rgba(92, 104, 209, 0.8);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset,
    0 0 8px rgba(126, 239, 104, 0.6);
  outline: 0 none;
}
</style>