<template>
  <form @submit.prevent="search" class="search-form">
    <div class="form-outline">
      <input
        type="text"
        v-model="keyWord"
        class="form-control search border-end-0"
        placeholder="Tìm kiếm"
      />
    </div>
    <button class="btn btn-primary border-start-0">
      <i class="fas fa-search"></i>
    </button>
  </form>
</template>
<script>
export default {
  name: "Search",
  props: {
    isClear: Boolean,
  },
  data() {
    return {
      keyWord: "",
    };
  },
  watch: {
    isClear() {
      this.keyWord = "";
    },
  },
  methods: {
    search() {
      this.keyWord = this.keyWord.trim();
      this.$emit("search", this.keyWord);
    },
  },
  computed: {
    if(isClear) {
      this.keyWord = "";
    },
  },
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